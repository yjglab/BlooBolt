import { Menu, Transition } from "@headlessui/react";

import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
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
        <div className="w-2/12 hidden md:block">
          <div className="my-10 fixed left-0 w-2/12 h-full">
            <div className=" pt-6  h-full w-full bg-white shadow ">
              <div className="px-5 py-4 w-full h-full flex flex-col justify-between">
                <div className="w-full h-full">
                  <h1 className="text-lg font-bold text-gray-700">Relation</h1>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 px-0 md:px-3 w-full md:w-7/12 h-full mx-4 relative ">
          <div className="font-bold text-gray-700 text-2xl">Square</div>
          <PostForm />
          {mainPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="w-3/12 hidden md:block">
          <div className="fixed right-0  h-full my-10 w-3/12  ">
            <div className=" pt-6  h-full w-full bg-white shadow ">
              <div className="px-5 py-4 w-full h-full flex flex-col justify-between">
                <div className="w-full h-full flex flex-col justify-between">
                  <h1 className="text-lg font-bold text-gray-700">
                    Most Flashed
                  </h1>
                  <div className="w-full h-full flex flex-col justify-between pb-3">
                    <div className="w-full h-full">s</div>
                    <div className="w-full h-full">s</div>
                    <div className="w-full h-full">s</div>
                    <div className="w-full h-full">s</div>
                    <div className="w-full h-full">s</div>
                  </div>
                </div>
                <div className="w-full h-full">
                  <h1 className="text-lg font-bold text-gray-700">Traced</h1>
                  <div></div>
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
