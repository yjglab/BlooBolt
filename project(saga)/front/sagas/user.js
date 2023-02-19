import axios from "axios";
import Router from "next/router";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  STATUS_ON,
  STATUS_OFF,
  CANCEL_ALL_POST_IMAGES,
} from "../reducers/post";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  TRACE_FAILURE,
  TRACE_REQUEST,
  TRACE_SUCCESS,
  UNTRACE_FAILURE,
  UNTRACE_REQUEST,
  UNTRACE_SUCCESS,
} from "../reducers/user";

function signUpAPI(data) {
  return axios.post("/user/signup", data);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
    Router.push("/login");
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
    yield put({
      type: STATUS_ON,
      data: result.data.id,
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
  return axios.post("/user/logout");
}

function* logOut(action) {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
    yield put({
      type: CANCEL_ALL_POST_IMAGES,
    });
    yield put({
      type: STATUS_OFF,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

function traceAPI(data) {
  return axios.patch(`/user/${data}/trace`);
}

function* trace(action) {
  try {
    const result = yield call(traceAPI, action.data);
    yield put({
      type: TRACE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: TRACE_FAILURE,
      error: error.response.data,
    });
  }
}

function untraceAPI(data) {
  return axios.delete(`/user/${data}/trace`);
}

function* untrace(action) {
  try {
    const result = yield call(untraceAPI, action.data);
    yield put({
      type: UNTRACE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UNTRACE_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchTrace() {
  yield takeLatest(TRACE_REQUEST, trace);
}
function* watchUntrace() {
  yield takeLatest(UNTRACE_REQUEST, untrace);
}

export default function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchTrace),
    fork(watchUntrace),
  ]);
}
