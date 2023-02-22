import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import globalSlice from "./globalSlice";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import axios from "axios";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        global: globalSlice.reducer,
        user: userSlice.reducer,
        post: postSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
