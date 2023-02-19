import { combineReducers } from "redux";
import globalSlice from "./globalSlice";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import axios from "axios";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

const rootReducer = combineReducers({
  global: globalSlice.reducer,
  user: userSlice.reducer,
  post: postSlice.reducer,
});

export default rootReducer;
