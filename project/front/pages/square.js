import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import SquareHeader from "../components/SquareHeader";
import { loadPosts } from "../reducers/postSlice";
import wrapper from "../store/configureStore";
import { loadMe, loadUser } from "../reducers/userSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Square = () => {
  const { me } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (me?.class === "social") {
      router.push("/social-setup", undefined, { shallow: true });
    }
  }, [me?.class]);

  return (
    <AppLayout>
      <SquareHeader
        squareSubTitle={"누구나 참여해요!"}
        squareTitle={"Public Square"}
        squareKind={"public"}
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
    await context.store.dispatch(loadPosts({ postUnique: "public" }));
    await context.store.dispatch(loadUser({ username: "" }));
    return {
      props: { message: "" },
    };
  }
);

export default Square;
