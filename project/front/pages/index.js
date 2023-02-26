import React from "react";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import axios from "axios";
import { loadMe } from "../reducers/userSlice";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Landing = () => {
  return (
    <AppLayout>
      <div className="isolate bg-white min-h-screen">
        <main className="">
          <div className="min-h-screen flex items-center justify-center">
            <div className="relative px-6 lg:px-8">
              <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="mb-8 flex justify-center">
                  <div className="text-xs sm:text-sm relative rounded-full py-1 px-3 leading-6  ring-1 ring-slate-900/10 hover:ring-slate-900/20">
                    이 버전은 V.Beta 입니다.{" "}
                    <a href="#" className="font-semibold text-indigo-600">
                      <span className="absolute inset-0" aria-hidden="true" />
                      변경된 내용 알아보기{" "}
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-4xl  font-bold tracking-tight  sm:text-6xl">
                    자신의 스퀘어에서
                    <div className="p-0.5" />
                    자유롭게 참여하세요
                  </h1>
                  <p className="mt-6 text-md md:text-lg leading-5 ">
                    BlooBolt Square는 소프트웨어 개발과 디자인 직무자들이
                    소통하는 공간입니다.
                    <br />
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                      href="#"
                      className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Get started
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 ">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await context.store.dispatch(loadMe());

    return {
      props: { message: "" },
    };
  }
);

export default Landing;
