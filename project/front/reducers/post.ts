import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import Post from '../typings/post';

export interface PostState {
  mainPosts: Post[];
  solePost: Post | null;
  recommendPosts: Post[];
  recommendQuestionPosts: Post[];
  postImagePaths: string[];
  loadMorePosts: boolean;

  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: any;

  loadPostsByHashtagLoading: boolean;
  loadPostsByHashtagDone: boolean;
  loadPostsByHashtagError: any;

  loadPostsByKeywordLoading: boolean;
  loadPostsByKeywordDone: boolean;
  loadPostsByKeywordError: any;

  loadSolePostLoading: boolean;
  loadSolePostDone: boolean;
  loadSolePostError: any;

  uploadPostLoading: boolean;
  uploadPostDone: boolean;
  uploadPostError: any;

  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: any;

  removePostCompletelyLoading: boolean;
  removePostCompletelyDone: boolean;
  removePostCompletelyError: any;

  revertPostLoading: boolean;
  revertPostDone: boolean;
  revertPostError: any;

  uploadPostImagesLoading: boolean;
  uploadPostImagesDone: boolean;
  uploadPostImagesError: any;

  prodPostLoading: boolean;
  prodPostDone: boolean;
  prodPostError: any;

  unprodPostLoading: boolean;
  unprodPostDone: boolean;
  unprodPostError: any;

  editPostLoading: boolean;
  editPostDone: boolean;
  editPostError: any;

  uploadCommentLoading: boolean;
  uploadCommentDone: boolean;
  uploadCommentError: any;

  editCommentLoading: boolean;
  editCommentDone: boolean;
  editCommentError: any;

  removeCommentLoading: boolean;
  removeCommentDone: boolean;
  removeCommentError: any;

  prodCommentLoading: boolean;
  prodCommentDone: boolean;
  prodCommentError: any;

  unprodCommentLoading: boolean;
  unprodCommentDone: boolean;
  unprodCommentError: any;

  doneQuestionPostLoading: boolean;
  doneQuestionPostDone: boolean;
  doneQuestionPostError: any;
}
export const initialState: PostState = {
  mainPosts: [],
  solePost: null,
  recommendPosts: [],
  recommendQuestionPosts: [],
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

  doneQuestionPostLoading: false,
  doneQuestionPostDone: false,
  doneQuestionPostError: null,
};
interface LoadPostsInfo {
  lastPostId?: number;
  tag?: string;
  keyword?: string;
  postId?: number;
  postUnique?: string;
}
export const loadPosts = createAsyncThunk('posts/loadPosts', async (info: LoadPostsInfo, thunkAPI) => {
  try {
    const { data } = await axios.post(`/posts?lastPostId=${info.lastPostId || 0}`, info);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const loadPostsByHashtag = createAsyncThunk(
  'posts/loadPostsByHashtag',
  async (info: LoadPostsInfo, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `/hashtag/${encodeURIComponent(info.tag || '')}?lastPostId=${info.lastPostId || 0}`,
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const loadPostsByKeyword = createAsyncThunk(
  'posts/loadPostsByKeyword',
  async (info: LoadPostsInfo, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `/posts/keyword/${encodeURIComponent(info.keyword || '')}?lastPostId=${info.lastPostId || 0}`,
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);
interface LoadSolePostInfo {
  postId: string;
}
export const loadSolePost = createAsyncThunk(
  'post/loadSolePost',
  async (info: LoadSolePostInfo, thunkAPI) => {
    try {
      const { data } = await axios.get(`/post/${info.postId}/detail`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const uploadPostImages = createAsyncThunk(
  'post/uploadPostImages',
  async (info: FormData, thunkAPI) => {
    try {
      const { data } = await axios.post(`/post/images`, info);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);
interface UploadPostInfo {
  postUnique: string;
  postClass: string;
  topic: string;
  content: string;
  postImagePaths: string[];
}
export const uploadPost = createAsyncThunk('post/uploadPost', async (info: UploadPostInfo, thunkAPI) => {
  try {
    const { data } = await axios.post(`/post`, info);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const removePost = createAsyncThunk('post/removePost', async (info: number, thunkAPI) => {
  try {
    const { data } = await axios.delete(`/post/${info}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    throw error;
  }
});
export const removePostCompletely = createAsyncThunk(
  'post/removePostCompletely',
  async (info: number, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/post/${info}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);
export const revertPost = createAsyncThunk('post/revertPost', async (info: number, thunkAPI) => {
  try {
    const { data } = await axios.patch(`/post/${info}/revert`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    throw error;
  }
});
interface ProdPostInfo {
  postId: number;
  postUserId: number;
}
export const prodPost = createAsyncThunk('post/prodPost', async (info: ProdPostInfo, thunkAPI) => {
  try {
    const { data } = await axios.patch(`/post/${info.postId}/prod`, info);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    throw error;
  }
});
export const unprodPost = createAsyncThunk('post/unprodPost', async (info: ProdPostInfo, thunkAPI) => {
  try {
    const { data } = await axios.delete(`/post/${info.postId}/prod`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    throw error;
  }
});
interface EditPostInfo {
  PostId: number;
  postClass: string;
  topic: string;
  content: string;
  postImagePaths: string[];
}
export const editPost = createAsyncThunk('post/editPost', async (info: EditPostInfo, thunkAPI) => {
  try {
    const { data } = await axios.patch(`/post/${info.PostId}`, info);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    throw error;
  }
});
interface UploadCommentInfo {
  content: string;
  postId: number;
  userId: number;
}
export const uploadComment = createAsyncThunk(
  'post/uploadComment',
  async (info: UploadCommentInfo, thunkAPI) => {
    try {
      const { data } = await axios.post(`/post/${info.postId}/comment`, info);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);
interface EditCommentInfo {
  content: string;
  postId: number;
  commentId: number;
}
export const editComment = createAsyncThunk('post/editComment', async (info: EditCommentInfo, thunkAPI) => {
  try {
    const { data } = await axios.patch(`/post/${info.postId}/comment/${info.commentId}`, info);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    throw error;
  }
});
interface RemoveCommentInfo {
  postId: number;
  commentId: number;
}
export const removeComment = createAsyncThunk(
  'post/removeComment',
  async (info: RemoveCommentInfo, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/post/${info.postId}/comment/${info.commentId}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);
interface ProdCommentInfo {
  postId: number;
  commentId: number;
  commentUserId?: number;
}
export const prodComment = createAsyncThunk('post/prodComment', async (info: ProdCommentInfo, thunkAPI) => {
  try {
    const { data } = await axios.patch(`/post/${info.postId}/comment/${info.commentId}/prod`, info);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    throw error;
  }
});
export const unprodComment = createAsyncThunk(
  'post/unprodComment',
  async (info: ProdCommentInfo, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/post/${info.postId}/comment/${info.commentId}/prod`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const doneQuestionPost = createAsyncThunk(
  'post/doneQuestionPost',
  async (info: { postId: number }, thunkAPI) => {
    try {
      const { data } = await axios.post(`/post/${info.postId}/doneQuestion`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    flushMainPosts(state) {
      state.mainPosts = [];
    },
    loadPrevPostImages(state, action: PayloadAction<string[]>) {
      state.postImagePaths = action.payload;
    },
    cancelPostImage(state, action: PayloadAction<number>) {
      state.postImagePaths = state.postImagePaths.filter((v, i) => i !== action.payload);
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
        state.mainPosts = state.mainPosts.concat(payload.loadedPosts);
        state.recommendPosts = payload.loadedRecommendPosts;
        state.recommendQuestionPosts = payload.loadedRecommendQuestionPosts;

        state.loadMorePosts = payload.loadedPosts.length === 12;
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
        state.loadSolePostLoading = false;
        state.loadSolePostDone = true;
        state.solePost = payload;
      })
      .addCase(loadSolePost.rejected, (state, { payload }) => {
        state.loadSolePostLoading = false;
        state.loadSolePostError = payload;
      })

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
      })

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
      })

      .addCase(removePost.pending, (state) => {
        state.removePostLoading = true;
        state.removePostError = null;
      })
      .addCase(removePost.fulfilled, (state, { payload }) => {
        state.removePostLoading = false;
        state.removePostDone = true;
        const targetPost = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        if (targetPost) targetPost.blinded = true;
      })
      .addCase(removePost.rejected, (state, { payload }) => {
        state.removePostLoading = false;
        state.removePostError = payload;
      })

      .addCase(removePostCompletely.pending, (state) => {
        state.removePostCompletelyLoading = true;
        state.removePostCompletelyError = null;
      })
      .addCase(removePostCompletely.fulfilled, (state, { payload }) => {
        state.removePostCompletelyLoading = false;
        state.removePostCompletelyDone = true;
        state.mainPosts = state.mainPosts.filter((v) => v.id !== payload.PostId);
      })
      .addCase(removePostCompletely.rejected, (state, { payload }) => {
        state.removePostCompletelyLoading = false;
        state.removePostCompletelyError = payload;
      })

      .addCase(revertPost.pending, (state) => {
        state.revertPostLoading = true;
        state.revertPostError = null;
      })
      .addCase(revertPost.fulfilled, (state, { payload }) => {
        state.revertPostLoading = false;
        state.revertPostDone = true;
        const targetPost = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        if (targetPost) {
          targetPost.blinded = false;
          targetPost.reverted = true;
        }
      })
      .addCase(revertPost.rejected, (state, { payload }) => {
        state.revertPostLoading = false;
        state.revertPostError = payload;
      })

      .addCase(prodPost.pending, (state) => {
        state.prodPostLoading = true;
        state.prodPostError = null;
      })
      .addCase(prodPost.fulfilled, (state, { payload }) => {
        state.prodPostLoading = false;
        state.prodPostDone = true;
        const targetPost = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        if (targetPost) targetPost.PostProdders.push({ id: payload.UserId });
      })
      .addCase(prodPost.rejected, (state, { payload }) => {
        state.prodPostLoading = false;
        state.prodPostError = payload;
      })

      .addCase(unprodPost.pending, (state) => {
        state.unprodPostLoading = true;
        state.unprodPostError = null;
      })
      .addCase(unprodPost.fulfilled, (state, { payload }) => {
        state.unprodPostLoading = false;
        state.unprodPostDone = true;
        const targetPost = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        if (targetPost)
          targetPost.PostProdders = targetPost.PostProdders.filter((v) => v.id !== payload.UserId);
      })
      .addCase(unprodPost.rejected, (state, { payload }) => {
        state.unprodPostLoading = false;
        state.unprodPostError = payload;
      })

      .addCase(editPost.pending, (state) => {
        state.editPostLoading = true;
        state.editPostError = null;
      })
      .addCase(editPost.fulfilled, (state, { payload }) => {
        state.editPostLoading = false;
        state.editPostDone = true;
        const targetPost = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        if (targetPost) {
          targetPost.topic = payload.topic;
          targetPost.class = payload.class;
          targetPost.content = payload.content;
          targetPost.PostImages = payload.PostImages;
          targetPost.updatedAt = payload.updatedAt;
          targetPost.edited = true;
          state.postImagePaths = [];
        }
      })
      .addCase(editPost.rejected, (state, { payload }) => {
        state.editPostLoading = false;
        state.editPostError = payload;
      })

      .addCase(uploadComment.pending, (state) => {
        state.uploadCommentLoading = true;
        state.uploadCommentError = null;
      })
      .addCase(uploadComment.fulfilled, (state, { payload }) => {
        state.uploadCommentLoading = false;
        state.uploadCommentDone = true;
        const targetPost = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        if (targetPost) targetPost.Comments.push(payload);
      })
      .addCase(uploadComment.rejected, (state, { payload }) => {
        state.uploadCommentLoading = false;
        state.uploadCommentError = payload;
      })

      .addCase(removeComment.pending, (state) => {
        state.removeCommentLoading = true;
        state.removeCommentError = null;
      })
      .addCase(removeComment.fulfilled, (state, { payload }) => {
        state.removeCommentLoading = false;
        state.removeCommentDone = true;
        const targetPost = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        if (targetPost) targetPost.Comments = targetPost.Comments.filter((v) => v.id !== payload.CommentId);
      })
      .addCase(removeComment.rejected, (state, { payload }) => {
        state.removeCommentLoading = false;
        state.removeCommentError = payload;
      })

      .addCase(editComment.pending, (state) => {
        state.editCommentLoading = true;
        state.editCommentError = null;
      })
      .addCase(editComment.fulfilled, (state, { payload }) => {
        state.editCommentLoading = false;
        state.editCommentDone = true;
        const targetPost = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        if (targetPost) {
          const targetComment = targetPost.Comments.find((v) => v.id === payload.CommentId);
          if (targetComment) {
            targetComment.content = payload.content;
          }
        }
      })
      .addCase(editComment.rejected, (state, { payload }) => {
        state.editCommentLoading = false;
        state.editCommentError = payload;
      })

      .addCase(prodComment.pending, (state) => {
        state.prodCommentLoading = true;
        state.prodCommentError = null;
      })
      .addCase(prodComment.fulfilled, (state, { payload }) => {
        state.prodCommentLoading = false;
        state.prodCommentDone = true;
        const targetPost = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        if (targetPost) {
          const targetComment = targetPost.Comments.find((v) => v.id === payload.CommentId);
          if (targetComment) {
            targetComment.CommentProdders.push({ id: payload.UserId });
          }
        }
      })
      .addCase(prodComment.rejected, (state, { payload }) => {
        state.prodCommentLoading = false;
        state.prodCommentError = payload;
      })

      .addCase(unprodComment.pending, (state) => {
        state.unprodCommentLoading = true;
        state.unprodCommentError = null;
      })
      .addCase(unprodComment.fulfilled, (state, { payload }) => {
        state.unprodCommentLoading = false;
        state.unprodCommentDone = true;
        const targetPost = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        if (targetPost) {
          const targetComment = targetPost.Comments.find((v) => v.id === payload.CommentId);
          if (targetComment) {
            targetComment.CommentProdders = targetComment.CommentProdders.filter(
              (v) => v.id !== payload.UserId,
            );
          }
        }
      })
      .addCase(unprodComment.rejected, (state, { payload }) => {
        state.unprodCommentLoading = false;
        state.unprodCommentError = payload;
      })

      .addCase(doneQuestionPost.pending, (state) => {
        state.doneQuestionPostLoading = true;
        state.doneQuestionPostError = null;
      })
      .addCase(doneQuestionPost.fulfilled, (state, { payload }) => {
        state.doneQuestionPostLoading = false;
        state.doneQuestionPostDone = true;
        const targetPost = state.solePost
          ? state.solePost
          : state.mainPosts.find((v) => v.id === payload.PostId);
        if (targetPost) targetPost.class = payload.PostClass;
      })
      .addCase(doneQuestionPost.rejected, (state, { payload }) => {
        state.doneQuestionPostLoading = false;
        state.doneQuestionPostError = payload;
      })

      .addDefaultCase((state) => state);
  },
});

export const { loadPrevPostImages, cancelPostImage, cancelAllPostImages, flushMainPosts } = post.actions;
export default post;
