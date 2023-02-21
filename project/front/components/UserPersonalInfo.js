import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const UserPersonalInfo = ({ me }) => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
  });

  const onEditPersonalInfo = useCallback(() => {}, []);

  return (
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
            <div className="overflow-hidden shadow sm:rounded-md">
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
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
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
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-slate-50 px-4 py-3 text-right sm:px-6">
                <div className=" flex text-orange-400 text-xs " role="alert">
                  {errors.realname ? <>{errors.realname.message}</> : ""}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

UserPersonalInfo.propTypes = {
  me: PropTypes.object.isRequired,
};

export default UserPersonalInfo;
