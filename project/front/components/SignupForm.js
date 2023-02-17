import { UserPlusIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";

import { SIGN_UP_REQUEST } from "../reducers/user";
import bloobolt_logo_nobg from "../public/bloobolt_logo_nobg.png";

const SignupForm = () => {
  const dispatch = useDispatch();
  const { signUpError } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSignUp = (formData) => {
    const { email, username, password, passwordCheck } = formData;

    if (!username.trim()) {
      return setError("username", {
        message: "사용자명을 입력해주세요",
      });
    }
    if (password.indexOf(" ") !== -1) {
      return setError("password", {
        message: "비밀번호에 빈칸을 넣을 수 없습니다",
      });
    }
    if (password !== passwordCheck) {
      return setError("passwordCheck", {
        message: "비밀번호 확인이 일치하지 않습니다",
      });
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        username,
        password,
      },
    });
  };

  return (
    <AppLayout>
      <div className="h-screen bg-slate-50">
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
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-600">
                Welcome BlooBolt
              </h2>
              <p className="mt-2 text-center text-sm text-slate-600">
                <Link href="/login">
                  <span
                    href="/login"
                    className="font-medium text-indigo-500 hover:text-indigo-500"
                  >
                    Already have an account?
                  </span>
                </Link>
              </p>
            </div>
            <form className="mt-8 space-y-3" onSubmit={handleSubmit(onSignUp)}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md ">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Email address"
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-slate-300 px-3 py-2.5 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("email", {
                      required: "이메일은 필수 입력입니다",
                      maxLength: 100,
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "이메일 형식에 맞지 않습니다",
                      },
                    })}
                  />
                </div>
                <div>
                  <label htmlFor="username" className="sr-only">
                    User Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="relative block w-full appearance-none rounded-none  border border-slate-300 px-3 py-2.5 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="User Name"
                    {...register("username", {
                      required: "사용자명은 필수 입력입니다",
                      minLength: {
                        value: 2,
                        message: "2자리 이상의 사용자명을 입력해주세요",
                      },
                      maxLength: {
                        value: 10,
                        message: "10자리 이하의 사용자명을 입력해주세요",
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
                    placeholder="Password"
                    className="relative block w-full appearance-none rounded-none  border border-slate-300 px-3 py-2.5 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("password", {
                      required: "비밀번호를 입력해주세요",
                      minLength: {
                        value: 4,
                        message: "4자리 이상의 비밀번호를 입력해주세요",
                      },
                      maxLength: {
                        value: 14,
                        message: "14자리 이히의 비밀번호를 입력해주세요",
                      },
                    })}
                  />
                </div>
                <div className="relative flex items-center">
                  <label htmlFor="passwordCheck" className="sr-only">
                    Password Check
                  </label>
                  <input
                    id="passwordCheck"
                    type="password"
                    placeholder="Password Check"
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-slate-300 px-3 py-2.5 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("passwordCheck", {
                      required: "",
                    })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="term"
                    type="checkbox"
                    className="h-4 w-4 rounded-md border-slate-300 text-indigo-500 focus:ring-indigo-500"
                    {...register("term", {
                      required: "서비스 약관에 동의해주세요",
                    })}
                  />
                  <label
                    htmlFor="term"
                    className="ml-2 block text-sm text-slate-600"
                  >
                    Subscribe Terms of Service.
                  </label>
                </div>
              </div>

              <div>
                <div
                  className="h-6 flex justify-center text-orange-400 text-xs "
                  role="alert"
                >
                  {errors.email ? (
                    <>{errors.email.message}</>
                  ) : errors.username ? (
                    <>{errors.username.message}</>
                  ) : errors.password ? (
                    <>{errors.password.message}</>
                  ) : errors.passwordCheck ? (
                    <>{errors.passwordCheck.message}</>
                  ) : errors.term ? (
                    <>{errors.term.message}</>
                  ) : signUpError ? (
                    <>{signUpError}</>
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
                    <UserPlusIcon
                      className="h-5 w-5 text-indigo-600 group-hover:text-indigo-50"
                      aria-hidden="true"
                    />
                  </span>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SignupForm;
