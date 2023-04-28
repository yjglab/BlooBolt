import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import { loadMe } from '../reducers/user';
import { RootState, wrapper } from '../store/configureStore';

const Login: FC = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (me && me.id) {
      router.push('/square', undefined, { shallow: true });
    }
  }, [me, router]);

  return (
    <AppLayout>
      <LoginForm />
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

  return {
    props: { message: '' },
  };
});

export default Login;
