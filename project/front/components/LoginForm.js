import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { LOG_IN_REQUEST } from "../pages/reducers/user";

import { LockClosedIcon } from "@heroicons/react/20/solid";

const LoginForm = () => {
  const { logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch();
  //   let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  //   regex.test("string")

  useEffect(() => {
    if (logInError) {
      alert(loginError);
    }
  }, [logInError]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: { email, password },
      });
      console.log(email, password);
    },
    [email, password]
  );

  return (
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
              Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link href="/signup">
                <a
                  href="#"
                  className="font-medium text-cyan-500 hover:text-cyan-500"
                >
                  make your bloobolt account
                </a>
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="submit" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="user-email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="user-email"
                  value="aa@a.com" // {email}
                  onChange={onChangeEmail}
                  id="user-email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="user-password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  name="user-password"
                  value={"123"} // password
                  placeholder="Password"
                  onChange={onChangePassword}
                  required
                  id="user-password"
                  autoComplete="current-password"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/signup">
                  <a
                    href="#"
                    className="font-medium text-cyan-500 hover:text-cyan-500"
                  >
                    Don't have an account?
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-cyan-300 group-hover:text-cyan-50"
                    aria-hidden="true"
                  />
                </span>
                Access
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
