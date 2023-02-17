import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import CommentSection from "./CommentSection";
import {
  PROD_POST_REQUEST,
  REMOVE_POST_REQUEST,
  UNPROD_POST_REQUEST,
} from "../reducers/post";

import {
  BoltIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShieldCheckIcon,
  TrophyIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import PostImages from "./PostImages";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Link from "next/link";
import { SHOW_NOTICE } from "../reducers/global";
import { TRACE_REQUEST, UNTRACE_REQUEST } from "../reducers/user";
import PostForm from "./PostForm";
dayjs.locale("ko");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PostSection = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { me } = useSelector((state) => state.user);
  const [toggleCommentSection, setToggleCommentSection] = useState(false);
  const [toggleOpenBlindPost, setToggleOpenBlindPost] = useState(false);
  const [postEditMode, setPostEditMode] = useState(false);

  const onRemovePost = useCallback(() => {
    if (post.User.id !== id) return;
    if (!id) {
      return dispatch({
        type: SHOW_NOTICE,
        data: {
          title: "Access Denied",
          content: "로그인이 필요합니다.",
        },
      });
    }
    if (post.blinded) {
      return dispatch({
        type: SHOW_NOTICE,
        data: {
          title: "Post Delete Failed",
          content: "이미 블라인드 된 포스트입니다.",
        },
      });
    }
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });

    dispatch({
      type: SHOW_NOTICE,
      data: {
        title: "Post Delete Completed",
        content:
          "포스트가 블라인드되었습니다. 다른 사용자가 임의로 확인할 수 있습니다.",
      },
    });
  }, [id]);
  const isProdded = post.Prodders.find((v) => v.id === id);

  const onToggleCommentSection = useCallback(() => {
    setToggleCommentSection(!toggleCommentSection);
  }, [toggleCommentSection]);
  const onProdPost = useCallback(() => {
    if (!id) {
      return dispatch({
        type: SHOW_NOTICE,
        data: {
          title: "Access Denied",
          content: "로그인이 필요합니다.",
        },
      });
    }
    if (post.User.id === id) {
      return dispatch({
        type: SHOW_NOTICE,
        data: {
          title: "Post Prod Failed",
          content: "자신의 포스트를 프롯할 수 없습니다.",
        },
      });
    }
    if (post.blinded) {
      return dispatch({
        type: SHOW_NOTICE,
        data: {
          title: "Post Prod Failed",
          content: "블라인드된 포스트를 프롯할 수 없습니다.",
        },
      });
    }
    dispatch({
      type: PROD_POST_REQUEST,
      data: { postId: post.id, postUserId: post.User.id },
    });
  }, [id]);
  const onUnprodPost = useCallback(() => {
    if (!id) {
      return dispatch({
        type: SHOW_NOTICE,
        data: {
          title: "Access Denied",
          content: "로그인이 필요합니다.",
        },
      });
    }
    dispatch({
      type: UNPROD_POST_REQUEST,
      data: { postId: post.id, postUserId: post.User.id },
    });
  }, [id]);
  const onUnblindPost = useCallback(() => {
    if (!id) {
      return dispatch({
        type: SHOW_NOTICE,
        data: {
          title: "Access Denied",
          content: "로그인이 필요합니다.",
        },
      });
    }
    setToggleOpenBlindPost(!toggleOpenBlindPost);
  }, [toggleOpenBlindPost, id]);

  const isTracing = me?.Tracings?.find((v) => v.id === post.User.id);
  const onToggleTrace = useCallback(() => {
    if (!id) {
      return dispatch({
        type: SHOW_NOTICE,
        data: {
          title: "Access Denied",
          content: "로그인이 필요합니다.",
        },
      });
    }
    if (isTracing) {
      dispatch({
        type: UNTRACE_REQUEST,
        data: post.User.id,
      });
      dispatch({
        type: SHOW_NOTICE,
        data: {
          title: "Mate Disconnected",
          content: `${post.User.username}님을 블루메이트에서 제거합니다.`,
        },
      });
    } else {
      dispatch({
        type: TRACE_REQUEST,
        data: post.User.id,
      });
      dispatch({
        type: SHOW_NOTICE,
        data: {
          title: "Mate Connected",
          content: `${post.User.username}님을 블루메이트로 등록합니다.`,
        },
      });
    }
  }, [isTracing]);

  const onTogglePostEditMode = useCallback(() => {
    setPostEditMode(!postEditMode);
  }, [postEditMode]);

  return (
    <>
      {/* 개별카드 */}
      {postEditMode && (
        <PostForm
          postEditMode={postEditMode}
          onTogglePostEditMode={onTogglePostEditMode}
          postId={post.id}
          prevTopic={post.topic}
          prevContent={post.content}
          prevPostImages={post.PostImages}
        />
      )}
      <div className="mb-6 p-1  h-[31.5rem] bg-white relative rounded-2xl shadow overflow-hidden ">
        {post.blinded && !toggleOpenBlindPost && (
          <div className="flex backdrop-saturate-0 gap-2 bg-slate-300/50 justify-center items-center flex-col absolute inset-0 w-full h-full  backdrop-blur-md z-10">
            <span className="text-sm text-slate-400">
              작성자에 의해 삭제되었습니다
            </span>
            <button
              onClick={onUnblindPost}
              className="py-1.5 px-2 bg-slate-400 rounded-md text-xs text-white font-semibold hover:bg-slate-500"
            >
              포스트 확인
            </button>
          </div>
        )}
        <div className="">
          {toggleCommentSection && (
            <div className="w-full h-full p-3 absolute top-0 left-0 bg-white/90 backdrop-blur-sm z-10">
              <CommentSection
                post={post}
                onToggleCommentSection={onToggleCommentSection}
              />
            </div>
          )}
          {post.PostImages[0] && (
            <div className="flex rounded-t-xl gap-1 h-52 overflow-hidden">
              <PostImages postImages={post.PostImages} />
            </div>
          )}
          <div className="p-5 pt-3">
            <small className="text-slate-400">
              {dayjs(post.createdAt).format("YYYY.MM.DD | H:mm:ss")}
            </small>
            <h5
              className={`mb-3 break-words line-clamp-2 text-2xl font-bold leading-tight tracking-tight ${
                post.topic ? "text-slate-600" : "text-slate-300"
              }`}
            >
              {post.topic ? post.topic : "토픽 없음"}
            </h5>

            <div className="mb-3 flex items-center">
              <img
                src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRRv9ICxXjK-LVFv-lKRId6gB45BFoNCLsZ4dk7bZpYGblPLPG-9aYss0Z0wt2PmWDb"
                className={`h-[50px] w-[50px] border-[3px] ${
                  post.User.status ? "border-indigo-500" : ""
                } p-0.5 rounded-full object-cover`}
              />
              <div className="ml-2 w-full flex flex-col">
                <h1 className="text-md font-bold flex items-center">
                  {post.User.username}
                  {post.User.rank && (
                    <ShieldCheckIcon
                      className={`ml-1 relative h-4 w-4 flex-shrink-0 ${
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
                  {post.User.role || "No role"}
                </h1>
              </div>

              <Menu
                as="div"
                className="relative bottom-2 inline-block text-left"
              >
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {post.User.id === id ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={onTogglePostEditMode}
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
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={onRemovePost}
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
                        </>
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
            <p className="mb-8 h-24 text-sm break-words line-clamp-5 font-normal text-slate-600">
              {
                <>
                  {post.content.split(/(#[^\s#]+)/g).map((v, i) => {
                    if (v.match(/(#[^\s#]+)/)) {
                      return (
                        <Link
                          href={`/hashtag/${v.slice(1)}`}
                          prefetch={false}
                          key={i}
                        >
                          <span className="text-indigo-500 cursor-pointer font-medium hover:text-indigo-600">
                            {v}
                          </span>
                        </Link>
                      );
                    }
                    return v;
                  })}
                </>
              }
            </p>

            <div className="flex gap-2 absolute bottom-4 text-sm ">
              {isProdded ? (
                <button
                  onClick={onUnprodPost}
                  className="flex items-center gap-1 hover:text-indigo-500"
                >
                  <BoltIcon className="w-5 text-indigo-500" />
                  <span className="text-indigo-500">
                    {post.Prodders.length}
                  </span>
                </button>
              ) : (
                <button
                  onClick={onProdPost}
                  className="flex items-center gap-1 hover:text-indigo-500"
                >
                  <BoltIcon className="w-5 " />
                  <span className="">{post.Prodders.length}</span>
                </button>
              )}

              <button
                onClick={onToggleCommentSection}
                className="flex items-center gap-1 hover:text-indigo-500"
              >
                <ChatBubbleOvalLeftEllipsisIcon className="w-5" />
                {post.Comments.length}
              </button>

              {post.User.id !== me?.id ? (
                <button
                  onClick={onToggleTrace}
                  className="flex items-center gap-1 hover:text-indigo-500"
                >
                  {isTracing ? (
                    <>
                      <UserMinusIcon className="w-5" />
                      Unmate
                    </>
                  ) : (
                    <>
                      {" "}
                      <UserPlusIcon className="w-5" />
                      Mate
                    </>
                  )}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

PostSection.propTypes = {
  post: PropTypes.object.isRequired,
};
export default PostSection;
