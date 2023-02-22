import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { uploadPost } from "./postSlice";

export const initialState = {
  signUpDone: false,
  signUpError: null,
  logInDone: false,
  logInError: null,
  logOutDone: false,
  logOutError: null,
  traceDone: false,
  traceError: null,
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
export const changeMyPersonalInfo = createAsyncThunk(
  "user/changeMyPersonalInfo",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/user/${info.userId}/info/personal`,
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
export const reportUser = createAsyncThunk(
  "user/reportUser",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post(`/user/${info.userId}/report`, info);
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
    builder.addCase(uploadPost.fulfilled, (state, { payload }) => {
      state.me.Posts.push(payload);
      if (state.me.rank === 0) state.me.rank = 6;
    }); // 나중에 제거

    builder
      .addCase(signUp.fulfilled, (state) => {
        state.signUpDone = true;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.signUpDone = false;
        state.signUpError = payload;
      });
    builder
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.logInDone = true;
        state.me = payload;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.logInError = payload;
      });
    builder
      .addCase(logOut.fulfilled, (state) => {
        state.logOutDone = true;
        state.me = null;
      })
      .addCase(logOut.rejected, (state, { payload }) => {
        state.logOutError = payload;
      });
    builder
      .addCase(uploadUserAvatar.fulfilled, (state, { payload }) => {
        state.uploadUserAvatarDone = true;
        state.me.avatar = payload;
      })
      .addCase(uploadUserAvatar.rejected, (state, { payload }) => {
        state.uploadUserAvatarError = payload;
      });
    builder
      .addCase(changeMyPublicInfo.fulfilled, (state, { payload }) => {
        state.changeMyPublicInfoDone = true;
        state.me.username = payload.username;
        state.me.role = payload.role;
        state.me.country = payload.country;
        state.me.website = payload.website;
        state.me.about = payload.about;
      })
      .addCase(changeMyPublicInfo.rejected, (state, { payload }) => {
        state.changeMyPublicInfoError = payload;
      });
    builder
      .addCase(changeMyPersonalInfo.fulfilled, (state, { payload }) => {
        state.changeMyPersonalInfoDone = true;
        state.me.realname = payload.realname;
        state.me.address = payload.address;
      })
      .addCase(changeMyPersonalInfo.rejected, (state, { payload }) => {
        state.changeMyPersonalInfoError = payload;
      });
    builder
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
    builder
      .addCase(reportUser.fulfilled, (state, { payload }) => {
        state.reportUserLoading = false;
        state.reportUserDone = true;
      })
      .addCase(reportUser.rejected, (state, { payload }) => {
        state.reportUserLoading = false;
        state.reportUserError = payload;
      });
  },
});

const { actions, reducer } = userSlice;
export const { addPostToMe } = userSlice.actions;
export default userSlice;
