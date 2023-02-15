import React from "react";
import { useDispatch, useSelector } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserInformation = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <div className="w-full xl:w-8/12 px-3">
      <div className="text-2xl font-semibold">Information</div>
      <div className="w-full  py-6 sm:px-0">
        <div>
          <div className="lg:grid lg:grid-cols-3 lg:gap-6">
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-slate-600">
                  Public Information
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  이 영역에 게시되는 정보는 공개적으로 표시됩니다.
                </p>
              </div>
            </div>
            <div className="mt-5 lg:col-span-2 lg:mt-0">
              <form action="submit">
                <div className="shadow sm:overflow-hidden sm:rounded">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-slate-600"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-slate-600"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        placeholder="Web Developer"
                        className="placeholder:text-slate-300 mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="w-full col-span-3">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-slate-600"
                        >
                          Website
                        </label>
                        <div className="mt-1 flex rounded shadow-sm">
                          <span className="inline-flex items-center rounded-l border border-r-0 border-slate-300 bg-slate-50 px-3 text-sm text-slate-500">
                            http://
                          </span>
                          <input
                            type="text"
                            name="company-website"
                            id="company-website"
                            className="block placeholder:text-slate-300 w-full flex-1 rounded-none rounded-r border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="www.mywebsite.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-slate-600"
                      >
                        About
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows="3"
                          className="mt-1 placeholder:text-slate-300 block w-full rounded border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="안녕하세요."
                        ></textarea>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600">
                        Avatar
                      </label>
                      <div className="mt-1 flex items-center">
                        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-slate-100">
                          <svg
                            className="h-full w-full text-slate-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <button
                          type="button"
                          className="ml-5 rounded border border-slate-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-slate-600 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Change
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        20mb 이하의 이미지 파일만 가능합니다
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-slate-200"></div>
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="lg:grid lg:grid-cols-3 lg:gap-6">
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-slate-600">
                  Personal Information
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  이 영역에 게시되는 정보는 공개되지 않습니다.
                </p>
              </div>
            </div>
            <div className="mt-5 lg:col-span-2 lg:mt-0">
              <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 ">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-slate-600"
                        >
                          Real name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 ">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-slate-600"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-slate-600"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full rounded border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>Korea</option>
                          <option>Canada</option>
                          <option>United States</option>
                        </select>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-slate-600"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 block w-full rounded border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-slate-200"></div>
          </div>
        </div>

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
                <div className="overflow-hidden shadow sm:rounded">
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
                    {/* <fieldset>
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
                  </fieldset> */}
                  </div>
                  <div className="bg-slate-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
