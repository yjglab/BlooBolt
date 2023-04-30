// Square 대신 Hashtag: ddd
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import SquareHeader from '../../components/SquareHeader';
import { loadPostsByHashtag } from '../../reducers/post';
import { loadMe } from '../../reducers/user';
import { RootState, useAppDispatch, useAppSelector, wrapper } from '../../store/configureStore';

const Hashtag: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { me } = useAppSelector((state) => state.user);
  const { mainPosts, loadMorePosts, loadPostsLoading } = useAppSelector((state) => state.post);

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
        squareSubTitle='어떤 글이 태그되었나요?'
        squareTitle={`Hashtag ${router.query.tag}`}
        squareKind='public'
      />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  const dispatch = context.store.dispatch as ThunkDispatch<RootState, void, AnyAction>;
  await dispatch(loadMe());
  if (typeof context.params?.tag !== 'undefined' && !Array.isArray(context.params.tag)) {
    await dispatch(loadPostsByHashtag({ tag: context.params.tag }));
  }

  return {
    props: { message: null },
  };
});

export default Hashtag;
