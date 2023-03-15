import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import CommentArea from "./CommentArea";
import {
  ArrowsPointingOutIcon,
  BoltIcon,
  ChatBubbleOvalLeftIcon,
  FaceSmileIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import PostImages from "./PostImages";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Link from "next/link";
import PostForm from "./PostForm";

import { openNotice } from "../reducers/globalSlice";
import {
  cancelAllPostImages,
  prodPost,
  removePost,
  revertPost,
  unprodPost,
  removePostCompletely,
} from "../reducers/postSlice";
import { trace, untrace } from "../reducers/userSlice";
import { backUrl } from "../config/config";
import PostUserReport from "./PostUserReport";

dayjs.locale("ko");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PostSection = ({ post, detailed, squareKind }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { me } = useSelector((state) => state.user);
  const [toggleCommentArea, setToggleCommentArea] = useState(false);
  const [blindPost, setBlindPost] = useState(false);
  const [blindCheck, setBlindCheck] = useState(false);
  const [reportCheck, setReportCheck] = useState(false);

  const [postEditMode, setPostEditMode] = useState(false);

  const onToggleCheckReport = useCallback(() => {
    if (!id) {
      return dispatch(
        openNotice({
          content: "로그인이 필요합니다.",
          type: 2,
        })
      );
    }
    setReportCheck(!reportCheck);
  }, [reportCheck]);

  useEffect(() => {
    if (post.blinded) {
      setBlindPost(true);
    }
  }, [post.blinded]);

  const onToggleCheckRemovePost = useCallback(() => {
    setBlindCheck(!blindCheck);
  }, [blindCheck]);

  const onRemovePost = () => {
    if (post.User.id !== id) return;
    if (!id) {
      return dispatch(
        openNotice({
          content: "로그인이 필요합니다.",
          type: 2,
        })
      );
    }
    if (post.blinded) {
      return dispatch(
        openNotice({
          content: "이미 블라인드 된 포스트입니다.",
          type: 2,
        })
      );
    }

    setBlindCheck(false);

    if (post.Comments.length === 0) {
      dispatch(removePostCompletely(post.id));
      dispatch(
        openNotice({
          type: 1,
          content: "포스트가 삭제되었습니다.",
        })
      );
    } else {
      dispatch(removePost(post.id));
      dispatch(
        openNotice({
          type: 1,
          content:
            "포스트가 블라인드 되었습니다. 다른 사용자가 작성자의 포스트를 확인할 수 있습니다.",
        })
      );
      setBlindPost(true);
    }
  };

  const onRevertPost = () => {
    if (post.User.id !== id) return;
    if (!id) {
      return dispatch(
        openNotice({
          content: "로그인이 필요합니다.",
          type: 2,
        })
      );
    }

    dispatch(revertPost(post.id));
    dispatch(
      openNotice({
        content: "포스트가 복구되었습니다.",
        type: 1,
      })
    );
    setBlindPost(false);
  };

  const isProdded = post.PostProdders.find((v) => v.id === id);

  const onToggleCommentArea = useCallback(() => {
    setToggleCommentArea(!toggleCommentArea);
  }, [toggleCommentArea]);
  const onProdPost = useCallback(() => {
    if (!id) {
      return dispatch(
        openNotice({
          content: "로그인이 필요합니다.",
          type: 2,
        })
      );
    }
    if (post.User.id === id) {
      return dispatch(
        openNotice({
          content: "자신의 포스트를 프롯할 수 없습니다.",
          type: 2,
        })
      );
    }
    if (post.blinded) {
      return dispatch(
        openNotice({
          content: "블라인드 된 포스트를 프롯할 수 없습니다.",
          type: 2,
        })
      );
    }
    dispatch(prodPost({ postId: post.id, postUserId: post.User.id }));
  }, [id, post.blinded]);
  const onUnprodPost = useCallback(() => {
    if (!id) {
      return dispatch(
        openNotice({
          content: "로그인이 필요합니다.",
          type: 2,
        })
      );
    }

    dispatch(unprodPost({ postId: post.id, postUserId: post.User.id }));
  }, [id]);
  const onUnblindPost = useCallback(() => {
    if (!id) {
      return dispatch(
        openNotice({
          content: "로그인이 필요합니다.",
          type: 2,
        })
      );
    }
    if (me.rank === 0 && post.User.id !== me.id) {
      return dispatch(
        openNotice({
          content: "Rank 6 사용자부터 확인할 수 있습니다.",
          type: 2,
        })
      );
    }

    setBlindPost(false);
  }, [id]);

  const isTracing = me?.Tracings?.find((v) => v.id === post.User.id);
  const onToggleTrace = () => {
    if (!id) {
      return dispatch(
        openNotice({
          content: "로그인이 필요합니다.",
          type: 2,
        })
      );
    }
    if (isTracing) {
      dispatch(untrace(post.User.id));
      dispatch(
        openNotice({
          content: `${post.User.username}님을 트레이스 리스트에서 제거합니다.`,
          type: 1,
        })
      );
    } else {
      dispatch(trace(post.User.id));
      dispatch(
        openNotice({
          content: `${post.User.username}님을 트레이스 리스트에 등록합니다.`,
          type: 1,
        })
      );
    }
  };

  const onTogglePostEditMode = useCallback(() => {
    if (post.blinded) {
      return dispatch(
        openNotice({
          content: "블라인드 된 포스트는 수정할 수 없습니다.",
          type: 2,
        })
      );
    }
    if (post.reverted) {
      return dispatch(
        openNotice({
          content: "복원된 포스트는 수정할 수 없습니다.",
          type: 2,
        })
      );
    }

    if (onTogglePostEditMode) {
      dispatch(cancelAllPostImages());
    }
    setPostEditMode(!postEditMode);
  }, [post.blinded, post.reverted, postEditMode]);

  return (
    <>
      {/* 개별카드 */}
      {postEditMode && (
        <PostForm
          postEditMode={postEditMode}
          onTogglePostEditMode={onTogglePostEditMode}
          squareKind={squareKind}
          post={post}
          prevPostClass={post.class}
          prevTopic={post.topic}
          prevContent={post.content}
          prevPostImages={post.PostImages}
        />
      )}
      <div
        className={`${
          detailed
            ? "min-h-[16rem]"
            : "h-[27.5rem] ring-1 ring-slate-200 hover:ring-indigo-500 duration-150"
        } p-1 bg-white  relative rounded-xl  overflow-hidden `}
      >
        {reportCheck && (
          <PostUserReport
            post={post}
            onToggleCheckReport={onToggleCheckReport}
          />
        )}
        {blindCheck && (
          <div className="flex backdrop-saturate-0 gap-2 bg-white/50 justify-center items-center flex-col absolute inset-0 w-full h-full  backdrop-blur-md z-10">
            {post.Comments.length === 0 ? (
              <span className="text-sm text-slate-500 text-center px-5">
                포스트를 삭제하면 블루포인트가 회수됩니다. 포스트를
                삭제하시겠습니까?
              </span>
            ) : (
              <span className="text-sm text-slate-500 text-center px-5">
                삭제 요청된 포스트는 블라인드 처리되며 수정이 불가능합니다. 또한
                여전히 다른 사용자에 의해 확인될 수 있으며 복원이 가능합니다.
              </span>
            )}
            <div className="mt-2 flex gap-2">
              <button
                onClick={onRemovePost}
                className="py-1.5 px-3 bg-slate-500 rounded-md text-xs text-white font-semibold hover:bg-slate-500"
              >
                삭제 확인
              </button>
              <button
                onClick={onToggleCheckRemovePost}
                className="py-1.5 px-3 bg-slate-500 rounded-md text-xs text-white font-semibold hover:bg-slate-500"
              >
                취소
              </button>
            </div>
          </div>
        )}
        {post.blinded && blindPost && (
          <div className="flex backdrop-saturate-0 gap-2 bg-slate-400/20 justify-center items-center flex-col absolute inset-0 w-full h-full  backdrop-blur-md z-10">
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

        {toggleCommentArea && (
          <div className="w-full h-full p-3 absolute top-0 left-0 bg-white  z-10">
            <CommentArea
              post={post}
              detailed={detailed}
              onToggleCommentArea={onToggleCommentArea}
            />
          </div>
        )}

        <div className="px-5 pt-3  flex flex-col justify-between">
          <div className={`${!detailed && "cursor-pointer"} relative`}>
            <Menu
              as="div"
              className="absolute top-0 -right-2.5 inline-block text-left"
            >
              <div>
                <Menu.Button className="rounded-md px-3 py-1 text-sm font-medium  hover:bg-slate-50 focus:outline-none">
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
                              수정
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={
                                post.blinded
                                  ? onRevertPost
                                  : post.reverted
                                  ? onRemovePost
                                  : onToggleCheckRemovePost
                              }
                              className={classNames(
                                active
                                  ? "bg-slate-100 text-slate-600"
                                  : "text-slate-600",
                                "block px-4 py-2 text-sm text-left w-full"
                              )}
                            >
                              {post.blinded
                                ? "복원"
                                : post.reverted
                                ? "삭제"
                                : "삭제"}
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    ) : null}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={onToggleCheckReport}
                          className={classNames(
                            active
                              ? "bg-slate-100 text-slate-600"
                              : "text-slate-600",
                            "block px-4 py-2 text-sm text-left w-full"
                          )}
                        >
                          사용자 신고
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <small className="text-slate-400 text-xs inline-flex">
              {dayjs(post.updatedAt).format("YY.MM.DD | H:mm:ss")}
              {post.edited && " (수정됨)"}
            </small>
            <Link href={!detailed ? `/post/${post.id}` : "#"}>
              <h5
                className={`${
                  detailed ? "" : "line-clamp-2"
                } mb-2 break-words text-xl font-bold leading-tight tracking-tight ${
                  post.topic ? "text-slate-600" : "text-slate-100"
                }`}
              >
                {post.topic ? post.topic : "토픽 없음"}
              </h5>
            </Link>
          </div>

          <div className="mb-3 flex items-center">
            <Link href={`/profile/${post.User.username}`}>
              <img
                src={
                  process.env.NODE_ENV === "production"
                    ? `${post.User.avatar}`
                    : `${backUrl}/${post.User.avatar}`
                }
                className={`${
                  post.User.class === "fedev"
                    ? "border-amber-400"
                    : post.User.class === "bedev"
                    ? "border-emerald-400"
                    : post.User.class === "design"
                    ? "border-red-400"
                    : post.User.class === "plan"
                    ? "border-sky-300"
                    : "border-slate-400"
                } cursor-pointer h-[45px] w-[45px] aspect-square border-[3px] p-0.5 rounded-full object-cover`}
              />
            </Link>
            <div className="ml-2 w-full flex flex-col">
              <Link href={`/profile/${post.User.username}`}>
                <h1 className="cursor-pointer text-sm font-bold flex items-center">
                  {post.User.username}
                  <div
                    className={`${
                      post.User.class === "fedev"
                        ? "text-amber-400"
                        : post.User.class === "bedev"
                        ? "text-emerald-400"
                        : post.User.class === "design"
                        ? "text-red-400"
                        : post.User.class === "plan"
                        ? "text-sky-300"
                        : "text-slate-400"
                    } flex gap-0.5 text-xs`}
                  >
                    {post.User.rank === 6 ? (
                      <FaceSmileIcon
                        className="w-4 ml-0.5 "
                        aria-hidden="true"
                      />
                    ) : post.User.rank === 0 ? null : (
                      <ShieldCheckIcon
                        className={`w-4 ml-0.5 flex-shrink-0 `}
                        aria-hidden="true"
                      />
                    )}
                    {post.User.rank}
                  </div>
                </h1>
              </Link>
              <h1 className="text-xs relative bottom-0.5">{post.User.role}</h1>
            </div>
          </div>

          <p
            className={`${
              !detailed
                ? post.PostImages[0]
                  ? " line-clamp-4 mb-3"
                  : " line-clamp-[12] "
                : ""
            }  h-full text-sm break-words  font-normal text-slate-600`}
          >
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
          </p>

          {!detailed && (
            <div
              className={`flex justify-between items-center left-2.5 absolute bottom-2.5 text-sm`}
            >
              <div className="flex px-2.5  gap-2">
                {isProdded ? (
                  <button
                    onClick={onUnprodPost}
                    className="flex items-center gap-0.5 hover:text-indigo-500"
                  >
                    <BoltIcon className="w-5 text-indigo-500" />
                    <span className="text-indigo-500">
                      {post.PostProdders.length}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={onProdPost}
                    className="flex hover:scale-105 items-center gap-0.5 hover:text-indigo-500"
                  >
                    <BoltIcon className="w-5 " />
                    <span className="">{post.PostProdders.length}</span>
                  </button>
                )}

                <button
                  onClick={onToggleCommentArea}
                  className="flex hover:scale-105 items-center gap-0.5 hover:text-indigo-500"
                >
                  <ChatBubbleOvalLeftIcon className="w-5" />
                  {post.Comments.length}
                </button>

                {post.User.id !== me?.id ? (
                  <button
                    onClick={onToggleTrace}
                    className="flex items-center gap-0.5 hover:text-indigo-500 hover:scale-105"
                  >
                    {isTracing ? (
                      <>
                        <UserMinusIcon className="w-5 " />
                      </>
                    ) : (
                      <>
                        {" "}
                        <UserPlusIcon className="w-5 " />
                      </>
                    )}
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>

        {post.PostImages[0] && (
          <div
            className={`${
              detailed ? "mt-12 gap-1 w-full aspect-square" : "h-40 gap-1"
            } flex rounded-xl  overflow-hidden`}
          >
            <PostImages postImages={post.PostImages} />
          </div>
        )}

        {!detailed && (
          <Link href={`/post/${post.id}`}>
            <button className="absolute hover:text-indigo-500 bottom-2.5 right-6">
              <ArrowsPointingOutIcon className="w-5 hover:scale-105" />
            </button>
          </Link>
        )}
      </div>
      {detailed && (
        <>
          <hr className="mt-14 mb-6" />
          <div className="px-2">
            <div
              className="z-10 bg-white px-1.5  py-1.5 mb-8
          flex  items-center text-sm"
            >
              <div className="flex px-2.5  gap-2">
                {isProdded ? (
                  <button
                    onClick={onUnprodPost}
                    className="flex items-center gap-1 hover:text-indigo-500"
                  >
                    <BoltIcon className="w-5 text-indigo-500" />
                    <span className="text-indigo-500">
                      {post.PostProdders.length}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={onProdPost}
                    className="flex hover:scale-105 items-center gap-1 hover:text-indigo-500"
                  >
                    <BoltIcon className="w-5 " />
                    <span className="">{post.PostProdders.length}</span>
                  </button>
                )}

                {post.User.id !== me?.id ? (
                  <button
                    onClick={onToggleTrace}
                    className="flex items-center gap-1 hover:text-indigo-500 hover:scale-105"
                  >
                    {isTracing ? (
                      <>
                        <UserMinusIcon className="w-5 " />
                        Untrace
                      </>
                    ) : (
                      <>
                        {" "}
                        <UserPlusIcon className="w-5 " />
                        Trace
                      </>
                    )}
                  </button>
                ) : null}
              </div>
            </div>
            <span className="px-4 font-bold text-lg">
              Comments <span>({post.Comments.length})</span>
            </span>
            <div
              className={`${
                detailed ? "" : "shadow"
              } w-full mt-3  rounded-2xl h-full p-3  bg-white/90  z-10`}
            >
              <CommentArea
                post={post}
                detailed={detailed}
                onToggleCommentArea={onToggleCommentArea}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

PostSection.propTypes = {
  post: PropTypes.object.isRequired,
  detailed: PropTypes.bool.isRequired,
  squareKind: PropTypes.string.isRequired,
};
export default PostSection;
