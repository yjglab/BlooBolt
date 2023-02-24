import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import {
  BriefcaseIcon,
  FaceSmileIcon,
  GlobeAsiaAustraliaIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  ShieldCheckIcon,
  WindowIcon,
} from "@heroicons/react/20/solid";
import AppLayout from "../../components/AppLayout";
import UserActivity from "../../components/UserActivity";
import UserInformation from "../../components/UserInformation";
import Link from "next/link";
import UserAvatar from "../../components/UserAvatar";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { loadActiveUsers, loadMe, loadUser } from "../../reducers/userSlice";

const Profile = () => {
  const { me, user, activeUsers } = useSelector((state) => state.user);
  if (!user) {
    return;
  }
  const owner = me?.id === user.id && me?.username === user.username;
  console.log(owner);
  return (
    <AppLayout>
      <div className="min-h-screen">
        <div className="pt-20  px-6 pb-6 w-full bg-white md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:block">
            <UserAvatar
              avatarPath={owner ? me.avatar : user.avatar}
              owner={owner}
            />
          </div>
          <div className="flex items-center flex-col md:flex-1 md:block ">
            <div className="flex flex-col  mb-1 items-center md:items-start">
              <h2 className="text-2xl font-bold leading-7 text-slate-600 md:truncate md:text-3xl md:tracking-tight">
                {user.username}
              </h2>
              <div className="flex items-center mt-4 md:mt-1 mb-2">
                <>
                  <Link href="#">
                    {user.rank === 6 ? (
                      <FaceSmileIcon
                        className="w-5 ml-0.5 text-slate-400"
                        aria-hidden="true"
                      />
                    ) : user.rank === 0 ? (
                      <span className="cursor-pointer  px-2 py-0.5 rounded-md bg-slate-400 relative  text-xs text-white">
                        Not Ranked
                      </span>
                    ) : (
                      <ShieldCheckIcon
                        className={`w-5 flex-shrink-0 ${
                          user.rank === 1
                            ? "text-cyan-400"
                            : user.rank === 2
                            ? "text-amber-400"
                            : user.rank === 3
                            ? "text-amber-700/70"
                            : user.rank === 4
                            ? "text-indigo-500"
                            : user.rank === 5
                            ? "text-slate-400"
                            : user.rank === 9
                            ? "text-red-400"
                            : null
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </Link>{" "}
                  <span className="text-sm ml-1">Rank</span>
                  <span className="text-sm ml-1 font-bold">{user.rank}</span>
                </>

                <span className="ml-2 text-xs bg-slate-400 px-2 py-0.5 text-white rounded-md">
                  Bloo Point{" "}
                  <span className="ml-1 font-bold ">{user.rankPoint}</span>
                </span>
              </div>
            </div>
            <div className="mt-1 flex gap-0 sm:gap-3 flex-col sm:flex-row sm:flex-wrap ">
              <div className="md:flex md:gap-3">
                <div className="mt-2 flex items-center text-sm text-slate-500">
                  {activeUsers.includes(user.id) ? (
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
                  <BriefcaseIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                  {user.role}
                </div>
              </div>
              <div className="md:flex md:gap-3">
                <div className="mt-2 flex items-center text-sm text-slate-500">
                  <WindowIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noreferrer noopenner"
                  >
                    {user.website}
                  </a>
                </div>
                <div className="mt-2 flex items-center text-sm text-slate-500">
                  <GlobeAsiaAustraliaIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                  {user.country}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            owner ? "justify-between" : "justify-center"
          } w-full flex-col bg-slate-50 flex sm:flex-row p-6`}
        >
          <UserActivity owner={owner} me={me} user={user} />
          {owner && <UserInformation />}
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    await context.store.dispatch(loadMe());
    await context.store.dispatch(
      loadUser({ username: context.params.username })
    );
    await context.store.dispatch(loadActiveUsers());

    return {
      props: { message: "" },
    };
  }
);

export default Profile;
