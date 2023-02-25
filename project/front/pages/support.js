import AppLayout from "../components/AppLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowPathIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import axios from "axios";
import { loadMe, findPassword } from "../reducers/userSlice";
import wrapper from "../store/configureStore";
import { useRouter } from "next/router";

const Support = () => {
  const dispatch = useDispatch();
  const { me, findPasswordError, findPasswordLoading, supportMessage } =
    useSelector((state) => state.user);
  const [findPasswordSended, setFindPasswordSended] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (me && me.id) {
      router.back();
    }
  }, [me]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onFindPassword = (formData) => {
    const { email } = formData;
    dispatch(findPassword({ email }));
    setFindPasswordSended(true);
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
                  {!findPasswordSended
                    ? "등록된 이메일이 확인되면 임시 비밀번호를 전송해드립니다"
                    : supportMessage}
                </span>
              </p>
            </div>
            {!findPasswordSended && (
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
                      className="relative block w-full appearance-none rounded-md border border-slate-300 px-3 py-2.5 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      {...register("email", {
                        required: "이메일을 입력해주세요",
                        pattern: {
                          value:
                            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                          message: "이메일 형식에 맞지 않습니다",
                        },
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
                      ) : findPasswordError ? (
                        <>{findPasswordError}</>
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
            )}
            {findPasswordLoading && (
              <ArrowPathIcon className="w-8 left-0 right-0 mx-auto animate-spin" />
            )}
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
