import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import {
  BoltIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  ShieldCheckIcon,
  UserMinusIcon,
} from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { untrace } from "../reducers/userSlice";
import { openNotice } from "../reducers/globalSlice";
import Link from "next/link";
import { backUrl } from "../config/config";
dayjs.locale("ko");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserActivity = ({ owner, me, user }) => {
  const dispatch = useDispatch();

  const onUntrace = (tracing) => () => {
    dispatch(untrace(tracing.id));
    dispatch(
      openNotice({
        content: `${tracing.username}님을 트레이스 리스트에서 제거합니다.`,
        type: 1,
      })
    );
  };

  return (
    <div className={`${owner ? "sm:w-[50%]" : "w-full"} px-3`}>
      <div className="text-2xl font-semibold ">Activity</div>

      <div className="w-full  py-6 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-md bg-white shadow p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-md py-2.5 text-sm font-medium leading-5 ",
                  selected
                    ? "bg-indigo-500 text-white"
                    : " bg-slate-100 hover:bg-slate-200 "
                )
              }
            >
              {`Posts (${user.Posts.length})`}
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-md py-2.5 text-sm font-medium leading-5 ",
                  selected
                    ? "bg-indigo-500 text-white"
                    : " bg-slate-100 hover:bg-slate-200 "
                )
              }
            >
              {`Tracers (${user.Tracers.length})`}
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-md py-2.5 text-sm font-medium leading-5 ",
                  selected
                    ? "bg-indigo-500 text-white"
                    : " bg-slate-100 hover:bg-slate-200 "
                )
              }
            >
              {`Tracings (${(owner ? me.Tracings : user.Tracings).length})`}
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2 rounded-md shadow">
            <Tab.Panel
              className={classNames(
                "rounded-md bg-white p-3  ",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-500 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {user.Posts.length === 0 ? (
                  <div className="rounded-md text-sm text-slate-300 p-3 h-20 flex justify-center items-center hover:bg-slate-100">
                    <span>No Posts</span>
                    <FaceFrownIcon className="w-4 ml-1" />
                  </div>
                ) : (
                  user.Posts.map(
                    (post) =>
                      !post.blinded && (
                        <li
                          key={post.id}
                          className="relative rounded-md p-3  hover:bg-slate-100"
                        >
                          <h3
                            className={`truncate line-clamp-1 ${
                              post.topic ? "text-slate-600" : "text-slate-300"
                            } text-md font-bold leading-5 `}
                          >
                            {post.topic || "토픽 없음"}
                          </h3>
                          <h3 className="line-clamp-3  text-sm leading-5 ">
                            {post.content}
                          </h3>

                          <ul className="mt-3 flex space-x-1 text-xs font-normal leading-4 text-slate-500">
                            <li>
                              {dayjs(post.updatedAt).format(
                                "YYYY.MM.DD | H:mm:ss"
                              )}
                            </li>
                            <li>&middot;</li>
                            <li className="flex">
                              {post.PostProdders.length || 0}{" "}
                              <BoltIcon className="w-3 ml-0.5" />
                            </li>
                            <li>&middot;</li>
                            <li className="flex">
                              {post.Comments.length || 0}{" "}
                              <ChatBubbleOvalLeftEllipsisIcon className="w-3 ml-0.5" />
                            </li>
                          </ul>

                          <Link href={`/post/${post.id}`}>
                            <a
                              className={classNames(
                                "absolute inset-0 rounded-md ",
                                "ring-indigo-500 focus:z-10 focus:outline-none focus:ring-2"
                              )}
                            />
                          </Link>
                        </li>
                      )
                  )
                )}
              </ul>
            </Tab.Panel>

            <Tab.Panel
              className={classNames(
                "rounded-md bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-500 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {user.Tracers.length === 0 ? (
                  <div className="rounded-md text-sm text-slate-300 p-3 h-20 flex justify-center items-center hover:bg-slate-100">
                    <span>No Tracers</span>
                    <FaceFrownIcon className="w-4 ml-1" />
                  </div>
                ) : (
                  user.Tracers.map((tracer) => (
                    <li
                      key={tracer.id}
                      className="cursor-pointer rounded-md p-3  hover:bg-slate-100"
                    >
                      <div className=" flex items-center">
                        <Link href={`/profile/${tracer.username}`}>
                          <img
                            src={
                              process.env.NODE_ENV === "production"
                                ? ``
                                : `${backUrl}/${tracer.avatar}`
                            }
                            className={` h-[50px] w-[50px] border-[3px] ${"border-indigo-500"} p-0.5 rounded-full object-cover`}
                          />
                        </Link>

                        <div className="ml-2 w-full flex flex-col">
                          <Link href={`/profile/${tracer.username}`}>
                            <h1 className="cursor-pointer text-md font-bold flex items-center">
                              {tracer.username}
                              <>
                                {tracer.rank === 6 ? (
                                  <FaceSmileIcon
                                    className="w-4 ml-0.5 text-slate-400"
                                    aria-hidden="true"
                                  />
                                ) : tracer.rank === 0 ? null : (
                                  <ShieldCheckIcon
                                    className={`w-4 ml-0.5 flex-shrink-0 ${
                                      tracer.rank === 1
                                        ? "text-cyan-400"
                                        : tracer.rank === 2
                                        ? "text-amber-400"
                                        : tracer.rank === 3
                                        ? "text-amber-600/90"
                                        : tracer.rank === 4
                                        ? "text-lime-500"
                                        : tracer.rank === 5
                                        ? "text-slate-400"
                                        : tracer.rank === 9
                                        ? "text-red-400"
                                        : null
                                    }`}
                                    aria-hidden="true"
                                  />
                                )}
                              </>
                            </h1>
                          </Link>

                          <div className="flex items-center justify-between">
                            <h1 className="text-xs relative bottom-0.5">
                              {tracer.role}
                            </h1>
                            <h1 className="text-xs relative bottom-0.5">
                              {/* {dayjs(tracer.Trace.createdAt).format(
                                "YYYY.MM.DD"
                              )}{" "} */}
                              {owner ? "나를 등록함" : "등록됨"}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </Tab.Panel>

            <Tab.Panel
              className={classNames(
                "rounded-md bg-white p-3 ",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-500 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {(owner ? me.Tracings : user.Tracings).length === 0 ? (
                  <div className="rounded-md text-sm text-slate-300 p-3 h-20 flex justify-center items-center hover:bg-slate-100">
                    <span>No Tracings</span>
                    <FaceFrownIcon className="w-4 ml-1" />
                  </div>
                ) : (
                  (owner ? me.Tracings : user.Tracings).map((tracing) => (
                    <li
                      key={tracing.id}
                      className="rounded-md p-3  hover:bg-slate-100"
                    >
                      <div className="cursor-pointer flex items-center">
                        <Link href={`/profile/${tracing.username}`}>
                          <img
                            src={
                              process.env.NODE_ENV === "production"
                                ? ``
                                : `${backUrl}/${tracing.avatar}`
                            }
                            className={`h-[50px] w-[50px] border-[3px] ${"border-indigo-500"} p-0.5 rounded-full object-cover`}
                          />
                        </Link>
                        <div className="ml-2 w-full flex flex-col">
                          <div className="flex items-center justify-between">
                            <Link href={`/profile/${tracing.username}`}>
                              <h1 className="text-md font-bold flex items-center">
                                {tracing.username}
                                <>
                                  {tracing.rank === 6 ? (
                                    <FaceSmileIcon
                                      className="w-4 ml-0.5 text-slate-400"
                                      aria-hidden="true"
                                    />
                                  ) : tracing.rank === 0 ? null : (
                                    <ShieldCheckIcon
                                      className={`w-4 ml-0.5 flex-shrink-0 ${
                                        tracing.rank === 1
                                          ? "text-cyan-400"
                                          : tracing.rank === 2
                                          ? "text-amber-400"
                                          : tracing.rank === 3
                                          ? "text-amber-600/90"
                                          : tracing.rank === 4
                                          ? "text-lime-500"
                                          : tracing.rank === 5
                                          ? "text-slate-400"
                                          : tracing.rank === 9
                                          ? "text-red-400"
                                          : null
                                      }`}
                                      aria-hidden="true"
                                    />
                                  )}
                                </>
                              </h1>
                            </Link>

                            <h1 className="text-sm  flex items-center">
                              {owner && (
                                <button
                                  onClick={onUntrace(tracing)}
                                  className="flex items-center gap-1 hover:text-indigo-500"
                                >
                                  <UserMinusIcon className="w-5" />
                                </button>
                              )}
                            </h1>
                          </div>
                          <div className="flex items-center justify-between">
                            <h1 className="text-xs relative bottom-0.5">
                              {tracing.role}
                            </h1>
                            <h1 className="text-xs relative bottom-0.5">
                              {/* {dayjs(tracing.Trace.createdAt).format(
                                "YYYY.MM.DD"
                              )}{" "} */}
                              {owner ? "내가 등록함" : "등록됨"}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

UserActivity.propTypes = {
  owner: PropTypes.bool.isRequired,
  me: PropTypes.object,
  user: PropTypes.object.isRequired,
};

export default UserActivity;
