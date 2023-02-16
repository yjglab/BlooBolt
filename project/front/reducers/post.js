import produce from "immer";

export const initialState = {
  mainPosts: [],
  postImagePaths: [],
  loadMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadHashtagPostsLoading: false,
  loadHashtagPostsDone: false,
  loadHashtagPostsError: null,

  uploadPostLoading: false,
  uploadPostDone: false,
  uploadPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  uploadPostImagesLoading: false,
  uploadPostImagesDone: false,
  uploadPostImagesError: null,
  prodPostLoading: false,
  prodPostDone: false,
  prodPostError: null,
  unprodPostLoading: false,
  unprodPostDone: false,
  unprodPostError: null,
  uploadCommentLoading: false,
  uploadCommentDone: false,
  uploadCommentError: null,
};

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE";

export const UPLOAD_POST_REQUEST = "UPLOAD_POST_REQUEST";
export const UPLOAD_POST_SUCCESS = "UPLOAD_POST_SUCCESS";
export const UPLOAD_POST_FAILURE = "UPLOAD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const UPLOAD_POST_IMAGES_REQUEST = "UPLOAD_POST_IMAGES_REQUEST";
export const UPLOAD_POST_IMAGES_SUCCESS = "UPLOAD_POST_IMAGES_SUCCESS";
export const UPLOAD_POST_IMAGES_FAILURE = "UPLOAD_POST_IMAGES_FAILURE";
export const CANCEL_POST_IMAGE = "CANCEL_POST_IMAGE";
export const CANCEL_ALL_POST_IMAGES = "CANCEL_ALL_POST_IMAGES";

export const PROD_POST_REQUEST = "PROD_POST_REQUEST";
export const PROD_POST_SUCCESS = "PROD_POST_SUCCESS";
export const PROD_POST_FAILURE = "PROD_POST_FAILURE";

export const UNPROD_POST_REQUEST = "UNPROD_POST_REQUEST";
export const UNPROD_POST_SUCCESS = "UNPROD_POST_SUCCESS";
export const UNPROD_POST_FAILURE = "UNPROD_POST_FAILURE";

export const UPLOAD_COMMENT_REQUEST = "UPLOAD_COMMENT_REQUEST";
export const UPLOAD_COMMENT_SUCCESS = "UPLOAD_COMMENT_SUCCESS";
export const UPLOAD_COMMENT_FAILURE = "UPLOAD_COMMENT_FAILURE";

export const STATUS_ON = "STATUS_ON";
export const STATUS_OFF = "STATUS_OFF";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case STATUS_ON: {
        const posts = draft.mainPosts.filter(
          (post) => post.User.id === action.data
        );
        posts.map((post) => {
          post.User.status = true;
        });
        break;
      }
      case STATUS_OFF: {
        const posts = draft.mainPosts.filter(
          (post) => post.User.id === action.data
        );
        posts.map((post) => {
          post.User.status = false;
        });
        break;
      }
      case LOAD_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.loadMorePosts = draft.mainPosts.length === 12;
        break;
      case LOAD_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case UPLOAD_POST_REQUEST:
        draft.uploadPostLoading = true;
        draft.uploadPostDone = false;
        draft.uploadPostError = null;
        break;
      case UPLOAD_POST_SUCCESS:
        draft.uploadPostLoading = false;
        draft.uploadPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.postImagePaths = [];
        break;
      case UPLOAD_POST_FAILURE:
        draft.uploadPostLoading = false;
        draft.uploadPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.PostId
        );
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case UPLOAD_POST_IMAGES_REQUEST:
        draft.uploadPostImagesLoading = true;
        draft.uploadPostImagesDone = false;
        draft.uploadPostImagesError = null;
        break;
      case UPLOAD_POST_IMAGES_SUCCESS:
        draft.uploadPostImagesLoading = false;
        draft.uploadPostImagesDone = true;
        draft.postImagePaths = draft.postImagePaths.concat(action.data);
        break;
      case UPLOAD_POST_IMAGES_FAILURE:
        draft.uploadPostImagesLoading = false;
        draft.uploadPostImagesError = action.error;
        break;
      case CANCEL_POST_IMAGE:
        draft.postImagePaths = draft.postImagePaths.filter(
          (v, i) => i !== action.data
        );
        break;
      case CANCEL_ALL_POST_IMAGES:
        draft.postImagePaths = [];
        break;
      case PROD_POST_REQUEST:
        draft.prodPostLoading = true;
        draft.prodPostDone = false;
        draft.prodPostError = null;
        break;
      case PROD_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Prodders.push({ id: action.data.UserId });
        draft.prodPostLoading = false;
        draft.prodPostDone = true;
        break;
      }
      case PROD_POST_FAILURE:
        draft.prodPostLoading = false;
        draft.prodPostError = action.error;
        break;
      case UNPROD_POST_REQUEST:
        draft.unprodPostLoading = true;
        draft.unprodPostDone = false;
        draft.unprodPostError = null;
        break;
      case UNPROD_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Prodders = post.Prodders.filter(
          (v) => v.id !== action.data.UserId
        );
        draft.unprodPostLoading = false;
        draft.unprodPostDone = true;
        break;
      }
      case UNPROD_POST_FAILURE:
        draft.unprodPostLoading = false;
        draft.unprodPostError = action.error;
        break;
      case UPLOAD_COMMENT_REQUEST:
        draft.uploadCommentLoading = true;
        draft.uploadCommentDone = false;
        draft.uploadCommentError = null;
        break;
      case UPLOAD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.push(action.data);
        draft.uploadCommentLoading = false;
        draft.uploadCommentDone = true;
        break;
      case UPLOAD_COMMENT_FAILURE:
        draft.uploadCommentLoading = false;
        draft.uploadCommentError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
