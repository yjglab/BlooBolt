import React from "react";
import AppLayout from "../components/AppLayout";
import Navigation from "../components/Navigation";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <AppLayout>
      <Navigation />
      <LoginForm />
    </AppLayout>
  );
};

export default Login;
