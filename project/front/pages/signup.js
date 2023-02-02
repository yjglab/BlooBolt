import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (me && me.id) {
      Router.push("/");
    }
  }, [me && me.id]);

  return (
    <AppLayout>
      <SignupForm />
    </AppLayout>
  );
};

export default Signup;
