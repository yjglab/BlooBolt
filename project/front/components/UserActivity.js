import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Menu, Transition, Tab } from "@headlessui/react";
import { ShieldCheckIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserActivity = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <div className="w-full px-3">
      <div className="text-2xl font-semibold text-slate-600">Activity</div>
      <div className="w-full  py-6 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-white shadow p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-xl py-2.5 text-sm font-medium leading-5 text-white",
                  selected
                    ? "bg-indigo-500 text-white"
                    : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-800"
                )
              }
            >
              {`Posts (${me.Posts.length})`}
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-xl py-2.5 text-sm font-medium leading-5 text-white",
                  selected
                    ? "bg-indigo-500 text-white"
                    : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-800"
                )
              }
            >
              {`Tracers (${me.Tracers?.length})`}
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-xl py-2.5 text-sm font-medium leading-5 text-white",
                  selected
                    ? "bg-indigo-500 text-white"
                    : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-800"
                )
              }
            >
              {`Tracings (${me.Tracings?.length})`}
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2 rounded-xl shadow">
            <Tab.Panel
              key={"s"}
              className={classNames(
                "rounded-xl bg-white p-3 h-3/5 ",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-500 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {me.Posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-xl p-3  hover:bg-slate-100"
                  >
                    <h3 className="truncate  text-sm font-medium leading-5 ">
                      {post.content}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-slate-500">
                      <li>{post.createdAt}</li>
                      <li>&middot;</li>
                      <li>5 flashed</li>
                      <li>&middot;</li>
                      <li>{post.Comments?.length} comments</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        "absolute inset-0 rounded-xl ",
                        "ring-indigo-500 focus:z-10 focus:outline-none focus:ring-2"
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>

            <Tab.Panel
              key={"s"}
              className={classNames(
                "rounded-xl bg-white p-3 h-3/5 ",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-500 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {me.Tracers?.map((tracer) => (
                  <li
                    key={tracer.id}
                    className="relative rounded-xl p-3 flex items-center hover:bg-slate-100"
                  >
                    <img
                      className="shadow border-2 p-0.5 border-indigo-400 rounded-full w-10 h-10 mr-3"
                      src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg"
                    />
                    <div>
                      <div className="flex">
                        <h3 className="truncate  text-sm font-medium leading-5 ">
                          {tracer.username}
                        </h3>
                        {tracer.rank && (
                          <ShieldCheckIcon
                            className={`ml-1 relative top-0.5 h-4 w-4 flex-shrink-0 ${
                              tracer.rank === 1
                                ? "text-cyan-400"
                                : tracer.rank === 2
                                ? "text-amber-400"
                                : tracer.rank === 3
                                ? "text-amber-700/70"
                                : tracer.rank === 4
                                ? "text-indigo-500"
                                : tracer.rank === 5
                                ? "text-slate-400"
                                : tracer.rank === 9
                                ? "text-red-400"
                                : null
                            }`}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <ul className="flex space-x-1 text-xs font-normal leading-4 text-slate-500">
                        <li>{tracer.role}</li>
                        {/* <li>&middot;</li> */}
                      </ul>
                    </div>
                    <a
                      href="#"
                      className={classNames(
                        "absolute inset-0 rounded-xl ",
                        "ring-indigo-500 focus:z-10 focus:outline-none focus:ring-2"
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>

            <Tab.Panel
              key={"s"}
              className={classNames(
                "rounded-xl bg-white p-3 h-3/5 ",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-500 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {me.Tracings?.map((tracing) => (
                  <li
                    key={tracing.id}
                    className="relative rounded-xl p-3 flex items-center hover:bg-slate-100"
                  >
                    <img
                      className="shadow border-2 p-0.5 border-indigo-400 rounded-full w-10 h-10 mr-3"
                      src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg"
                    />
                    <div>
                      <div className="flex">
                        <h3 className="truncate  text-sm font-medium leading-5 ">
                          {tracing.username}
                        </h3>
                        {tracing.rank && (
                          <ShieldCheckIcon
                            className={`ml-1 relative top-0.5 h-4 w-4 flex-shrink-0 ${
                              tracing.rank === 1
                                ? "text-cyan-400"
                                : tracing.rank === 2
                                ? "text-amber-400"
                                : tracing.rank === 3
                                ? "text-amber-700/70"
                                : tracing.rank === 4
                                ? "text-indigo-500"
                                : tracing.rank === 5
                                ? "text-slate-400"
                                : tracing.rank === 9
                                ? "text-red-400"
                                : null
                            }`}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <ul className="flex space-x-1 text-xs font-normal leading-4 text-slate-500">
                        <li>{tracing.role}</li>
                        {/* <li>&middot;</li> */}
                      </ul>
                    </div>
                    <a
                      href="#"
                      className={classNames(
                        "absolute inset-0 rounded-xl ",
                        "ring-indigo-500 focus:z-10 focus:outline-none focus:ring-2"
                      )}
                    />
                    <button classname="absolute right-2 rounded-xl border border-slate-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-slate-600 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Untrace
                    </button>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default UserActivity;
