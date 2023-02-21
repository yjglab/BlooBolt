import React, { Fragment, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowUturnLeftIcon,
  BoltIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";

import { openNotice } from "../reducers/globalSlice";
import {
  removeComment,
  editComment,
  prodComment,
  unprodComment,
} from "../reducers/postSlice";
import { useForm } from "react-hook-form";
import { backUrl } from "../config/config";
import { trace, untrace } from "../reducers/userSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CommentSection = ({ post, comment }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { me } = useSelector((state) => state.user);

  const [extendComment, setExtendComment] = useState(false);
  const [editCommentMode, setEditCommentMode] = useState(false);

  const onCancelEditCommentMode = useCallback(() => {
    setEditCommentMode(false);
  }, [editCommentMode]);
  const toggleExtendComment = useCallback(() => {
    setExtendComment(!extendComment);
  }, [extendComment]);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      content: "",
    },
  });
  const onEditCommentMode = useCallback(() => {
    setEditCommentMode(true);
    setValue("content", `${comment.content}`);
  }, [editCommentMode, comment.content]);
  const onEditComment = useCallback(
    (formData) => {
      if (!id) {
        return dispatch(
          openNotice({
            title: "Access denied",
            content: "로그인이 필요합니다.",
          })
        );
      }
      const { content } = formData;
      if (!content.trim()) {
        return setError("content");
      }
      dispatch(
        editComment({
          content,
          postId: post.id,
          commentId: comment.id,
        })
      );
      dispatch(
        openNotice({
          title: "Comment Edited",
          content: "코멘트가 수정되었습니다.",
        })
      );
      reset();
      setEditCommentMode(false);
    },
    [id]
  );

  const onRemoveComment = useCallback(() => {
    if (!id) {
      return dispatch(
        openNotice({
          title: "Access denied",
          content: "로그인이 필요합니다.",
        })
      );
    }
    dispatch(
      removeComment({
        postId: post.id,
        commentId: comment.id,
      })
    );
    dispatch(
      openNotice({
        title: "Comment Deleted",
        content: "코멘트가 삭제되었습니다.",
      })
    );
  }, [id]);

  const isProdded = comment.CommentProdders.find((v) => v.id === id);
  const onProdComment = useCallback(() => {
    if (!id) {
      return dispatch(
        openNotice({
          title: "Access denied",
          content: "로그인이 필요합니다.",
          type: "error",
        })
      );
    }
    if (comment.User.id === id) {
      return dispatch(
        openNotice({
          title: "Prod failed",
          content: "자신의 코멘트를 프롯할 수 없습니다.",
          type: "error",
        })
      );
    }
    dispatch(
      prodComment({
        postId: post.id,
        commentId: comment.id,
        commentUserId: comment.User.id,
      })
    );
  }, [id, comment.User.id]);
  const onUnprodComment = useCallback(() => {
    if (!id) {
      return dispatch(
        openNotice({
          title: "Access denied",
          content: "로그인이 필요합니다.",
          type: "error",
        })
      );
    }
    dispatch(
      unprodComment({
        postId: post.id,
        commentId: comment.id,
      })
    );
  }, [id, comment.User.id]);

  const isTracing = me?.Tracings?.find((v) => v.id === comment.User.id);
  const onToggleTrace = () => {
    if (!id) {
      return dispatch(
        openNotice({
          title: "Access denied",
          content: "로그인이 필요합니다.",
          type: "error",
        })
      );
    }
    if (isTracing) {
      dispatch(untrace(comment.User.id));
      dispatch(
        openNotice({
          title: "Trace disconnected",
          content: `${comment.User.username}님을 트레이스 리스트에서 제거합니다.`,
        })
      );
    } else {
      dispatch(trace(comment.User.id));
      dispatch(
        openNotice({
          title: "Trace connected",
          content: `${comment.User.username}님을 트레이스 리스트에 등록합니다.`,
        })
      );
    }
  };

  return (
    <div
      key={comment.id}
      className={`p-3 my-2.5 ${
        post.User.id === comment.User.id ? "bg-slate-50" : null
      } hover:border-slate-200 border-white border rounded-md`}
    >
      <div className="mb-1.5 flex items-center">
        <img
          src={
            process.env.NODE_ENV === "production"
              ? ``
              : `${backUrl}/${comment.User.Userboard.avatar}`
          }
          className={`h-[42px] w-[42px] ${
            post.User.status ? "border-indigo-500" : ""
          } border-[2.5px] p-0.5 rounded-full object-cover`}
        />
        <div className="ml-2 w-full flex flex-col">
          <h1 className="text-sm font-bold flex items-center">
            {comment.User.username}
            {comment.User.Userboard.rank !== 0 ? (
              <ShieldCheckIcon
                className={`w-3.5 ml-0.5 ${
                  comment.User.Userboard.rank === 1
                    ? "text-cyan-400"
                    : comment.User.Userboard.rank === 2
                    ? "text-amber-400"
                    : comment.User.Userboard.rank === 3
                    ? "text-amber-700/70"
                    : comment.User.Userboard.rank === 4
                    ? "text-indigo-500"
                    : comment.User.Userboard.rank === 5
                    ? "text-slate-400"
                    : comment.User.Userboard.rank === 9
                    ? "text-red-400"
                    : null
                }`}
                aria-hidden="true"
              />
            ) : null}
          </h1>
          <h1 className="text-xs relative bottom-0.5">{comment.User.role}</h1>
        </div>
        <Menu as="div" className="relative bottom-2 inline-block text-left ">
          <div>
            <Menu.Button className="rounded-md px-3 py-1.5 text-sm font-medium  hover:bg-slate-50 focus:outline-none">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-1 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onEditCommentMode}
                      className={classNames(
                        active
                          ? "bg-slate-100 text-slate-600"
                          : "text-slate-600",
                        "block px-4 py-2 text-sm text-left w-full"
                      )}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
                {comment.UserId === id ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={onRemoveComment}
                        className={classNames(
                          active
                            ? "bg-slate-100 text-slate-600"
                            : "text-slate-600",
                          "block px-4 py-2 text-sm text-left w-full"
                        )}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                ) : null}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active
                          ? "bg-slate-100 text-slate-600"
                          : "text-slate-600",
                        "block px-4 py-2 text-sm text-left w-full"
                      )}
                    >
                      Report
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <form onSubmit={handleSubmit(onEditComment)}>
        <div className="mb-5 text-sm break-words font-normal text-slate-600">
          {editCommentMode ? (
            <>
              <label htmlFor="content" className="sr-only"></label>
              <textarea
                id="content"
                maxLength={800}
                rows="3"
                disabled={post.blinded}
                className="px-2  border border-slate-200 rounded-md w-full text-sm sm:text-sm md:text-md  focus:ring-0 focus:outline-none placeholder:text-slate-300"
                {...register("content")}
              ></textarea>
            </>
          ) : (
            <p className={extendComment ? "" : "line-clamp-3"}>
              {comment.content}
            </p>
          )}
        </div>
        <div className="flex justify-between  gap-2 text-sm items-center">
          <div className="flex">
            {isProdded ? (
              <button
                onClick={onUnprodComment}
                className="mx-1 flex items-center gap-0.5"
              >
                <BoltIcon className="w-4 text-indigo-500" />
                <span>{comment.CommentProdders.length}</span>
              </button>
            ) : (
              <button
                onClick={onProdComment}
                className="mx-1 flex items-center gap-0.5 hover:text-indigo-500 "
              >
                <BoltIcon className="w-4" />
                <span>{comment.CommentProdders.length}</span>
              </button>
            )}

            {comment.User.id !== me?.id ? (
              <button
                onClick={onToggleTrace}
                className="mx-1 flex items-center gap-0.5 hover:text-indigo-500 "
              >
                {isTracing ? (
                  <>
                    <UserMinusIcon className="w-4" />
                    Untrace
                  </>
                ) : (
                  <>
                    {" "}
                    <UserPlusIcon className="w-4" />
                    Trace
                  </>
                )}
              </button>
            ) : null}
          </div>
          <div className="flex">
            {editCommentMode ? (
              <>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mx-1  hover:text-indigo-500"
                >
                  <CheckIcon className="w-5" />
                </button>
                <button
                  type="button"
                  className="mx-1 flex items-center gap-0.5 hover:text-indigo-500"
                >
                  <ArrowUturnLeftIcon
                    onClick={onCancelEditCommentMode}
                    className="w-4"
                  />
                </button>
              </>
            ) : (
              <button
                type="button"
                className="mx-1 flex items-center gap-0.5 hover:text-indigo-500 text-slate-600 "
              >
                {extendComment ? (
                  <MinusIcon onClick={toggleExtendComment} className="w-5" />
                ) : (
                  <PlusIcon onClick={toggleExtendComment} className="w-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

CommentSection.propTypes = {
  post: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
};
export default CommentSection;
