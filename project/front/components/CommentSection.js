import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  return (
    <div className="w-full flex justify-end">
      <div className="px-4 pt-4 bg-white w-5/6 sm:w-4/5 my-2 shadow rounded-lg rounded-t-lg">
        <CommentForm />
        {post.Comments.map((comment) => (
          <div
            key={comment.id}
            className="mt-2 mb-7 px-2 pt-2 pb-4 relative text-base border-b"
          >
            <span className="text-xs text-gray-400 absolute right-2 bottom-2">
              {comment.createdAt}
            </span>
            <footer className="flex justify-between items-center mb-2">
              <div className="flex w-full items-center">
                <div className="inline-flex items-center mr-3 text-sm text-gray-700 ">
                  <img
                    className={`mr-2 w-8 h-8 rounded-full shadow border-2 p-0.5 ${
                      comment.User.status
                        ? "border-indigo-400"
                        : "border-gray-700"
                    }`}
                    src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg"
                    alt="avatar"
                  />
                  <div className="relative bottom-0.5 font-semibold text-base">
                    {comment.User.username}
                  </div>
                </div>
                <div className=" text-xs text-gray-400 ">
                  {comment.User.role}
                </div>
              </div>
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
                            Delete
                          </a>
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
            </footer>
            <div className="text-gray-500 text-md break-all pb-6">
              {comment.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  post: PropTypes.object.isRequired,
};
export default CommentSection;
