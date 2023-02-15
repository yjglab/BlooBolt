import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import CommentSection from "./CommentSection";
import { REMOVE_POST_REQUEST } from "../reducers/post";

import {
  BoltIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShieldCheckIcon,
  TrophyIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import PostImages from "./PostImages";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PostSection = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [toggleCommentSection, setToggleCommentSection] = useState(false);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);
  const onToggleCommentSection = useCallback(() => {
    setToggleCommentSection(!toggleCommentSection);
  }, [toggleCommentSection]);

  return (
    <>
      {/* 개별카드 */}
      <div className="mb-6 p-1 bg-white relative rounded-lg shadow overflow-hidden ">
        <div className="">
          {toggleCommentSection && (
            <div className="w-full h-full p-3 absolute top-0 left-0 bg-white/90 backdrop-blur-sm z-10">
              <CommentSection onToggleCommentSection={onToggleCommentSection} />
            </div>
          )}
          {post.PostImages[0] && (
            <div className="flex rounded-t-lg gap-1 h-52 overflow-hidden">
              <PostImages postImages={post.PostImages} />
            </div>
          )}
          <div className="p-5 pt-3">
            <small className="text-slate-400">
              {dayjs(post.createdAt).format("YYYY.MM.DD | H:mm:ss")}
            </small>
            <h5 className="mb-3 break-words line-clamp-2 text-2xl font-bold leading-tight tracking-tight text-slate-700">
              {post.topic}
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
                  <Menu.Button className="rounded px-3 py-1.5 text-sm font-medium  hover:bg-slate-50 focus:outline-none">
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
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
            <p className="mb-8 h-24 text-sm break-words line-clamp-5 font-normal text-slate-700">
              {post.content}
            </p>

            <div className="flex gap-2 absolute bottom-3 text-sm text-slate-700">
              <button className="flex items-center gap-1 hover:text-indigo-500">
                <BoltIcon className="w-5 " />
                12
              </button>
              <button
                onClick={onToggleCommentSection}
                className="flex items-center gap-1 hover:text-indigo-500"
              >
                <ChatBubbleOvalLeftEllipsisIcon className="w-5" />
                12
              </button>
              <button className="flex items-center gap-1 hover:text-indigo-500">
                <UserPlusIcon className="w-5" />
                Trace
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div className="flex flex-col mb-6">
    //   <div className="flex bg-white shadow rounded w-full px-4 py-6 ">
    //     <img
    //       className={`w-12 h-12 rounded-full object-cover mr-4 shadow border-2 p-0.5 ${
    //         post.User.status ? "border-indigo-400" : ""
    //       }`}
    //       src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg"
    //       alt="avatar"
    //     />
    //     <div className="w-full">
    //       <div className="flex items-center justify-between">
    //         <div className="flex ">
    //           <h2 className="text-lg font-semibold text-slate-600 -mt-1">
    //             {post.User.username}
    //           </h2>
    //           {post.User.rank && (
    //             <ShieldCheckIcon
    //               className={`ml-0.5 relative top-0.5 h-4 w-4 flex-shrink-0 ${
    //                 post.User.rank === 1
    //                   ? "text-cyan-400"
    //                   : post.User.rank === 2
    //                   ? "text-amber-400"
    //                   : post.User.rank === 3
    //                   ? "text-amber-700/70"
    //                   : post.User.rank === 4
    //                   ? "text-indigo-500"
    //                   : post.User.rank === 5
    //                   ? "text-slate-400"
    //                   : post.User.rank === 9
    //                   ? "text-red-400"
    //                   : null
    //               }`}
    //               aria-hidden="true"
    //             />
    //           )}
    //         </div>
    //         <div className="flex items-center">
    //           <small className="text-xs bg-slate-600 px-2 shadow py-0.5 sm:py-1.5 rounded text-white relative right-2">
    //             {post.topic}
    //           </small>
    //           <Menu as="div" className="relative inline-block text-left">
    //             <div>
    //               <Menu.Button className="rounded px-3 py-1.5 text-sm font-medium  hover:bg-slate-50 focus:outline-none">
    //                 <svg
    //                   className="w-5 h-5"
    //                   aria-hidden="true"
    //                   fill="currentColor"
    //                   viewBox="0 0 20 20"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
    //                 </svg>
    //               </Menu.Button>
    //             </div>

    //             <Transition
    //               as={Fragment}
    //               enter="transition ease-out duration-100"
    //               enterFrom="transform opacity-0 scale-95"
    //               enterTo="transform opacity-100 scale-100"
    //               leave="transition ease-in duration-75"
    //               leaveFrom="transform opacity-100 scale-100"
    //               leaveTo="transform opacity-0 scale-95"
    //             >
    //               <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
    //                 <div className="py-1">
    //                   <Menu.Item>
    //                     {({ active }) => (
    //                       <button
    //                         className={classNames(
    //                           active
    //                             ? "bg-slate-100 text-slate-600"
    //                             : "text-slate-600",
    //                           "block px-4 py-2 text-sm text-left w-full"
    //                         )}
    //                       >
    //                         Edit
    //                       </button>
    //                     )}
    //                   </Menu.Item>
    //                   <Menu.Item>
    //                     {({ active }) => (
    //                       <button
    //                         onClick={onRemovePost}
    //                         className={classNames(
    //                           active
    //                             ? "bg-slate-100 text-slate-600"
    //                             : "text-slate-600",
    //                           "block px-4 py-2 text-sm text-left w-full"
    //                         )}
    //                       >
    //                         Delete
    //                       </button>
    //                     )}
    //                   </Menu.Item>
    //                   <Menu.Item>
    //                     {({ active }) => (
    //                       <button
    //                         className={classNames(
    //                           active
    //                             ? "bg-slate-100 text-slate-600"
    //                             : "text-slate-600",
    //                           "block px-4 py-2 text-sm text-left w-full"
    //                         )}
    //                       >
    //                         Report
    //                       </button>
    //                     )}
    //                   </Menu.Item>
    //                 </div>
    //               </Menu.Items>
    //             </Transition>
    //           </Menu>
    //         </div>
    //       </div>
    //       <div className="text-slate-500 text-xs relative bottom-1.5">
    //         {post.User.role}
    //       </div>
    //       <div className="mt-3 mb-4">
    //         <div className=" text-slate-600 text-sm md:text-md break-all">
    //           {post.content}
    //         </div>
    //         {post.PostImages[0] && <PostImages postImages={post.PostImages} />}
    //       </div>
    //       <div className="relative mt-4 pt-1 mr-4 border-t flex items-center">
    //         <button className="flex items-center hover:text-indigo-500 text-slate-600 text-sm mr-3">
    //           <BoltIcon
    //             className="stroke-2 block h-5 w-5  "
    //             aria-hidden="true"
    //           />
    //           <span className="ml-1">122</span>
    //         </button>
    //         <button
    //           onClick={onToggleCommentSection}
    //           className="flex items-center hover:text-indigo-500 text-slate-600 text-sm mr-8"
    //         >
    //           <ChatBubbleOvalLeftEllipsisIcon className="stroke-2 block h-5 w-5 " />
    //           <span className="ml-1">{post.Comments?.length}</span>
    //         </button>
    //         <button className="flex items-center hover:text-indigo-500 text-slate-600 text-sm mr-3">
    //           <UserPlusIcon
    //             className="stroke-2 block h-5 w-5  "
    //             aria-hidden="true"
    //           />
    //           <span className="ml-1">Trace</span>
    //         </button>
    //         <small className="absolute right-0 text-sm text-slate-400">
    //           {dayjs(post.createdAt).format("YYYY.MM.DD | H:mm:ss")}
    //         </small>
    //       </div>
    //     </div>
    //   </div>
    //   {toggleCommentSection && <CommentSection post={post} />}
    // </div>
  );
};

PostSection.propTypes = {
  post: PropTypes.object.isRequired,
};
export default PostSection;
