import React from "react";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import axios from "axios";
import { loadMe } from "../reducers/userSlice";

const Landing = () => {
  return (
    <AppLayout>
      <div></div>
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

export default Landing;
