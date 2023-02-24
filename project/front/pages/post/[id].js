// Square 대신 Hashtag: ddd
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import PostSection from "../../components/PostSection";
import Router, { useRouter } from "next/router";

import { loadSolePost } from "../../reducers/postSlice";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { loadActiveUsers, loadMe } from "../../reducers/userSlice";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

const Post = () => {
  const { solePost } = useSelector((state) => state.post);
  if (!solePost) return;

  const onRefresh = () => {
    Router.push("/square");
  };

  return (
    <AppLayout>
      <div className="min-h-screen flex pb-20">
        <div className="mt-12 md:mt-16 px-2 sm:px-4 w-full h-full md:mx-0 relative ">
          <div className="px-3 h-20 text-2xl mb-4 flex justify-between items-center">
            <div
              onClick={onRefresh}
              className="cursor-pointer relative flex items-center font-bold left-1"
            >
              <span>Square</span>
              <ArrowPathIcon className="ml-2  w-6 hover:animate-spin" />
            </div>
          </div>

          <div className="md:px-[20%]">
            <PostSection post={solePost} detailed={true} />
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
    await context.store.dispatch(loadSolePost({ postId: context.params.id }));
    await context.store.dispatch(loadActiveUsers());

    return {
      props: { message: "" },
    };
  }
);

export default Post;
