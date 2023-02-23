import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostSection from "../components/PostSection";
import PostForm from "../components/PostForm";

import {
  cancelAllPostImages,
  flushMainPosts,
  loadPosts,
  loadPostsByKeyword,
} from "../reducers/postSlice";
import wrapper from "../store/configureStore";
import { loadActiveUsers, loadMe, loadUser } from "../reducers/userSlice";
import axios from "axios";
import { openNotice } from "../reducers/globalSlice";
import { useForm } from "react-hook-form";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

const Square = () => {
  const { me } = useSelector((state) => state.user);

  const { mainPosts, loadMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const [togglePostForm, setTogglePostForm] = useState(false);
  const [keywordSearching, setKeywordSearching] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    function onScreenScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (!keywordSearching && loadMorePosts && !loadPostsLoading) {
          const lastPostId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadPosts(lastPostId));
        }
      }
    }
    window.addEventListener("scroll", onScreenScroll);
    return () => {
      window.removeEventListener("scroll", onScreenScroll);
    };
  }, [loadMorePosts, loadPostsLoading, mainPosts, keywordSearching]);

  const onTogglePostForm = useCallback(() => {
    if (togglePostForm) {
      dispatch(cancelAllPostImages());
    }
    setTogglePostForm(!togglePostForm);
  }, [togglePostForm]);

  const onSearchPosts = useCallback((formData) => {
    const { keyword } = formData;
    if (!keyword || !keyword.trim() || keyword.length < 2) {
      return dispatch(
        openNotice({ type: 2, content: "2자리 이상의 검색어를 지정해주세요." })
      );
    }
    setKeywordSearching(true);
    dispatch(flushMainPosts());
    dispatch(loadPostsByKeyword({ keyword }));
    reset();
  });

  const onRefresh = useCallback(() => {
    setKeywordSearching(false);
    dispatch(flushMainPosts());
    dispatch(loadPosts());
  });

  return (
    <AppLayout>
      {me && togglePostForm && <PostForm onTogglePostForm={onTogglePostForm} />}
      <div className=" flex pb-20">
        <div className="mt-16 px-2 sm:px-4 w-full h-full md:mx-0 relative ">
          <div className="px-3 text-2xl mb-8 flex justify-between items-center">
            <div
              onClick={onRefresh}
              className="cursor-pointer relative flex items-center font-bold left-1"
            >
              <span>Square</span>
              {keywordSearching && (
                <ArrowPathIcon className="ml-2  w-6 hover:animate-spin" />
              )}
            </div>

            <div className="flex items-center">
              <div className="flex bg-white rounded-md mr-3 border-[1.5px]   ">
                <form
                  className="flex h-8 p-1"
                  onSubmit={handleSubmit(onSearchPosts)}
                >
                  <label htmlFor="keyword"></label>
                  <input
                    id="keyword"
                    name="keyword"
                    className="p-2 w-24 md:w-36 text-sm h-full outline-none bg-white placeholder:text-sm placeholder:text-slate-300 flex-1 text-slate-600 focus:bg-white focus:ring-0 rounded-md  sm:text-sm"
                    placeholder="Search Post"
                    {...register("keyword", {})}
                  />
                  <button type="submit">
                    <MagnifyingGlassIcon className="w-6 cursor-pointer hover:text-indigo-500 hover:scale-105 mr-2 ml-1" />
                  </button>
                </form>
              </div>
              {me ? (
                <button
                  type="button"
                  onClick={onTogglePostForm}
                  className="relative rounded-full hover:scale-105 p-3 right-1 ml-1.5 shadow bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  <PaperAirplaneIcon className="w-7" />
                </button>
              ) : (
                <Link href="/login">
                  <button
                    type="button"
                    className="relative rounded-full p-3 right-1 ml-1.5 shadow bg-indigo-500 text-white hover:bg-indigo-600"
                  >
                    <PaperAirplaneIcon className="w-7" />
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {mainPosts.map((post) => (
              <PostSection
                key={post.id}
                post={post}
                detailed={false}
                onTogglePostForm={onTogglePostForm}
              />
            ))}
          </div>
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
    await context.store.dispatch(loadPosts());
    await context.store.dispatch(loadUser({ username: "" }));
    await context.store.dispatch(loadActiveUsers());
    return {
      props: { message: "" },
    };
  }
);

export default Square;
