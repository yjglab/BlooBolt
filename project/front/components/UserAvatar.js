import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { CameraIcon } from "@heroicons/react/20/solid";
import { uploadUserAvatar } from "../reducers/userSlice";
import { openNotice } from "../reducers/globalSlice";
import { backUrl } from "../config/config";
import PropTypes from "prop-types";

const UserAvatar = ({ me }) => {
  const dispatch = useDispatch();
  const { uploadUserAvatarDone } = useSelector((state) => state.user);
  const {
    register,
    watch,
    formState: {},
  } = useForm();

  const onUploadUserAvatar = () => {
    const userAvatarImage = watch("userAvatar");
    const userAvatarFormData = new FormData();

    if (userAvatarImage[0].size > 10 * 1024 * 1024) {
      return dispatch(
        openNotice({
          content: "10MB 이하의 이미지 파일만 업로드 가능합니다.",
          type: 2,
        })
      );
    } else {
      userAvatarFormData.append("userAvatar", userAvatarImage[0]);
    }

    dispatch(uploadUserAvatar(userAvatarFormData));
    dispatch(
      openNotice({
        content: "사용자 이미지가 변경되었습니다.",
        type: 1,
      })
    );
  };

  return (
    <div className="shadow-lg overflow-hidden relative w-36 h-36 md:mr-5 mb-4 md:mb-0 rounded-full ">
      <CameraIcon className="w-5 absolute z-10 mx-auto bottom-1 text-white left-0 right-0" />
      <label
        htmlFor="userAvatar"
        className="cursor-pointer w-full h-full opacity-40 hover:opacity-60 absolute bottom-0"
      >
        <div className="w-full h-7 bg-slate-900 absolute bottom-0"></div>
      </label>
      <input
        name="userAvatar"
        id="userAvatar"
        type="file"
        accept="image/*"
        className="hidden"
        {...register("userAvatar", {
          onChange: onUploadUserAvatar,
        })}
      />
      <img
        src={
          process.env.NODE_ENV === "production"
            ? ``
            : `${backUrl}/${me.Userboard.avatar}`
        }
        className="aspect-square object-cover"
      />
    </div>
  );
};

UserAvatar.propTypes = {
  me: PropTypes.object.isRequired,
};

export default UserAvatar;
