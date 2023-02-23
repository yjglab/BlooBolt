import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import Router from "next/router";
import axios from "axios";
import wrapper from "../store/configureStore";
import { loadMe } from "../reducers/userSlice";

const Login = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      Router.push("/square");
    }
  }, [me && me.id]);

  return (
    <AppLayout>
      <LoginForm />
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

    return {
      props: { message: "" },
    };
  }
);

export default Login;
