import { ArrowUpCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genComment } from "../db";
import useInput from "../hooks/useInput";
import { ADD_COMMENT_REQUEST } from "../reducers/post";
import PropTypes from "prop-types";

const CommentForm = ({ onToggleCommentSection }) => {
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
    <form
      action="submit"
      onSubmit={onSubmit}
      className="mb-4 mt-4 bottom-1 relative"
    >
      <div className="w-full flex items-center">
        <label className="sr-only"></label>
        <textarea
          rows="3"
          onChange={onChangeText}
          value={text}
          className="px-2  border border-slate-200 rounded w-full text-sm sm:text-sm md:text-md  focus:ring-0 focus:outline-none placeholder:text-slate-300"
          placeholder={`${me?.username}님의 의견을 들려주세요.`}
          required
        ></textarea>
      </div>
      <div className="flex items-center mt-1 justify-between">
        <button type="button" className=" rounded-full flex items-center">
          <XMarkIcon
            onClick={onToggleCommentSection}
            className="w-7 text-slate-700 "
          />
        </button>
        <button type="submit" className=" rounded-full flex items-center">
          <ArrowUpCircleIcon className="w-7 text-indigo-500 hover:text-indigo-600" />
        </button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  onToggleCommentSection: PropTypes.func.isRequired,
};
export default CommentForm;
