import React from "react";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import axios from "axios";

const Landing = () => {
  return (
    <AppLayout>
      <div></div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(loadPosts());
    console.log("ssr on");
    return { props: { message: "Message from SSR" } };
  }
);

export default Landing;
