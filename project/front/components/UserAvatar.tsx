import { CameraIcon } from '@heroicons/react/20/solid';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { backUrl } from '../config/config';
import { openNotice } from '../reducers/global';
import { uploadUserAvatar } from '../reducers/user';
import { useAppDispatch } from '../store/configureStore';

interface UserAvatarProps {
  avatarPath: string;
  owner: boolean;
}
const UserAvatar: FC<UserAvatarProps> = ({ avatarPath, owner }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    // formState: {},
  } = useForm();

  const onUploadUserAvatar = () => {
    const userAvatarImage = watch('userAvatar');
    const userAvatarFormData = new FormData();

    if (userAvatarImage[0].size > 10 * 1024 * 1024) {
      return dispatch(
        openNotice({
          content: '10MB 이하의 이미지 파일만 업로드 가능합니다.',
          type: 2,
        }),
      );
    }
    userAvatarFormData.append('userAvatar', userAvatarImage[0]);

    dispatch(uploadUserAvatar(userAvatarFormData));
    dispatch(
      openNotice({
        content: '사용자 아바타가 변경되었습니다.',
        type: 1,
      }),
    );
    return null;
  };

  return (
    <div className='shadow-lg overflow-hidden relative w-40 h-40 md:mr-5 mb-4 md:mb-0 rounded-full '>
      {owner && (
        <>
          <CameraIcon className='w-5 absolute z-10 mx-auto bottom-1 text-white left-0 right-0' />
          <label
            htmlFor='userAvatar'
            className='cursor-pointer w-full h-full opacity-40 hover:opacity-60 absolute bottom-0'
          >
            <div className='w-full h-7 bg-slate-900 absolute bottom-0' />
          </label>
          <input
            id='userAvatar'
            type='file'
            accept='image/*'
            className='hidden'
            {...register('userAvatar', {
              onChange: onUploadUserAvatar,
            })}
          />
        </>
      )}
      <img
        alt=''
        src={process.env.NODE_ENV === 'production' ? `${avatarPath}` : `${backUrl}/${avatarPath}`}
        className='aspect-square object-cover'
      />
    </div>
  );
};

export default UserAvatar;
