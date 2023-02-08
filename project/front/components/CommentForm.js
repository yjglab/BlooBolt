import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genComment } from "../db";
import useInput from "../hooks/useInput";
import { ADD_COMMENT_REQUEST } from "../pages/reducers/post";

const CommentForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { addCommentDone } = useSelector((state) => state.post);

  const [text, onChangeText, setText] = useInput("");

  useEffect(() => {
    if (addCommentDone) {
      setText("");
    }
  }, [addCommentDone]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!text || !text.trim()) {
        return alert("빈 코멘트를 업로드 할 수 없습니다.");
      }

      return dispatch({
        type: ADD_COMMENT_REQUEST,
        data: genComment(me, text),
      });
    },
    [text]
  );

  return (
    <form action="submit" onSubmit={onSubmit} className="mb-16 relative">
      <div className="pt-2 pb-0 pr-3 mb-2  w-full flex items-center">
        <div className="w-20 h-full ">
          <img
            className="w-12 h-12 rounded-full object-cover shadow border-2 p-0.5 border-indigo-400"
            src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <label className="sr-only"></label>
        <textarea
          rows="2"
          onChange={onChangeText}
          value={text}
          className="px-0 border-b border-gray-200 w-full text-sm  border-0 focus:ring-0 focus:outline-none placeholder:text-gray-300"
          placeholder={`${me?.username}님의 의견을 들려주세요.`}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="absolute right-0 shadow bg-indigo-500/90 items-center py-2 px-4 text-xs font-medium text-center text-white hover:text-white  rounded-lg focus:ring-4 focus:ring-indigo-200 hover:bg-indigo-600"
      >
        Flash
      </button>
    </form>
  );
};

export default CommentForm;
