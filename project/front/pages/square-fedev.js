import React from "react";
import AppLayout from "../components/AppLayout";
import SquareHeader from "../components/SquareHeader";
import { loadPosts } from "../reducers/postSlice";
import wrapper from "../store/configureStore";
import { loadMe, loadUser } from "../reducers/userSlice";
import axios from "axios";

const Square = () => {
  return (
    <AppLayout>
      <SquareHeader
        squareSubTitle={"프론트엔드 개발자에요!"}
        squareTitle={"Frontend Square"}
        squareKind={"fedev"}
      />
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
    await context.store.dispatch(loadPosts({ postUnique: "fedev" }));
    await context.store.dispatch(loadUser({ username: "" }));
    return {
      props: { message: "" },
    };
  }
);

export default Square;
