import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { LOG_IN_REQUEST } from "../pages/reducers/user";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
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
        <h3 className="text-2xl font-bold text-center">aa@a.com</h3>
        <form action="submit" onSubmit={onSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="user-email">
                Email
              </label>
              <input
                type="email"
                name="user-email"
                value="aa@a.com" // {email}
                placeholder="Email"
                onChange={onChangeEmail}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <span className="opacity-0 text-xs tracking-wide text-red-600">
                Email field is required{" "}
              </span>
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="user-password">
                Password
              </label>
              <input
                type="password"
                name="user-password"
                value={"123"} // password
                placeholder="Password"
                onChange={onChangePassword}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Login
              </button>
              <a
                href="/signup"
                className="text-sm text-blue-600 hover:underline"
              >
                Don't have an account?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
