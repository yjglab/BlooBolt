import { Tab } from '@headlessui/react';
import { BoltIcon, ChatBubbleOvalLeftIcon, FaceFrownIcon, UserMinusIcon } from '@heroicons/react/20/solid';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Link from 'next/link';
import React, { FC } from 'react';
import GetUserRankIcon from './GetUserRankIcon';
import { backUrl } from '../config/config';
import getUserClassColor from '../functions/getUserClassColor';
import { openNotice } from '../reducers/global';
import { untrace } from '../reducers/user';
import { useAppDispatch } from '../store/configureStore';
import User from '../typings/user';

dayjs.locale('ko');

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface UserActivityProps {
  owner: boolean;
  me: User;
  user: Partial<User>;
}
const UserActivity: FC<UserActivityProps> = ({ owner, me, user }) => {
  const dispatch = useAppDispatch();

  const onUntrace = (tracing: Partial<User>) => () => {
    if (tracing.id) dispatch(untrace(tracing.id));
    dispatch(
      openNotice({
        content: `${tracing.username}님을 트레이스 리스트에서 제거합니다.`,
        type: 1,
      }),
    );
  };

  return (
    <div className={`${owner ? 'sm:w-[50%]' : 'w-full'} px-3`}>
      <div className='text-2xl font-semibold '>활동</div>

      <div className='w-full  py-6 sm:px-0'>
        <Tab.Group>
          <Tab.List className='flex space-x-1 rounded-md bg-white shadow p-1'>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-md py-2 text-sm font-medium leading-5 ',
                  selected ? 'bg-indigo-500 text-white' : ' bg-slate-100 hover:bg-slate-200 ',
                )
              }
            >
              {`포스트 (${user.Posts && user.Posts.length})`}
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-md py-2 text-sm font-medium leading-5 ',
                  selected ? 'bg-indigo-500 text-white' : ' bg-slate-100 hover:bg-slate-200 ',
                )
              }
            >
              {`트레이서 (${user.Tracers && user.Tracers.length})`}
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-md py-2 text-sm font-medium leading-5 ',
                  selected ? 'bg-indigo-500 text-white' : ' bg-slate-100 hover:bg-slate-200 ',
                )
              }
            >
              {`트레이싱 (${user.Tracings && user.Tracings.length})`}
            </Tab>
          </Tab.List>
          <Tab.Panels className='mt-2 rounded-md shadow'>
            <Tab.Panel
              className={classNames(
                'rounded-md bg-white p-3  ',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-500 focus:outline-none focus:ring-2',
              )}
            >
              <ul>
                {user.Posts && user.Posts.length === 0 ? (
                  <div className='rounded-md text-sm text-slate-300 p-3 h-20 flex justify-center items-center hover:bg-slate-100'>
                    <span>포스트가 없습니다. 새로운 포스트를 만들어보세요</span>
                    <FaceFrownIcon className='w-4 ml-1' />
                  </div>
                ) : (
                  user.Posts &&
                  user.Posts.map((post) => (
                    <li
                      key={post.id}
                      className='border-b my-2 relative  p-3 hover:rounded-md hover:bg-slate-100'
                    >
                      <h3
                        className={`truncate line-clamp-1 ${
                          post.topic ? 'text-slate-600' : 'text-slate-300'
                        } text-md font-bold leading-5 `}
                      >
                        {post.blinded ? '삭제된 포스트입니다.' : post.topic || '토픽 없음'}
                      </h3>
                      <h3 className='line-clamp-3  text-sm leading-5 '>
                        {post.blinded ? '삭제된 포스트입니다.' : post.content}
                      </h3>

                      <ul className='mt-3 flex space-x-1 text-xs font-normal leading-4 text-slate-500'>
                        <li>{dayjs(post.updatedAt).format('YYYY.MM.DD | H:mm:ss')}</li>
                        <li>&middot;</li>
                        <li className='flex'>
                          {post.PostProdders.length || 0} <BoltIcon className='w-3 ml-0.5' />
                        </li>
                        <li>&middot;</li>
                        <li className='flex'>
                          {post.Comments.length || 0} <ChatBubbleOvalLeftIcon className='w-3 ml-0.5' />
                        </li>
                      </ul>

                      <Link href={`/post/${post.id}`}>
                        <span
                          className={classNames(
                            'absolute inset-0 rounded-md ',
                            'ring-indigo-500 focus:z-10 focus:outline-none focus:ring-2',
                          )}
                        />
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </Tab.Panel>

            <Tab.Panel
              className={classNames(
                'rounded-md bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-500 focus:outline-none focus:ring-2',
              )}
            >
              <ul>
                {user.Tracers && user.Tracers.length === 0 ? (
                  <div className='rounded-md text-sm text-slate-300 p-3 h-20 flex justify-center items-center hover:bg-slate-100'>
                    <span>트레이스하는 사용자가 없습니다</span>
                    <FaceFrownIcon className='w-4 ml-1' />
                  </div>
                ) : (
                  user.Tracers &&
                  user.Tracers.map((tracer) => (
                    <li
                      key={tracer.id}
                      className='border-b my-2 cursor-pointer hover:rounded-md p-3  hover:bg-slate-100'
                    >
                      <div className=' flex items-center'>
                        <Link href={`/profile/${tracer.username}`}>
                          <img
                            alt=''
                            src={
                              process.env.NODE_ENV === 'production'
                                ? `${tracer.avatar}`
                                : `${backUrl}/${tracer.avatar}`
                            }
                            className={`border-${getUserClassColor(
                              tracer.class,
                            )} h-[50px] w-[50px] border-[3px] p-0.5 rounded-full object-cover`}
                          />
                        </Link>

                        <div className='ml-2 w-full flex flex-col'>
                          <Link href={`/profile/${tracer.username}`}>
                            <h1 className='cursor-pointer text-md font-bold flex items-center'>
                              {tracer.username}
                              <div className={`text-${getUserClassColor(tracer.class)} flex gap-0.5 text-xs`}>
                                <GetUserRankIcon userRank={tracer.rank} />
                              </div>
                            </h1>
                          </Link>

                          <div className='flex items-center justify-between'>
                            <h1 className='text-xs relative bottom-0.5'>{tracer.role}</h1>
                            <h1 className='text-xs relative bottom-0.5'>
                              {owner ? '나를 등록함' : '등록됨'}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </Tab.Panel>

            <Tab.Panel
              className={classNames(
                'rounded-md bg-white p-3 ',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-500 focus:outline-none focus:ring-2',
              )}
            >
              <ul>
                {user.Tracings && user.Tracings.length === 0 ? (
                  <div className='rounded-md text-sm text-slate-300 p-3 h-20 flex justify-center items-center hover:bg-slate-100'>
                    <span>나를 트레이스하는 사용자가 없습니다</span>
                    <FaceFrownIcon className='w-4 ml-1' />
                  </div>
                ) : (
                  user.Tracings &&
                  user.Tracings.map((tracing) => (
                    <li key={tracing.id} className='border-b my-2 hover:rounded-md p-3  hover:bg-slate-100'>
                      <div className='cursor-pointer flex items-center'>
                        <Link href={`/profile/${tracing.username}`}>
                          <img
                            alt=''
                            src={
                              process.env.NODE_ENV === 'production'
                                ? `${tracing.avatar}`
                                : `${backUrl}/${tracing.avatar}`
                            }
                            className={`border-${getUserClassColor(
                              tracing.class,
                            )} h-[50px] w-[50px] border-[3px] p-0.5 rounded-full object-cover`}
                          />
                        </Link>
                        <div className='ml-2 w-full flex flex-col'>
                          <div className='flex items-center justify-between'>
                            <Link href={`/profile/${tracing.username}`}>
                              <h1 className='text-md font-bold flex items-center'>
                                {tracing.username}
                                <div
                                  className={`text-${getUserClassColor(tracing.class)} flex gap-0.5 text-xs`}
                                >
                                  <GetUserRankIcon userRank={tracing.rank} />
                                </div>
                              </h1>
                            </Link>

                            <h1 className='text-sm  flex items-center'>
                              {owner && (
                                <button
                                  type='button'
                                  onClick={onUntrace(tracing)}
                                  className='flex items-center gap-1 hover:text-indigo-500'
                                >
                                  <UserMinusIcon className='w-5' />
                                </button>
                              )}
                            </h1>
                          </div>
                          <div className='flex items-center justify-between'>
                            <h1 className='text-xs relative bottom-0.5'>{tracing.role}</h1>
                            <h1 className='text-xs relative bottom-0.5'>
                              {owner ? '내가 등록함' : '등록됨'}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default UserActivity;
