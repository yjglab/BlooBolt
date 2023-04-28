import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers, AnyAction } from 'redux';
import global, { GlobalState } from './global';
import post, { PostState } from './post';
import user, { UserState } from './user';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export interface ReducerStates {
  global: GlobalState;
  user: UserState;
  post: PostState;
}

const combinedReducer = combineReducers({
  global: global.reducer,
  user: user.reducer,
  post: post.reducer,
});

type AppReducer = typeof combinedReducer;

const rootReducer: AppReducer = (state: ReducerStates | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      return combinedReducer(state, action);
    }
  }
};
export default rootReducer;
