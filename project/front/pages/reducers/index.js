import { HYDRATE } from "next-redux-wrapper";
import user from "./user";
import { combineReducers } from "redux";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
