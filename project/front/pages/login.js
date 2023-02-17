import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { SHOW_NOTICE } from "../reducers/global";

const Login = () => {
  const { me, signUpDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (me && me.id) {
      Router.push("/square");
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      dispatch({
        type: SHOW_NOTICE,
        data: {
          title: "Account creation completed",
          content: "새로운 계정이 생성되었습니다.",
        },
      });
    }
  }, [signUpDone]);

  return (
    <AppLayout>
      <LoginForm />
    </AppLayout>
  );
};

export default Login;
