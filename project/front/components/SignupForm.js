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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow rounded-lg ">
          <div className="flex justify-center">
            {/* mobile */}
            <img
              className="block h-14 mb-4 w-auto lg:hidden"
              src="https://cdn-icons-png.flaticon.com/512/880/880910.png"
              alt="Your Company"
            />
            <img
              className="hidden h-14 mb-4 w-auto lg:block"
              src="https://cdn-icons-png.flaticon.com/512/880/880910.png"
              alt="Your Company"
            />
          </div>
          <h3 className="text-2xl font-semibold text-center">Sign Up</h3>
          <form action="submit" onSubmit={onSubmit}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="user-email">
                  Email
                </label>
                <input
                  type="email"
                  name="user-email"
                  value={email}
                  placeholder="Email"
                  onChange={onChangeEmail}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-2">
                <label className="block" htmlFor="user-name">
                  User Name
                </label>
                <input
                  type="text"
                  name="user-name"
                  value={username}
                  placeholder="User Name"
                  onChange={onChangeUsername}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-2">
                <label className="block" htmlFor="user-password">
                  Password
                </label>
                <input
                  type="password"
                  name="user-password"
                  value={password}
                  placeholder="Password"
                  onChange={onChangePassword}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-2">
                <label className="block" htmlFor="user-password-check">
                  Password Check
                </label>
                <input
                  type="password"
                  name="user-password-check"
                  value={passwordCheck} // password
                  placeholder="Password Check"
                  onChange={onChangePasswordCheck}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {passwordError ? (
                  <span className="text-xs tracking-wide text-red-600">
                    Password Dismatch
                  </span>
                ) : (
                  <span className="opacity-0 text-xs tracking-wide text-green-600">
                    Password Dismatch
                  </span>
                )}
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="user-term"
                  value=""
                  checked={term}
                  onChange={onChangeTerm}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Subscribe Terms of Service.
                </label>
              </div>

              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                >
                  Login
                </button>
                <Link href="/login">
                  <span className="text-sm text-blue-600 hover:underline">
                    Already have an account?
                  </span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default SignupForm;
