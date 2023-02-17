import produce from "immer";

export const initialState = {
  notice: {
    title: "",
    content: "",
  },
  noticeCalled: false,
};

export const SHOW_NOTICE = "SHOW_NOTICE";
export const CLOSE_NOTICE = "CLOSE_NOTICE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SHOW_NOTICE:
        draft.noticeCalled = true;
        draft.notice.title = action.data.title;
        draft.notice.content = action.data.content;
        break;
      case CLOSE_NOTICE:
        draft.noticeCalled = false;
        draft.notice.title = "";
        draft.notice.content = "";
        break;
      default:
        break;
    }
  });
};

export default reducer;
