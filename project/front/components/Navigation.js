import React, { useCallback } from "react";
import { Transition, Popover } from "@headlessui/react";
import {} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "../pages/reducers/user";
import Link from "next/link";
import { Fragment } from "react";
import {
  PhoneIcon,
  PlayIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  HeartIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";

const solutions = [
  {
    name: "유저메뉴1",
    description: "유저메뉴설명",
    href: "#",
    icon: HeartIcon,
  },
];
const callsToAction = [
  { name: "aa", href: "#", icon: HeartIcon },
  { name: "bb", href: "#", icon: HeartIcon },
];
const resources = [
  {
    name: "Center",
    description: "Center설명",
    href: "#",
    icon: HeartIcon,
  },
];
const recentPosts = [{ id: 1, name: "최근포스트", href: "#" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navigation = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  });

  return (
    <Popover className="fixed top-0 w-full left-0 z-50 shadow">
      <div className="">
        <div className="px-6 flex bg-white items-center justify-between  py-2.5 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1 ">
            <Link href="/">
              <img
                className="h-8 w-auto sm:h-10 cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/880/880910.png"
                alt="logo-image"
              />
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500/90">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-6 md:flex">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "text-gray-700" : "text-gray-500",
                      "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/90 focus:ring-offset-2"
                    )}
                  >
                    <span>Area</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? "text-gray-600" : "text-gray-400",
                        "ml-2 h-5 w-5 group-hover:text-gray-500"
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute ml-20 lg:ml-0 xs:ml-0 left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/3 lg:-translate-x-1/2 transform px-2 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link href="/">
                            <button className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                              <UserGroupIcon
                                className="h-6 w-6 flex-shrink-0 text-indigo-500/90"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base text-left font-medium text-gray-900">
                                  User Square
                                </p>
                                <p className="mt-0.5 text-xs text-gray-500 text-left">
                                  새로운 주제를 제안해보세요.
                                </p>
                              </div>
                            </button>
                          </Link>
                          <Link href={me ? "/profile" : "/login"}>
                            <button className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                              <UserCircleIcon
                                className="h-6 w-6 flex-shrink-0 text-indigo-500/90"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base text-left font-medium text-gray-900">
                                  Profile
                                </p>
                                <p className="mt-0.5 text-xs text-gray-500 text-left">
                                  내 정보를 수정할 수 있습니다.
                                </p>
                              </div>
                            </button>
                          </Link>
                        </div>

                        <div className="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8">
                          <div>
                            <h3 className="text-base font-medium text-gray-500">
                              Recent Posts
                            </h3>
                            <ul role="list" className="mt-4 space-y-4">
                              {recentPosts.map((post) => (
                                <li
                                  key={post.id}
                                  className="truncate text-base"
                                >
                                  <a
                                    href={post.href}
                                    className="font-medium text-gray-900 hover:text-gray-700"
                                  >
                                    {post.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-5 text-sm">
                            <a
                              href="#"
                              className="font-medium text-indigo-500/90 hover:text-indigo-600"
                            >
                              View all posts
                              <span aria-hidden="true"> &rarr;</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            {/* <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "text-gray-700" : "text-gray-500",
                      "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/90 focus:ring-offset-2"
                    )}
                  >
                    <span>User Section</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? "text-gray-600" : "text-gray-400",
                        "ml-2 h-5 w-5 group-hover:text-gray-500"
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute ml-20 lg:ml-0 xs:ml-0 left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/3 lg:-translate-x-1/2 transform px-2 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link href="/">
                            <button className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                              <UserGroupIcon
                                className="h-6 w-6 flex-shrink-0 text-indigo-500/90"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base text-left font-medium text-gray-900">
                                  User Square
                                </p>
                                <p className="mt-0.5 text-xs text-gray-500 text-left">
                                  새로운 주제를 제안해보세요.
                                </p>
                              </div>
                            </button>
                          </Link>
                          <Link href="/profile">
                            <button className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                              <UserCircleIcon
                                className="h-6 w-6 flex-shrink-0 text-indigo-500/90"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base text-left font-medium text-gray-900">
                                  Profile
                                </p>
                                <p className="mt-0.5 text-xs text-gray-500 text-left">
                                  내 정보를 수정할 수 있습니다.
                                </p>
                              </div>
                            </button>
                          </Link>
                        </div>

                        <div className="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8">
                          <div>
                            <h3 className="text-base font-medium text-gray-500">
                              Recent Posts
                            </h3>
                            <ul role="list" className="mt-4 space-y-4">
                              {recentPosts.map((post) => (
                                <li
                                  key={post.id}
                                  className="truncate text-base"
                                >
                                  <a
                                    href={post.href}
                                    className="font-medium text-gray-900 hover:text-gray-700"
                                  >
                                    {post.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-5 text-sm">
                            <a
                              href="#"
                              className="font-medium text-indigo-500/90 hover:text-indigo-600"
                            >
                              View all posts
                              <span aria-hidden="true"> &rarr;</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover> */}
            <Link href="/about">
              <div
                href="#"
                className="cursor-pointer hover:text-gray-700 text-base font-medium text-gray-500"
              >
                About
              </div>
            </Link>
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {me ? (
              <>
                <button
                  onClick={onLogout}
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Logout
                </button>
                <Link href="/profile">
                  <img
                    className="cursor-pointer ml-6 h-10 w-10 rounded-full object-cover"
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="avatar-image"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup">
                  <div className="cursor-pointer whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                    Sign Up
                  </div>
                </Link>
                <Link href="/login">
                  <div className="cursor-pointer ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-500/90 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600">
                    Login
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://cdn-icons-png.flaticon.com/512/880/880910.png"
                    alt="logo-image"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500/90">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <item.icon
                        className="h-6 w-6 flex-shrink-0 text-indigo-500/90"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Pricing
                </a>

                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Docs
                </a>
                {resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div>
                {me ? (
                  <button
                    onClick={onLogout}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500/90 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-500/90"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link href="/login">
                      <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500/90 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-500/90">
                        Login
                      </div>
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Already have an account?{" "}
                      <Link href="/signup">
                        <span className="text-indigo-500/90 hover:text-indigo-500/90">
                          Sign up
                        </span>
                      </Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navigation;
