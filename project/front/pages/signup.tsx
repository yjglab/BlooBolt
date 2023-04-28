import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import SignupForm from '../components/SignupForm';
import { loadMe } from '../reducers/user';
import { RootState, wrapper } from '../store/configureStore';

const Signup: FC = () => {
  const { me } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (me && me.id) {
      Router.replace('/square');
    }
  }, [me]);

  return (
    <AppLayout>
      <SignupForm />
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

export default Signup;
