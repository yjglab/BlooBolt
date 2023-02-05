import React from "react";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";

const UserInfoProfile = () => {
  const { me } = useSelector((state) => state.user);
  const [username, onChangeUsername] = useInput(me?.username || "");
  const [greeting, onChangeGreeting] = useInput(me?.greeting || "");

  return (
    <>
      <h3 className="font-medium text-gray-700 text-left px-6 pb-1">
        My Information
      </h3>
      <div className="overflow-auto mt-5 w-full p-4 h-64 flex flex-col text-sm">
        <form className="w-full">
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                NAME
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700   rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={username}
                onChange={onChangeUsername}
                type="text"
                placeholder="username"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                GREETING
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700   rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={greeting}
                onChange={onChangeGreeting}
                type="text"
                placeholder="hello, visitors!"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                City
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700   rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="adwqd"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                State
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-100   text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Zip
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700   rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="90210"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserInfoProfile;
