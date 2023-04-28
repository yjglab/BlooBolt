import {
  BriefcaseIcon,
  FaceSmileIcon,
  GlobeAsiaAustraliaIcon,
  ShieldCheckIcon,
  UserIcon,
  WindowIcon,
} from '@heroicons/react/20/solid';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import UserActivity from '../../components/UserActivity';
import UserAvatar from '../../components/UserAvatar';
import UserInformation from '../../components/UserInformation';
import { loadMe, loadUser } from '../../reducers/user';
import { RootState, wrapper } from '../../store/configureStore';

const Profile: FC = () => {
  const { me, user } = useSelector((state: RootState) => state.user);

  const owner = me && user ? me.id === user.id : false;

  interface UserClass {
    [key: string]: {
      icon: string;
      label: string;
    };
    fedev: {
      icon: string;
      label: string;
    };
    bedev: {
      icon: string;
      label: string;
    };
    design: {
      icon: string;
      label: string;
    };
    plan: {
      icon: string;
      label: string;
    };
    normal: {
      icon: string;
      label: string;
    };
  }
  const userClasses: UserClass = {
    // 파일로 따로 관리
    fedev: {
      icon: 'text-amber-400',
      label: 'Frontend Developer',
    },
    bedev: {
      icon: 'text-emerald-500',
      label: 'Backend Developer',
    },
    design: {
      icon: 'text-red-400',
      label: 'Designer',
    },
    plan: {
      icon: 'text-sky-300',
      label: 'Service Planner',
    },
    normal: {
      icon: 'text-slate-400',
      label: 'Normal',
    },
  };

  const { icon, label } = userClasses[user?.class || 'normal'];

  return (
    <AppLayout>
      <div className='min-h-screen'>
        <div className='pt-20  mb-6  px-6 pb-6 w-full bg-white md:flex md:items-center md:justify-between'>
          <div className='flex justify-center md:block'>
            <UserAvatar avatarPath={owner ? me?.avatar : user?.avatar} owner={owner} />
          </div>
          <div className='flex items-center flex-col md:flex-1 md:block '>
            <div className='flex flex-col  mb-1 items-center md:items-start'>
              <h2 className='text-2xl font-bold leading-7 text-slate-600 md:truncate md:text-3xl md:tracking-tight'>
                {user?.username}
              </h2>
              <div className='flex items-center mt-4 md:mt-1 mb-2'>
                <div className='flex gap-0.5 text-xs text-slate-400'>
                  <button type='button'>
                    {user?.rank === 6 && <FaceSmileIcon className='w-5 ml-0.5 ' aria-hidden='true' />}
                    {user?.rank === 0 && (
                      <span className='cursor-pointer px-2 py-0.5 rounded-md border border-slate-400 relative text-xs'>
                        Not Ranked
                      </span>
                    )}
                    {user?.rank !== 6 && user?.rank !== 0 && (
                      <ShieldCheckIcon className='w-4 ml-0.5 flex-shrink-0' aria-hidden='true' />
                    )}
                  </button>

                  <span className='text-sm ml-1'>Rank</span>
                  <span className='text-sm ml-1 font-bold'>{user?.rank === 0 ? '-' : user?.rank}</span>
                </div>

                <span className='ml-2 text-xs bg-slate-400 px-2 py-0.5 text-white rounded-md'>
                  Bloo Point <span className='ml-1 font-bold '>{user?.rankPoint}</span>
                </span>
              </div>
            </div>
            <div className='mt-1.5 mb-3 text-sm'>{owner ? me?.about : user?.about}</div>

            <div className='mt-1 flex gap-0 sm:gap-3 flex-col sm:flex-row sm:flex-wrap '>
              <div className='md:flex md:gap-3'>
                <div className='mt-2 flex items-center text-sm text-slate-500'>
                  <UserIcon className={`mr-1.5 h-5 w-5 flex-shrink-0 ${icon}`} aria-hidden='true' />
                  {label}
                </div>

                <div className='mt-2 flex items-center text-sm text-slate-500'>
                  <BriefcaseIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400' aria-hidden='true' />
                  {owner ? me?.role : user?.role}
                </div>
              </div>
              <div className='md:flex md:gap-3'>
                <div className='mt-2 flex items-center text-sm text-slate-500'>
                  <WindowIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400' aria-hidden='true' />
                  <a href={owner ? me?.website : user?.website} target='_blank' rel='noreferrer'>
                    {owner ? me?.website : user?.website}
                  </a>
                </div>
                <div className='mt-2 flex items-center text-sm text-slate-500'>
                  <GlobeAsiaAustraliaIcon
                    className='mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400'
                    aria-hidden='true'
                  />
                  {owner ? me?.country : user?.country}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${owner ? 'justify-between' : 'justify-center'} w-full flex-col flex sm:flex-row p-6`}
        >
          <UserActivity owner={owner} me={me} user={user || {}} />
          {owner && <UserInformation />}
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const dispatch = context.store.dispatch as ThunkDispatch<RootState, void, AnyAction>;

  await dispatch(loadMe());
  if (typeof context.params?.username !== 'undefined' && !Array.isArray(context.params.username)) {
    await dispatch(loadUser({ username: context.params.username }));
  }

  return {
    props: { message: '' },
  };
});

export default Profile;
