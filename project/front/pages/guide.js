import React from "react";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import axios from "axios";
import { loadMe } from "../reducers/userSlice";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  PaintBrushIcon,
  RectangleGroupIcon,
  ServerIcon,
  ServerStackIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";

const Guide = () => {
  return (
    <AppLayout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-6 text-indigo-500">
              처음이신가요?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
              스퀘어 참여자 가이드
            </p>
            <p className="mt-3 text-lg leading-8 ">
              스퀘어 참여와 기본 규칙에 관해 알려드립니다.
            </p>
          </div>

          <div className="border-t pt-10 mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <h1 className=" text-xl font-semibold">
              스퀘어는 참여자들의 대화 공간입니다.
            </h1>
            <div className="mb-6 mt-1 text-sm">
              회원가입 시 선택한 클래스로 스퀘어에 참여할 수 있습니다. 자신의
              클래스와 다른 스퀘어에 입장하여 의견을 나눌 수 있지만 포스트
              업로드는 제한됩니다.
            </div>
            <div className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <div className="text-base font-semibold leading-6 ">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <UserGroupIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  Public Square
                </div>
                <div className="mt-2 text-base leading-6 ">
                  퍼블릭 스퀘어에는 BlooBolt에 등록된 모든 회원이 참여할 수
                  있습니다. 개발자와 디자이너 뿐만 아니라 기획자, 경영자들의
                  이야기도 들을 수 있죠.
                </div>
              </div>{" "}
              <div className="relative pl-16">
                <div className="text-base font-semibold leading-6 ">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <RectangleGroupIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  Frontend Square
                </div>
                <div className="mt-2 text-base leading-6 ">
                  프론트엔드 스퀘어에는 프론트엔드 개발자만이 포스트를 업로드할
                  수 있습니다. 업로드한 내용을 다른 클래스 근무자들과
                  공유해보세요.
                </div>
              </div>{" "}
              <div className="relative pl-16">
                <div className="text-base font-semibold leading-6 ">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <ServerStackIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  Backend Square
                </div>
                <div className="mt-2 text-base leading-6 ">
                  백엔드 스퀘어에는 백엔드 개발자만이 포스트를 업로드할 수
                  있습니다. 업로드한 내용을 다른 클래스 근무자들과 공유해보세요.
                </div>
              </div>{" "}
              <div className="relative pl-16">
                <div className="text-base font-semibold leading-6 ">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <PaintBrushIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  Design Square
                </div>
                <div className="mt-2 text-base leading-6 ">
                  디자인 스퀘어에는 UX/UI 디자이너만이 포스트를 업로드할 수
                  있습니다. 업로드한 내용을 다른 클래스 근무자들과 공유해보세요.
                </div>
              </div>
            </div>
          </div>

          <div className=" mx-auto my-44 max-w-2xl  lg:max-w-4xl">
            <h1 className=" text-xl font-semibold">
              새로운 토픽에 관해 포스트로 대화를 나눠봐요.
            </h1>
            <div className="mb-6 mt-1 text-sm">
              포스트는 카드 형태로 된 사용자들 사이의 토픽 공유 매개체입니다.
              이야기하고 싶은 토픽이 있다면 업로드 해보세요.
            </div>
            <div className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <div className="text-base font-semibold leading-6 ">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <LightBulbIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  토픽
                </div>
                <div className="mt-2 text-base leading-6 ">
                  토픽은 포스트의 제목입니다. 토픽을 설정하면 사용자들이 내
                  포스트가 어떤 내용을 말하는지 한눈에 알아볼 수 있죠. 물론
                  토픽을 설정하지 않아도 됩니다.
                </div>
              </div>{" "}
              <div className="relative pl-16">
                <div className="text-base font-semibold leading-6 ">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <DocumentTextIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  내용과 관리
                </div>
                <div className="mt-2 text-base leading-6 ">
                  포스트는 텍스트와 이미지, 해시태그를 업로드할 수 있습니다.
                  제한 사항이 없다면 언제든지 수정이 가능하죠.
                </div>
              </div>{" "}
              <div className="relative pl-16">
                <div className="text-base font-semibold leading-6 ">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <ChatBubbleLeftEllipsisIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  코멘트
                </div>
                <div className="mt-2 text-base leading-6 ">
                  참여자들이 업로드한 포스트의 코멘트 창을 열어 언제든 의견을
                  공유할 수 있습니다. 코멘트의 수정과 삭제는 언제든 가능합니다.
                </div>
              </div>{" "}
              <div className="relative pl-16">
                <div className="text-base font-semibold leading-6 ">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  제한 사항
                </div>
                <div className="mt-2 text-base leading-6 ">
                  참여자들의 소중한 코멘트가 담긴 포스트는 삭제에 제한 사항이
                  적용됩니다. 삭제를 요청하면 포스트는 즉시 블라인드되지만
                  참여자들은 열람이 가능합니다.
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
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

export default Guide;
