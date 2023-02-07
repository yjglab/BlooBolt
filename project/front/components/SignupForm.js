import { LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";

import useInput from "../hooks/useInput";
import { SIGN_UP_REQUEST } from "../pages/reducers/user";

const SignupForm = () => {
  const dispatch = useDispatch();
  const { me, signUpError, signUpDone } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput("");
  const [username, onChangeUsername] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState("");

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
    },
    [term]
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (passwordError) {
        return alert("비밀번호가 일치하지 않습니다.");
      }
      if (!term) {
        return alert("서비스 이용 약관에 동의해주십시요.");
      }
      dispatch({
        type: SIGN_UP_REQUEST,
      });
      console.log(email, username, password, passwordCheck);
    },
    [email, password, passwordCheck, term]
  );

  useEffect(() => {
    if (signUpDone) {
      Router.push("/login");
    }
  }, [signUpDone]);
  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

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
                Make your FlashBag
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link href="/login">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    login your account
                  </a>
                </Link>
              </p>
            </div>
            <form
              className="mt-8 space-y-6"
              action="submit"
              onSubmit={onSubmit}
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="user-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="user-email"
                    value={email}
                    onChange={onChangeEmail}
                    id="user-email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="user-name" className="sr-only">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    id="user-name"
                    required
                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="User Name"
                  />
                </div>
                <div>
                  <label htmlFor="user-password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    name="user-password"
                    value={password}
                    placeholder="Password"
                    onChange={onChangePassword}
                    required
                    id="user-password"
                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="relative flex items-center">
                  <label htmlFor="user-password-check" className="sr-only">
                    Password Check
                  </label>
                  <input
                    type="password"
                    name="user-password-check"
                    value={passwordCheck}
                    placeholder="Password Check"
                    onChange={onChangePasswordCheck}
                    required
                    id="user-password-check"
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  {passwordError ? (
                    <span className="z-1 absolute right-5 text-xs tracking-wide text-red-600">
                      Password Dismatch
                    </span>
                  ) : (
                    <span className="z-1 absolute right-5 opacity-0 text-xs tracking-wide text-green-600">
                      Password Dismatch
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    name="user-term"
                    checked={term}
                    onChange={onChangeTerm}
                    id="user-term"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="user-term"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Subscribe Terms of Service.
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/login">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Already have an account?
                    </a>
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
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
