import {
  ArrowPathIcon,
  ArrowUpCircleIcon,
  ArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import { openNotice } from "../reducers/globalSlice";
import { uploadComment } from "../reducers/postSlice";

const CommentForm = ({ post, detailed, onToggleCommentArea }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { uploadCommentLoading } = useSelector((state) => state.post);

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
      if (me.banned) {
        return dispatch(
          openNotice({
            type: 2,
            content: "최근 다수의 신고를 받아 이용이 정지된 계정입니다.",
          })
        );
      }
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
      className=" absolute w-full bottom-0 "
    >
      <div className=" flex items-center">
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
        {!detailed && (
          <button type="button" className=" rounded-full flex items-center">
            <XMarkIcon onClick={onToggleCommentArea} className="w-7 " />
          </button>
        )}
        <div className=" text-orange-400  text-xs " role="alert">
          {errors.content && <>{errors.content.message}</>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting || post.blinded}
          className=" rounded-full flex items-center bg-indigo-500 p-1"
        >
          {uploadCommentLoading ? (
            <ArrowPathIcon className="w-4 text-white left-0 right-0 mx-auto animate-spin" />
          ) : (
            <ArrowUpIcon
              className="w-4 text-white  hover:text-indigo-600"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
  detailed: PropTypes.bool.isRequired,
  onToggleCommentArea: PropTypes.func.isRequired,
};
export default CommentForm;
