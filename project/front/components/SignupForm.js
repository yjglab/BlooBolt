import { LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";

import useInput from "../hooks/useInput";
import { SIGN_UP_REQUEST } from "../pages/reducers/user";

const SignupForm = () => {
  const dispatch = useDispatch();
  const { me, signUpError, signUpDone } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSignUp = useCallback((formData) => {
    dispatch({
      type: SIGN_UP_REQUEST,
    });
    if (signUpDone) {
      Router.push("/login");
    }
    console.log(
      formData.email,
      formData.username,
      formData.password,
      formData.passwordCheck
    );
  }, []);

  return (
    <AppLayout>
      <div className="h-screen bg-gray-50">
        <div className="flex h-full  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://cdn-icons-png.flaticon.com/512/880/880910.png"
                alt="logo-image"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Welcome BlooBolt
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                <span
                  href="#"
                  className="font-medium text-indigo-500/90 hover:text-indigo-500/90"
                >
                  Make your BlooBolt account
                </span>
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
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500/90 focus:outline-none focus:ring-indigo-500/90 sm:text-sm"
                    {...register("email", {
                      required: "이메일은 필수 입력입니다",
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
                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500/90 focus:outline-none focus:ring-indigo-500/90 sm:text-sm"
                    placeholder="User Name"
                    {...register("username", {
                      required: "사용자명은 필수 입력입니다",
                      minLength: {
                        value: 2,
                        message: "2자리 이상의 사용자명을 입력해주세요",
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
                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500/90 focus:outline-none focus:ring-indigo-500/90 sm:text-sm"
                    {...register("password", {
                      required: "비밀번호를 입력해주세요",
                      minLength: {
                        value: 4,
                        message: "4자리 이상의 비밀번호를 입력해주세요",
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
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500/90 focus:outline-none focus:ring-indigo-500/90 sm:text-sm"
                    {...register("passwordCheck", {
                      required: "비밀번호를 입력해주세요",
                      minLength: {
                        value: 4,
                        message: "4자리 이상의 비밀번호를 입력해주세요",
                      },
                    })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="term"
                    // checked={term}
                    // onChange={onChangeTerm}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-500/90 focus:ring-indigo-500/90"
                    {...register("term", {
                      required: "서비스 약관에 동의해주세요",
                    })}
                  />
                  <label
                    htmlFor="term"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Subscribe Terms of Service.
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/login">
                    <a
                      href="#"
                      className="font-medium text-indigo-500/90 hover:text-indigo-500/90"
                    >
                      Already have an account?
                    </a>
                  </Link>
                </div>
              </div>

              <div>
                <div
                  className="h-6 flex justify-center text-red-500 text-xs "
                  role="alert"
                >
                  {errors.email ? (
                    <>{errors.email.message}</>
                  ) : errors.username ? (
                    <>{errors.username.message}</>
                  ) : errors.password ? (
                    <>{errors.password.message}</>
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
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-500/90 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-500/90 focus:outline-none focus:ring-2 focus:ring-indigo-500/90 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500/90 group-hover:text-indigo-500/90"
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
