// Square 대신 Hashtag: ddd
import { ArrowUturnLeftIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Router, { useRouter } from 'next/router';
import React, { FC } from 'react';
import AppLayout from '../../components/AppLayout';
import PostSection from '../../components/PostSection';
import { loadSolePost } from '../../reducers/post';
import { loadMe } from '../../reducers/user';
import { RootState, useAppSelector, wrapper } from '../../store/configureStore';

const Post: FC = () => {
  const router = useRouter();
  const { solePost } = useAppSelector((state) => state.post);
  if (!solePost) return null;

  const onRefresh = () => {
    router.back();
  };

  return (
    <AppLayout>
      <div className='min-h-screen flex pb-20'>
        <div className='mt-16 md:mt-20 px-2 sm:px-[2%] md:px-[2%] lg:px-[12%] w-full h-full relative'>
          <h1 className='px-6 text-base font-semibold leading-6 text-indigo-500'>상세 포스트</h1>
          <div className='px-5 mb-20 h-10 text-2xl flex justify-between items-center'>
            <button
              type='button'
              onClick={onRefresh}
              className='cursor-pointer relative flex items-center font-bold left-1'
            >
              <h1 className=' text-2xl font-bold tracking-tight  sm:text-3xl'>
                {solePost.User.username}님의 포스트
              </h1>

              <ArrowUturnLeftIcon className='ml-3  w-5 hover:scale-110' />
            </button>
          </div>

          <div className=' px-0 md:px-4'>
            {/* detailed: true */}
            <PostSection post={solePost} detailed squareKind={solePost.class} onTogglePostForm={() => null} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  const dispatch = context.store.dispatch as ThunkDispatch<RootState, void, AnyAction>;
  await dispatch(loadMe());
  if (typeof context.params?.id !== 'undefined' && !Array.isArray(context.params.id)) {
    await dispatch(loadSolePost({ postId: context.params.id }));
  }

  return {
    props: { message: null },
  };
});

export default Post;
