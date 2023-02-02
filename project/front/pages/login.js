import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import Navigation from "../components/Navigation";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import Router from "next/router";

const Login = () => {
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (me && me.id) {
      Router.push("/");
    }
  }, [me && me.id]);

  return (
    <AppLayout>
      <Navigation />
      <LoginForm />
    </AppLayout>
  );
};

export default Login;
