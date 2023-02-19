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

// import { HYDRATE } from "next-redux-wrapper";
// import user from "./user";
// import post from "./post";
// import global from "./global";
// import { combineReducers } from "redux";

// const rootReducer = (state, action) => {
//   switch (action.type) {
//     case HYDRATE:
//       return action.payload;
//     default: {
//       const combineReducer = combineReducers({
//         user,
//         post,
//         global,
//       });
//       return combineReducer(state, action);
//     }
//   }
// };

// export default rootReducer;
