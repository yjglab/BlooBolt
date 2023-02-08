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
      <div className="flex h-full ">
        <div className="mt-24 w-2/5 ml-8 hidden sm:block ">
          <div className=" font-semibold">좌측사이드바</div>
        </div>
        <div className="mt-24 w-full h-full mx-4 sm:mr-8 relative ">
          <div className="font-semibold text-gray-700 text-2xl">
            User Square
          </div>
          <PostForm />
          {mainPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
