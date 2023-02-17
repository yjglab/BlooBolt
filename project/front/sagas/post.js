import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  EDIT_POST_FAILURE,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  PROD_POST_FAILURE,
  PROD_POST_REQUEST,
  PROD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  UNPROD_POST_FAILURE,
  UNPROD_POST_REQUEST,
  UNPROD_POST_SUCCESS,
  UPLOAD_COMMENT_FAILURE,
  UPLOAD_COMMENT_REQUEST,
  UPLOAD_COMMENT_SUCCESS,
  UPLOAD_POST_FAILURE,
  UPLOAD_POST_IMAGES_FAILURE,
  UPLOAD_POST_IMAGES_REQUEST,
  UPLOAD_POST_IMAGES_SUCCESS,
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
} from "../reducers/post";
import { ADD_POST_TO_ME } from "../reducers/user";

function uploadPostAPI(data) {
  return axios.post("/post", data);
}
function* uploadPost(action) {
  try {
    const result = yield call(uploadPostAPI, action.data);
    yield put({
      type: UPLOAD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function uploadPostImagesAPI(data) {
  return axios.post("/post/images", data);
}
function* uploadPostImages(action) {
  try {
    const result = yield call(uploadPostImagesAPI, action.data);
    console.log(result.data);
    yield put({
      type: UPLOAD_POST_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_POST_IMAGES_FAILURE,
      error: error.response.data,
    });
  }
}

function prodPostAPI(data) {
  return axios.patch(`/post/${data.postId}/prod`, data);
}
function* prodPost(action) {
  try {
    const result = yield call(prodPostAPI, action.data);
    yield put({
      type: PROD_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: PROD_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function unprodPostAPI(data) {
  return axios.delete(`/post/${data.postId}/prod`, data);
}
function* unprodPost(action) {
  try {
    const result = yield call(unprodPostAPI, action.data);
    yield put({
      type: UNPROD_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UNPROD_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function editPostAPI(data) {
  return axios.patch(`/post/${data.PostId}`, data);
}
function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.data);
    yield put({
      type: EDIT_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: EDIT_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function uploadCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}
function* uploadComment(action) {
  try {
    const result = yield call(uploadCommentAPI, action.data);
    yield put({
      type: UPLOAD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchUploadPost() {
  yield takeLatest(UPLOAD_POST_REQUEST, uploadPost);
}
function* watchUploadPostImages() {
  yield takeLatest(UPLOAD_POST_IMAGES_REQUEST, uploadPostImages);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchProdPost() {
  yield takeLatest(PROD_POST_REQUEST, prodPost);
}
function* watchUnprodPost() {
  yield takeLatest(UNPROD_POST_REQUEST, unprodPost);
}
function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editPost);
}
function* watchUploadComment() {
  yield takeLatest(UPLOAD_COMMENT_REQUEST, uploadComment);
}

export default function* postSaga() {
  yield all([
    fork(watchUploadPost),
    fork(watchUploadPostImages),
    fork(watchProdPost),
    fork(watchUnprodPost),
    fork(watchEditPost),
    fork(watchRemovePost),
    fork(watchUploadComment),
  ]);
}
