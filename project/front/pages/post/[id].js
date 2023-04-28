// Square 대신 Hashtag: ddd
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import PostSection from '../../components/PostSection';
import Router, { useRouter } from 'next/router';

import { loadSolePost } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { loadMe } from '../../reducers/user';
import { ArrowUturnLeftIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';

const Post = () => {
  const router = useRouter();
  const { solePost } = useSelector((state) => state.post);
  if (!solePost) return;

  const onRefresh = () => {
    router.back();
  };

  return (
    <AppLayout>
      <div className='min-h-screen flex pb-20'>
        <div className='mt-16 md:mt-20 px-2 sm:px-[2%] md:px-[2%] lg:px-[12%] w-full h-full relative'>
          <h1 className='px-6 text-base font-semibold leading-6 text-indigo-500'>{'상세 포스트'}</h1>
          <div className='px-5 mb-20 h-10 text-2xl flex justify-between items-center'>
            <div onClick={onRefresh} className='cursor-pointer relative flex items-center font-bold left-1'>
              <h1 className=' text-2xl font-bold tracking-tight  sm:text-3xl'>
                {solePost.User.username}님의 포스트
              </h1>

              <ArrowUturnLeftIcon className='ml-3  w-5 hover:scale-110' />
            </div>
          </div>

          <div className=' px-0 md:px-4'>
            <PostSection post={solePost} detailed={true} squareKind={solePost.class} />
          </div>
        </div>
      </div>
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
  await context.store.dispatch(loadSolePost({ postId: context.params.id }));

  return {
    props: { message: '' },
  };
});

export default Post;
