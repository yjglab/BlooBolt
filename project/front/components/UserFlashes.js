import React from "react";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <h3 className="font-medium text-gray-900 text-left px-6 pb-1">
        Recent my flashes
      </h3>
      <div className="overflow-auto mt-5 w-full h-64 flex flex-col text-sm">
        {me?.Posts.map((post) => (
          <div
            key={post.id}
            className="relative h-24 flex items-center border-t border-gray-100 text-gray-600 pt-6 px-4 w-full hover:bg-gray-100 transition duration-150 "
          >
            <div className="absolute top-2 right-9 text-gray-500 text-xs ">
              Created At
            </div>
            <div className=" w-12 h-full p-1 flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="user avatar"
                className="rounded-full w-6 h-6 shadow-md"
              />
            </div>
            <div className="py-1 pl-2 pr-4 w-full h-full break-all overflow-hidden ">
              {post.content}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserInfo;
