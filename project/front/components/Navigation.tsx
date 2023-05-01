import { Popover, Transition } from '@headlessui/react';
import {
  ArrowPathIcon,
  ArrowUturnUpIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  ChevronDownIcon,
  FaceSmileIcon,
  HomeIcon,
  InformationCircleIcon,
  PaintBrushIcon,
  PresentationChartBarIcon,
  RectangleGroupIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { backUrl } from '../config/config';
import getUserClassColor from '../functions/getUserClassColor';
import blooboltLogoNobg from '../public/blooboltLogoNobg.png';
import { openNotice } from '../reducers/global';
import { cancelAllPostImages } from '../reducers/post';
import { logOut } from '../reducers/user';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navigation: FC = () => {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.user);
  const [helper, setHelper] = useState(false);

  useEffect(() => {
    function onScreenScroll() {
      if (window.scrollY + document.documentElement.clientHeight > 1000) {
        setHelper(true);
      } else {
        setHelper(false);
      }
    }
    window.addEventListener('scroll', onScreenScroll);
    return () => {
      window.removeEventListener('scroll', onScreenScroll);
    };
  }, []);

  const onGotoTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(logOut());
    dispatch(cancelAllPostImages());
    Router.push('/square');
  }, [dispatch]);

  const onPreparing = useCallback(() => {
    dispatch(
      openNotice({
        type: 2,
        content: '멤버스는 준비중인 기능입니다.',
      }),
    );
  }, [dispatch]);

  return (
    <Popover className='fixed top-0 w-[100vw] left-0 z-50 bg-white shadow-xl shadow-slate-300/20'>
      {helper && (
        <button
          type='button'
          onClick={onGotoTop}
          className='shadow-xl hover:bg-indigo-600 hover:scale-105 p-3.5 bg-indigo-500 rounded-full fixed bottom-10 right-4'
        >
          <ArrowUturnUpIcon className='w-5 text-white shadow-lg' />
        </button>
      )}
      <div className=''>
        <div className='px-6 flex  items-center justify-between  py-2 md:justify-start md:space-x-10'>
          <div className='lg:w-0 lg:flex-1 flex justify-start'>
            <div className='  '>
              <Link href='/'>
                <div className='cursor-pointer flex items-center text-xl font-bold '>
                  <div className='h-7 w-7 relative mr-1.5'>
                    <Image
                      className=' cursor-pointer w-full h-full'
                      src={blooboltLogoNobg}
                      alt='logo-image'
                    />
                  </div>
                  <span className='sm:inline text-indigo-500'>BlooBolt</span>
                </div>
              </Link>
            </div>
          </div>

          <div className='-my-2 -mr-2 md:hidden'>
            <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
              <span className='sr-only'>Open menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </div>

          <Popover.Group as='nav' className='items-center hidden space-x-6 md:flex'>
            <Link href='/'>
              <div className='cursor-pointer hover:text-slate-600 text-base font-medium text-slate-500'>
                홈
              </div>
            </Link>
            <Popover className='relative'>
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-slate-600' : 'text-slate-500',
                      'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                    )}
                  >
                    <span>스퀘어</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-slate-600' : 'text-slate-400',
                        'ml-2 h-5 w-5 group-hover:text-slate-500',
                      )}
                      aria-hidden='true'
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute ml-20 lg:ml-0 xs:ml-0 left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/3 lg:-translate-x-1/2 transform px-2 sm:px-0'>
                      <div className='overflow-hidden shadow-xl rounded-md shadow-md-lg ring-1 ring-black ring-opacity-5'>
                        <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                          <Link href='/square'>
                            <div className='w-full'>
                              <Popover.Button className='-m-3 w-full flex items-start rounded-md p-3 hover:bg-slate-50'>
                                <BuildingLibraryIcon
                                  className='h-6 w-6 flex-shrink-0 text-indigo-500'
                                  aria-hidden='true'
                                />
                                <div className='ml-4'>
                                  <p className='text-base text-left font-medium text-slate-600'>
                                    Public Square
                                  </p>
                                  <p className='mt-0.5 text-xs text-slate-500 text-left'>누구나 참여해요!</p>
                                </div>
                              </Popover.Button>
                            </div>
                          </Link>{' '}
                          <Link href='/square-fedev'>
                            <div className='w-full'>
                              <Popover.Button className='-m-3 w-full flex items-start rounded-md p-3 hover:bg-slate-50'>
                                <RectangleGroupIcon
                                  className='h-6 w-6 flex-shrink-0 text-indigo-500'
                                  aria-hidden='true'
                                />
                                <div className='ml-4'>
                                  <p className='text-base text-left font-medium text-slate-600'>
                                    Frontend Square
                                  </p>
                                  <p className='mt-0.5 text-xs text-slate-500 text-left'>
                                    프론트엔드 개발자에요!
                                  </p>
                                </div>
                              </Popover.Button>
                            </div>
                          </Link>
                          <Link href='/square-bedev'>
                            <div className='w-full'>
                              <Popover.Button className='-m-3 w-full flex items-start rounded-md p-3 hover:bg-slate-50'>
                                <ServerStackIcon
                                  className='h-6 w-6 flex-shrink-0 text-indigo-500'
                                  aria-hidden='true'
                                />
                                <div className='ml-4'>
                                  <p className='text-base text-left font-medium text-slate-600'>
                                    Backend Square
                                  </p>
                                  <p className='mt-0.5 text-xs text-slate-500 text-left'>
                                    백엔드 개발자에요!
                                  </p>
                                </div>
                              </Popover.Button>
                            </div>
                          </Link>
                          <Link href='/square-design'>
                            <div className='w-full'>
                              <Popover.Button className='-m-3 w-full flex items-start rounded-md p-3 hover:bg-slate-50'>
                                <PaintBrushIcon
                                  className='h-6 w-6 flex-shrink-0 text-indigo-500'
                                  aria-hidden='true'
                                />
                                <div className='ml-4'>
                                  <p className='text-base text-left font-medium text-slate-600'>
                                    Design Square
                                  </p>
                                  <p className='mt-0.5 text-xs text-slate-500 text-left'>
                                    UX/UI 디자이너에요!
                                  </p>
                                </div>
                              </Popover.Button>
                            </div>
                          </Link>
                          <Link href='/square-plan'>
                            <div className='w-full'>
                              <Popover.Button className='-m-3 w-full flex items-start rounded-md p-3 hover:bg-slate-50'>
                                <PresentationChartBarIcon
                                  className='h-6 w-6 flex-shrink-0 text-indigo-500'
                                  aria-hidden='true'
                                />
                                <div className='ml-4'>
                                  <p className='text-base text-left font-medium text-slate-600'>
                                    Planner Square
                                  </p>
                                  <p className='mt-0.5 text-xs text-slate-500 text-left'>
                                    서비스 기획자에요!
                                  </p>
                                </div>
                              </Popover.Button>
                            </div>
                          </Link>
                        </div>

                        {/* <div className="bg-slate-50 px-5 py-5 sm:px-8 sm:py-6">
                          <div>
                            <h3 className="text-base font-medium text-slate-500">
                              Recent Traced
                            </h3>
                            <ul role="list" className="mt-4 space-y-4">
                              <li className="truncate text-base">
                                <a className="font-medium text-slate-600 hover:text-slate-600">
                                  {"post.name"}
                                </a>
                              </li>
                              <li className="truncate text-base">
                                <a className="font-medium text-slate-600 hover:text-slate-600">
                                  {"post.name"}
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="mt-5 text-sm">
                            <a
                              href="#"
                              className="font-medium text-indigo-500 hover:text-indigo-600"
                            >
                              View all posts
                              <span aria-hidden="true"> &rarr;</span>
                            </a>
                          </div>
                        </div> */}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>{' '}
            {/* <Link href="/members"> */}
            <button
              type='button'
              onClick={onPreparing}
              className='cursor-pointer hover:text-slate-600 text-base font-medium text-slate-500'
            >
              멤버스
            </button>
            {/* </Link> */}
            <Link href='/guide'>
              <div className='cursor-pointer hover:text-slate-600 text-base font-medium text-slate-500'>
                가이드
              </div>
            </Link>
          </Popover.Group>
          <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
            {me ? (
              <>
                <button
                  type='button'
                  onClick={onLogout}
                  className='whitespace-nowrap text-base font-medium text-slate-500 hover:text-slate-600'
                >
                  로그아웃
                </button>

                <>
                  <Link href={`/profile/${me.username}`}>
                    <div className='cursor-pointer ml-3.5 font-bold'>{me.username}</div>
                  </Link>
                  <Link href={`/profile/${me.username}`}>
                    <img
                      alt='avatar'
                      className='cursor-pointer ml-4 h-10 w-10 rounded-full object-cover'
                      src={process.env.NODE_ENV === 'production' ? `${me.avatar}` : `${backUrl}/${me.avatar}`}
                    />
                  </Link>
                </>
              </>
            ) : (
              <>
                <Link href='/signup'>
                  <div className='cursor-pointer whitespace-nowrap text-base font-medium text-slate-500 hover:text-slate-600'>
                    회원가입
                  </div>
                </Link>
                <Link href='/login'>
                  <div className='cursor-pointer ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-md-sm hover:bg-indigo-600'>
                    로그인
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 모바일 */}
      <Transition
        as={Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute  inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden'
        >
          <div className='shadow-xl divide-y-2 divide-slate-50 rounded-md bg-white shadow-md-lg ring-1 ring-black ring-opacity-5'>
            <div className='px-5 pt-5 pb-6'>
              <div className='flex items-center justify-between'>
                <Link href='/'>
                  <div>
                    <Popover.Button className='flex items-center text-xl font-bold text-indigo-500'>
                      <div className='w-6 h-6 mr-1'>
                        <Image
                          className=' cursor-pointer w-full h-full'
                          src={blooboltLogoNobg}
                          alt='logo-image'
                        />
                      </div>
                      BlooBolt
                    </Popover.Button>
                  </div>
                </Link>

                <div className='-mr-2'>
                  <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
              <div className='mt-6'>
                <nav className='grid gap-y-8'>
                  <div className='grid grid-cols-2'>
                    <Link href='/'>
                      <div className='-m-3 flex items-center rounded-md p-3 hover:bg-slate-50'>
                        <HomeIcon className='h-6 w-6 flex-shrink-0 text-indigo-500' aria-hidden='true' />
                        <Popover.Button className='ml-3 text-left w-full h-full  text-base font-medium text-slate-600'>
                          홈
                        </Popover.Button>
                      </div>
                    </Link>
                    <Link href='/square'>
                      <div className='-m-3 flex items-center rounded-md p-3 hover:bg-slate-50'>
                        <BuildingLibraryIcon
                          className='h-6 w-6 flex-shrink-0 text-indigo-500'
                          aria-hidden='true'
                        />
                        <Popover.Button className='ml-3 text-left w-full h-full  text-base font-medium text-slate-600'>
                          퍼블릭 스퀘어
                        </Popover.Button>
                      </div>
                    </Link>
                  </div>
                  <div className='grid grid-cols-2'>
                    <Link href='/square-fedev'>
                      <div className='-m-3 flex items-center rounded-md p-3 hover:bg-slate-50'>
                        <RectangleGroupIcon
                          className='h-6 w-6 flex-shrink-0 text-indigo-500'
                          aria-hidden='true'
                        />
                        <Popover.Button className='ml-3 text-left w-full h-full  text-base font-medium text-slate-600'>
                          프론트엔드 스퀘어
                        </Popover.Button>
                      </div>
                    </Link>
                    <Link href='/square-bedev'>
                      <div className='-m-3 flex items-center rounded-md p-3 hover:bg-slate-50'>
                        <ServerStackIcon
                          className='h-6 w-6 flex-shrink-0 text-indigo-500'
                          aria-hidden='true'
                        />
                        <Popover.Button className='ml-3 text-left w-full h-full  text-base font-medium text-slate-600'>
                          백엔드 스퀘어
                        </Popover.Button>
                      </div>
                    </Link>
                  </div>
                  <div className='grid grid-cols-2'>
                    <Link href='/square-design'>
                      <div className='-m-3 flex items-center rounded-md p-3 hover:bg-slate-50'>
                        <PaintBrushIcon
                          className='h-6 w-6 flex-shrink-0 text-indigo-500'
                          aria-hidden='true'
                        />
                        <Popover.Button className='ml-3 text-left w-full h-full  text-base font-medium text-slate-600'>
                          디자인 스퀘어
                        </Popover.Button>
                      </div>
                    </Link>
                    <Link href='/square-plan'>
                      <div className='-m-3 flex items-center rounded-md p-3 hover:bg-slate-50'>
                        <PresentationChartBarIcon
                          className='h-6 w-6 flex-shrink-0 text-indigo-500'
                          aria-hidden='true'
                        />
                        <Popover.Button className='ml-3 text-left w-full h-full  text-base font-medium text-slate-600'>
                          기획 스퀘어
                        </Popover.Button>
                      </div>
                    </Link>
                  </div>
                  <div className='grid grid-cols-2'>
                    <Link href={me ? `/profile/${me.username}` : `/login`}>
                      <div className='-m-3 flex items-center rounded-md p-3 hover:bg-slate-50'>
                        <UserIcon className='h-6 w-6 flex-shrink-0 text-indigo-500' aria-hidden='true' />
                        <Popover.Button className='ml-3 text-left w-full h-full  text-base font-medium text-slate-600'>
                          프로필
                        </Popover.Button>
                      </div>
                    </Link>
                    <Link href='/guide'>
                      <div className='-m-3 flex items-center rounded-md p-3 hover:bg-slate-50'>
                        <BookOpenIcon className='h-6 w-6 flex-shrink-0 text-indigo-500' aria-hidden='true' />
                        <Popover.Button className='ml-3 text-left w-full h-full  text-base font-medium text-slate-600'>
                          가이드
                        </Popover.Button>
                      </div>
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
            <div className='space-y-6 py-6 px-5'>
              <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                {me && (
                  <Link href={`/profile/${me.username}`}>
                    <div>
                      <Popover.Button className='mb-3 flex items-center'>
                        <img
                          alt=''
                          src={
                            process.env.NODE_ENV === 'production' ? `${me.avatar}` : `${backUrl}/${me.avatar}`
                          }
                          className={`${getUserClassColor(
                            me.class,
                          )} cursor-pointer h-[50px] w-[50px] aspect-square border-[3px] p-0.5 rounded-full object-cover`}
                        />

                        <div className='ml-2 w-full flex flex-col'>
                          <h1 className='cursor-pointer text-md font-bold flex items-center'>
                            {me.username}
                            <div className={`${getUserClassColor(me.class)} flex gap-0.5 text-xs`}>
                              {me.rank === 6 && <FaceSmileIcon className='w-4 ml-0.5 ' aria-hidden='true' />}
                              {me.rank === 0 ? null : (
                                <ShieldCheckIcon className={`w-4 ml-0.5 flex-shrink-0 `} aria-hidden='true' />
                              )}
                              {me.rank}
                            </div>
                          </h1>

                          <h1 className='text-xs text-left relative bottom-0.5'>{me.role}</h1>
                        </div>
                      </Popover.Button>
                    </div>
                  </Link>
                )}
              </div>
              <div>
                {me ? (
                  <Popover.Button
                    onClick={onLogout}
                    className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-md-sm hover:bg-indigo-500'
                  >
                    로그아웃
                  </Popover.Button>
                ) : (
                  <>
                    <Link href='/login'>
                      <div>
                        <Popover.Button className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-md-sm hover:bg-indigo-500'>
                          로그인
                        </Popover.Button>
                      </div>
                    </Link>
                    <Link href='/signup'>
                      <div className='-m-3 w-full flex justify-center mt-0.5 items-center rounded-md p-3'>
                        계정이 없으신가요?
                        <Popover.Button className='ml-1 text-base font-medium text-indigo-500'>
                          회원가입
                        </Popover.Button>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navigation;
