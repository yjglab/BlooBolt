import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../reducers";
import logger from "redux-logger";

const makeStore = () => {
  const middleware = getDefaultMiddleware();
  if (process.env.NODE_ENV !== "production") {
    // middleware.push(logger);
  }
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== "production",
    // preloadedState: serverState,
  });

  return store;
};

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

export default wrapper;
