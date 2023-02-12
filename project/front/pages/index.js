import {
  BoltIcon,
  ChatBubbleOvalLeftIcon,
  ShieldCheckIcon,
} from "@heroicons/react/20/solid";

import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostSection from "../components/PostSection";
import PostForm from "../components/PostForm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  // const liked = post.Likers.find((v) => v.id === id);
  return (
    <AppLayout>
      <div className="flex h-full">
        <div className="w-2/12 hidden lg:block">
          <div className="pt-10 fixed left-0 w-2/12 h-full">
            <div className=" pt-6  h-full w-full bg-slate-50  ">
              <div className="pr-1 py-4 w-full h-full flex flex-col justify-between">
                <div className="pb-8 w-full h-full flex flex-col justify-between">
                  <h1 className="pl-4 relative mb-2 left-1 text-lg font-bold text-slate-700 flex items-center">
                    <span>Relation</span>
                  </h1>

                  {/* 이부분은 나중에 스크롤->버튼로드로 바꾸기 */}
                  <div className="bg-white rounded-r overflow-y-auto shadow-md p-2 relative w-full h-full flex flex-col">
                    {me?.Tracings?.map((tracing) => (
                      <li
                        key={tracing.id}
                        className="relative rounded p-3 flex items-center hover:bg-slate-100"
                      >
                        <img
                          className="shadow-md border-2 p-0.5 border-indigo-400 rounded-full w-10 h-10 mr-3"
                          src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg"
                        />
                        <div className="">
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
                            <li className="truncate">{tracing.role}</li>
                          </ul>
                        </div>
                        <a
                          href="#"
                          className={classNames(
                            "absolute inset-0 rounded ",
                            "ring-indigo-500 focus:z-10 focus:outline-none focus:ring-2"
                          )}
                        />
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 px-0 md:pl-5 md:w-9/12 lg:px-3 w-full lg:w-7/12 h-full mx-4 md:mx-0 relative ">
          <div className="font-bold text-slate-600 text-2xl flex items-center">
            <span>Square</span>
          </div>
          <PostForm />
          {mainPosts.map((post) => (
            <PostSection key={post.id} post={post} />
          ))}
        </div>

        <div className="w-3/12 hidden  md:block">
          <div className="pt-10 fixed right-0  h-full  w-3/12  ">
            <div className=" pt-6  h-full w-full bg-slate-50  ">
              <div className="pl-1 py-4 w-full h-full flex flex-col justify-between">
                <div className="pb-8 w-full h-1/2 flex flex-col justify-between">
                  <h1 className="relative mb-2 left-1 text-lg font-bold text-slate-700 flex items-center">
                    <span>Most Flashed</span>
                  </h1>
                  <div className="bg-white rounded-l shadow-md p-2 overflow-y-scroll relative w-full h-full flex flex-col justify-between">
                    {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((v) => (
                      <div className="my-0.5 cursor-pointer w-full h-full hover:bg-slate-100 py-2.5 px-3  rounded">
                        <h1 className=" text-sm text-slate-700 font-semibold">
                          Gardian1
                        </h1>
                        <h1 className="text-xs 2xl:text-base text-slate-700 relative top-0.5 truncate">
                          가상포스트가상포스트가상포스트가상포스트가상포스트
                        </h1>
                        <ul className="2xl:text-base mt-1 flex space-x-1 text-xs font-normal leading-4 text-slate-500">
                          {
                            <>
                              {3}
                              <BoltIcon className="w-3 ml-0.5" />
                            </>
                          }
                          <li>&middot;</li>
                          {
                            <>
                              {3}
                              <ChatBubbleOvalLeftIcon className="w-3 ml-0.5" />
                            </>
                          }
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pb-8 w-full h-1/2 flex flex-col justify-between">
                  <h1 className="relative mb-2 left-1 text-lg font-bold text-slate-700 flex items-center">
                    <span>Traced</span>
                  </h1>
                  <div className="bg-white rounded shadow-md p-2 overflow-y-scroll relative w-full h-full flex flex-col justify-between">
                    {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((v) => (
                      <div className="my-0.5 cursor-pointer w-full h-full hover:bg-slate-100 py-2.5 px-3  rounded">
                        <h1 className=" text-sm text-slate-700 font-semibold">
                          Gardian1
                        </h1>
                        <h1 className="text-xs 2xl:text-base text-slate-700 relative top-0.5 truncate">
                          가상포스트가상포스트가상포스트가상포스트가상포스트
                        </h1>
                        <ul className="2xl:text-base mt-1 flex space-x-1 text-xs font-normal leading-4 text-slate-500">
                          {
                            <>
                              {3}
                              <BoltIcon className="w-3 ml-0.5" />
                            </>
                          }
                          <li>&middot;</li>
                          {
                            <>
                              {3}
                              <ChatBubbleOvalLeftIcon className="w-3 ml-0.5" />
                            </>
                          }
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
