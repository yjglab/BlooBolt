import React, { useCallback, useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import Router from "next/router";
import UserInfoProfile from "../components/UserInfoProfile";
import UserPostProfile from "../components/UserPostProfile";
import UserTraceProfile from "../components/UserTraceProfile";
import { Fragment } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition, Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
    <>
      <div className="pt-24 px-6 pb-6 w-full bg-gray-100 lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 md:truncate md:text-3xl md:tracking-tight">
            {me.username}
          </h2>
          <div className="mt-1 flex flex-col md:mt-0 md:flex-row md:flex-wrap md:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {me.role}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {me.website}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CurrencyDollarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {me.country}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {"Active"}
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PencilIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
              Edit
            </button>
          </span>

          <span className="ml-3 hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <LinkIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
              View
            </button>
          </span>

          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Publish
            </button>
          </span>

          {/* 모바일 드롭다운 */}
          <Menu as="div" className="relative ml-3 sm:hidden">
            <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              More
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5 text-gray-500"
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
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Edit
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      View
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="w-full items-center flex flex-col md:flex-row p-6  ">
        {/* 추적 */}
        <div className="  w-full ">
          <div className="text-2xl font-semibold">User Trace</div>
          <div className="w-full  py-6 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-900/20 p-1">
                <Tab
                  key={"sss"}
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
                  key={"sss"}
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
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};

// const Profile = () => {
//   const { me } = useSelector((state) => state.user);
//   const [profileMenu, setProfileMenu] = useState("info");

//   useEffect(() => {
//     if (!(me && me.id)) {
//       Router.replace("/");
//     }
//   }, [me && me.id]);

//   const onLoadInfo = useCallback(() => {
//     setProfileMenu("info");
//   });
//   const onLoadFlashes = useCallback(() => {
//     setProfileMenu("flashes");
//   });
//   const onLoadTrace = useCallback(() => {
//     setProfileMenu("trace");
//   });
//   const onLoadSetting = useCallback(() => {
//     setProfileMenu("setting");
//   });

//   return (
//     <AppLayout>
//       <div className="w-full h-screen flex items-center bg-gray-100">
//         <div className="w-full h-50 mx-auto relative top-20">
//           <div>
//             <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
//               <div className="flex justify-center relative bottom-3">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//                   alt=""
//                   className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
//                 />
//               </div>

//               <div className="mt-10">
//                 <h1 className="font-semibold text-center text-3xl text-gray-700 mb-2">
//                   {me?.username}
//                 </h1>
//                 <div className="text-center text-sm text-gray-400 font-medium">
//                   한줄 소개글
//                 </div>
//                 <div>
//                   <span></span>
//                 </div>
//                 <div className="my-5 px-6 w-full flex justify-center">
//                   <button className="text-white w-full lg:w-1/2 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-700 hover:bg-black hover:text-white">
//                     Edit Profile
//                   </button>
//                 </div>
//                 <div className="flex justify-between items-center my-5 px-6">
//                   <button
//                     onClick={onLoadInfo}
//                     className="text-gray-700 hover:text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
//                   >
//                     Info
//                   </button>
//                   <button
//                     onClick={onLoadFlashes}
//                     className="text-gray-700 hover:text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
//                   >
//                     Flashes
//                   </button>
//                   <button
//                     onClick={onLoadTrace}
//                     className="text-gray-700 hover:text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
//                   >
//                     Trace
//                   </button>
//                   <button
//                     onClick={onLoadSetting}
//                     className="text-gray-700 hover:text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
//                   >
//                     Setting
//                   </button>
//                 </div>
//                 {profileMenu === "info" ? (
//                   <div className="w-full rounded-lg overflow-hidden">
//                     <UserInfoProfile />
//                   </div>
//                 ) : profileMenu === "flashes" ? (
//                   <div className="w-full rounded-lg overflow-hidden">
//                     <UserPostProfile />
//                   </div>
//                 ) : profileMenu === "trace" ? (
//                   <div className="w-full rounded-lg overflow-hidden">
//                     <UserTraceProfile />
//                   </div>
//                 ) : (
//                   <div className="w-full rounded-lg overflow-hidden">
//                     <h3 className="font-medium text-gray-700 text-left px-6 pb-1">
//                       Application Setting
//                     </h3>
//                     <div className="overflow-auto mt-5 w-full h-64 flex flex-col text-sm"></div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

export default Profile;
