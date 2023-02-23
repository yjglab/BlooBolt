import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import SignupForm from "../components/SignupForm";
import axios from "axios";
import wrapper from "../store/configureStore";
import { loadMe } from "../reducers/userSlice";
import Router from "next/router";

const Signup = () => {
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (me && me.id) {
      Router.replace("/square");
    }
  }, [me && me.id]);

  return (
    <AppLayout>
      <SignupForm />
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

export default Signup;
