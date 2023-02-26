import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import UserPersonalInfo from "./UserPersonalInfo";
import UserPublicInfo from "./UserPublicInfo";

const UserInformation = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <div className="sm:w-[50%] xl:w-8/12 px-3">
      <div className="text-2xl font-semibold">내 정보</div>
      <div className="w-full  py-6 sm:px-0">
        <UserPublicInfo me={me} />

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-slate-200"></div>
          </div>
        </div>

        <UserPersonalInfo me={me} />

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-slate-200"></div>
          </div>
        </div>
        {/* 
        <div className="mt-10 sm:mt-0">
          <div className="lg:grid lg:grid-cols-3 lg:gap-6">
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-slate-600">
                  Service Setting
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  서비스 설정을 변경합니다
                </p>
              </div>
            </div>
            <div className="mt-5 lg:col-span-2 lg:mt-0">
              <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <fieldset>
                      <legend className="contents text-base font-medium text-slate-600">
                        Status
                      </legend>
                      <p className="text-xs text-slate-500">
                        온라인 상태 여부를 표시합니다
                      </p>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-slate-300 text-indigo-500 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="push-everything"
                            className="ml-3 block text-sm font-medium text-slate-600"
                          >
                            Active
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-slate-300 text-indigo-500 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="push-email"
                            className="ml-3 block text-sm font-medium text-slate-600"
                          >
                            Off
                          </label>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className="contents text-base font-medium text-slate-600">
                        Profile disclosure
                      </legend>
                      <p className="text-sm text-slate-500">
                        프로필 공개 여부를 결정합니다
                      </p>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-slate-300 text-indigo-500 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="push-everything"
                            className="ml-3 block text-sm font-medium text-slate-600"
                          >
                            Public
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-slate-300 text-indigo-500 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="push-email"
                            className="ml-3 block text-sm font-medium text-slate-600"
                          >
                            Private
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="bg-slate-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserInformation;
