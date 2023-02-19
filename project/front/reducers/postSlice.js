import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

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
  revertPostLoading: false,
  revertPostDone: false,
  revertPostError: null,
  uploadPostImagesLoading: false,
  uploadPostImagesDone: false,
  uploadPostImagesError: null,
  prodPostLoading: false,
  prodPostDone: false,
  prodPostError: null,
  unprodPostLoading: false,
  unprodPostDone: false,
  unprodPostError: null,
  editPostLoading: false,
  editPostDone: false,
  editPostError: null,
  uploadCommentLoading: false,
  uploadCommentDone: false,
  uploadCommentError: null,
};

const loadPostsHandler = async (info, thunkAPI) => {
  try {
    const { data } = await axios.get(`/posts?lastPostId=${info || 0}`);
    return data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
const loadPostsByHashtagHandler = async (info, thunkAPI) => {
  try {
    const { data } = await axios.get(
      `/hashtag/${encodeURIComponent(info.tag)}?lastPostId=${
        info.lastPostId || 0
      }`
    );
    return data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const loadPosts = createAsyncThunk("posts/loadPosts", loadPostsHandler);
export const loadPostsByHashtag = createAsyncThunk(
  "posts/loadPostsByHashtag",
  loadPostsByHashtagHandler
);
export const uploadPostImages = createAsyncThunk(
  "post/uploadPostImages",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post(`/post/images`, info);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const uploadPost = createAsyncThunk(
  "post/uploadPost",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post(`/post`, info);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const removePost = createAsyncThunk(
  "post/removePost",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/post/${info}`);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const revertPost = createAsyncThunk(
  "post/revertPost",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/post/${info}/revert`);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const prodPost = createAsyncThunk(
  "post/prodPost",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/post/${info.postId}/prod`, info);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const unprodPost = createAsyncThunk(
  "post/unprodPost",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/post/${info.postId}/prod`);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editPost = createAsyncThunk(
  "post/editPost",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/post/${info.PostId}`, info);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const uploadComment = createAsyncThunk(
  "post/uploadComment",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post(`/post/${info.postId}/comment`, info);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    loadPrevPostImages(state, { payload }) {
      state.postImagePaths = state.postImagePaths.concat(payload);
    },
    cancelPostImage(state, { payload }) {
      state.postImagePaths = state.postImagePaths.filter(
        (v, i) => i !== payload
      );
    },
    cancelAllPostImages(state) {
      state.postImagePaths = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (state, { payload }) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = state.mainPosts.concat(payload);
        console.log(payload, payload.length);
        state.loadMorePosts = payload.length !== 0;
      })
      .addCase(loadPosts.rejected, (state, { payload }) => {
        state.loadPostsLoading = false;
        state.loadPostsError = payload;
      });
    builder
      .addCase(uploadPostImages.pending, (state) => {
        state.uploadPostImagesLoading = true;
        state.uploadPostImagesError = null;
      })
      .addCase(uploadPostImages.fulfilled, (state, { payload }) => {
        state.uploadPostImagesLoading = false;
        state.uploadPostImagesDone = true;
        state.postImagePaths = state.postImagePaths.concat(payload);
      })
      .addCase(uploadPostImages.rejected, (state, { payload }) => {
        state.uploadPostImagesLoading = false;
        state.uploadPostImagesError = payload;
      });
    builder
      .addCase(uploadPost.pending, (state) => {
        state.uploadPostLoading = true;
        state.uploadPostError = null;
      })
      .addCase(uploadPost.fulfilled, (state, { payload }) => {
        state.uploadPostLoading = false;
        state.uploadPostDone = true;
        state.mainPosts.unshift(payload);
        state.postImagePaths = [];
      })
      .addCase(uploadPost.rejected, (state, { payload }) => {
        state.uploadPostLoading = false;
        state.uploadPostError = payload;
      });
    builder
      .addCase(removePost.pending, (state) => {
        state.removePostLoading = true;
        state.removePostError = null;
      })
      .addCase(removePost.fulfilled, (state, { payload }) => {
        state.removePostLoading = false;
        state.removePostDone = true;
        const post = state.mainPosts.find((v) => v.id === payload.PostId);
        post.blinded = true;
      })
      .addCase(removePost.rejected, (state, { payload }) => {
        state.removePostLoading = false;
        state.removePostError = payload;
      });
    builder
      .addCase(revertPost.pending, (state) => {
        state.revertPostLoading = true;
        state.revertPostError = null;
      })
      .addCase(revertPost.fulfilled, (state, { payload }) => {
        state.revertPostLoading = false;
        state.revertPostDone = true;
        const post = state.mainPosts.find((v) => v.id === payload.PostId);
        post.blinded = false;
        post.reverted = true;
      })
      .addCase(revertPost.rejected, (state, { payload }) => {
        state.revertPostLoading = false;
        state.revertPostError = payload;
      });
    builder
      .addCase(prodPost.pending, (state) => {
        state.prodPostLoading = true;
        state.prodPostError = null;
      })
      .addCase(prodPost.fulfilled, (state, { payload }) => {
        state.prodPostLoading = false;
        state.prodPostDone = true;
        const post = state.mainPosts.find((v) => v.id === payload.PostId);
        post.Prodders.push({ id: payload.UserId });
      })
      .addCase(prodPost.rejected, (state, { payload }) => {
        state.prodPostLoading = false;
        state.prodPostError = payload;
      });
    builder
      .addCase(unprodPost.pending, (state) => {
        state.unprodPostLoading = true;
        state.unprodPostError = null;
      })
      .addCase(unprodPost.fulfilled, (state, { payload }) => {
        state.unprodPostLoading = false;
        state.unprodPostDone = true;
        const post = state.mainPosts.find((v) => v.id === payload.PostId);
        post.Prodders = post.Prodders.filter((v) => v.id !== payload.UserId);
      })
      .addCase(unprodPost.rejected, (state, { payload }) => {
        state.unprodPostLoading = false;
        state.unprodPostError = payload;
      });
    builder
      .addCase(editPost.pending, (state) => {
        state.editPostLoading = true;
        state.editPostError = null;
      })
      .addCase(editPost.fulfilled, (state, { payload }) => {
        state.editPostLoading = false;
        state.editPostDone = true;
        const post = state.mainPosts.find((v) => v.id === payload.PostId);
        post.topic = payload.topic;
        post.content = payload.content;
        post.PostImages = payload.PostImages;
        post.edited = true;
        state.postImagePaths = [];
      })
      .addCase(editPost.rejected, (state, { payload }) => {
        state.editPostLoading = false;
        state.editPostError = payload;
      });
    builder
      .addCase(uploadComment.pending, (state) => {
        state.uploadCommentLoading = true;
        state.uploadCommentError = null;
      })
      .addCase(uploadComment.fulfilled, (state, { payload }) => {
        state.uploadCommentLoading = false;
        state.uploadCommentDone = true;
        const post = state.mainPosts.find((v) => v.id === payload.PostId);
        post.Comments.push(payload);
      })
      .addCase(uploadComment.rejected, (state, { payload }) => {
        state.uploadCommentLoading = false;
        state.uploadCommentError = payload;
      });
  },
});

export const { loadPrevPostImages, cancelPostImage, cancelAllPostImages } =
  postSlice.actions;
export default postSlice;

/*


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

export const REVERT_POST_REQUEST = "REVERT_POST_REQUEST";
export const REVERT_POST_SUCCESS = "REVERT_POST_SUCCESS";
export const REVERT_POST_FAILURE = "REVERT_POST_FAILURE";

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

export const EDIT_POST_REQUEST = "EDIT_POST_REQUEST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const EDIT_POST_FAILURE = "EDIT_POST_FAILURE";

export const UPLOAD_COMMENT_REQUEST = "UPLOAD_COMMENT_REQUEST";
export const UPLOAD_COMMENT_SUCCESS = "UPLOAD_COMMENT_SUCCESS";
export const UPLOAD_COMMENT_FAILURE = "UPLOAD_COMMENT_FAILURE";

export const STATUS_ON = "STATUS_ON";
export const STATUS_OFF = "STATUS_OFF";
export const LOAD_PREV_POST_IMAGES = "LOAD_PREV_POST_IMAGES";


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
      case LOAD_PREV_POST_IMAGES:
        draft.postImagePaths = draft.postImagePaths.concat(action.data);
        break;

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
        draft.loadMorePosts = action.data.length !== 0;
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
      case REMOVE_POST_SUCCESS: {
        draft.removePostLoading = false;
        draft.removePostDone = true;
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.blinded = true;
        break;
      }
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case REVERT_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REVERT_POST_SUCCESS: {
        draft.removePostLoading = false;
        draft.removePostDone = true;
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.blinded = false;
        post.reverted = true;
        break;
      }
      case REVERT_POST_FAILURE:
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
      case EDIT_POST_REQUEST:
        draft.editPostLoading = true;
        draft.editPostDone = false;
        draft.editPostError = null;
        break;
      case EDIT_POST_SUCCESS: {
        draft.editPostLoading = false;
        draft.editPostDone = true;
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.topic = action.data.topic;
        post.content = action.data.content;
        post.PostImages = action.data.PostImages;
        post.edited = true;
        draft.postImagePaths = [];
        break;
      }
      case EDIT_POST_FAILURE:
        draft.editPostLoading = false;
        draft.editPostError = action.error;
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
*/
