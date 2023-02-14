import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
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

function* watchUploadPost() {
  yield takeLatest(UPLOAD_POST_REQUEST, uploadPost);
}
function* watchUploadPostImages() {
  yield takeLatest(UPLOAD_POST_IMAGES_REQUEST, uploadPostImages);
}

export default function* postSaga() {
  yield all([fork(watchUploadPost), fork(watchUploadPostImages)]);
}