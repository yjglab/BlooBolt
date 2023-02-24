import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import axios from "axios";
import wrapper from "../store/configureStore";
import { loadMe } from "../reducers/userSlice";

const Login = () => {
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (me && me.id) {
      router.back();
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
