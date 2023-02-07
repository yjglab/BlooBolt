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
      <div className="pt-2 pb-0 px-3 mb-2 border-b w-full  ">
        <label className="sr-only"></label>
        <textarea
          rows="2"
          onChange={onChangeText}
          value={text}
          className="px-0 w-full text-sm  border-0 focus:ring-0 focus:outline-none placeholder:text-gray-300"
          placeholder="Write a comment."
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="absolute right-0 shadow items-center py-2 px-4 text-xs font-medium text-center hover:text-white  rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-700"
      >
        Flash
      </button>
    </form>
  );
};

export default CommentForm;
