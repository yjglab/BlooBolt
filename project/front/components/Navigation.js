import React, { useCallback, useEffect, useState } from "react";
import { Transition, Popover } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Fragment } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import {
  ArrowPathIcon,
  ArrowUturnUpIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  ChevronDownIcon,
  CodeBracketIcon,
  CommandLineIcon,
  CubeIcon,
  FaceSmileIcon,
  LightBulbIcon,
  MegaphoneIcon,
  PaintBrushIcon,
  RectangleGroupIcon,
  ServerIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
  WrenchIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import bloobolt_logo_nobg from "../public/bloobolt_logo_nobg.png";
import Router from "next/router";
import { backUrl } from "../config/config";

import { logOut } from "../reducers/userSlice";
import { cancelAllPostImages } from "../reducers/postSlice";
import { openNotice } from "../reducers/globalSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navigation = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { loadPostsLoading } = useSelector((state) => state.post);
  const [helper, setHelper] = useState(false);

  useEffect(() => {
    function onScreenScroll() {
      if (window.scrollY + document.documentElement.clientHeight > 1250) {
        setHelper(true);
      } else {
        setHelper(false);
      }
    }
    window.addEventListener("scroll", onScreenScroll);
    return () => {
      window.removeEventListener("scroll", onScreenScroll);
    };
  }, []);

  const onGotoTop = useCallback(() => {
    window.scrollTo(0, 0);
  });

  const onLogout = useCallback(() => {
    dispatch(logOut());
    dispatch(cancelAllPostImages());
    Router.push("/square");
  });

  const onPreparing = useCallback(() => {
    dispatch(
      openNotice({
        type: 2,
        content: "멤버스는 준비중인 기능입니다.",
      })
    );
  });
  return (
    <Popover className="fixed top-0 w-[100vw] left-0 z-50 bg-white shadow-xl shadow-slate-300/20">
      {loadPostsLoading ? (
        <ArrowPathIcon className="bg-indigo-500 animate-spin p-2 rounded-full fixed w-10 text-white mx-auto left-0 right-0 bottom-10" />
      ) : null}
      {helper && (
        <button
          onClick={onGotoTop}
          className="shadow-xl hover:bg-indigo-600 hover:scale-105 p-3.5 bg-indigo-500 rounded-full fixed bottom-10 right-4"
        >
          <ArrowUturnUpIcon className="w-5 text-white shadow-lg" />
        </button>
      )}
      <div className="">
        <div className="px-6 flex  items-center justify-between  py-2 md:justify-start md:space-x-10">
          <div className="lg:w-0 lg:flex-1 flex justify-start">
            <div className="  ">
              <Link href="/square">
                <div className="cursor-pointer flex items-center text-xl font-bold ">
                  <div className="h-7 w-7 relative mr-1.5">
                    <Image
                      className=" cursor-pointer w-full h-full"
                      src={bloobolt_logo_nobg}
                      alt="logo-image"
                    />
                  </div>
                  <span className="sm:inline text-indigo-500">BlooBolt</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <Popover.Group
            as="nav"
            className="items-center hidden space-x-6 md:flex"
          >
            <Link href="/">
              <div className="cursor-pointer hover:text-slate-600 text-base font-medium text-slate-500">
                홈
              </div>
            </Link>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "text-slate-600" : "text-slate-500",
                      "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    )}
                  >
                    <span>스퀘어</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? "text-slate-600" : "text-slate-400",
                        "ml-2 h-5 w-5 group-hover:text-slate-500"
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
                      <div className="overflow-hidden shadow-xl rounded-md shadow-md-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link href="/square">
                            <button className="-m-3 flex items-start rounded-md p-3 hover:bg-slate-50">
                              <BuildingLibraryIcon
                                className="h-6 w-6 flex-shrink-0 text-indigo-500"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base text-left font-medium text-slate-600">
                                  Public Square
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500 text-left">
                                  아무나 참여해요!
                                </p>
                              </div>
                            </button>
                          </Link>{" "}
                          <Link href="/square-fedev">
                            <button className="-m-3 flex items-start rounded-md p-3 hover:bg-slate-50">
                              <RectangleGroupIcon
                                className="h-6 w-6 flex-shrink-0 text-indigo-500"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base text-left font-medium text-slate-600">
                                  Frontend Square
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500 text-left">
                                  프론트엔드 개발자에요!
                                </p>
                              </div>
                            </button>
                          </Link>
                          <Link href="/square-bedev">
                            <button className="-m-3 flex items-start rounded-md p-3 hover:bg-slate-50">
                              <ServerStackIcon
                                className="h-6 w-6 flex-shrink-0 text-indigo-500"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base text-left font-medium text-slate-600">
                                  Backend Square
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500 text-left">
                                  백엔드 개발자에요!
                                </p>
                              </div>
                            </button>
                          </Link>
                          <Link href="/square-design">
                            <button className="-m-3 flex items-start rounded-md p-3 hover:bg-slate-50">
                              <PaintBrushIcon
                                className="h-6 w-6 flex-shrink-0 text-indigo-500"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base text-left font-medium text-slate-600">
                                  Design Square
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500 text-left">
                                  UX/UI 디자이너에요!
                                </p>
                              </div>
                            </button>
                          </Link>
                        </div>

                        {/* <div className="bg-slate-50 px-5 py-5 sm:px-8 sm:py-6">
                          <div>
                            <h3 className="text-base font-medium text-slate-500">
                              Recent Traced
                            </h3>
                            <ul role="list" className="mt-4 space-y-4">
                              <li className="truncate text-base">
                                <a className="font-medium text-slate-600 hover:text-slate-600">
                                  {"post.name"}
                                </a>
                              </li>
                              <li className="truncate text-base">
                                <a className="font-medium text-slate-600 hover:text-slate-600">
                                  {"post.name"}
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="mt-5 text-sm">
                            <a
                              href="#"
                              className="font-medium text-indigo-500 hover:text-indigo-600"
                            >
                              View all posts
                              <span aria-hidden="true"> &rarr;</span>
                            </a>
                          </div>
                        </div> */}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>{" "}
            {/* <Link href="/members"> */}
            <div
              onClick={onPreparing}
              className="cursor-pointer hover:text-slate-600 text-base font-medium text-slate-500"
            >
              멤버스
            </div>
            {/* </Link> */}
            <Link href="/guide">
              <div className="cursor-pointer hover:text-slate-600 text-base font-medium text-slate-500">
                가이드
              </div>
            </Link>
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {me ? (
              <>
                <button
                  onClick={onLogout}
                  className="whitespace-nowrap text-base font-medium text-slate-500 hover:text-slate-600"
                >
                  로그아웃
                </button>

                <>
                  <Link href={`/profile/${me.username}`}>
                    <div className="cursor-pointer ml-3.5 font-bold">
                      {me.username}
                    </div>
                  </Link>
                  <Link href={`/profile/${me.username}`}>
                    <img
                      className="cursor-pointer ml-4 h-10 w-10 rounded-full object-cover"
                      src={
                        process.env.NODE_ENV === "production"
                          ? ``
                          : `${backUrl}/${me.avatar}`
                      }
                      alt="avatar-image"
                    />
                  </Link>
                </>
              </>
            ) : (
              <>
                <Link href="/signup">
                  <div className="cursor-pointer whitespace-nowrap text-base font-medium text-slate-500 hover:text-slate-600">
                    회원가입
                  </div>
                </Link>
                <Link href="/login">
                  <div className="cursor-pointer ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-md-sm hover:bg-indigo-600">
                    로그인
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 모바일 */}
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
          className="absolute  inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="shadow-xl divide-y-2 divide-slate-50 rounded-md bg-white shadow-md-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <Link href="/">
                  <div className="flex items-center text-xl font-bold text-indigo-500">
                    <div className="w-6 h-6 mr-1">
                      <Image
                        className=" cursor-pointer w-full h-full"
                        src={bloobolt_logo_nobg}
                        alt="logo-image"
                      />
                    </div>
                    BlooBolt
                  </div>
                </Link>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <div className="grid grid-cols-2">
                    <Link href="/square">
                      <div className="-m-3 flex items-center rounded-md p-3 hover:bg-slate-50">
                        <BuildingLibraryIcon
                          className="h-6 w-6 flex-shrink-0 text-indigo-500"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-slate-600">
                          퍼블릭 스퀘어
                        </span>
                      </div>
                    </Link>
                    <Link href="/squar-fedev">
                      <div className="-m-3 flex items-center rounded-md p-3 hover:bg-slate-50">
                        <RectangleGroupIcon
                          className="h-6 w-6 flex-shrink-0 text-indigo-500"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-slate-600">
                          프론트엔드 스퀘어
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="grid grid-cols-2">
                    <Link href="/square-bedev">
                      <div className="-m-3 flex items-center rounded-md p-3 hover:bg-slate-50">
                        <ServerStackIcon
                          className="h-6 w-6 flex-shrink-0 text-indigo-500"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-slate-600">
                          백엔드 스퀘어
                        </span>
                      </div>
                    </Link>
                    <Link href="/square-design">
                      <div className="-m-3 flex items-center rounded-md p-3 hover:bg-slate-50">
                        <PaintBrushIcon
                          className="h-6 w-6 flex-shrink-0 text-indigo-500"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-slate-600">
                          디자인 스퀘어
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="grid grid-cols-2">
                    <Link href={me ? `/profile/${me.username}` : `/login`}>
                      <div className="-m-3 flex items-center rounded-md p-3 hover:bg-slate-50">
                        <UserIcon
                          className="h-6 w-6 flex-shrink-0 text-indigo-500"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-slate-600">
                          프로필
                        </span>
                      </div>
                    </Link>
                    <Link href={me ? `/profile/${me.username}` : `/login`}>
                      <div className="-m-3 flex items-center rounded-md p-3 hover:bg-slate-50">
                        <BookOpenIcon
                          className="h-6 w-6 flex-shrink-0 text-indigo-500"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-slate-600">
                          가이드
                        </span>
                      </div>
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {me && (
                  <div className="mb-3 flex items-center">
                    <Link href={`/profile/${me.username}`}>
                      <img
                        src={
                          process.env.NODE_ENV === "production"
                            ? ``
                            : `${backUrl}/${me.avatar}`
                        }
                        className={`cursor-pointer h-[50px] w-[50px] aspect-square border-[3px] ${"border-indigo-500"} p-0.5 rounded-full object-cover`}
                      />
                    </Link>
                    <div className="ml-2 w-full flex flex-col">
                      <Link href={`/profile/${me.username}`}>
                        <h1 className="cursor-pointer text-md font-bold flex items-center">
                          {me.username}
                          <>
                            {me.rank === 6 ? (
                              <FaceSmileIcon
                                className="w-4 ml-0.5 text-slate-400"
                                aria-hidden="true"
                              />
                            ) : me.rank === 0 ? null : (
                              <ShieldCheckIcon
                                className={`w-4 ml-0.5 flex-shrink-0 ${
                                  me.rank === 1
                                    ? "text-cyan-400"
                                    : me.rank === 2
                                    ? "text-amber-400"
                                    : me.rank === 3
                                    ? "text-amber-600/90"
                                    : me.rank === 4
                                    ? "text-lime-500"
                                    : me.rank === 5
                                    ? "text-slate-400"
                                    : me.rank === 9
                                    ? "text-red-400"
                                    : null
                                }`}
                                aria-hidden="true"
                              />
                            )}
                          </>
                        </h1>
                      </Link>
                      <h1 className="text-xs relative bottom-0.5">{me.role}</h1>
                    </div>
                  </div>
                )}
              </div>
              <div>
                {me ? (
                  <button
                    onClick={onLogout}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-md-sm hover:bg-indigo-500"
                  >
                    로그아웃
                  </button>
                ) : (
                  <>
                    <Link href="/login">
                      <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-md-sm hover:bg-indigo-500">
                        로그인
                      </div>
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-slate-500">
                      계정이 없으신가요?
                      <Link href="/signup">
                        <span className="ml-1 text-indigo-500 hover:text-indigo-500">
                          회원가입
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
