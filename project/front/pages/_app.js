import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Provider, useSelector } from "react-redux";
import store from "../store/configureStore";

const BlooBolt = ({ Component }) => {
  return (
    <Provider store={store}>
      <Head>
        <meta charSet="utf-8" />
        <title>BlooBolt</title>
      </Head>
      <Navigation />
      <Component />
      <Footer />
    </Provider>
  );
};

BlooBolt.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default BlooBolt;
