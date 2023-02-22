import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { changeMyPersonalInfo } from "../reducers/userSlice";
import { openNotice } from "../reducers/globalSlice";

const UserPersonalInfo = ({ me }) => {
  const dispatch = useDispatch();
  const { changeMyPersonalInfoDone, changeMyPersonalInfoError } = useSelector(
    (state) => state.user
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    setValue("email", `${me.email}`);
    setValue("realname", `${me.realname}`);
    setValue("address", `${me.address}`);
  }, [me.email, me.realname, me.address]);

  const onEditPersonalInfo = (formData) => {
    const { realname, address } = formData;

    dispatch(
      changeMyPersonalInfo({
        userId: me.id,
        realname,
        address,
      })
    );
    dispatch(
      openNotice({
        content: "사용자 정보가 변경되었습니다.",
        type: 1,
      })
    );
  };
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
        <div className="mt-3 lg:col-span-2 lg:mt-0">
          <form onSubmit={handleSubmit(onEditPersonalInfo)}>
            <div className="shadow sm:overflow-hidden rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-600"
                  >
                    Email ID
                  </label>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder={me.email}
                    className=" cursor-not-allowed placeholder:text-slate-400 mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    disabled={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="realname"
                    className="block text-sm font-medium text-slate-600"
                  >
                    Real Name
                  </label>
                  <input
                    type="text"
                    name="realname"
                    id="realname"
                    className="placeholder:text-slate-300 mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("realname", {
                      maxLength: {
                        value: 10,
                        message: "10자리 이하의 실명을 입력해주세요",
                      },
                    })}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-slate-600"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="placeholder:text-slate-300 mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("address", {
                      maxLength: {
                        value: 50,
                      },
                    })}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center bg-slate-50 px-4 py-3 text-right sm:px-6">
                <div className=" flex text-orange-400 text-xs " role="alert">
                  {errors.username ? (
                    <>{errors.username.message}</>
                  ) : errors.realname ? (
                    <>{errors.realname.message}</>
                  ) : changeMyPersonalInfoError ? (
                    <>{changeMyPersonalInfoError}</>
                  ) : (
                    ""
                  )}
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
