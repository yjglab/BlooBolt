import { KeyIcon } from '@heroicons/react/20/solid';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { changePassword, loadMe } from '../reducers/user';
import { RootState, useAppDispatch, wrapper } from '../store/configureStore';

const ChangePassword: FC = () => {
  const dispatch = useAppDispatch();
  const { me, changePasswordError } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!(me && me.id)) {
      router.back();
    }
  }, [me, router]);

  interface FormValue {
    prevPassword: string;
    nextPassword: string;
    nextPasswordCheck: string;
  }
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormValue>();

  const onChangePassword: SubmitHandler<FormValue> = (formData) => {
    const { prevPassword, nextPassword, nextPasswordCheck } = formData;
    if (nextPassword !== nextPasswordCheck) {
      return setError('nextPassword', {
        message: '변경할 비밀번호가 일치하지 않습니다.',
      });
    }
    if (!me) return null;
    return dispatch(
      changePassword({
        UserId: me.id,
        prevPassword,
        nextPassword,
        nextPasswordCheck,
      }),
    );
  };
  return (
    <AppLayout>
      <div className='h-screen '>
        <div className='flex h-full  items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
          <div className='w-full max-w-md space-y-8'>
            <div>
              <div className='mx-auto h-16 w-16  relative'>
                <KeyIcon className='w-full h-full text-indigo-500' />
              </div>

              <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-slate-600'>
                BlooBolt 보안
              </h2>
              <p className='mt-2 text-center text-sm text-slate-600'>
                <span className='font-medium text-indigo-500 hover:text-indigo-500'>
                  보안을 위해 비밀번호를 엄격하게 설정해주세요
                </span>
              </p>
            </div>

            <form className='mt-8 space-y-3' onSubmit={handleSubmit(onChangePassword)}>
              <input type='hidden' name='remember' defaultValue='true' />
              <div className='-space-y-px rounded-md '>
                <div className='relative flex items-center'>
                  <label htmlFor='prevPassword' className='sr-only' />
                  <input
                    id='prevPassword'
                    type='password'
                    placeholder='현재 비밀번호'
                    className='relative block w-full appearance-none rounded-none rounded-t-md border border-slate-300 px-3 py-2 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    {...register('prevPassword', {
                      required: '비밀번호를 입력해주세요',
                    })}
                  />
                </div>{' '}
                <div className='relative flex items-center'>
                  <label htmlFor='nextPassword' className='sr-only' />
                  <input
                    id='nextPassword'
                    type='password'
                    placeholder='변경할 비밀번호'
                    className='relative block w-full appearance-none rounded-none border border-slate-300 px-3 py-2 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    {...register('nextPassword', {
                      required: '변경할 비밀번호를 입력해주세요',
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        message: '비밀번호는 영문, 숫자, 특수기호를 조합한 8자 이상이어야 합니다.',
                      },
                    })}
                  />
                </div>
                <div className='relative flex items-center'>
                  <label htmlFor='nextPasswordCheck' className='sr-only' />
                  <input
                    id='nextPasswordCheck'
                    type='password'
                    placeholder='변경할 비밀번호 확인'
                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-slate-300 px-3 py-2 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    {...register('nextPasswordCheck', {
                      required: '',
                    })}
                  />
                </div>
              </div>

              <div>
                <div>
                  <div className='h-6 flex justify-center text-orange-400 text-xs ' role='alert'>
                    {errors.prevPassword // eslint-disable-line no-nested-ternary
                      ? errors.prevPassword.message
                      : errors.nextPassword // eslint-disable-line no-nested-ternary
                      ? errors.nextPassword.message
                      : errors.nextPasswordCheck
                      ? errors.nextPasswordCheck.message
                      : changePasswordError}
                  </div>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    변경 확인
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

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const dispatch = context.store.dispatch as ThunkDispatch<RootState, void, AnyAction>;
  await dispatch(loadMe());
  return {
    props: { message: null },
  };
});

export default ChangePassword;
