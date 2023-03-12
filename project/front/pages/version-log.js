import React from "react";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import axios from "axios";
import { loadMe } from "../reducers/userSlice";

import { StarIcon, WrenchScrewdriverIcon } from "@heroicons/react/20/solid";
import guide_shot_2 from "../public/guide_shot_2.png";
import Image from "next/image";

const Guide = () => {
  return (
    <AppLayout>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mb-64 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                  Version Log
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
                  BlooBolt 0.1.0
                </p>
                <p className="mt-6 text-lg leading-8 "></p>
                <div className="mt-10 max-w-xl space-y-8 text-base leading-7  lg:max-w-none">
                  <div className="relative pl-9">
                    <div className=" font-semibold ">
                      <StarIcon
                        className="absolute top-1 left-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      새로운 기능
                    </div>{" "}
                    <div className="mb-2">
                      <div className="w-[4px] h-[4px] mr-0.5 bg-slate-700 rounded-full inline-block relative bottom-1"></div>{" "}
                      서비스 기획자를 위한 기획 스퀘어가 추가되었습니다. 이제
                      계정 가입 시 기획자 직군을 새롭게 선택할 수 있습니다.
                    </div>
                    <div className="mb-2">
                      <div className="w-[4px] h-[4px] mr-0.5 bg-slate-700 rounded-full inline-block relative bottom-1"></div>{" "}
                      이제 회원가입과 로그인 절차를 편리하게 하기 위한 소셜
                      로그인 기능을 제공합니다.
                    </div>
                  </div>
                  <div className="relative pl-9">
                    <div className=" font-semibold ">
                      <WrenchScrewdriverIcon
                        className="absolute top-1 left-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      변경된 내용
                    </div>{" "}
                    <div className="mb-2">
                      <div className="w-[4px] h-[4px] mr-0.5 bg-slate-700 rounded-full inline-block relative bottom-1"></div>{" "}
                      일반 계정 사용자의 비밀번호를 잊어버린 경우의 임시 발급
                      절차를 변경했습니다. 각 사용자는 계정 가입 시 고유의
                      사용자 코드를 메일로 제공받으며 해당 코드의 확인 과정을
                      통해 비밀번호를 재발급 받을 수 있습니다.
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="w-[48rem] relative max-w-none rounded-xl shadow-xl  sm:w-[57rem] md:-ml-4 lg:-ml-0">
              <Image src={guide_shot_2} className="absolute " />
            </div>
          </div>
        </div>

        <div className="mb-64 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                  Version Log
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
                  BlooBolt Beta 0.0.0
                </p>
                <p className="mt-6 text-lg leading-8 ">
                  BlooBolt 개발자입니다. 올해 2월 중순부터 제작을 시작한 본
                  웹서비스의 베타 단계 개발을 완료했습니다. 이 곳에서는 BlooBolt
                  서비스 버전에 관한 변경 내역을 알려드립니다.
                </p>
                <div className="mt-10 max-w-xl space-y-8 text-base leading-7  lg:max-w-none">
                  <div className="relative pl-9">
                    <div className=" font-semibold ">
                      <StarIcon
                        className="absolute top-1 left-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      새로운 기능
                    </div>{" "}
                    <div className="inline">
                      베타 단계를 배포 중이며 새롭게 추가되는 내용이 있다면 해당
                      항목에서 자세히 알려드립니다. 또한 정식버전인 1.0에서 많은
                      것들이 추가되고 업데이트 될 것입니다.
                    </div>
                  </div>
                  <div className="relative pl-9">
                    <div className=" font-semibold ">
                      <WrenchScrewdriverIcon
                        className="absolute top-1 left-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      변경된 내용
                    </div>{" "}
                    <div className="inline">
                      모든 기능에 관한 검토를 마쳤습니다. 혹시라도 발견하지 못한
                      오류가 발생하거나 건의하실 의견이 있으시다면
                      bloobolt.co@gmail.com 으로 전달해주시면 감사하겠습니다.
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="w-[48rem] relative max-w-none rounded-xl shadow-xl  sm:w-[57rem] md:-ml-4 lg:-ml-0">
              <Image src={guide_shot_2} className="absolute " />
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
