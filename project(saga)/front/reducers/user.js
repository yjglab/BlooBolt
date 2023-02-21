import produce from "immer";

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

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";

export const TRACE_REQUEST = "TRACE_REQUEST";
export const TRACE_SUCCESS = "TRACE_SUCCESS";
export const TRACE_FAILURE = "TRACE_FAILURE";

export const UNTRACE_REQUEST = "UNTRACE_REQUEST";
export const UNTRACE_SUCCESS = "UNTRACE_SUCCESS";
export const UNTRACE_FAILURE = "UNTRACE_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;

      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpDone = false; //
        draft.signUpError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;

        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      case TRACE_REQUEST:
        draft.traceLoading = true;
        draft.traceDone = false;
        draft.traceError = null;
        break;
      case TRACE_SUCCESS:
        draft.traceLoading = false;
        draft.traceDone = true;
        draft.me.Tracings.push(action.data);
        break;
      case TRACE_FAILURE:
        draft.traceLoading = false;
        draft.traceError = action.error;
        break;
      case UNTRACE_REQUEST:
        draft.untraceLoading = true;
        draft.untraceDone = false;
        draft.untraceError = null;
        break;
      case UNTRACE_SUCCESS:
        draft.untraceLoading = false;
        draft.untraceDone = true;
        draft.me.Tracings = draft.me.Tracings.filter(
          (v) => v.id !== action.data.UserId
        );
        break;
      case UNTRACE_FAILURE:
        draft.untraceLoading = false;
        draft.untraceError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;