import React, { useCallback, useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import Router from "next/router";
import UserInfoProfile from "../components/UserInfoProfile";
import UserPostProfile from "../components/UserPostProfile";
import UserTraceProfile from "../components/UserTraceProfile";

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const [profileMenu, setProfileMenu] = useState("info");

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace("/");
    }
  }, [me && me.id]);

  const onLoadInfo = useCallback(() => {
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
                <h1 className="font-bold text-center text-3xl text-gray-700 mb-2">
                  {me?.username}
                </h1>
                <div className="text-center text-sm text-gray-400 font-medium">
                  한줄 소개글
                </div>
                <div>
                  <span></span>
                </div>
                <div className="my-5 px-6 w-full flex justify-center">
                  <button className="text-white w-full lg:w-1/2 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-700 hover:bg-black hover:text-white">
                    Edit Profile
                  </button>
                </div>
                <div className="flex justify-between items-center my-5 px-6">
                  <button
                    onClick={onLoadInfo}
                    className="text-gray-700 hover:text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                  >
                    Info
                  </button>
                  <button
                    onClick={onLoadFlashes}
                    className="text-gray-700 hover:text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                  >
                    Flashes
                  </button>
                  <button
                    onClick={onLoadTrace}
                    className="text-gray-700 hover:text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                  >
                    Trace
                  </button>
                  <button
                    onClick={onLoadSetting}
                    className="text-gray-700 hover:text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                  >
                    Setting
                  </button>
                </div>
                {profileMenu === "info" ? (
                  <div className="w-full rounded-lg overflow-hidden">
                    <UserInfoProfile />
                  </div>
                ) : profileMenu === "flashes" ? (
                  <div className="w-full rounded-lg overflow-hidden">
                    <UserPostProfile />
                  </div>
                ) : profileMenu === "trace" ? (
                  <div className="w-full rounded-lg overflow-hidden">
                    <UserTraceProfile />
                  </div>
                ) : (
                  <div className="w-full rounded-lg overflow-hidden">
                    <h3 className="font-medium text-gray-700 text-left px-6 pb-1">
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
