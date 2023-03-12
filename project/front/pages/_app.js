import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import wrapper from "../store/configureStore";

const BlooBolt = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>BlooBolt</title>
      </Head>

      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

BlooBolt.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(BlooBolt);
