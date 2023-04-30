import { Menu, Transition } from '@headlessui/react';
import {
  ArrowUturnLeftIcon,
  BoltIcon,
  CheckIcon,
  FaceSmileIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserMinusIcon,
  UserPlusIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { backUrl } from '../config/config';
import getUserClassColor from '../functions/getUserClassColor';
import { openNotice } from '../reducers/global';
import { editComment, prodComment, removeComment, unprodComment } from '../reducers/post';
import { trace, untrace } from '../reducers/user';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import Comment from '../typings/comment';
import Post from '../typings/post';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface CommentSectionProps {
  post: Post;
  comment: Comment;
}
const CommentSection: FC<CommentSectionProps> = ({ post, comment }) => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.user.me?.id);
  const { me } = useAppSelector((state) => state.user);

  const [extendComment, setExtendComment] = useState(false);
  const [editCommentMode, setEditCommentMode] = useState(false);

  const onCancelEditCommentMode = useCallback(() => {
    setEditCommentMode(false);
  }, []);
  const toggleExtendComment = useCallback(() => {
    setExtendComment(!extendComment);
  }, [extendComment]);

  interface EditCommentValues {
    content: string;
    postId: number;
    commentId: number;
  }
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<EditCommentValues>({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
    },
  });
  const onEditCommentMode = useCallback(() => {
    if (comment.User.id !== id) {
      return dispatch(
        openNotice({
          content: '다른 사용자의 코멘트를 수정할 수 없습니다.',
          type: 2,
        }),
      );
    }
    setEditCommentMode(true);
    setValue('content', `${comment.content}`);
    return null;
  }, [comment.User.id, dispatch, id, setValue, comment.content, setEditCommentMode]);
  const onEditComment: SubmitHandler<EditCommentValues> = useCallback(
    (formData) => {
      if (!id) {
        return dispatch(
          openNotice({
            content: '로그인이 필요합니다.',
            type: 2,
          }),
        );
      }
      const { content } = formData;
      if (!content.trim()) {
        return setError('content', { message: '빈 코멘트를 업로드 할 수 없습니다.' });
      }

      dispatch(
        editComment({
          content,
          postId: post.id,
          commentId: comment.id,
        }),
      );
      reset();
      setEditCommentMode(false);
      return null;
    },
    [id, comment.id, dispatch, post.id, reset, setError],
  );

  const onRemoveComment = useCallback(() => {
    if (!id) {
      return dispatch(
        openNotice({
          content: '로그인이 필요합니다.',
          type: 2,
        }),
      );
    }
    if (comment.User.id !== id) {
      return dispatch(
        openNotice({
          content: '다른 사용자의 코멘트를 삭제할 수 없습니다.',
          type: 2,
        }),
      );
    }
    dispatch(
      removeComment({
        postId: post.id,
        commentId: comment.id,
      }),
    );
    dispatch(
      openNotice({
        content: '코멘트가 삭제되었습니다.',
        type: 1,
      }),
    );
    return null;
  }, [id, comment.User.id, comment.id, dispatch, post.id]);

  const isProdded = comment.CommentProdders.find((v) => v.id === id);
  const onProdComment = useCallback(() => {
    if (!id) {
      return dispatch(
        openNotice({
          content: '로그인이 필요합니다.',
          type: 2,
        }),
      );
    }
    if (comment.User.id === id) {
      return dispatch(
        openNotice({
          content: '자신의 코멘트를 프롯할 수 없습니다.',
          type: 2,
        }),
      );
    }
    return dispatch(
      prodComment({
        postId: post.id,
        commentId: comment.id,
        commentUserId: comment.User.id,
      }),
    );
  }, [id, comment.User.id, comment.id, dispatch, post.id]);
  const onUnprodComment = useCallback(() => {
    if (!id) {
      return dispatch(
        openNotice({
          content: '로그인이 필요합니다.',
          type: 2,
        }),
      );
    }
    return dispatch(
      unprodComment({
        postId: post.id,
        commentId: comment.id,
      }),
    );
  }, [id, comment.id, dispatch, post.id]);

  const isTracing = me?.Tracings?.find((v) => v.id === comment.User.id);
  const onToggleTrace = () => {
    if (!id) {
      return dispatch(
        openNotice({
          content: '로그인이 필요합니다.',
          type: 2,
        }),
      );
    }
    if (isTracing && comment.User.id) {
      dispatch(untrace(comment.User.id));
      dispatch(
        openNotice({
          content: `${comment.User.username}님을 트레이스 리스트에서 제거합니다.`,
          type: 1,
        }),
      );
    } else if (!isTracing && comment.User.id) {
      dispatch(trace(comment.User.id));
      dispatch(
        openNotice({
          content: `${comment.User.username}님을 트레이스 리스트에 등록합니다.`,
          type: 1,
        }),
      );
    }
    return null;
  };

  return (
    <div
      key={comment.id}
      className={`p-3 my-2.5 ${post.User.id === comment.User.id ? 'bg-slate-50' : null} rounded-md`}
    >
      <div className='mb-1.5 flex items-center'>
        <Link href={`/profile/${comment.User.username}`}>
          <img
            alt=''
            src={
              process.env.NODE_ENV === 'production'
                ? `${comment.User.avatar}`
                : `${backUrl}/${comment.User.avatar}`
            }
            className={`${getUserClassColor(
              comment.User.class,
            )} cursor-pointer h-[42px] w-[42px] border-[2.5px] p-0.5 rounded-full object-cover`}
          />
        </Link>
        <div className='ml-2 w-full flex flex-col'>
          <Link href={`/profile/${comment.User.username}`}>
            <h1 className='cursor-pointer text-sm font-bold flex items-center'>
              {comment.User.username}
              <div className={`${getUserClassColor(comment.User.class)} flex gap-0.5 text-xs`}>
                {comment.User.rank === 6 && <FaceSmileIcon className='w-4 ml-0.5 ' aria-hidden='true' />}
                {comment.User.rank === 0 ? null : (
                  <ShieldCheckIcon className={`w-4 ml-0.5 flex-shrink-0 `} aria-hidden='true' />
                )}
                {comment.User.rank}
              </div>
            </h1>
          </Link>
          <h1 className='text-xs relative bottom-0.5'>{comment.User.role}</h1>
        </div>
        <Menu as='div' className='relative bottom-2 inline-block text-left '>
          <div>
            <Menu.Button className='rounded-md px-3 py-1.5 text-sm font-medium  hover:bg-slate-50 focus:outline-none'>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
              </svg>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-1 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type='button'
                      onClick={onEditCommentMode}
                      className={classNames(
                        active ? 'bg-slate-100 ' : '',
                        'block px-4 py-2 text-sm text-left w-full',
                      )}
                    >
                      수정
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type='button'
                      onClick={onRemoveComment}
                      className={classNames(
                        active ? 'bg-slate-100 ' : '',
                        'block px-4 py-2 text-sm text-left w-full',
                      )}
                    >
                      삭제
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <form onSubmit={handleSubmit(onEditComment)}>
        <div className='mb-5 text-sm break-words font-normal '>
          {editCommentMode ? (
            <>
              <label htmlFor='content' className='sr-only' />
              <textarea
                id='content'
                maxLength={800}
                rows={3}
                disabled={post.blinded}
                className='px-2  border border-slate-200 rounded-md w-full text-sm sm:text-sm md:text-md  focus:ring-0 focus:outline-none placeholder:text-slate-300'
                {...register('content')}
              />
            </>
          ) : (
            <p className={extendComment ? '' : 'line-clamp-3'}>
              {comment.content.split(/(#[^\s#]+)/g).map((v) => {
                if (v.match(/(#[^\s#]+)/)) {
                  return (
                    <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={v}>
                      <span className='text-indigo-500 cursor-pointer font-medium hover:text-indigo-600'>
                        {v}
                      </span>
                    </Link>
                  );
                }
                return v;
              })}
            </p>
          )}
        </div>
        <div className='flex justify-between  gap-2 text-sm items-center'>
          <div className='flex'>
            {isProdded ? (
              <button type='button' onClick={onUnprodComment} className='mx-1 flex items-center gap-0.5'>
                <BoltIcon className='w-4 text-indigo-500' />
                <span>{comment.CommentProdders.length}</span>
              </button>
            ) : (
              <button
                type='button'
                onClick={onProdComment}
                className='mx-1 flex items-center gap-0.5 hover:text-indigo-500 '
              >
                <BoltIcon className='w-4' />
                <span>{comment.CommentProdders.length}</span>
              </button>
            )}

            {comment.User.id !== me?.id ? (
              <button
                type='button'
                onClick={onToggleTrace}
                className='mx-1 flex items-center gap-0.5 hover:text-indigo-500 '
              >
                {isTracing ? (
                  <>
                    <UserMinusIcon className='w-4' />
                    Untrace
                  </>
                ) : (
                  <>
                    {' '}
                    <UserPlusIcon className='w-4' />
                    Trace
                  </>
                )}
              </button>
            ) : null}
          </div>
          <div className='flex'>
            {editCommentMode ? (
              <>
                <button type='submit' disabled={isSubmitting} className='mx-1  hover:text-indigo-500'>
                  <CheckIcon className='w-5' />
                </button>
                <button type='button' className='mx-1 flex items-center gap-0.5 hover:text-indigo-500'>
                  <ArrowUturnLeftIcon onClick={onCancelEditCommentMode} className='w-4' />
                </button>
              </>
            ) : (
              <button type='button' className='mx-1 flex items-center gap-0.5 hover:text-indigo-500'>
                {extendComment ? (
                  <MinusIcon onClick={toggleExtendComment} className='w-5' />
                ) : (
                  <PlusIcon onClick={toggleExtendComment} className='w-5' />
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
