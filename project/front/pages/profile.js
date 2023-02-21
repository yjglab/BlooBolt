import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";

import { Fragment } from "react";
import {
  CameraIcon,
  CheckIcon,
  ChevronDownIcon,
  CursorArrowRippleIcon,
  GlobeAsiaAustraliaIcon,
  PauseCircleIcon,
  PencilIcon,
  PhotoIcon,
  PlayCircleIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition, Tab } from "@headlessui/react";
import AppLayout from "../components/AppLayout";
import UserActivity from "../components/UserActivity";
import UserInformation from "../components/UserInformation";
import Link from "next/link";
import UserAvatar from "../components/UserAvatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me?.id)) {
      Router.push("/square");
    }
  }, [me && me?.id]);

  return (
    <AppLayout>
      <div className="pt-20 px-6 pb-6 w-full bg-white md:flex md:items-center md:justify-between">
        <div className="flex justify-center md:block">
          <UserAvatar me={me} />
        </div>
        <div className="flex items-center flex-col md:flex-1 md:block ">
          <div className="flex flex-col  mb-1 items-center md:items-start">
            <h2 className="text-2xl font-bold leading-7 text-slate-600 md:truncate md:text-3xl md:tracking-tight">
              {me?.username}
            </h2>
            <div className="flex items-center mt-1 mb-2">
              {me?.Userboard.rank !== 0 ? (
                <>
                  <Link href="#">
                    <ShieldCheckIcon
                      className={`  h-5 w-5 flex-shrink-0 ${
                        me?.Userboard.rank === 1
                          ? "text-cyan-400"
                          : me?.Userboard.rank === 2
                          ? "text-amber-400"
                          : me?.Userboard.rank === 3
                          ? "text-amber-700/70"
                          : me?.Userboard.rank === 4
                          ? "text-indigo-500"
                          : me?.Userboard.rank === 5
                          ? "text-slate-400"
                          : me?.Userboard.rank === 9
                          ? "text-red-400"
                          : null
                      }`}
                      aria-hidden="true"
                    />
                  </Link>{" "}
                  <span className="text-sm ml-1">Rank</span>
                  <span className="text-sm ml-1 font-bold">
                    {me.Userboard.rank}
                  </span>
                </>
              ) : (
                <Link href="#">
                  <span className="cursor-pointer  px-2 py-0.5 rounded-md bg-slate-400 relative  text-xs text-white">
                    Not Ranked
                  </span>
                </Link>
              )}
              <span className="ml-2 text-xs bg-slate-400 px-2 py-0.5 text-white rounded-md">
                Rank Point{" "}
                <span className="ml-1 font-bold ">
                  {me.Userboard.rankPoint}
                </span>
              </span>
            </div>
          </div>
          <div className="mt-1 flex gap-0 sm:gap-3 flex-col sm:flex-row sm:flex-wrap ">
            <div className="md:flex md:gap-3">
              <div className="mt-2 flex items-center text-sm text-slate-500">
                {me?.status ? (
                  <>
                    <PlayCircleIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-indigo-500"
                      aria-hidden="true"
                    />
                    Active
                  </>
                ) : (
                  <>
                    <PauseCircleIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                      aria-hidden="true"
                    />
                    Offline
                  </>
                )}
              </div>

              <div className="mt-2 flex items-center text-sm text-slate-500">
                <UserCircleIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                  aria-hidden="true"
                />
                {me?.role || "No role"}
              </div>
            </div>
            <div className="md:flex md:gap-3">
              <div className="mt-2 flex items-center text-sm text-slate-500">
                <CursorArrowRippleIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                  aria-hidden="true"
                />
                <a
                  href={me?.website}
                  target="_blank"
                  rel="noreferrer noopenner"
                >
                  {me?.website || "No website"}
                </a>
              </div>
              <div className="mt-2 flex items-center text-sm text-slate-500">
                <GlobeAsiaAustraliaIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                  aria-hidden="true"
                />
                {me?.country || "No country"}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-5 md:mt-0 flex ">
          <span className="hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PencilIcon
                className="-ml-1 mr-2 h-5 w-5 text-slate-500"
                aria-hidden="true"
              />
              Edit
            </button>
          </span>

          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Trace
            </button>
          </span>

          <Menu as="div" className="relative ml-3 sm:hidden">
            <Menu.Button className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              More
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5 text-slate-500"
                aria-hidden="true"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-slate-100" : "",
                        "block px-4 py-2 text-sm text-slate-600"
                      )}
                    >
                      Edit
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div> */}
      </div>
      <div className="w-full flex-col bg-slate-50  justify-between flex sm:flex-row p-6  ">
        {/* 좌측 */}
        <UserInformation />
        {/* 우측 */}
        <UserActivity />
      </div>
    </AppLayout>
  );
};

export default Profile;
