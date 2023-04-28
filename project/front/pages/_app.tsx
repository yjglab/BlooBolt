import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import 'tailwindcss/tailwind.css';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { wrapper } from '../store/configureStore';
import '../styles/globals.css';

const BlooBolt = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>BlooBolt</title>
      </Head>

      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default wrapper.withRedux(BlooBolt);
