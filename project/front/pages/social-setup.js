import React, { useCallback, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import wrapper from "../store/configureStore";
import { loadMe, socialSetup } from "../reducers/userSlice";
import bloobolt_logo_nobg from "../public/bloobolt_logo_nobg.png";
import { useForm } from "react-hook-form";
import { PencilIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const SocialSetup = () => {
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!me || !me.class === "social") {
      router.back();
    }
  }, [me]);

  const dispatch = useDispatch();
  const { socialSetupError } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSocialSetup = (formData) => {
    const { username, userClass } = formData;
    const slCheck = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/g;
    if (username.search(/\s/) !== -1 || slCheck.test(username)) {
      return setError("username", {
        message: "사용자명에 공백 또는 특수문자가 들어갈 수 없습니다.",
      });
    }
    if (userClass === "default") {
      return setError("userClass", {
        message: "직군을 선택해주세요.",
      });
    }
    dispatch(
      socialSetup({
        socialId: me.socialId,
        social: me.social,
        username,
        userClass,
      })
    );
  };
  return (
    <AppLayout>
      <div className="h-screen ">
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

              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
                소셜 계정으로 가입되었습니다
              </h2>
              <p className="mt-2 text-center text-sm ">
                새로운 소셜 계정은 사용자명과 직군 등록이 필요합니다.
              </p>
            </div>

            <div className="w-full flex relative top-3 justify-between h-0.5 items-center">
              <div className="w-full  bg-slate-200 h-[1.5px]"></div>
              <div className="text-slate-400 text-xs w-full text-center">
                추가 정보 등록
              </div>
              <div className="w-full  bg-slate-200 h-[1.5px]"></div>
            </div>

            <form
              className="mt-8 space-y-3"
              onSubmit={handleSubmit(onSocialSetup)}
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md ">
                <div>
                  <label htmlFor="username" className="sr-only"></label>
                  <input
                    id="username"
                    type="text"
                    className="relative block w-full appearance-none rounded-t-md  border border-slate-300 px-3 py-2 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                    <option value="plan">서비스-기획</option>
                    <option value="normal">일반</option>
                  </select>
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
                    ) : errors.password ? (
                      <>{errors.password.message}</>
                    ) : errors.username ? (
                      <>{errors.username.message}</>
                    ) : errors.userClass ? (
                      <>{errors.userClass.message}</>
                    ) : socialSetupError ? (
                      <>{socialSetupError}</>
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
                      <PencilIcon
                        className="h-5 w-5 text-indigo-600 group-hover:text-indigo-50"
                        aria-hidden="true"
                      />
                    </span>
                    입력 완료
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

export default SocialSetup;
