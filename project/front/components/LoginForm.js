import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LOG_IN_REQUEST } from "../reducers/user";

import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import bloobolt_logo from "../public/bloobolt_logo.png";

import Image from "next/image";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInError } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onLogin = (formData) => {
    const { email, password } = formData;
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
  };

  return (
    <div className="h-screen bg-slate-50">
      <div className="flex h-full  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="mx-auto h-16 w-16  relative">
              <Image
                className=" cursor-pointer w-full h-full"
                src={bloobolt_logo}
                alt="logo-image"
              />
            </div>

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-600">
              Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
              Or{" "}
              <Link href="/signup">
                <span className="font-medium text-indigo-500 hover:text-indigo-500">
                  make your bloobolt account
                </span>
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-3" onSubmit={handleSubmit(onLogin)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded ">
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
                    pattern: {
                      value: /\S+@\S+\.\S+/,
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
                  placeholder="Password"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-slate-300 px-3 py-2.5 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-slate-600"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/signup">
                  <span className="cursor-pointer font-medium text-indigo-500 hover:text-indigo-600">
                    Don't have an account?
                  </span>
                </Link>
              </div>
            </div>

            <div>
              <div>
                <div
                  className="h-6 flex justify-center text-amber-400 text-xs "
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
                  className="group relative flex w-full justify-center rounded border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-600 group-hover:text-indigo-50"
                      aria-hidden="true"
                    />
                  </span>
                  Access
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
