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
import SquareHeader from "../../components/SquareHeader";

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  // useEffect(() => {
  //   function onScreenScroll() {
  //     if (
  //       window.scrollY + document.documentElement.clientHeight >
  //       document.documentElement.scrollHeight - 300
  //     ) {
  //       if (loadMorePosts && !loadPostsLoading) {
  //         dispatch(
  //           loadPostsByHashtag({
  //             lastPostId: mainPosts[mainPosts.length - 1]?.id,
  //             tag,
  //           })
  //         );
  //       }
  //     }
  //   }
  //   window.addEventListener("scroll", onScreenScroll);
  //   return () => {
  //     window.removeEventListener("scroll", onScreenScroll);
  //   };
  // }, [loadMorePosts, loadPostsLoading, mainPosts.length, tag]);

  // const onRefresh = useCallback(() => {
  //   Router.push("/square");
  // });

  return (
    <AppLayout>
      <SquareHeader
        squareSubTitle={"아무나 참여해요!"}
        squareTitle={"Public Square"}
      />
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
