import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { SHOW_NOTICE } from "../reducers/global";

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

export default Login;
