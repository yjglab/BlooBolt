import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostSection from "../components/PostSection";
import PostForm from "../components/PostForm";
import SquareHeader from "../components/SquareHeader";

import {
  cancelAllPostImages,
  flushMainPosts,
  loadPosts,
  loadPostsByKeyword,
} from "../reducers/postSlice";
import wrapper from "../store/configureStore";
import { loadMe, loadUser } from "../reducers/userSlice";
import axios from "axios";
import { openNotice } from "../reducers/globalSlice";
import { useForm } from "react-hook-form";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

const Square = () => {
  const { me } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <AppLayout>
      <SquareHeader
        squareSubTitle={"아무나 대화해요!"}
        squareTitle={"Public Square"}
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
    await context.store.dispatch(loadPosts());
    await context.store.dispatch(loadUser({ username: "" }));
    return {
      props: { message: "" },
    };
  }
);

export default Square;
