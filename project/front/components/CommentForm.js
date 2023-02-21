import { ArrowUpCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import { openNotice } from "../reducers/globalSlice";
import { uploadComment } from "../reducers/postSlice";

const CommentForm = ({ post, onToggleCommentArea }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      content: "",
    },
  });

  const id = useSelector((state) => state.user.me?.id);
  const onUploadComment = useCallback(
    (formData) => {
      if (!id) {
        return dispatch(
          openNotice({
            content: "로그인이 필요합니다.",
            type: 2,
          })
        );
      }
      const { content } = formData;
      if (!content.trim()) {
        return setError("content", {
          message: "빈 코멘트를 업로드할 수 없습니다",
        });
      }
      reset();

      return dispatch(uploadComment({ content, postId: post.id, userId: id }));
    },
    [id]
  );

  return (
    <form
      onSubmit={handleSubmit(onUploadComment)}
      className="mb-4 mt-4 bottom-1 relative"
    >
      <div className="w-full flex items-center">
        <label htmlFor="content" className="sr-only"></label>
        <textarea
          id="content"
          maxLength={800}
          rows="3"
          disabled={post.blinded}
          className="px-2  border border-slate-200 rounded-md w-full text-sm sm:text-sm md:text-md  focus:ring-0 focus:outline-none placeholder:text-slate-300"
          placeholder={
            me && !post.blinded
              ? `${me?.username}님의 의견을 들려주세요.`
              : post.blinded
              ? "삭제된 포스트에는 코멘트를 작성할 수 없습니다."
              : "로그인이 필요합니다."
          }
          {...register("content", {
            required: "",
            maxLength: {
              value: 800,
              message: "800자 이내로 입력해주세요",
            },
          })}
        ></textarea>
      </div>
      <div className="flex items-center mt-1 justify-between">
        <button type="button" className=" rounded-full flex items-center">
          <XMarkIcon
            onClick={onToggleCommentArea}
            className="w-7 text-slate-600 "
          />
        </button>
        <div className=" text-orange-400  text-xs " role="alert">
          {errors.content && <>{errors.content.message}</>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting || post.blinded}
          className=" rounded-full flex items-center"
        >
          <ArrowUpCircleIcon className="w-7 text-indigo-500 hover:text-indigo-600" />
        </button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
  onToggleCommentArea: PropTypes.func.isRequired,
};
export default CommentForm;
