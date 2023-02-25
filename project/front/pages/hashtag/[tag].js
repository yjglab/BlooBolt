// Square 대신 Hashtag: ddd
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import PostSection from "../../components/PostSection";
import Router, { useRouter } from "next/router";

import { loadPostsByHashtag } from "../../reducers/postSlice";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { loadMe } from "../../reducers/userSlice";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    function onScreenScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (loadMorePosts && !loadPostsLoading) {
          dispatch(
            loadPostsByHashtag({
              lastPostId: mainPosts[mainPosts.length - 1]?.id,
              tag,
            })
          );
        }
      }
    }
    window.addEventListener("scroll", onScreenScroll);
    return () => {
      window.removeEventListener("scroll", onScreenScroll);
    };
  }, [loadMorePosts, loadPostsLoading, mainPosts.length, tag]);

  const onRefresh = useCallback(() => {
    Router.push("/square");
  });

  return (
    <AppLayout>
      <div className="min-h-screen flex pb-20">
        <div className="mt-12 md:mt-16 px-2 sm:px-4 w-full h-full md:mx-0 relative ">
          <div className="px-3 h-20 text-2xl flex justify-between items-center">
            <div
              onClick={onRefresh}
              className="cursor-pointer relative flex items-center font-bold left-1"
            >
              <span>Square</span>
              <ArrowPathIcon className="ml-2  w-6 hover:animate-spin" />
            </div>
          </div>

          <div className="my-4 ml-2  ">
            <span className="font-bold  text-indigo-500 mr-1.5">{tag}</span>
            <span className="">Hashtagged </span>
            <span className="font-bold  text-indigo-500">
              {mainPosts.length}
            </span>{" "}
            Posts
          </div>

          <div className="grid auto-cols-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {mainPosts.map((post) => (
              <PostSection key={post.id} post={post} detailed={false} />
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
    await context.store.dispatch(
      loadPostsByHashtag({ tag: context.params.tag })
    );

    return {
      props: { message: "" },
    };
  }
);

export default Hashtag;
