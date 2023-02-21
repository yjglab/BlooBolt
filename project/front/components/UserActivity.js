import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import {
  BoltIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FaceFrownIcon,
  ShieldCheckIcon,
  UserMinusIcon,
} from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { untrace } from "../reducers/userSlice";
import { openNotice } from "../reducers/globalSlice";
dayjs.locale("ko");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserActivity = () => {
  const { me } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.me?.id);
  const dispatch = useDispatch();

  const onUntrace = useCallback(
    (tracing) => () => {
      dispatch(untrace(tracing.id));
      dispatch(
        openNotice({
          title: "Trace disconnected",
          content: `${tracing.username}님을 트레이스 리스트에서 제거합니다.`,
        })
      );
    },
    []
  );

  return (
    <div className="w-full px-3">
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
              {`Posts (${me?.Posts.length})`}
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
              {`Tracers (${me?.Tracers?.length})`}
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
              {`Tracings (${me?.Tracings?.length})`}
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
                {me?.Posts.length === 0 ? (
                  <div className="rounded-md text-sm text-slate-300 p-3 h-20 flex justify-center items-center hover:bg-slate-100">
                    <span>No Posts</span>
                    <FaceFrownIcon className="w-4 ml-1" />
                  </div>
                ) : (
                  me?.Posts.map((post) => (
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
                          {dayjs(post.updatedAt).format("YYYY.MM.DD | H:mm:ss")}
                        </li>
                        <li>&middot;</li>
                        <li className="flex">
                          {post.Prodders.length || 0}{" "}
                          <BoltIcon className="w-3 ml-0.5" />
                        </li>
                        <li>&middot;</li>
                        <li className="flex">
                          {post.Comments?.length || 0}{" "}
                          <ChatBubbleOvalLeftEllipsisIcon className="w-3 ml-0.5" />
                        </li>
                      </ul>

                      <a
                        href="#"
                        className={classNames(
                          "absolute inset-0 rounded-md ",
                          "ring-indigo-500 focus:z-10 focus:outline-none focus:ring-2"
                        )}
                      />
                    </li>
                  ))
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
                {me?.Tracers.length === 0 ? (
                  <div className="rounded-md text-sm text-slate-300 p-3 h-20 flex justify-center items-center hover:bg-slate-100">
                    <span>No Tracers</span>
                    <FaceFrownIcon className="w-4 ml-1" />
                  </div>
                ) : (
                  me?.Tracers?.map((tracer) => (
                    <li
                      key={tracer.id}
                      className="rounded-md p-3  hover:bg-slate-100"
                    >
                      <div className=" flex items-center">
                        <img
                          src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRRv9ICxXjK-LVFv-lKRId6gB45BFoNCLsZ4dk7bZpYGblPLPG-9aYss0Z0wt2PmWDb"
                          className={`h-[50px] w-[50px] border-[3px] ${
                            tracer.status ? "border-indigo-500" : ""
                          } p-0.5 rounded-full object-cover`}
                        />
                        <div className="ml-2 w-full flex flex-col">
                          <h1 className="text-md font-bold flex items-center">
                            {tracer.username}
                            {tracer.Userboard.rank !== 0 ? (
                              <ShieldCheckIcon
                                className={`ml-1 relative h-4 w-4 flex-shrink-0 ${
                                  tracer.Userboard.rank === 1
                                    ? "text-cyan-400"
                                    : tracer.Userboard.rank === 2
                                    ? "text-amber-400"
                                    : tracer.Userboard.rank === 3
                                    ? "text-amber-700/70"
                                    : tracer.Userboard.rank === 4
                                    ? "text-indigo-500"
                                    : tracer.Userboard.rank === 5
                                    ? "text-slate-400"
                                    : tracer.Userboard.rank === 9
                                    ? "text-red-400"
                                    : null
                                }`}
                                aria-hidden="true"
                              />
                            ) : null}
                          </h1>
                          <div className="flex items-center justify-between">
                            <h1 className="text-xs relative bottom-0.5">
                              {tracer.role}
                            </h1>
                            <h1 className="text-xs relative bottom-0.5">
                              {dayjs(tracer.Trace.createdAt).format(
                                "YYYY.MM.DD"
                              )}{" "}
                              나를 등록함
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
                {me?.Tracings.length === 0 ? (
                  <div className="rounded-md text-sm text-slate-300 p-3 h-20 flex justify-center items-center hover:bg-slate-100">
                    <span>No Tracings</span>
                    <FaceFrownIcon className="w-4 ml-1" />
                  </div>
                ) : (
                  me?.Tracings?.map((tracing) => (
                    <li
                      key={tracing.id}
                      className="rounded-md p-3  hover:bg-slate-100"
                    >
                      <div className=" flex items-center">
                        <img
                          src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRRv9ICxXjK-LVFv-lKRId6gB45BFoNCLsZ4dk7bZpYGblPLPG-9aYss0Z0wt2PmWDb"
                          className={`h-[50px] w-[50px] border-[3px] ${
                            tracing.status ? "border-indigo-500" : ""
                          } p-0.5 rounded-full object-cover`}
                        />
                        <div className="ml-2 w-full flex flex-col">
                          <div className="flex items-center justify-between">
                            <h1 className="text-md font-bold flex items-center">
                              {tracing.username}
                              {tracing.Userboard.rank !== 0 ? (
                                <ShieldCheckIcon
                                  className={`ml-1 relative h-4 w-4 flex-shrink-0 ${
                                    tracing.Userboard.rank === 1
                                      ? "text-cyan-400"
                                      : tracing.Userboard.rank === 2
                                      ? "text-amber-400"
                                      : tracing.Userboard.rank === 3
                                      ? "text-amber-700/70"
                                      : tracing.Userboard.rank === 4
                                      ? "text-indigo-500"
                                      : tracing.Userboard.rank === 5
                                      ? "text-slate-400"
                                      : tracing.Userboard.rank === 9
                                      ? "text-red-400"
                                      : null
                                  }`}
                                  aria-hidden="true"
                                />
                              ) : null}
                            </h1>
                            <h1 className="text-sm  flex items-center">
                              <button
                                onClick={onUntrace(tracing)}
                                className="flex items-center gap-1 hover:text-indigo-500"
                              >
                                <UserMinusIcon className="w-5" />
                              </button>
                            </h1>
                          </div>
                          <div className="flex items-center justify-between">
                            <h1 className="text-xs relative bottom-0.5">
                              {tracing.role}
                            </h1>
                            <h1 className="text-xs relative bottom-0.5">
                              {dayjs(tracing.Trace.createdAt).format(
                                "YYYY.MM.DD"
                              )}{" "}
                              내가 등록함
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

export default UserActivity;
