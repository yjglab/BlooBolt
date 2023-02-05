import { Menu, Transition } from "@headlessui/react";

import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const { me } = useSelector((state) => state.user);

  // const liked = post.Likers.find((v) => v.id === id);
  return (
    <AppLayout>
      <div className="flex h-screen overflow-y-scroll bg-gray-100">
        <div className="mt-24 w-2/5 ml-12">
          <div className="font-bold">좌측사이드바</div>
        </div>
        <div className="mt-24 w-full h-full mr-12 relative ">
          <div className="font-bold text-gray-700 text-2xl">User Square</div>
          {/* 포스트입력폼 */}
          <PostForm />
          {/* 개별포스트 */}
          <div className="flex bg-white shadow rounded-lg">
            <div className="flex w-full px-4 py-6 ">
              <img
                className="w-12 h-12 rounded-full object-cover mr-4 shadow border-4 border-gray-700"
                src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="avatar"
              />
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-700 -mt-1">
                    dwqdqwdqwd
                  </h2>
                  <div className="flex items-center">
                    <small className="text-sm text-gray-700 relative right-2">
                      22h ago
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
                  </div>
                </div>
                <div className="text-gray-500 text-xs relative bottom-1.5">
                  역할or직위
                </div>
                <div className="mt-3 text-gray-700 text-md">포스트내용</div>
                <div className="mt-4 flex items-center">
                  <div className="flex items-center text-gray-700 text-sm mr-3">
                    <svg
                      className="h-5 w-5 text-black hover:text-red-500 cursor-pointer"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
                    </svg>
                    <span className="ml-1">12</span>
                  </div>
                  <div className="flex items-center text-gray-700 text-sm mr-8">
                    <svg
                      className="h-5 w-5 text-black hover:text-yellow-400 cursor-pointer"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                      <line x1="12" y1="11" x2="12" y2="11.01" />
                      <line x1="8" y1="11" x2="8" y2="11.01" />
                      <line x1="16" y1="11" x2="16" y2="11.01" />
                    </svg>
                    <span className="ml-1">8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 댓글 */}
          <div className="absolute right-0 px-4 py-4 bg-white w-4/5 my-4 shadow rounded-lg rounded-t-lg">
            <form className="mb-16 relative">
              <div className="pt-2 pb-0 px-3 mb-2 border-b w-full  ">
                <label htmlFor="comment" className="sr-only"></label>
                <textarea
                  id="comment"
                  rows="3"
                  className="px-0 w-full text-sm  border-0 focus:ring-0 focus:outline-none "
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="absolute right-0 shadow items-center py-2 px-4 text-xs font-medium text-center   rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-700"
              >
                Flash
              </button>
            </form>
            {/* 개별댓글 */}
            <article className="my-3 px-2 pt-2 pb-4 text-base border-b">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex w-full items-center justify-between">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-700 ">
                    <img
                      className="mr-2 w-8 h-8 rounded-full border-4 border-gray-700"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael Gough"
                    />
                    <div className="font-bold">댓글러</div>
                  </div>
                  <div className="text-sm text-gray-400 relative right-2">
                    댓글createdAt
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
              <div className="text-gray-500 text-md">댓글내용</div>
            </article>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
