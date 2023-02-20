import React, { Fragment, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowUturnLeftIcon,
  BoltIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";

import { openNotice } from "../reducers/globalSlice";
import { removeComment, editComment } from "../reducers/postSlice";
import { useForm } from "react-hook-form";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CommentSection = ({ post, comment }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
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

  return (
    <div
      key={comment.id}
      className={`p-3 my-2.5 ${
        post.User.id === comment.User.id ? "bg-slate-50" : null
      } hover:border-slate-200 border-white border rounded-md`}
    >
      <div className="mb-1.5 flex items-center">
        <img
          src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRRv9ICxXjK-LVFv-lKRId6gB45BFoNCLsZ4dk7bZpYGblPLPG-9aYss0Z0wt2PmWDb"
          className={`h-[42px] w-[42px] ${
            post.User.status ? "border-indigo-500" : ""
          } border-[2.5px] p-0.5 rounded-full object-cover`}
        />
        <div className="ml-2 w-full flex flex-col">
          <h1 className="text-sm font-bold flex items-center">
            {comment.User.username}
            {post.User.rank && (
              <ShieldCheckIcon
                className={`w-3.5 ml-0.5 ${
                  post.User.rank === 1
                    ? "text-cyan-400"
                    : post.User.rank === 2
                    ? "text-amber-400"
                    : post.User.rank === 3
                    ? "text-amber-700/70"
                    : post.User.rank === 4
                    ? "text-indigo-500"
                    : post.User.rank === 5
                    ? "text-slate-400"
                    : post.User.rank === 9
                    ? "text-red-400"
                    : null
                }`}
                aria-hidden="true"
              />
            )}
          </h1>
          <h1 className="text-xs relative bottom-0.5">
            {comment.User.role || "No role"}
          </h1>
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
            <p className={!extendComment && "line-clamp-3"}>
              {comment.content}
            </p>
          )}
        </div>
        <div className="flex justify-between  gap-2 text-sm items-center">
          <div className="flex">
            <button
              type="button"
              className="mx-1 flex items-center gap-0.5 hover:text-indigo-500 text-slate-600 "
            >
              <BoltIcon className="w-4" />
              <span>12</span>
            </button>
            <button
              type="button"
              className="mx-1 flex items-center gap-0.5 hover:text-indigo-500 text-slate-600 "
            >
              <UserPlusIcon className="w-4" />
              <span>Trace</span>
            </button>
          </div>
          <div className="flex">
            {editCommentMode ? (
              <>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mx-1 text-slate-600  hover:text-indigo-500"
                >
                  <CheckIcon className="w-5" />
                </button>
                <button
                  type="button"
                  className="mx-1 flex items-center gap-0.5 hover:text-indigo-500 text-slate-600 "
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
