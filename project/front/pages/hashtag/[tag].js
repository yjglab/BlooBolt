// Square 대신 Hashtag: ddd
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import Router, { useRouter } from 'next/router';

import { loadPostsByHashtag } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { loadMe } from '../../reducers/user';
import SquareHeader from '../../components/SquareHeader';

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadMorePosts, loadPostsLoading } = useSelector((state) => state.post);

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
        squareSubTitle={'어떤 글이 태그되었나요?'}
        squareTitle={`Hashtag #${router.query.tag}`}
        squareKind={'public'}
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

  await context.store.dispatch(loadMe());
  await context.store.dispatch(loadPostsByHashtag({ tag: context.params.tag }));

  return {
    props: { message: '' },
  };
});

export default Hashtag;
