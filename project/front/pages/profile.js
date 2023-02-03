import React, { useCallback, useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import Router from "next/router";

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const [profileMenu, setProfileMenu] = useState("flashes");
  const [traceMenu, setTraceMenu] = useState("Tracers");

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace("/");
    }
  }, [me && me.id]);

  const onLoadMyInfo = useCallback(() => {
    setProfileMenu("info");
  });
  const onLoadFlashes = useCallback(() => {
    setProfileMenu("flashes");
  });
  const onLoadTrace = useCallback(() => {
    setProfileMenu("trace");
  });
  const onLoadSetting = useCallback(() => {
    setProfileMenu("setting");
  });

  const onLoadTracers = useCallback(() => {
    setTraceMenu("Tracers");
  });
  const onLoadTracings = useCallback(() => {
    setTraceMenu("Tracings");
  });

  return (
    <AppLayout>
      <div className="w-full h-screen flex items-center bg-gray-100">
        <div className="w-full h-50 mx-auto relative top-20">
          <div>
            <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
              <div className="flex justify-center relative bottom-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt=""
                  className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                />
              </div>

              <div className="mt-10">
                <h1 className="font-bold text-center text-3xl text-gray-900 mb-2">
                  {me?.username}
                </h1>
                <div className="text-center text-sm text-gray-400 font-medium">
                  한줄 소개글
                </div>
                <div>
                  <span></span>
                </div>
                <div className="my-5 px-6 w-full flex justify-center">
                  <button className="text-gray-200 w-full lg:w-1/2 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">
                    Edit Profile
                  </button>
                </div>
                <div className="flex justify-between items-center my-5 px-6">
                  <button
                    onClick={onLoadMyInfo}
                    className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                  >
                    Info
                  </button>
                  <button
                    onClick={onLoadFlashes}
                    className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                  >
                    Flashes
                  </button>
                  <button
                    onClick={onLoadTrace}
                    className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                  >
                    Trace
                  </button>
                  <button
                    onClick={onLoadSetting}
                    className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                  >
                    Setting
                  </button>
                </div>
                {profileMenu === "info" ? (
                  <div className="w-full rounded-lg overflow-hidden">
                    <h3 className="font-medium text-gray-900 text-left px-6 pb-1">
                      My Information
                    </h3>
                    <div className="overflow-auto mt-5 w-full h-64 flex flex-col text-sm"></div>
                  </div>
                ) : profileMenu === "flashes" ? (
                  <div className="w-full rounded-lg overflow-hidden">
                    <h3 className="font-medium text-gray-900 text-left px-6 pb-1">
                      Recent my flashes
                    </h3>
                    <div className="overflow-auto mt-5 w-full h-64 flex flex-col text-sm">
                      <div className="relative h-28 flex items-center border-t border-gray-100 text-gray-600 py-6 px-4 w-full hover:bg-gray-100 transition duration-150 ">
                        <div className="absolute top-2 right-9 text-gray-500 text-xs ">
                          Created At
                        </div>
                        <div className=" w-12 h-full p-1 flex justify-center">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt=""
                            className="rounded-full w-6 h-6 shadow-md"
                          />
                        </div>
                        <div className="py-1 pl-2 pr-4 w-full h-full break-all overflow-hidden ">
                          Addedawdwadedawd wadedawdw ad edawdw a deda ad edawdw
                          a dedawdw ad edawdwadedawdwaded ad edawdw a dedawdw ad
                          edawdwadedawdwaded ad edawdw a dedawdw ad
                          edawdwadedawdwadedwdw ad edawdwadedawdwadedad
                          edawdwadedawdwad edawdwadedawdwad edawdwadedawdwad
                          edawdwadedawdwad edawdwadedawdwad edawdwadedawdwad
                          edawdwadedawdwawdwadedawdwa
                        </div>
                      </div>
                    </div>
                  </div>
                ) : profileMenu === "trace" ? (
                  <div className="w-full rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 text-left px-6 pb-1">
                        {traceMenu}
                      </h3>
                      <div className="flex px-6">
                        <button
                          onClick={onLoadTracers}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 text-sm rounded-l"
                        >
                          Tracers
                        </button>
                        <button
                          onClick={onLoadTracings}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 text-sm rounded-r"
                        >
                          Tracings
                        </button>
                      </div>
                    </div>
                    <div className="overflow-auto mt-5 w-full h-64 flex flex-col text-sm">
                      {traceMenu === "Tracers"
                        ? me.Tracers.map((tracer) => (
                            <div
                              key={tracer.id}
                              className="relative h-14 flex py-2 px-4 items-center border-t border-gray-100 text-gray-600  w-full hover:bg-gray-100 transition duration-150 "
                            >
                              <div className=" w-12 h-full p-1 flex justify-center items-center">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                  alt="tracer avatar"
                                  className="rounded-full w-6 h-6 shadow-md"
                                />
                              </div>
                              <div className="flex justify-between items-center py-1 pl-2 pr-4 w-full h-full break-all overflow-hidden ">
                                {tracer.username}
                                <div className="flex items-center justify-between">
                                  <span className="ml-3 text-gray-500 text-xs hidden sm:inline">
                                    Added at 1999.99.99
                                  </span>
                                  <button className="focus:outline-none ml-3 text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        : me.Tracings.map((tracing) => (
                            <div
                              key={tracing.id}
                              className="relative h-14 flex py-2 px-4 items-center border-t border-gray-100 text-gray-600  w-full hover:bg-gray-100 transition duration-150 "
                            >
                              <div className=" w-12 h-full p-1 flex justify-center items-center">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                  alt="tracing avatar"
                                  className="rounded-full w-6 h-6 shadow-md"
                                />
                              </div>
                              <div className="flex justify-between items-center py-1 pl-2 pr-4 w-full h-full break-all overflow-hidden ">
                                {tracing.username}
                                <div className="flex items-center justify-between">
                                  <span className="ml-3 text-gray-500 text-xs hidden sm:inline">
                                    Added at 1999.99.99
                                  </span>
                                  <button className="focus:outline-none ml-3 text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                ) : (
                  <div className="w-full rounded-lg overflow-hidden">
                    <h3 className="font-medium text-gray-900 text-left px-6 pb-1">
                      Application Setting
                    </h3>
                    <div className="overflow-auto mt-5 w-full h-64 flex flex-col text-sm"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
