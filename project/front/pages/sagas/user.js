import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { vtlUser1 } from "../../db";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from "../reducers/user";

function logInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    yield delay(1000);
    // const result = yield call(logInAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS,
      data: vtlUser1,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}
function logOutAPI() {
  return axios.post("/user/logOut");
}

function* logOut() {
  try {
    yield delay(1000);
    // const result = yield call(logInAPI, action.data)
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
