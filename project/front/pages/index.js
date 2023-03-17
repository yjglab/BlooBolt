import React from "react";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import axios from "axios";
import { loadMe } from "../reducers/userSlice";

import Link from "next/link";

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
                    현재 버전은 0.1.0 입니다.{" "}
                    <Link href="/service/version-log">
                      <span className="cursor-pointer font-semibold text-indigo-600">
                        <span className="absolute inset-0" aria-hidden="true" />
                        변경된 내용 알아보기{" "}
                        <span aria-hidden="true">&rarr;</span>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-3xl  font-bold tracking-tight  md:text-6xl">
                    당신의 스퀘어에서
                    <br />
                    <div className="p-0.5 md:p-1" />
                    자유롭게 대화에 참여하세요
                  </h1>
                  <p className="mt-6 text-sm sm:text-base md:text-lg leading-5 ">
                    BlooBolt Square는 소프트웨어 개발과 기획, 디자인 직무자들의
                    소통 광장입니다.
                    <br />
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/signup">
                      <span className="cursor-pointer rounded-md bg-indigo-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                        빠른 시작
                      </span>
                    </Link>
                    <Link href="/guide">
                      <span className="cursor-pointer text-sm font-semibold leading-6 ">
                        사용자 가이드<span aria-hidden="true">→</span>
                      </span>
                    </Link>
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
