import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Router from "next/router";
import { uploadPost } from "./postSlice";

export const initialState = {
  loadMeDone: false,
  loadMeError: null,
  loadUserDone: false,
  loadUserError: null,
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
  findPasswordLoading: false,
  findPasswordDone: false,
  findPasswordError: null,
  signUpEmailAuthLoading: false,
  signUpEmailAuthDone: false,
  signUpEmailAuthError: null,

  me: null,
  user: null,
  supportMessage: null,
};

export const loadMe = createAsyncThunk(
  "user/loadMe",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.get("/user");
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/user/${encodeURIComponent(info.username)}`
      );
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
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
export const signUpEmailAuth = createAsyncThunk(
  "user/signUpEmailAuth",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post(`/user/signup/auth`, info);
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
export const findPassword = createAsyncThunk(
  "user/findPassword",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post(`/user/support/password`, info);
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
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(loadMe.fulfilled, (state, { payload }) => {
        state.loadMeDone = true;
        state.me = payload;
      })
      .addCase(loadMe.rejected, (state, { payload }) => {
        state.loadMeDone = false;
        state.loadMeError = payload;
      })
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.loadUserDone = true;
        state.user = payload;
      })
      .addCase(loadUser.rejected, (state, { payload }) => {
        state.loadUserDone = false;
        state.loadUserError = payload;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.signUpDone = true;
        Router.push("/login");
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.signUpDone = false;
        state.signUpError = payload;
      })
      .addCase(signUpEmailAuth.pending, (state) => {
        state.signUpEmailAuthLoading = true;
        state.signUpEmailAuthError = null;
      })
      .addCase(signUpEmailAuth.fulfilled, (state, { payload }) => {
        state.signUpEmailAuthLoading = false;
        state.signUpEmailAuthDone = true;
        state.supportMessage = payload.code;
      })
      .addCase(signUpEmailAuth.rejected, (state, { payload }) => {
        state.signUpEmailAuthLoading = false;
        state.signUpEmailAuthError = payload;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.logInDone = true;
        state.me = payload;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.logInError = payload;
      })

      .addCase(logOut.fulfilled, (state) => {
        state.logOutDone = true;
        state.me = null;
      })
      .addCase(logOut.rejected, (state, { payload }) => {
        state.logOutError = payload;
      })

      .addCase(uploadUserAvatar.fulfilled, (state, { payload }) => {
        state.uploadUserAvatarDone = true;
        state.me.avatar = payload;
      })
      .addCase(uploadUserAvatar.rejected, (state, { payload }) => {
        state.uploadUserAvatarError = payload;
      })

      .addCase(changeMyPublicInfo.fulfilled, (state, { payload }) => {
        state.changeMyPublicInfoDone = true;
        state.me.username = payload.username;
        state.me.role = payload.role;
        state.me.country = payload.country;
        state.me.website = payload.website;
        state.me.about = payload.about;
        state.me.class = payload.class;
      })
      .addCase(changeMyPublicInfo.rejected, (state, { payload }) => {
        state.changeMyPublicInfoError = payload;
      })

      .addCase(changeMyPersonalInfo.fulfilled, (state, { payload }) => {
        state.changeMyPersonalInfoDone = true;
        state.me.realname = payload.realname;
        state.me.address = payload.address;
      })
      .addCase(changeMyPersonalInfo.rejected, (state, { payload }) => {
        state.changeMyPersonalInfoError = payload;
      })

      .addCase(trace.fulfilled, (state, { payload }) => {
        state.traceLoading = false;
        state.traceDone = true;
        state.me.Tracings.push(payload);
      })
      .addCase(trace.rejected, (state, { payload }) => {
        state.traceLoading = false;
        state.traceError = payload;
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
      })

      .addCase(reportUser.fulfilled, (state) => {
        state.reportUserLoading = false;
        state.reportUserDone = true;
      })
      .addCase(reportUser.rejected, (state, { payload }) => {
        state.reportUserLoading = false;
        state.reportUserError = payload;
      })

      .addCase(findPassword.pending, (state) => {
        state.findPasswordLoading = true;
        state.findPasswordError = null;
      })
      .addCase(findPassword.fulfilled, (state, { payload }) => {
        state.findPasswordLoading = false;
        state.findPasswordDone = true;
        state.supportMessage = payload.message;
      })
      .addCase(findPassword.rejected, (state, { payload }) => {
        state.findPasswordLoading = false;
        state.findPasswordError = payload;
      })

      .addDefaultCase((state) => state);
  },
});

// export const {} = userSlice.actions;
export default userSlice;
