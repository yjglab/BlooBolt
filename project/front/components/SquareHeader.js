import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostSection from "../components/PostSection";
import PropTypes from "prop-types";

import {
  cancelAllPostImages,
  flushMainPosts,
  loadPosts,
  loadPostsByHashtag,
  loadPostsByKeyword,
} from "../reducers/postSlice";

import { openNotice } from "../reducers/globalSlice";
import { useForm } from "react-hook-form";
import {
  ArrowUturnLeftIcon,
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import PostForm from "./PostForm";

const SquareHeader = ({ squareTitle, squareSubTitle }) => {
  const { me } = useSelector((state) => state.user);
  const [togglePostForm, setTogglePostForm] = useState(false);

  const { mainPosts, loadMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const [keywordSearching, setKeywordSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();
  const { tag } = router.query;

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
        if (router.query.tag && loadMorePosts && !loadPostsLoading) {
          //   console.log("해시태그");
          //   const lastPostId = mainPosts[mainPosts.length - 1]?.id;
          //   dispatch(
          //     loadPostsByHashtag({
          //       lastPostId,
          //       tag,
          //     })
          //   );
        } else if (
          !router.query.tag &&
          !keywordSearching &&
          loadMorePosts &&
          !loadPostsLoading
        ) {
          console.log("일반");
          const lastPostId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadPosts(lastPostId));
        } else if (
          !router.query.tag &&
          keywordSearching &&
          loadMorePosts &&
          !loadPostsLoading
        ) {
          //   console.log("서치");
          //   const lastPostId = mainPosts[mainPosts.length - 1]?.id;
          //   dispatch(loadPostsByKeyword({ keyword: searchKeyword, lastPostId }));
        }
      }
    }
    window.addEventListener("scroll", onScreenScroll);
    return () => {
      window.removeEventListener("scroll", onScreenScroll);
    };
  }, [
    loadMorePosts,
    loadPostsLoading,
    mainPosts,
    keywordSearching,
    router.query.tag,
  ]);

  const onTogglePostForm = useCallback(() => {
    if (togglePostForm) {
      dispatch(cancelAllPostImages());
    }
    setTogglePostForm(!togglePostForm);
  }, [togglePostForm]);

  const onSearchPosts = useCallback((formData) => {
    const { keyword } = formData;
    setSearchKeyword(keyword);
    if (!keyword || !keyword.trim() || keyword.length < 2) {
      return dispatch(
        openNotice({ type: 2, content: "2자리 이상의 검색어를 지정해주세요." })
      );
    }
    setKeywordSearching(true);
    dispatch(flushMainPosts());
    dispatch(loadPostsByKeyword({ keyword }));
  });

  const onRefresh = useCallback(() => {
    if (router.query.tag) {
      router.push("/square");
    }
    setKeywordSearching(false);
    dispatch(flushMainPosts());
    dispatch(loadPosts());
  });

  return (
    <>
      {me && togglePostForm && <PostForm onTogglePostForm={onTogglePostForm} />}
      <div className="min-h-screen flex pb-20">
        <div className="mt-16 md:mt-20 px-2 sm:px-[2%] md:px-[2%] lg:px-[12%] w-full h-full relative ">
          <h1 className="px-6 text-base font-semibold leading-6 text-indigo-500">
            {squareSubTitle}
          </h1>
          <div className="px-5 h-10 text-2xl flex justify-between items-center">
            <div
              onClick={onRefresh}
              className="cursor-pointer relative flex items-center font-bold left-1"
            >
              <h1 className=" text-2xl font-bold tracking-tight  sm:text-3xl">
                {squareTitle}
              </h1>

              {keywordSearching || router.query.tag ? (
                <ArrowUturnLeftIcon className="ml-3  w-5 hover:scale-110" />
              ) : null}
            </div>

            <div className="flex items-center">
              {me && !keywordSearching && !router.query.tag ? (
                <button
                  onClick={onTogglePostForm}
                  className=" flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-600"
                >
                  <PaperAirplaneIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              ) : keywordSearching || router.query.tag ? null : (
                <Link href="/login">
                  <button className=" flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-600">
                    <PaperAirplaneIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="my-4 px-5 flex justify-between items-center">
            <div>
              {keywordSearching ? (
                <>
                  <span className="font-bold mr-0.5 ">{mainPosts.length}</span>
                  개의 포스트가 있습니다.
                </>
              ) : router.query.tag ? (
                <>
                  <span className="text-lg mr-1 font-semibold text-indigo-500">
                    #{router.query.tag}
                  </span>
                  <span className="font-bold mr-0.5 ">{mainPosts.length}</span>
                  개의 포스트가 있습니다.
                </>
              ) : null}
            </div>
            <div className="flex py-1  bg-white rounded-md ring-1 ring-slate-200 hover:ring-indigo-500 duration-150 ">
              <form
                className="flex h-8 p-1"
                onSubmit={handleSubmit(onSearchPosts)}
              >
                <label htmlFor="keyword"></label>
                <input
                  id="keyword"
                  name="keyword"
                  className="p-2 w-20 md:w-36 text-sm h-full outline-none bg-white placeholder:text-sm placeholder:text-slate-300 flex-1 text-slate-600 focus:bg-white focus:ring-0 rounded-md  sm:text-sm"
                  placeholder="포스트 검색"
                  {...register("keyword", {})}
                />
                <button type="submit">
                  <MagnifyingGlassIcon className="w-6 cursor-pointer hover:text-indigo-500 hover:scale-105 mr-2 ml-1" />
                </button>
              </form>
            </div>
          </div>

          <div className="px-2 md:px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
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
    </>
  );
};

SquareHeader.propTypes = {
  squareTitle: PropTypes.string.isRequired,
};

export default SquareHeader;
