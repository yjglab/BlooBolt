import AppLayout from "../components/AppLayout";
import React from "react";
import { useDispatch } from "react-redux";
import {
  EnvelopeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import axios from "axios";
import { loadMe } from "../reducers/userSlice";
import wrapper from "../store/configureStore";

const Support = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onFindPassword = (formData) => {
    const { email, username } = formData;
    // dispatch(findPassword({ email, username }));
  };

  return (
    <AppLayout>
      <div className="h-screen bg-slate-50">
        <div className="flex h-full  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <div className="mx-auto h-16 w-16  relative">
                <QuestionMarkCircleIcon className="w-full h-full text-indigo-500" />
              </div>

              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-600">
                Support
              </h2>
              <p className="mt-2 text-center text-sm text-slate-600">
                <span className="font-medium text-indigo-500 hover:text-indigo-500">
                  등록된 이메일과 사용자명을 입력하면 임시 비밀번호를
                  전송해드립니다
                </span>
              </p>
            </div>
            <form
              className="mt-8 space-y-3"
              onSubmit={handleSubmit(onFindPassword)}
            >
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
                    className="relative block w-full appearance-none rounded-none rounded-t-xl border border-slate-300 px-3 py-2.5 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("email", {
                      required: "이메일을 입력해주세요",
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
                    type="username"
                    placeholder="User Name"
                    className="relative block w-full focus:ring-1 appearance-none rounded-none rounded-b-xl border border-slate-300 px-3 py-2.5 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("username", {
                      required: "사용자명을 입력해주세요",
                    })}
                  />
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
                    ) : errors.username ? (
                      <>{errors.username.message}</>
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
                      <EnvelopeIcon
                        className="h-5 w-5 text-indigo-600 group-hover:text-indigo-50"
                        aria-hidden="true"
                      />
                    </span>
                    Submit
                  </button>
                </div>
              </div>
            </form>
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

export default Support;
