import produce from "immer";

export const initialState = {
  notice: {
    title: "",
    content: "",
    type: "",
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
        draft.notice.type = action.data.type;
        break;
      case CLOSE_NOTICE:
        draft.noticeCalled = false;
        draft.notice.title = "";
        draft.notice.content = "";
        draft.notice.null = "";
        break;
      default:
        break;
    }
  });
};

export default reducer;
