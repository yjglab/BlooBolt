import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="text-slate-600  bg-slate-50 w-[100vw] overflow-x-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
