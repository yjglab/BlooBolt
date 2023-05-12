import { CheckCircleIcon, StarIcon, WrenchScrewdriverIcon } from '@heroicons/react/20/solid';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Image from 'next/image';
import React, { FC } from 'react';
import AppLayout from '../../components/AppLayout';
import guideShot2 from '../../public/guideShot2.png';
import { loadMe } from '../../reducers/user';
import { RootState, wrapper } from '../../store/configureStore';

const Guide: FC = () => {
  return (
    <AppLayout>
      <div className='overflow-hidden bg-white py-24 sm:py-32'>
        {/* release-0.2.0 */}
        <div className='mb-64 max-w-2xl lg:max-w-4xl px-6 lg:px-8 mx-auto'>
          <div className='lg:pr-8 lg:pt-4'>
            <h2 className='text-base font-semibold leading-7 text-indigo-600'>Version Log</h2>
            <p className='mt-2 text-3xl font-bold tracking-tight  sm:text-4xl'>BlooBolt 0.2.0</p>
            <p className='mt-6 text-lg leading-8 ' />
            <div className='flex lg:flex-row flex-col mt-10 w-full gap-10 text-base leading-7  lg:max-w-none'>
              <div className='lg:w-1/2 w-full relative pl-9'>
                <div className=' font-semibold '>
                  <StarIcon className='absolute top-1 left-1 h-5 w-5 text-indigo-600' aria-hidden='true' />
                  새로운 기능
                </div>{' '}
                <div className='mb-2'>
                  <div className='w-[4px] h-[4px] mr-0.5 bg-slate-700 rounded-full inline-block relative bottom-1' />{' '}
                  이제 각 스퀘어의 상단에 해당 스퀘어의 포스트 중 가장 많은 프롯을 받은 추천 포스트와 질문
                  유형 포스트를 표시합니다.
                </div>
                <div className='mb-2'>
                  <div className='w-[4px] h-[4px] mr-0.5 bg-slate-700 rounded-full inline-block relative bottom-1' />{' '}
                  포스트 유형을 질문 포스트로 설정할 수 있으며 모든 질문 포스트 중 랜덤한 포스트 한 개를
                  스퀘어의 상단에 표시합니다. 포스트 작성자는 답변이 만족스러울 경우{' '}
                  <span className='font-semibold'>해결됨</span>
                  <CheckCircleIcon className='w-4 inline relative bottom-0.5 ml-0.5' /> 표시를 눌러 질문을
                  완료로 설정할 수 있습니다. 질문이 완료된 포스트는 수정할 수 없습니다.
                </div>
              </div>
              <div className='lg:w-1/2 w-full relative pl-9'>
                <div className=' font-semibold '>
                  <WrenchScrewdriverIcon
                    className='absolute top-1 left-1 h-5 w-5 text-indigo-600'
                    aria-hidden='true'
                  />
                  변경된 내용
                </div>{' '}
                <div className='mb-2'>
                  <div className='w-[4px] h-[4px] mr-0.5 bg-slate-700 rounded-full inline-block relative bottom-1' />{' '}
                  기능 추가에 따른 사용자 인터페이스와 서비스 안정성을 개선했습니다.
                </div>
              </div>{' '}
            </div>
          </div>
          {/* <div className='w-full mt-8 md:mt-16 mx-auto relative overflow-hidden rounded-xl shadow-xl  justify-center'>
            <Image src={guideShot2} className=' absolute ' />
          </div> */}
        </div>

        {/* release-0.1.0 */}
        <div className='mb-64 max-w-2xl lg:max-w-4xl px-6 lg:px-8 mx-auto'>
          <div className='lg:pr-8 lg:pt-4'>
            <h2 className='text-base font-semibold leading-7 text-indigo-600'>Version Log</h2>
            <p className='mt-2 text-3xl font-bold tracking-tight  sm:text-4xl'>BlooBolt 0.1.0</p>
            <p className='mt-6 text-lg leading-8 ' />
            <div className='flex lg:flex-row flex-col mt-10 w-full gap-10 text-base leading-7  lg:max-w-none'>
              <div className='lg:w-1/2 w-full relative pl-9'>
                <div className=' font-semibold '>
                  <StarIcon className='absolute top-1 left-1 h-5 w-5 text-indigo-600' aria-hidden='true' />
                  새로운 기능
                </div>{' '}
                <div className='mb-2'>
                  <div className='w-[4px] h-[4px] mr-0.5 bg-slate-700 rounded-full inline-block relative bottom-1' />{' '}
                  서비스 기획자를 위한 기획 스퀘어가 추가되었습니다. 이제 계정 가입 시 기획자 직군을 새롭게
                  선택할 수 있습니다.
                </div>
                <div className='mb-2'>
                  <div className='w-[4px] h-[4px] mr-0.5 bg-slate-700 rounded-full inline-block relative bottom-1' />{' '}
                  이제 회원가입과 로그인 절차를 편리하게 하기 위한 소셜 로그인 기능을 제공합니다.
                </div>
              </div>
              <div className='lg:w-1/2 w-full relative pl-9'>
                <div className=' font-semibold '>
                  <WrenchScrewdriverIcon
                    className='absolute top-1 left-1 h-5 w-5 text-indigo-600'
                    aria-hidden='true'
                  />
                  변경된 내용
                </div>{' '}
                <div className='mb-2'>
                  <div className='w-[4px] h-[4px] mr-0.5 bg-slate-700 rounded-full inline-block relative bottom-1' />{' '}
                  일반 계정 사용자의 비밀번호를 잊어버린 경우의 임시 발급 절차를 변경했습니다. 각 사용자는
                  계정 가입 시 고유의 사용자 코드를 메일로 제공받으며 해당 코드의 확인 과정을 통해 비밀번호를
                  재발급 받을 수 있습니다.
                </div>
              </div>{' '}
            </div>
          </div>
          <div className='w-full mt-8 md:mt-16 mx-auto relative overflow-hidden rounded-xl shadow-xl  justify-center'>
            <Image src={guideShot2} className=' absolute ' />
          </div>
        </div>

        {/* release-0.0.0 */}
        <div className='mb-64 max-w-2xl lg:max-w-4xl px-6 lg:px-8 mx-auto'>
          <div className='lg:pr-8 lg:pt-4'>
            <h2 className='text-base font-semibold leading-7 text-indigo-600'>Version Log</h2>
            <p className='mt-2 text-3xl font-bold tracking-tight  sm:text-4xl'>BlooBolt Beta 0.0.0</p>
            <p className='mt-6 text-lg leading-8 '>
              {' '}
              BlooBolt 개발자입니다. 올해 2월 중순부터 제작을 시작한 본 웹서비스의 베타 단계 개발을
              완료했습니다. 이 곳에서는 BlooBolt 서비스 버전에 관한 변경 내역을 알려드립니다.
            </p>
            <div className='flex lg:flex-row flex-col mt-10 w-full gap-10 text-base leading-7  lg:max-w-none'>
              <div className='lg:w-1/2 w-full relative pl-9'>
                <div className=' font-semibold '>
                  <StarIcon className='absolute top-1 left-1 h-5 w-5 text-indigo-600' aria-hidden='true' />
                  새로운 기능
                </div>{' '}
                <div className='mb-2'>
                  <div className='w-[4px] h-[4px] mr-0.5 bg-slate-700 rounded-full inline-block relative bottom-1' />{' '}
                  베타 단계를 배포 중이며 새롭게 추가되는 내용이 있다면 해당 항목에서 자세히 알려드립니다.
                  또한 정식버전인 1.0에서 많은 것들이 추가되고 업데이트 될 것입니다.
                </div>
              </div>
              <div className='lg:w-1/2 w-full relative pl-9'>
                <div className=' font-semibold '>
                  <WrenchScrewdriverIcon
                    className='absolute top-1 left-1 h-5 w-5 text-indigo-600'
                    aria-hidden='true'
                  />
                  변경된 내용
                </div>{' '}
                <div className='mb-2'>
                  <div className='w-[4px] h-[4px] mr-0.5 bg-slate-700 rounded-full inline-block relative bottom-1' />{' '}
                  모든 기능에 관한 검토를 마쳤습니다. 혹시라도 발견하지 못한 오류가 발생하거나 건의하실 의견이
                  있으시다면 bloobolt.co@gmail.com 으로 전달해주시면 감사하겠습니다.
                </div>
              </div>{' '}
            </div>
          </div>
          <div className='w-full mt-8 md:mt-16 mx-auto relative overflow-hidden rounded-xl shadow-xl  justify-center'>
            <Image src={guideShot2} className=' absolute ' />
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

export default Guide;
