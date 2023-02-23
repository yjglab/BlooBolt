// Square 대신 Hashtag: ddd
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import PostSection from "../../components/PostSection";
import { useRouter } from "next/router";

import { loadSolePost } from "../../reducers/postSlice";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { loadActiveUsers, loadMe } from "../../reducers/userSlice";

const Post = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { solePost } = useSelector((state) => state.post);
  if (!solePost) return;

  return (
    <AppLayout>
      <div className="flex pb-20">
        <div className="mt-16 px-2 sm:px-4 w-full h-full md:mx-0 relative ">
          <div className=" text-slate-600 text-2xl mb-8 flex justify-between items-center">
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
            </div>
          </div>

          <div className="grid auto-cols-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
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
