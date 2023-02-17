import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";

import CommentForm from "./CommentForm";
import {
  ArrowsPointingOutIcon,
  BoltIcon,
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
  TrophyIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CommentSection = ({ post, onToggleCommentSection }) => {
  return (
    <>
      <div className="w-full h-[75%] pb-3 overflow-y-auto ">
        {post.Comments?.map((comment) => (
          <div
            key={comment.id}
            className={`p-3 my-1 ${
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
              <Menu
                as="div"
                className="relative bottom-2 inline-block text-left "
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
                  <Menu.Items className="absolute right-1 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
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
            <div className="mb-2 text-sm break-words font-normal text-slate-600">
              <p>{comment.content}</p>
            </div>
            <div className="flex relative gap-2 text-sm items-center">
              <button className="flex items-center gap-0.5 hover:text-indigo-500 text-slate-600 ">
                <BoltIcon className="w-4" />
                <span>12</span>
              </button>
              <button className="flex items-center gap-0.5 hover:text-indigo-500 text-slate-600 ">
                <UserPlusIcon className="w-4" />
                <span>Trace</span>
              </button>
              <button
                // onClick={onExtendComment}
                className="flex absolute right-2 items-center hover:text-indigo-500 text-slate-600 "
              >
                {/* <ChevronDownIcon className="w-7" /> */}
              </button>
            </div>
          </div>
        ))}
      </div>

      <CommentForm
        post={post}
        onToggleCommentSection={onToggleCommentSection}
      />
    </>
  );
};

CommentSection.propTypes = {
  post: PropTypes.object.isRequired,
  onToggleCommentSection: PropTypes.func.isRequired,
};
export default CommentSection;
