import React, { Fragment, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostSection from "../components/PostSection";
import PostForm from "../components/PostForm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Landing = () => {
  return <AppLayout></AppLayout>;
};

export default Landing;
