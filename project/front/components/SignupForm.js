import {
  ArrowPathIcon,
  EnvelopeIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import bloobolt_logo_nobg from "../public/bloobolt_logo_nobg.png";

import { signUp, signUpEmailAuth, signKakao } from "../reducers/userSlice";
import { backUrl } from "../config/config";

const SignupForm = () => {
  const dispatch = useDispatch();
  const { signUpError, signUpEmailAuthLoading, supportMessage, signUpLoading } =
    useSelector((state) => state.user);
  const [signUpEmailSended, setSignUpEmailSended] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSignKakao = useCallback(() => {
    window.location.href = `${backUrl}/auth/kakao`;
  }, []);
  const onSignGoogle = useCallback(() => {
    window.location.href = `${backUrl}/auth/google`;
  }, []);

  const onSignUp = (formData) => {
    const { email, username, password, passwordCheck, userClass, signupCode } =
      formData;
    const slCheck = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/g;
    if (username.search(/\s/) !== -1 || slCheck.test(username)) {
      return setError("username", {
        message: "사용자명에 공백 또는 특수문자가 들어갈 수 없습니다.",
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
    if (userClass === "default") {
      return setError("userClass", {
        message: "직군을 선택해주세요.",
      });
    }
    if (!signUpEmailSended) {
      return setError("signupCode", {
        message: "이메일 인증이 필요합니다.",
      });
    }
    if (signupCode !== supportMessage) {
      return setError("signupCode", {
        message: "인증코드가 일치하지 않습니다.",
      });
    }
    if (signUpError === "이미 존재하는 이메일 계정입니다.") {
      setSignUpEmailSended(false);
      reset({ signupCode: null });
    }
    dispatch(
      signUp({
        email,
        username,
        password,
        userClass,
      })
    );
  };

  const onSignUpEmailAuth = () => {
    const authEmail = getValues("email");
    if (!authEmail) {
      return setError("email", { message: "인증할 이메일을 입력해주세요." });
    }
    dispatch(signUpEmailAuth({ authEmail }));
    setSignUpEmailSended(true);
  };

  return (
    <AppLayout>
      <div className="h-screen ">
        <div className="flex h-full mt-[7%] justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <div className="mx-auto h-20 w-20  relative">
                <Image
                  className=" cursor-pointer w-full h-full"
                  src={bloobolt_logo_nobg}
                  alt="logo-image"
                />
              </div>
              <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-600">
                BlooBolt에 오신것을 환영합니다
              </h2>
              <p className="mt-2 text-center text-sm text-slate-600">
                <span className="font-medium text-slate-500 ">
                  BlooBolt는 소프트웨어 개발과 기획, 디자인 직무자들의 소통
                  광장입니다.
                </span>
              </p>
            </div>

            <div className="w-full flex relative top-3 justify-between h-0.5 items-center">
              <div className="w-full  bg-slate-200 h-[1.5px]"></div>
              <div className="text-slate-400 text-xs w-full text-center">
                소셜 계정 회원가입
              </div>
              <div className="w-full  bg-slate-200 h-[1.5px]"></div>
            </div>
            <div>
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
            </div>

            <div className="w-full flex relative top-3 justify-between h-0.5 items-center">
              <div className="w-full  bg-slate-200 h-[1.5px]"></div>
              <div className="text-slate-400 text-xs w-full text-center">
                일반 계정 회원가입
              </div>
              <div className="w-full  bg-slate-200 h-[1.5px]"></div>
            </div>
            <form className="mt-8 space-y-2" onSubmit={handleSubmit(onSignUp)}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md ">
                <div>
                  <label htmlFor="email" className="sr-only"></label>
                  <input
                    id="email"
                    type="text"
                    placeholder="이메일 주소"
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-slate-300 px-3 py-2 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("email", {
                      required: "이메일은 필수 입력입니다",
                      maxLength: 100,
                      pattern: {
                        value:
                          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                        message: "이메일 형식에 맞지 않습니다",
                      },
                    })}
                  />
                </div>
                <div>
                  <label htmlFor="username" className="sr-only"></label>
                  <input
                    id="username"
                    type="text"
                    className="relative block w-full appearance-none rounded-none  border border-slate-300 px-3 py-2 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="사용자명 (4~10자)"
                    {...register("username", {
                      required: "사용자명은 필수 입력입니다",
                      minLength: {
                        value: 4,
                        message: "4자리 이상의 사용자명을 입력해주세요",
                      },
                      maxLength: {
                        value: 10,
                        message: "10자리 이하의 사용자명을 입력해주세요",
                      },
                    })}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only"></label>
                  <input
                    id="password"
                    type="password"
                    placeholder="비밀번호 (영문/숫자/특수기호 조합 8자 이상)"
                    className="relative block w-full appearance-none rounded-none  border border-slate-300 px-3 py-2 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("password", {
                      required: "비밀번호를 입력해주세요",
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        message:
                          "비밀번호는 영문, 숫자, 특수기호를 조합한 8자 이상이어야 합니다.",
                      },
                    })}
                  />
                </div>
                <div className="relative flex items-center">
                  <label htmlFor="passwordCheck" className="sr-only"></label>
                  <input
                    id="passwordCheck"
                    type="password"
                    placeholder="비밀번호 확인"
                    className="relative block w-full appearance-none rounded-none  border border-slate-300 px-3 py-2 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("passwordCheck", {
                      required: "",
                    })}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="userClass"
                    className="block text-sm font-medium "
                  ></label>
                  <select
                    id="userClass"
                    name="userClass"
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-slate-300 px-3 py-2 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("userClass", {
                      required: "직군을 선택해주세요.",
                    })}
                  >
                    <option value="default">...직군을 선택해주세요</option>
                    <option value="fedev">개발-프론트엔드</option>
                    <option value="bedev">개발-백엔드</option>
                    <option value="design">디자인-UX/UI</option>
                    <option value="plan">기획</option>
                    <option value="normal">일반</option>
                  </select>
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
                    BlooBolt 서비스 가입 약관에 동의합니다.
                  </label>
                </div>
                <Link href="/login">
                  <span className="underline cursor-pointer text-sm text-indigo-500 hover:text-indigo-600">
                    이미 회원입니다
                  </span>
                </Link>
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
                  ) : errors.userClass ? (
                    <>{errors.userClass.message}</>
                  ) : errors.signupCode ? (
                    <>{errors.signupCode.message}</>
                  ) : signUpError ? (
                    <>{signUpError}</>
                  ) : (
                    ""
                  )}
                </div>
                {signUpEmailAuthLoading ? (
                  <div className="group relative flex items-center w-full justify-center rounded-md border border-transparent py-2 px-4">
                    <ArrowPathIcon className="w-5 left-0 right-0 mx-auto animate-spin" />
                  </div>
                ) : signUpEmailSended ? (
                  <div>
                    <label htmlFor="signupCode" className="sr-only">
                      Password
                    </label>
                    <input
                      id="signupCode"
                      type="password"
                      autoFocus
                      placeholder="전송된 이메일 인증 코드 6자리를 입력해주세요."
                      className="placeholder:text-slate-400 placeholder:text-sm relative block w-full appearance-none rounded-md  border border-slate-300 px-3 py-2 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      {...register("signupCode", {
                        required: "인증코드를 입력해주세요.",
                        maxLength: {
                          value: 6,
                        },
                      })}
                    />
                  </div>
                ) : (
                  <button
                    onClick={onSignUpEmailAuth}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-500 py-2 px-4 text-sm font-medium text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <EnvelopeIcon
                        className="h-5 w-5 text-slate-600 group-hover:text-indigo-50"
                        aria-hidden="true"
                      />
                    </span>
                    이메일 인증
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-1.5 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserPlusIcon
                      className="h-5 w-5 text-indigo-600 group-hover:text-indigo-50"
                      aria-hidden="true"
                    />
                  </span>
                  {signUpLoading ? (
                    <ArrowPathIcon className="w-5 left-0 right-0 mx-auto animate-spin" />
                  ) : (
                    "회원가입"
                  )}
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
