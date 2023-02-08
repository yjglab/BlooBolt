import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import CommentSection from "./CommentSection";
import { REMOVE_POST_REQUEST } from "../pages/reducers/post";

import {
  ChatBubbleLeftRightIcon,
  BoltIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/20/solid";
import PostImages from "./PostImages";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  return (
    <div className="flex flex-col mb-6">
      <div className="flex bg-white shadow rounded-lg w-full px-4 py-6 ">
        <img
          className={`w-12 h-12 rounded-full object-cover mr-4 shadow border-2 p-0.5 ${
            post.User.status ? "border-cyan-400" : "border-gray-700"
          }`}
          src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="avatar"
        />
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700 -mt-1">
              {post.User.username}
            </h2>
            <div className="flex items-center">
              <small className="text-sm text-gray-400 relative right-2">
                {post.createdAt}
              </small>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="rounded-md px-3 py-1.5 text-sm font-medium  hover:bg-gray-50 focus:outline-none">
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
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={onRemovePost}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Report
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="text-gray-500 text-xs relative bottom-1.5">
            {post.User.role}
          </div>
          <div className="mt-3 mb-4">
            <div className=" text-gray-700 text-md break-all">
              {post.content}
            </div>
            {post.Images[0] && <PostImages images={post.Images} />}
          </div>
          <div className="mt-4 pt-1 mr-4 border-t flex items-center">
            <div className="flex items-center text-gray-700 text-sm mr-3">
              <BoltIcon
                className="stroke-2 block h-5 w-5 hover:text-cyan-500 cursor-pointer"
                aria-hidden="true"
              />
              <span className="ml-1">122</span>
            </div>
            <div className="flex items-center text-gray-700 text-sm mr-8">
              <ChatBubbleOvalLeftEllipsisIcon className="stroke-2 block h-5 w-5  hover:text-cyan-500 cursor-pointer" />
              <span className="ml-1">{post.Comments.length}</span>
            </div>
          </div>
        </div>
      </div>
      <CommentSection post={post} />
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};
export default PostCard;
