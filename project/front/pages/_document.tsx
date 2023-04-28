import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className='text-slate-700 w-[100vw] overflow-x-hidden'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
