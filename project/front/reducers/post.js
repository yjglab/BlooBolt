import produce from "immer";

export const initialState = {
  mainPosts: [],
  postImagePaths: [],

  uploadPostLoading: false,
  uploadPostDone: false,
  uploadPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  uploadPostImagesLoading: false,
  uploadPostImagesDone: false,
  uploadPostImagesError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

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

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

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
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
