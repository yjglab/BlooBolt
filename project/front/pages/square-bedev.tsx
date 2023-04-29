import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import SquareHeader from '../components/SquareHeader';
import { loadPosts } from '../reducers/post';
import { loadMe, loadUser } from '../reducers/user';
import { RootState, useAppSelector, wrapper } from '../store/configureStore';

const SquareBedev: FC = () => {
  const { me } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (me?.class === 'social') {
      router.push('/social-setup', undefined, { shallow: true });
    }
  }, [me?.class, router]);

  return (
    <AppLayout>
      <SquareHeader squareSubTitle='백엔드 개발자에요!' squareTitle='Backend Square' squareKind='bedev' />
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
  await dispatch(loadPosts({ postUnique: 'bedev' }));
  await dispatch(loadUser({ username: '' }));
  return {
    props: { message: '' },
  };
});

export default SquareBedev;
