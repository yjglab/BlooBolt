import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { FC, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { openNotice } from '../reducers/global';
import { uploadComment } from '../reducers/post';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import Post from '../typings/post';

interface CommentFormProps {
  post: Post;
  detailed: boolean;
  onToggleCommentArea: () => void;
}
const CommentForm: FC<CommentFormProps> = ({ post, detailed, onToggleCommentArea }) => {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.user);
  const { uploadCommentLoading } = useAppSelector((state) => state.post);
  const id = useAppSelector((state) => state.user.me?.id);

  interface UploadCommentValues {
    content: string;
  }
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<UploadCommentValues>({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
    },
  });

  const onUploadComment: SubmitHandler<UploadCommentValues> = (formData) => {
    if (me?.banned) {
      return dispatch(
        openNotice({
          type: 2,
          content: '회원님은 최근 다수의 신고를 받아 이용이 정지된 계정입니다.',
        }),
      );
    }
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
      return setError('content', {
        message: '빈 코멘트를 업로드할 수 없습니다',
      });
    }
    reset();

    return dispatch(uploadComment({ content, postId: post.id, userId: id }));
  };

  return (
    <form onSubmit={handleSubmit(onUploadComment)} className=' absolute w-full bottom-0 '>
      <div className=' flex items-center'>
        <label htmlFor='content' className='sr-only' />
        <textarea
          id='content'
          maxLength={800}
          rows={3}
          disabled={post.blinded}
          className='px-2  border border-slate-200 rounded-md w-full text-sm sm:text-sm md:text-md  focus:ring-0 focus:outline-none placeholder:text-slate-300'
          placeholder={
            me && !post.blinded // eslint-disable-line no-nested-ternary
              ? `${me?.username}님의 의견을 들려주세요.`
              : post.blinded
              ? '삭제된 포스트에는 코멘트를 작성할 수 없습니다.'
              : '로그인이 필요합니다.'
          }
          {...register('content', {
            required: '',
            maxLength: {
              value: 800,
              message: '800자 이내로 입력해주세요',
            },
          })}
        />
      </div>
      <div className='flex items-center mt-1 justify-between'>
        {!detailed && (
          <button type='button' className=' rounded-full flex items-center'>
            <XMarkIcon onClick={onToggleCommentArea} className='w-7 ' />
          </button>
        )}
        <div className=' text-orange-400  text-xs ' role='alert'>
          {errors.content && <>errors.content.message</>}
        </div>
        <button
          type='submit'
          disabled={uploadCommentLoading || post.blinded}
          className=' rounded-md flex text-white items-center hover:bg-indigo-600 bg-indigo-500 py-1 px-2'
        >
          {uploadCommentLoading ? (
            <ArrowPathIcon className='w-4  left-0 right-0 mx-auto animate-spin' />
          ) : (
            <span className='text-sm '>업로드</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
