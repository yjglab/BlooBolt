import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Router from "next/router";

export const initialState = {
  loadMeLoading: false,
  loadMeDone: false,
  loadMeError: null,

  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,

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

  findPasswordLoading: false,
  findPasswordDone: false,
  findPasswordError: null,

  signUpEmailAuthLoading: false,
  signUpEmailAuthDone: false,
  signUpEmailAuthError: null,

  changePasswordLoading: false,
  changePasswordDone: false,
  changePasswordError: null,

  socialSetupLoading: false,
  socialSetupDone: false,
  socialSetupError: null,

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
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/user/${info.UserId}/changepw`, info);
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const socialSetup = createAsyncThunk(
  "user/socialSetup",
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/user/${info.socialId}/social-setup`,
        info
      );
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
      .addCase(loadMe.pending, (state) => {
        state.loadMeLoading = true;
        state.loadMeError = null;
      })
      .addCase(loadMe.fulfilled, (state, { payload }) => {
        state.loadMeLoading = false;
        state.loadMeDone = true;
        state.me = payload;
      })
      .addCase(loadMe.rejected, (state, { payload }) => {
        state.loadMeLoading = false;
        state.loadMeError = payload;
      })

      .addCase(loadUser.pending, (state) => {
        state.loadUserLoading = true;
        state.loadUserError = null;
      })
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.loadUserLoading = false;
        state.loadUserDone = true;
        state.user = payload;
      })
      .addCase(loadUser.rejected, (state, { payload }) => {
        state.loadUserLoading = false;
        state.loadUserError = payload;
      })

      .addCase(signUp.pending, (state) => {
        state.signUpLoading = true;
        state.signUpError = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.signUpLoading = false;
        state.signUpDone = true;
        Router.push("/login");
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.signUpLoading = false;
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
      })

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
      })

      .addCase(uploadUserAvatar.pending, (state) => {
        state.uploadUserAvatarLoading = true;
        state.uploadUserAvatarError = null;
      })
      .addCase(uploadUserAvatar.fulfilled, (state, { payload }) => {
        state.uploadUserAvatarLoading = false;
        state.uploadUserAvatarDone = true;
        state.me.avatar = payload;
      })
      .addCase(uploadUserAvatar.rejected, (state, { payload }) => {
        state.uploadUserAvatarLoading = false;
        state.uploadUserAvatarError = payload;
      })

      .addCase(changeMyPublicInfo.pending, (state) => {
        state.changeMyPublicInfoLoading = true;
        state.changeMyPublicInfoError = null;
      })
      .addCase(changeMyPublicInfo.fulfilled, (state, { payload }) => {
        state.changeMyPublicInfoLoading = false;
        state.changeMyPublicInfoDone = true;
        state.me.username = payload.username;
        state.me.class = payload.class;
        state.me.role = payload.role;
        state.me.country = payload.country;
        state.me.website = payload.website;
        state.me.about = payload.about;
        state.me.class = payload.class;
      })
      .addCase(changeMyPublicInfo.rejected, (state, { payload }) => {
        state.changeMyPublicInfoLoading = false;
        state.changeMyPublicInfoError = payload;
      })

      .addCase(changeMyPersonalInfo.pending, (state) => {
        state.changeMyPersonalInfoLoading = true;
        state.changeMyPersonalInfoError = null;
      })
      .addCase(changeMyPersonalInfo.fulfilled, (state, { payload }) => {
        state.changeMyPersonalInfoLoading = false;
        state.changeMyPersonalInfoDone = true;
        state.me.realname = payload.realname;
        state.me.address = payload.address;
      })
      .addCase(changeMyPersonalInfo.rejected, (state, { payload }) => {
        state.changeMyPersonalInfoLoading = false;
        state.changeMyPersonalInfoError = payload;
      })

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
      })

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
      })

      .addCase(reportUser.pending, (state) => {
        state.reportUserLoading = true;
        state.reportUserError = null;
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

      .addCase(changePassword.pending, (state) => {
        state.changePasswordLoading = true;
        state.changePasswordError = null;
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.changePasswordLoading = false;
        state.changePasswordDone = true;
        state.supportMessage = payload.message;
        Router.push(`/profile/${state.me.username}`);
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.changePasswordLoading = false;
        state.changePasswordError = payload;
      })

      .addCase(socialSetup.pending, (state) => {
        state.socialSetupLoading = true;
        state.socialSetupError = null;
      })
      .addCase(socialSetup.fulfilled, (state, { payload }) => {
        state.socialSetupLoading = false;
        state.socialSetupDone = true;
        state.me.class = payload.class;
        state.me.username = payload.username;
        Router.push(`/square`);
      })
      .addCase(socialSetup.rejected, (state, { payload }) => {
        state.socialSetupLoading = false;
        state.socialSetupError = payload;
      })

      .addDefaultCase((state) => state);
  },
});

// export const {} = userSlice.actions;
export default userSlice;
