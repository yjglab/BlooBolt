import axios from "axios";
import { all, call, fork, put, takeLatest, throttle } from "redux-saga/effects";
import {
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
} from "../reducers/post";

function loadPostsAPI(lastPostId) {
  return axios.get(`/posts?lastPostId=${lastPostId || 0}`);
}
function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function loadHashtagPostsAPI(tag, lastPostId) {
  return axios.get(
    `/hashtag/${encodeURIComponent(tag)}?lastPostId=${lastPostId || 0}`
  );
}
function* loadHashtagPosts(action) {
  try {
    const result = yield call(
      loadHashtagPostsAPI,
      action.data.tag,
      action.data.lastPostId
    );
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadHashtagPosts() {
  yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

export default function* postsSaga() {
  yield all([fork(watchLoadPosts), fork(watchLoadHashtagPosts)]);
}
