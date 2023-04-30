import {
  AdjustmentsHorizontalIcon,
  ChatBubbleOvalLeftIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  LightBulbIcon,
  PaintBrushIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  RectangleGroupIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  UserPlusIcon,
} from '@heroicons/react/20/solid';
import { ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Link from 'next/link';
import React, { FC } from 'react';
import { AnyAction } from 'redux';
import AppLayout from '../components/AppLayout';
import { loadMe } from '../reducers/user';
import { RootState, wrapper } from '../store/configureStore';

const Guide: FC = () => {
  return (
    <AppLayout>
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <h2 className='text-base font-semibold leading-6 text-indigo-500'>처음이신가요?</h2>
            <p className='mt-2 text-3xl font-bold tracking-tight  sm:text-4xl'>스퀘어 참여자 가이드</p>
            <p className='mt-3 text-lg leading-8 '>스퀘어 참여와 기본 규칙에 관해 알려드립니다.</p>
          </div>

          <div className='border-t pt-10 mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
            <h1 className=' text-xl font-semibold'>스퀘어는 참여자들의 대화 공간입니다.</h1>
            <div className='mb-6 mt-1 text-sm'>
              회원가입 시 선택한 클래스로 스퀘어에 참여할 수 있습니다. 자신의 클래스와 다른 스퀘어에 입장하여
              의견을 나눌 수 있지만 포스트 업로드는 제한됩니다.
            </div>
            <div className='grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <UserGroupIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  Public Square
                </div>
                <div className='mt-2 text-base leading-6 '>
                  퍼블릭 스퀘어에는 BlooBolt에 등록된 모든 회원이 참여할 수 있습니다. 개발자와 디자이너 뿐만
                  아니라 기획자, 경영자들의 이야기도 들을 수 있죠.
                </div>
              </div>{' '}
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <RectangleGroupIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  Frontend Square
                </div>
                <div className='mt-2 text-base leading-6 '>
                  프론트엔드 스퀘어에는 프론트엔드 개발자만이 포스트를 업로드할 수 있습니다. 업로드한 내용을
                  다른 클래스 근무자들과 공유해보세요.
                </div>
              </div>{' '}
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <ServerStackIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  Backend Square
                </div>
                <div className='mt-2 text-base leading-6 '>
                  백엔드 스퀘어에는 백엔드 개발자만이 포스트를 업로드할 수 있습니다. 업로드한 내용을 다른
                  클래스 근무자들과 공유해보세요.
                </div>
              </div>{' '}
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <PaintBrushIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  Design Square
                </div>
                <div className='mt-2 text-base leading-6 '>
                  디자인 스퀘어에는 UX/UI 디자이너만이 포스트를 업로드할 수 있습니다. 업로드한 내용을 다른
                  클래스 근무자들과 공유해보세요.
                </div>
              </div>
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <PresentationChartBarIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  Plan Square
                </div>
                <div className='mt-2 text-base leading-6 '>
                  기획 스퀘어에는 서비스 기획자만이 포스트를 업로드할 수 있습니다. 업로드한 내용을 다른 클래스
                  근무자들과 공유해보세요.
                </div>
              </div>
            </div>
          </div>

          <div className=' mx-auto my-52 max-w-2xl  lg:max-w-4xl'>
            <h1 className=' text-xl font-semibold'>새로운 토픽에 관해 포스트로 대화를 나눠봐요.</h1>
            <div className='mb-6 mt-1 text-sm'>
              포스트는 카드 형태로 된 사용자들 사이의 토픽 공유 매개체입니다. 이야기하고 싶은 토픽이 있다면
              업로드 해보세요.
            </div>
            <div className='grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <LightBulbIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  토픽
                </div>
                <div className='mt-2 text-base leading-6 '>
                  토픽은 포스트의 제목입니다. 토픽을 설정하면 사용자들이 내 포스트가 어떤 내용을 말하는지
                  한눈에 알아볼 수 있죠. 물론 토픽을 설정하지 않아도 됩니다.
                </div>
              </div>{' '}
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <DocumentTextIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  내용과 프롯
                </div>
                <div className='mt-2 text-base leading-6 '>
                  포스트는 텍스트와 이미지, 해시태그를 업로드할 수 있습니다. 언제든지 수정이 가능하죠. 프롯은
                  포스트의 공감 지수입니다. 참여자들의 관심을 끌고 프롯을 받아보세요.
                </div>
              </div>{' '}
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <ChatBubbleOvalLeftIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  코멘트
                </div>
                <div className='mt-2 text-base leading-6 '>
                  참여자들이 업로드한 포스트의 코멘트 창을 열어 언제든 의견을 공유할 수 있습니다. 코멘트의
                  수정과 삭제는 언제든 가능합니다.
                </div>
              </div>{' '}
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <ExclamationTriangleIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  제한 사항
                </div>
                <div className='mt-2 text-base leading-6 '>
                  참여자들의 소중한 코멘트가 담긴 포스트는 삭제에 제한 사항이 적용됩니다. 삭제를 요청하면
                  포스트는 블라인드되며 참여자들에 의해 열람이 가능합니다.
                </div>
              </div>{' '}
            </div>
          </div>

          <div className=' mx-auto my-52 max-w-2xl  lg:max-w-4xl'>
            <h1 className=' text-xl font-semibold'>자신만의 프로필을 만들어보세요.</h1>
            <div className='mb-6 mt-1 text-sm'>프로필에는 활동 내역과 기본 정보, 개인 정보가 표시됩니다.</div>
            <div className='grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <EyeIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  공유 정보
                </div>
                <div className='mt-2 text-base leading-6 '>
                  공유 정보는 자신과 다른 사용자들에게 보여집니다. 자신의 모습을 이미지로 표시하거나 어떤
                  클래스 직무자인지를 표시할 수 있죠.
                </div>
              </div>{' '}
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <EyeSlashIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  개인 정보
                </div>
                <div className='mt-2 text-base leading-6 '>
                  개인 정보는 자신 이외의 사람들에게 절대 공개되지 않습니다. 입력된 정보는 강력한 해시
                  매커니즘이 적용된 암호화 스크립트로 저장되며 개발자도 알 수 없습니다.
                </div>
              </div>{' '}
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <UserPlusIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  트레이스
                </div>
                <div className='mt-2 text-base leading-6 '>
                  트레이스는 팔로우와 동일한 기능입니다. 다른 사용자를 트레이스하면 내 프로필에 정보가
                  표시되며 나를 트레이스하는 사용자도 확인할 수 있습니다.
                </div>
              </div>{' '}
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <AdjustmentsHorizontalIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  활동 내역
                </div>
                <div className='mt-2 text-base leading-6 '>
                  활동 내역에는 업로드한 포스트와 사용자 트레이스 내역이 보여집니다.
                </div>
              </div>{' '}
            </div>
          </div>

          <div className=' mx-auto my-52 max-w-2xl  lg:max-w-4xl'>
            <h1 className=' text-xl font-semibold'>참여도에 따라 새로운 랭크가 부여됩니다.</h1>
            <div className='mb-6 mt-1 text-sm'>
              포스트를 올리거나 프롯을 받거나 트레이스를 받으면 참여도를 상징하는 블루포인트를 받습니다.
            </div>
            <div className='grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <ShieldCheckIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  랭크
                </div>
                <div className='mt-2 text-base leading-6 '>
                  랭크와 블루포인트는 사용자의 참여 지수를 상징합니다. 블루포인트를 모아 새로운 랭크를
                  받아보세요. 랭크가 상승할 때마다 특별한 기능
                  <span className='text-xs relative -top-1'>*</span>을 지급합니다.
                </div>
              </div>{' '}
              <div className='relative pl-16'>
                <div className='text-base font-semibold leading-6 '>
                  <div className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500'>
                    <QueueListIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  랭크의 단계
                </div>
                <div className='mt-2 text-base leading-6 '>
                  랭크는 6에서 1까지 존재합니다. 숫자가 적을 수록 높은 랭크의 참여자를 의미하죠. 랭크와 마크는
                  사용자 정보의 우측에 표시됩니다.
                </div>
              </div>{' '}
            </div>
          </div>
        </div>

        <div className=' flex items-center justify-center gap-x-3'>
          <Link href='/signup'>
            <span className='cursor-pointer rounded-md bg-indigo-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'>
              회원가입
            </span>
          </Link>
          <Link href='/square'>
            <span className='cursor-pointer rounded-md bg-slate-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500'>
              스퀘어 참여
            </span>
          </Link>
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

export default Guide;
