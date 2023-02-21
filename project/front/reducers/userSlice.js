import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { uploadPost } from "./postSlice";

export const initialState = {
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  traceLoading: false,
  traceDone: false,
  traceError: null,
  untraceLoading: false,
  untraceDone: false,
  untraceError: null,

  me: null,
};

export const signUp = createAsyncThunk(
  "user/signUp",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post("/user/signup", info);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const logIn = createAsyncThunk("user/logIn", async (info, thunkAPI) => {
  try {
    const { data } = await axios.post("/user/login", info);
    return data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const logOut = createAsyncThunk(
  "user/logOut",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post("/user/logout");
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const uploadUserAvatar = createAsyncThunk(
  "user/uploadUserAvatar",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post(`/user/avatar`, info);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const changeMyPublicInfo = createAsyncThunk(
  "user/changeMyPublicInfo",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/user/${info.userId}/info/public`,
        info
      );
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const trace = createAsyncThunk("user/trace", async (info, thunkAPI) => {
  try {
    const { data } = await axios.patch(`/user/${info}/trace`);
    return data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const untrace = createAsyncThunk(
  "user/untrace",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/user/${info}/trace`);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addPostToMe(state, { payload }) {
      state.me.Posts.unshift({
        id: payload.id,
        content: payload.content,
        prodded: payload.prodded,
        comments: payload.comments,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPost.pending, (state) => {
        state.uploadPostLoading = true;
        state.uploadPostError = null;
      })
      .addCase(uploadPost.fulfilled, (state, { payload }) => {
        state.uploadPostLoading = false;
        state.uploadPostDone = true;
        state.me.Posts.push(payload);
      })
      .addCase(uploadPost.rejected, (state, { payload }) => {
        state.uploadPostLoading = false;
        state.uploadPostError = payload;
      });

    builder
      .addCase(signUp.pending, (state) => {
        state.signUpLoading = true;
        state.signUpError = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.signUpLoading = false;
        state.signUpDone = true;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.signUpLoading = false;
        state.signUpDone = false;
        state.signUpError = payload;
      });
    builder
      .addCase(logIn.pending, (state) => {
        state.logInLoading = true;
        state.logInError = null;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.logInLoading = false;
        state.logInDone = true;
        state.me = payload;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.logInLoading = false;
        state.logInError = payload;
      });
    builder
      .addCase(logOut.pending, (state) => {
        state.logOutLoading = true;
        state.logOutError = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.logOutLoading = false;
        state.logOutDone = true;
        state.me = null;
      })
      .addCase(logOut.rejected, (state, { payload }) => {
        state.logOutLoading = false;
        state.logOutError = payload;
      });
    builder
      .addCase(uploadUserAvatar.pending, (state) => {
        state.uploadUserAvatarLoading = true;
        state.uploadUserAvatarError = null;
      })
      .addCase(uploadUserAvatar.fulfilled, (state, { payload }) => {
        state.uploadUserAvatarLoading = false;
        state.uploadUserAvatarDone = true;
        state.me.Userboard.avatar = payload;
      })
      .addCase(uploadUserAvatar.rejected, (state, { payload }) => {
        state.uploadUserAvatarLoading = false;
        state.uploadUserAvatarError = payload;
      });
    builder
      .addCase(changeMyPublicInfo.pending, (state) => {
        state.changeMyPublicInfoLoading = true;
        state.changeMyPublicInfoError = null;
      })
      .addCase(changeMyPublicInfo.fulfilled, (state, { payload }) => {
        state.changeMyPublicInfoLoading = false;
        state.changeMyPublicInfoDone = true;
        console.log(payload);
        state.me.username = payload.username;
        state.me.role = payload.role;
        state.me.country = payload.country;
        state.me.website = payload.website;
        state.me.about = payload.about;
      })
      .addCase(changeMyPublicInfo.rejected, (state, { payload }) => {
        state.changeMyPublicInfoLoading = false;
        state.changeMyPublicInfoError = payload;
      });
    builder
      .addCase(trace.pending, (state) => {
        state.traceLoading = true;
        state.traceError = null;
      })
      .addCase(trace.fulfilled, (state, { payload }) => {
        state.traceLoading = false;
        state.traceDone = true;
        state.me.Tracings.push(payload);
      })
      .addCase(trace.rejected, (state, { payload }) => {
        state.traceLoading = false;
        state.traceError = payload;
      });
    builder
      .addCase(untrace.pending, (state) => {
        state.untraceLoading = true;
        state.untraceError = null;
      })
      .addCase(untrace.fulfilled, (state, { payload }) => {
        state.untraceLoading = false;
        state.untraceDone = true;
        state.me.Tracings = state.me.Tracings.filter(
          (v) => v.id !== payload.UserId
        );
      })
      .addCase(untrace.rejected, (state, { payload }) => {
        state.untraceLoading = false;
        state.untraceError = payload;
      });
  },
});

export const { addPostToMe } = userSlice.actions;
export default userSlice;
