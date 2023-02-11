import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import wrapper from "../store/configureStore";
import Navigation from "../components/Navigation";

const BlooBolt = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>BlooBolt</title>
      </Head>
      <Navigation />
      <Component />
    </>
  );
};

BlooBolt.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(BlooBolt);
