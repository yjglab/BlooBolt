import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import wrapper from "../store/configureStore";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import NoticeModal from "../components/NoticeModal";
import { useSelector } from "react-redux";

const BlooBolt = ({ Component }) => {
  const { noticeCalled } = useSelector((state) => state.global);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>BlooBolt</title>
      </Head>
      <Navigation />
      {noticeCalled && <NoticeModal />}
      <Component />
      <Footer />
    </>
  );
};

BlooBolt.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(BlooBolt);
