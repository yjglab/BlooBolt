import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Menu, Transition, Tab } from "@headlessui/react";

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
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Public Information
                </h3>
                <p class="mt-1 text-sm text-gray-600">
                  이 영역에 게시되는 정보는 공개적으로 표시됩니다.
                </p>
              </div>
            </div>
            <div class="mt-5 md:col-span-2 md:mt-0">
              <form action="submit">
                <div class="shadow sm:overflow-hidden sm:rounded-md">
                  <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="first-name"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autocomplete="given-name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="first-name"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autocomplete="given-name"
                        placeholder="Web Developer"
                        class="placeholder:text-gray-300 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                      />
                    </div>
                    <div class="grid grid-cols-3 gap-6">
                      <div class="w-full col-span-3">
                        <label
                          for="company-website"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Website
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                            http://
                          </span>
                          <input
                            type="text"
                            name="company-website"
                            id="company-website"
                            class="block placeholder:text-gray-300 w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                            placeholder="www.mywebsite.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        for="about"
                        class="block text-sm font-medium text-gray-700"
                      >
                        About
                      </label>
                      <div class="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows="3"
                          class="mt-1 placeholder:text-gray-300 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                          placeholder="you@example.com"
                        ></textarea>
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700">
                        Avatar
                      </label>
                      <div class="mt-1 flex items-center">
                        <span class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                          <svg
                            class="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <button
                          type="button"
                          class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                        >
                          Change
                        </button>
                      </div>
                      <p class="mt-2 text-sm text-gray-500">
                        20mb 이하의 이미지 파일만 가능합니다
                      </p>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p class="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div class="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div class="overflow-hidden shadow sm:rounded-md">
                  <div class="bg-white px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 ">
                        <label
                          for="first-name"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Real name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autocomplete="given-name"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                        />
                      </div>

                      <div class="col-span-6 ">
                        <label
                          for="email-address"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autocomplete="email"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-4">
                        <label
                          for="country"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autocomplete="country-name"
                          class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                        >
                          <option>Korea</option>
                          <option>Canada</option>
                          <option>United States</option>
                        </select>
                      </div>

                      <div class="col-span-6">
                        <label
                          for="street-address"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autocomplete="street-address"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Service Setting
                </h3>
                <p class="mt-1 text-sm text-gray-600">
                  서비스 설정을 변경합니다
                </p>
              </div>
            </div>
            <div class="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div class="overflow-hidden shadow sm:rounded-md">
                  <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <fieldset>
                      <legend class="contents text-base font-medium text-gray-900">
                        Status
                      </legend>
                      <p class="text-sm text-gray-500">
                        온라인 상태 여부를 표시합니다
                      </p>
                      <div class="mt-4 space-y-4">
                        <div class="flex items-center">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            class="h-4 w-4 border-gray-300 text-cyan-500 focus:ring-cyan-500"
                          />
                          <label
                            for="push-everything"
                            class="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Active
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            class="h-4 w-4 border-gray-300 text-cyan-500 focus:ring-cyan-500"
                          />
                          <label
                            for="push-email"
                            class="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Deactive
                          </label>
                        </div>
                      </div>
                    </fieldset>
                    {/* <fieldset>
                    <legend class="contents text-base font-medium text-gray-900">
                      Profile disclosure
                    </legend>
                    <p class="text-sm text-gray-500">
                      프로필 공개 여부를 결정합니다
                    </p>
                    <div class="mt-4 space-y-4">
                      <div class="flex items-center">
                        <input
                          id="push-everything"
                          name="push-notifications"
                          type="radio"
                          class="h-4 w-4 border-gray-300 text-cyan-500 focus:ring-cyan-500"
                        />
                        <label
                          for="push-everything"
                          class="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Public
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          id="push-email"
                          name="push-notifications"
                          type="radio"
                          class="h-4 w-4 border-gray-300 text-cyan-500 focus:ring-cyan-500"
                        />
                        <label
                          for="push-email"
                          class="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Private
                        </label>
                      </div>
                    </div>
                  </fieldset> */}
                  </div>
                  <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
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
