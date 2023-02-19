import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostSection from "../components/PostSection";
import PostForm from "../components/PostForm";

import { loadPosts } from "../reducers/postSlice";

const Square = () => {
  const { me } = useSelector((state) => state.user);

  const { mainPosts, loadMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const [togglePostForm, setTogglePostForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    function onScreenScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (loadMorePosts && !loadPostsLoading) {
          const lastPostId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadPosts(lastPostId));
        }
      }
    }
    window.addEventListener("scroll", onScreenScroll);
    return () => {
      window.removeEventListener("scroll", onScreenScroll);
    };
  }, [loadMorePosts, loadPostsLoading, mainPosts]);

  const onTogglePostForm = useCallback(() => {
    setTogglePostForm(!togglePostForm);
  }, [togglePostForm]);

  return (
    <AppLayout>
      {me && togglePostForm && <PostForm onTogglePostForm={onTogglePostForm} />}
      <div className=" flex pb-20">
        <div className="mt-16 px-2 sm:px-4 w-full h-full md:mx-0 relative ">
          <div className="text-2xl mb-8 flex justify-between items-center">
            <span className="relative font-bold left-1">Square</span>

            <div className="flex items-center">
              <div className="flex h-7">
                <input
                  type="text"
                  id="company-website"
                  className=" h-full border border-slate-400 outline-none bg-slate-50 placeholder:text-slate-300 w-28 flex-1 text-slate-600 focus:bg-slate-100 focus:ring-0 rounded-md mr-3  sm:text-sm"
                  placeholder="Search Post"
                />
              </div>
              {me ? (
                <button
                  type="button"
                  onClick={onTogglePostForm}
                  className="relative right-1 ml-1.5 py-1.5 px-4 text-xs font-medium text-center shadow bg-indigo-500 rounded-md text-white hover:bg-indigo-600"
                >
                  Share Your Topic
                </button>
              ) : (
                <a
                  href="/login"
                  className="relative right-1 ml-1.5 py-1.5 px-4 text-xs font-medium text-center shadow bg-indigo-500 rounded-md text-white hover:bg-indigo-600"
                >
                  Share Your Topic
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {mainPosts.map((post) => (
              <PostSection
                key={post.id}
                post={post}
                onTogglePostForm={onTogglePostForm}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Square;
