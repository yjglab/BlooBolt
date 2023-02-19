import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  notice: {
    title: null,
    content: null,
    type: null,
  },
  noticeCalled: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    openNotice(state, { payload }) {
      state.noticeCalled = true;
      state.notice.title = payload.title;
      state.notice.content = payload.content;
      state.notice.type = payload.type;
    },
    closeNotice(state, { payload }) {
      state.noticeCalled = false;
      state.notice.title = null;
      state.notice.content = null;
      state.notice.null = null;
    },
  },
  extraReducers: {},
});

export const { openNotice, closeNotice } = globalSlice.actions;
export default globalSlice;
