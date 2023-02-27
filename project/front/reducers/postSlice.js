import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

export const initialState = {
  mainPosts: [],
  solePost: null,
  postImagePaths: [],
  loadMorePosts: true,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  loadPostsByHashtagLoading: false,
  loadPostsByHashtagDone: false,
  loadPostsByHashtagError: null,

  loadPostsByKeywordLoading: false,
  loadPostsByKeywordDone: false,
  loadPostsByKeywordError: null,

  loadSolePostLoading: false,
  loadSolePostDone: false,
  loadSolePostError: null,

  uploadPostLoading: false,
  uploadPostDone: false,
  uploadPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  removePostCompletelyLoading: false,
  removePostCompletelyDone: false,
  removePostCompletelyError: null,

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

  editCommentLoading: false,
  editCommentDone: false,
  editCommentError: null,

  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,

  prodCommentLoading: false,
  prodCommentDone: false,
  prodCommentError: null,

  unprodCommentLoading: false,
  unprodCommentDone: false,
  unprodCommentError: null,
};

export const loadPostsHandler = async (info, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `/posts?lastPostId=${info.lastPostId || 0}`,
      info
    );
    return data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const loadPostsByHashtagHandler = async (info, thunkAPI) => {
  try {
    const { data } = await axios.post(
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
export const loadPostsByKeywordHandler = async (info, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `/posts/keyword/${encodeURIComponent(info.keyword)}?lastPostId=${
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

export const loadPostsByKeyword = createAsyncThunk(
  "posts/loadPostsByKeyword",
  loadPostsByKeywordHandler
);
export const loadSolePost = createAsyncThunk(
  "post/loadSolePost",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.get(`/post/${info.postId}/detail`);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
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
export const removePostCompletely = createAsyncThunk(
  "post/removePostCompletely",
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
export const editComment = createAsyncThunk(
  "post/editComment",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/post/${info.postId}/comment/${info.commentId}`,
        info
      );
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const removeComment = createAsyncThunk(
  "post/removeComment",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `/post/${info.postId}/comment/${info.commentId}`
      );
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const prodComment = createAsyncThunk(
  "post/prodComment",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/post/${info.postId}/comment/${info.commentId}/prod`,
        info
      );
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const unprodComment = createAsyncThunk(
  "post/unprodComment",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `/post/${info.postId}/comment/${info.commentId}/prod`
      );
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
    flushMainPosts(state) {
      state.mainPosts = [];
    },
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
        state.loadMorePosts = payload.length === 12;
      })
      .addCase(loadPosts.rejected, (state, { payload }) => {
        state.loadPostsLoading = false;
        state.loadPostsError = payload;
      })

      .addCase(loadPostsByHashtag.pending, (state) => {
        state.loadPostsByHashtagLoading = true;
        state.loadPostsByHashtagError = null;
      })
      .addCase(loadPostsByHashtag.fulfilled, (state, { payload }) => {
        state.loadPostsByHashtagLoading = false;
        state.loadPostsByHashtagDone = true;
        state.mainPosts = state.mainPosts.concat(payload);
        state.loadMorePosts = payload.length === 12;
      })
      .addCase(loadPostsByHashtag.rejected, (state, { payload }) => {
        state.loadPostsByHashtagLoading = false;
        state.loadPostsByHashtagError = payload;
      })

      .addCase(loadPostsByKeyword.pending, (state) => {
        state.loadPostsByKeywordLoading = true;
        state.loadPostsByKeywordError = null;
      })
      .addCase(loadPostsByKeyword.fulfilled, (state, { payload }) => {
        state.loadPostsByKeywordLoading = false;
        state.loadPostsByKeywordDone = true;
        state.mainPosts = state.mainPosts.concat(payload);
        state.loadMorePosts = payload.length !== 0;
      })
      .addCase(loadPostsByKeyword.rejected, (state, { payload }) => {
        state.loadPostsByKeywordLoading = false;
        state.loadPostsByKeywordError = payload;
      })

      .addCase(loadSolePost.pending, (state) => {
        state.loadSolePostLoading = true;
        state.loadSolePostError = null;
      })
      .addCase(loadSolePost.fulfilled, (state, { payload }) => {
        state.loadSolePostDone = true;
        state.solePost = payload;
      })
      .addCase(loadSolePost.rejected, (state, { payload }) => {
        state.loadSolePostError = payload;
      })

      .addCase(uploadPostImages.pending, (state) => {
        state.uploadPostImagesLoading = true;
        state.uploadPostImagesError = null;
      })
      .addCase(uploadPostImages.fulfilled, (state, { payload }) => {
        state.uploadPostImagesDone = true;
        state.postImagePaths = state.postImagePaths.concat(payload);
      })
      .addCase(uploadPostImages.rejected, (state, { payload }) => {
        state.uploadPostImagesError = payload;
      })

      .addCase(uploadPost.pending, (state) => {
        state.uploadPostLoading = true;
        state.uploadPostError = null;
      })
      .addCase(uploadPost.fulfilled, (state, { payload }) => {
        state.uploadPostDone = true;
        state.mainPosts.unshift(payload);
        state.postImagePaths = [];
      })
      .addCase(uploadPost.rejected, (state, { payload }) => {
        state.uploadPostError = payload;
      })

      .addCase(removePost.pending, (state) => {
        state.removePostLoading = true;
        state.removePostError = null;
      })
      .addCase(removePost.fulfilled, (state, { payload }) => {
        state.removePostDone = true;
        const post = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        post.blinded = true;
      })
      .addCase(removePost.rejected, (state, { payload }) => {
        state.removePostError = payload;
      })

      .addCase(removePostCompletely.pending, (state) => {
        state.removePostCompletelyLoading = true;
        state.removePostCompletelyError = null;
      })
      .addCase(removePostCompletely.fulfilled, (state, { payload }) => {
        state.removePostCompletelyDone = true;
        state.mainPosts = state.mainPosts.filter(
          (v) => v.id !== payload.PostId
        );
      })
      .addCase(removePostCompletely.rejected, (state, { payload }) => {
        state.removePostCompletelyError = payload;
      })

      .addCase(revertPost.pending, (state) => {
        state.revertPostLoading = true;
        state.revertPostError = null;
      })
      .addCase(revertPost.fulfilled, (state, { payload }) => {
        state.revertPostDone = true;
        const post = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        post.blinded = false;
        post.reverted = true;
      })
      .addCase(revertPost.rejected, (state, { payload }) => {
        state.revertPostError = payload;
      })

      .addCase(prodPost.pending, (state) => {
        state.prodPostLoading = true;
        state.prodPostError = null;
      })
      .addCase(prodPost.fulfilled, (state, { payload }) => {
        state.prodPostDone = true;
        const post = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        post.PostProdders.push({ id: payload.UserId });
      })
      .addCase(prodPost.rejected, (state, { payload }) => {
        state.prodPostError = payload;
      })

      .addCase(unprodPost.pending, (state) => {
        state.unprodPostLoading = true;
        state.unprodPostError = null;
      })
      .addCase(unprodPost.fulfilled, (state, { payload }) => {
        state.unprodPostDone = true;
        const post = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        post.PostProdders = post.PostProdders.filter(
          (v) => v.id !== payload.UserId
        );
      })
      .addCase(unprodPost.rejected, (state, { payload }) => {
        state.unprodPostError = payload;
      })

      .addCase(editPost.pending, (state) => {
        state.editPostLoading = true;
        state.editPostError = null;
      })
      .addCase(editPost.fulfilled, (state, { payload }) => {
        state.editPostDone = true;
        const post = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        post.topic = payload.topic;
        post.class = payload.class;
        post.content = payload.content;
        post.PostImages = payload.PostImages;
        post.updatedAt = payload.updatedAt;
        post.edited = true;
        state.postImagePaths = [];
      })
      .addCase(editPost.rejected, (state, { payload }) => {
        state.editPostError = payload;
      })

      .addCase(uploadComment.pending, (state) => {
        state.uploadCommentLoading = true;
        state.uploadCommentError = null;
      })
      .addCase(uploadComment.fulfilled, (state, { payload }) => {
        state.uploadCommentDone = true;
        const post = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        post.Comments.push(payload);
      })
      .addCase(uploadComment.rejected, (state, { payload }) => {
        state.uploadCommentError = payload;
      })

      .addCase(removeComment.pending, (state) => {
        state.removeCommentLoading = true;
        state.removeCommentError = null;
      })
      .addCase(removeComment.fulfilled, (state, { payload }) => {
        state.removeCommentDone = true;
        const post = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        post.Comments = post.Comments.filter((v) => v.id !== payload.CommentId);
      })
      .addCase(removeComment.rejected, (state, { payload }) => {
        state.removeCommentError = payload;
      })

      .addCase(editComment.pending, (state) => {
        state.editCommentLoading = true;
        state.editCommentError = null;
      })
      .addCase(editComment.fulfilled, (state, { payload }) => {
        state.editCommentDone = true;
        const post = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        const comment = post.Comments.find((v) => v.id === payload.CommentId);
        comment.content = payload.content;
      })
      .addCase(editComment.rejected, (state, { payload }) => {
        state.editCommentError = payload;
      })

      .addCase(prodComment.pending, (state) => {
        state.prodCommentLoading = true;
        state.prodCommentError = null;
      })
      .addCase(prodComment.fulfilled, (state, { payload }) => {
        state.prodCommentDone = true;
        const post = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        const comment = post.Comments.find((v) => v.id === payload.CommentId);
        comment.CommentProdders.push({ id: payload.UserId });
      })
      .addCase(prodComment.rejected, (state, { payload }) => {
        state.prodCommentError = payload;
      })

      .addCase(unprodComment.pending, (state) => {
        state.unprodCommentLoading = true;
        state.unprodCommentError = null;
      })
      .addCase(unprodComment.fulfilled, (state, { payload }) => {
        state.unprodCommentDone = true;
        const post = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        const comment = post.Comments.find((v) => v.id === payload.CommentId);
        comment.CommentProdders = comment.CommentProdders.filter(
          (v) => v.id !== payload.UserId
        );
      })
      .addCase(unprodComment.rejected, (state, { payload }) => {
        state.unprodCommentError = payload;
      })

      .addDefaultCase((state) => state);
  },
});

export const {
  loadPrevPostImages,
  cancelPostImage,
  cancelAllPostImages,
  flushMainPosts,
} = postSlice.actions;
export default postSlice;
