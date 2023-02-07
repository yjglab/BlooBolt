import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Menu, Transition, Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserActivity = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <div className="w-full px-3">
      <div className="text-2xl font-semibold">Activity</div>
      <div className="w-full  py-6 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-gray-400 p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-gray-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Recent Posts
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-gray-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Tracers
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-gray-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Tracings
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2 ">
            <Tab.Panel
              key={"s"}
              className={classNames(
                "rounded-xl bg-white p-3 h-3/5 ",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {me.Posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3  hover:bg-gray-100"
                  >
                    <h3 className="truncate  text-sm font-medium leading-5 ">
                      {post.content}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{post.createdAt}</li>
                      <li>&middot;</li>
                      <li>{post.Comments.length} comments</li>
                      <li>&middot;</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        "absolute inset-0 rounded-md ",
                        "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
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
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {me.Tracers.map((tracer) => (
                  <li
                    key={tracer.id}
                    className="relative rounded-md p-3 flex items-center hover:bg-gray-100"
                  >
                    <img
                      className="rounded-full w-9 h-9 mr-3"
                      src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg"
                    />
                    <div>
                      <h3 className="truncate  text-sm font-medium leading-5 ">
                        {tracer.username}
                      </h3>

                      <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                        <li>{tracer.role}</li>
                        {/* <li>&middot;</li> */}
                      </ul>
                    </div>
                    <a
                      href="#"
                      className={classNames(
                        "absolute inset-0 rounded-md ",
                        "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
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
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {me.Tracings.map((tracing) => (
                  <li
                    key={tracing.id}
                    className="relative rounded-md p-3 flex items-center hover:bg-gray-100"
                  >
                    <img
                      className="rounded-full w-9 h-9 mr-3"
                      src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg"
                    />
                    <div>
                      <h3 className="truncate  text-sm font-medium leading-5 ">
                        {tracing.username}
                      </h3>

                      <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                        <li>{tracing.role}</li>
                        {/* <li>&middot;</li> */}
                      </ul>
                    </div>
                    <a
                      href="#"
                      className={classNames(
                        "absolute inset-0 rounded-md ",
                        "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                      )}
                    />
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
