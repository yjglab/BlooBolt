import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { changeMyPublicInfo } from "../reducers/userSlice";
import { openNotice } from "../reducers/globalSlice";

const UserPublicInfo = ({ me }) => {
  const dispatch = useDispatch();
  const { changeMyPublicInfoDone, changeMyPublicInfoError } = useSelector(
    (state) => state.user
  );
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    setValue("username", `${me.username}`);
    setValue("role", `${me.role}`);
    setValue("country", `${me.country}`);
    setValue("website", `${me.website}`);
    setValue("about", `${me.about}`);
  }, [me.username, me.role, me.website, me.about]);

  const onEditPublicInfo = (formData) => {
    const { username, role, country, website, about } = formData;
    const slCheck = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/g;
    if (username.search(/\s/) !== -1 || slCheck.test(username)) {
      return setError("username", {
        message: "사용자명에 공백 또는 특수문자가 들어갈 수 없습니다.",
      });
    }

    dispatch(
      changeMyPublicInfo({
        userId: me.id,
        username,
        role,
        country,
        website,
        about,
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
    <div>
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-slate-600">
              Public
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              이 영역에 게시되는 정보는 공개적으로 표시됩니다.
            </p>
          </div>
        </div>
        <div className="mt-3 lg:col-span-2 lg:mt-0">
          <form onSubmit={handleSubmit(onEditPublicInfo)}>
            <div className="shadow sm:overflow-hidden rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-slate-600"
                  >
                    User Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="James"
                    className="placeholder:text-slate-300 mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="userClass"
                    className="block text-sm font-medium text-slate-600"
                  >
                    직군
                  </label>
                  <input
                    id="userClass"
                    type="text"
                    name="userClass"
                    disabled={true}
                    placeholder={
                      me.class === "fedev"
                        ? "Front-end Developer"
                        : me.class === "bedev"
                        ? "Back-end Developer"
                        : me.class === "design"
                        ? "Designer"
                        : "Normal"
                    }
                    className="cursor-not-allowed placeholder:text-slate-300 mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-slate-600"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Web Developer"
                    className="placeholder:text-slate-300 mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("role", {
                      maxLength: {
                        value: 20,
                        message: "20자리 이하의 사용자 역할을 입력해주세요",
                      },
                    })}
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
                    className="mt-1 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("country", {})}
                  >
                    <option>Korea</option>

                    <option>Australia</option>
                    <option>Austria</option>
                    <option>Belgium</option>
                    <option>Canada</option>
                    <option>Chile</option>
                    <option>Colombia</option>
                    <option>Costa Rica</option>
                    <option>Czech Republic</option>
                    <option>Denmark</option>
                    <option>Estonia</option>
                    <option>Finland</option>
                    <option>France</option>
                    <option>Germany</option>
                    <option>Greece</option>
                    <option>Hungary</option>
                    <option>Iceland</option>
                    <option>Ireland</option>
                    <option>Israel</option>
                    <option>Italy</option>
                    <option>Japan</option>
                    <option>Latvia</option>
                    <option>Lithuania</option>
                    <option>Luxembourg</option>
                    <option>Mexico</option>
                    <option>Netherlands</option>
                    <option>New Zealand</option>
                    <option>Norway</option>
                    <option>Poland</option>
                    <option>Portugal</option>
                    <option>Slovak Republic</option>
                    <option>Slovenia</option>
                    <option>Spain</option>
                    <option>Sweden</option>
                    <option>Switzerland</option>
                    <option>Turkiye</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="w-full col-span-3">
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-slate-600"
                    >
                      Website
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-300 bg-slate-50 px-3 text-sm text-slate-500">
                        http://
                      </span>
                      <input
                        type="text"
                        name="website"
                        id="website"
                        placeholder="www.mywebsite.com"
                        className="block placeholder:text-slate-300 w-full flex-1 rounded-none rounded-r-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...register("website", {
                          maxLength: {
                            value: 200,
                            message:
                              "200자리 이하의 웹사이트 주소를 입력해주세요",
                          },
                        })}
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
                      className="mt-1 placeholder:text-slate-300 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="안녕하세요."
                      {...register("about", {
                        maxLength: {
                          value: 50,
                          message: "50자 이하의 소개문을 입력해주세요",
                        },
                      })}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-slate-50 px-4 py-3 text-right sm:px-6">
                <div className=" flex text-orange-400 text-xs " role="alert">
                  {errors.username ? (
                    <>{errors.username.message}</>
                  ) : errors.role ? (
                    <>{errors.role.message}</>
                  ) : errors.country ? (
                    <>{errors.country.message}</>
                  ) : errors.website ? (
                    <>{errors.website.message}</>
                  ) : errors.about ? (
                    <>{errors.about.message}</>
                  ) : changeMyPublicInfoError ? (
                    <>{changeMyPublicInfoError}</>
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

UserPublicInfo.propTypes = {
  me: PropTypes.object.isRequired,
};

export default UserPublicInfo;
