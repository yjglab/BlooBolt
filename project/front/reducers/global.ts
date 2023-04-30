import { Draft, createSlice } from '@reduxjs/toolkit';

interface Notice {
  content: string | null;
  type: number | null;
}
export interface GlobalState {
  notice: Notice;
  noticeCalled: boolean;
}

export const initialState: GlobalState = {
  notice: {
    content: null,
    type: null,
  },
  noticeCalled: false,
};

export const global = createSlice({
  name: 'global',
  initialState,
  reducers: {
    openNotice(state: Draft<GlobalState>, { payload }: { payload: Notice }) {
      state.noticeCalled = true;
      state.notice.content = payload.content;
      state.notice.type = payload.type;
    },
    closeNotice(state: Draft<GlobalState>) {
      state.noticeCalled = false;
      state.notice.content = null;
      state.notice.type = null;
    },
  },
  extraReducers: {},
});

export const { openNotice, closeNotice } = global.actions;
export default global;
