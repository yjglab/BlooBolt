import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import wrapper from "./store/configureStore";

const FlashbagOrigin = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>FlashBag</title>
      </Head>
      <Component />
    </>
  );
};

FlashbagOrigin.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(FlashbagOrigin);
