import Link from "next/link";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowPathIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import bloobolt_logo_nobg from "../public/bloobolt_logo_nobg.png";
import Image from "next/image";
import { backUrl } from "../config/config";
import { logIn } from "../reducers/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInError, loginLoading } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onLogin = (formData) => {
    const { email, password } = formData;
    dispatch(logIn({ email, password }));
  };

  const onSignKakao = useCallback(() => {
    window.location.href = `${backUrl}/auth/kakao`;
  }, []);
  const onSignGoogle = useCallback(() => {
    window.location.href = `${backUrl}/auth/google`;
  }, []);

  return (
    <div className="h-screen ">
      <div className="flex h-full  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="mx-auto h-20 w-20  relative">
              <Image
                className=" cursor-pointer w-full h-full"
                src={bloobolt_logo_nobg}
                alt="logo-image"
              />
            </div>

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
              보유한 계정으로 로그인하세요
            </h2>
            <p className="mt-2 text-center text-sm ">
              계정이 없으신가요?{" "}
              <Link href="/signup">
                <span className="underline cursor-pointer font-medium text-indigo-500 hover:text-indigo-600">
                  회원가입
                </span>
              </Link>
            </p>
          </div>

          <div className="w-full flex relative top-3 justify-between h-0.5 items-center">
            <div className="w-full  bg-slate-200 h-[1.5px]"></div>
            <div className="text-slate-400 text-xs w-full text-center">
              소셜 계정 로그인
            </div>
            <div className="w-full  bg-slate-200 h-[1.5px]"></div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSignGoogle}
              className="group  relative flex w-full justify-center rounded-md border border-transparent ring-1 ring-slate-300  hover:bg-slate-100 py-2 px-4 text-sm font-medium"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img
                  className="w-5 grayscale"
                  src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
                />
              </span>
              Google
            </button>
            <button
              onClick={onSignKakao}
              className="group  relative flex w-full justify-center rounded-md border border-transparent ring-1 ring-slate-300  hover:bg-slate-100 py-2 px-4 text-sm font-medium"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img
                  className="w-8 grayscale"
                  src="https://developers.kakao.com/static/images/pc/product/icon/kakaoTalk.png"
                />
              </span>
              Kakao
            </button>
          </div>

          <div className="w-full flex relative top-3 justify-between h-0.5 items-center">
            <div className="w-full  bg-slate-200 h-[1.5px]"></div>
            <div className="text-slate-400 text-xs w-full text-center">
              일반 계정 로그인
            </div>
            <div className="w-full  bg-slate-200 h-[1.5px]"></div>
          </div>

          <form className="mt-8 space-y-3" onSubmit={handleSubmit(onLogin)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md ">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="이메일 주소"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-slate-300 px-3 py-2  placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register("email", {
                    required: "이메일은 필수 입력입니다",
                    pattern: {
                      value:
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                      message: "이메일 형식에 맞지 않습니다",
                    },
                  })}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-slate-300 px-3 py-2 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register("password", {
                    required: "비밀번호를 입력해주세요",
                  })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  // type="checkbox"
                  className="h-4 w-4 rounded-md border-slate-300 text-indigo-500 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm ">
                  {/* 내 정보를 기억합니다 */}
                </label>
              </div>

              <div className="text-sm">
                <Link href="/support">
                  <span className="cursor-pointer font-medium text-indigo-500 hover:text-indigo-600">
                    비밀번호를 잊으셨나요?
                  </span>
                </Link>
              </div>
            </div>

            <div>
              <div>
                <div
                  className="h-6 flex justify-center text-orange-400 text-xs "
                  role="alert"
                >
                  {errors.email ? (
                    <>{errors.email.message}</>
                  ) : errors.password ? (
                    <>{errors.password.message}</>
                  ) : logInError ? (
                    <>{logInError}</>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-600 group-hover:text-indigo-50"
                      aria-hidden="true"
                    />
                  </span>
                  {loginLoading ? (
                    <ArrowPathIcon className="w-5 left-0 right-0 mx-auto animate-spin" />
                  ) : (
                    "로그인"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
