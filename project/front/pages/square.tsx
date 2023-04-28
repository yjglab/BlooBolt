import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import SquareHeader from '../components/SquareHeader';
import { loadPosts } from '../reducers/post';
import { loadMe, loadUser } from '../reducers/user';
import { RootState, useAppSelector, wrapper } from '../store/configureStore';

const Square: FC = () => {
  const { me } = useAppSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (me?.class === 'social') {
      router.push('/social-setup', undefined, { shallow: true });
    }
  }, [me?.class, router]);

  return (
    <AppLayout>
      <SquareHeader squareSubTitle='누구나 참여해요!' squareTitle='Public Square' squareKind='public' />
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
  await dispatch(loadPosts({ postUnique: 'public' }));
  await dispatch(loadUser({ username: '' }));
});

export default Square;
