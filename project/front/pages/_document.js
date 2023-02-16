import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="text-slate-600 overflow-y-scroll bg-slate-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
