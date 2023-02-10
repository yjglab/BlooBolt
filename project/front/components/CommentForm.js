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
      <div className="pt-2 pb-0 px-1 mb-2  w-full flex items-center">
        <div className="w-20 h-full ">
          <img
            className="w-12 h-12 rounded-full object-cover shadow-md border-2 p-0.5 border-indigo-400"
            src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg"
          />
        </div>
        <label className="sr-only"></label>
        <textarea
          rows="2"
          onChange={onChangeText}
          value={text}
          className="px-0 border-b border-slate-200 w-full text-sm sm:text-sm md:text-md  border-0 focus:ring-0 focus:outline-none placeholder:text-slate-300"
          placeholder={`${me?.username}님의 의견을 들려주세요.`}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="absolute right-2 shadow-md bg-indigo-500 items-center py-2 px-4 text-xs font-medium text-center text-white hover:text-white  rounded-md focus:ring-4 focus:ring-indigo-200 hover:bg-indigo-600"
      >
        Flash
      </button>
    </form>
  );
};

export default CommentForm;
