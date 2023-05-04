import React, { FC, useCallback, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { openNotice } from '../reducers/global';
import { reportUser } from '../reducers/user';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import Post from '../typings/post';

interface PostUserReportProps {
  post: Post;
  onToggleCheckReport: () => void;
}
const PostUserReport: FC<PostUserReportProps> = ({ post, onToggleCheckReport }) => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.user.me?.id);

  interface ReportUserValues {
    reportContent: string;
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ReportUserValues>({
    mode: 'onSubmit',
  });

  const onReportUser: SubmitHandler<ReportUserValues> = useCallback(
    (formData) => {
      const alredyReported = post.User.UserReports?.find((v) => v.reporterId === id);
      if (alredyReported) {
        return dispatch(
          openNotice({
            content: `이미 신고 접수된 사용자입니다.`,
            type: 2,
          }),
        );
      }

      const { reportContent } = formData;
      if (post.User.id) dispatch(reportUser({ userId: post.User.id, reportContent, postId: post.id }));

      dispatch(
        openNotice({
          content: `신고 내용이 관리자에게 전송되었습니다.`,
          type: 1,
        }),
      );
      reset();
      onToggleCheckReport();
      return null;
    },
    [dispatch, id, onToggleCheckReport, post.User.UserReports, post.User.id, post.id, reset],
  );

  return (
    <div className=' backdrop-saturate-0 gap-2 bg-white/50  flex justify-center items-center flex-col absolute inset-0 w-full h-full  backdrop-blur-md z-10'>
      <form onSubmit={handleSubmit(onReportUser)} className='w-full px-6 flex flex-col items-center  '>
        <span className='text-sm mb-3 font-semibold text-slate-500 text-center px-5'>
          부적절한 사용자 신고
        </span>
        <label htmlFor='reportContent' className='sr-only' />
        <textarea
          id='reportContent'
          maxLength={100}
          rows={3}
          className='px-2 tracking-tight mb-3  border border-slate-200 rounded-md w-full text-sm sm:text-sm md:text-md  focus:ring-0 focus:outline-none placeholder:text-slate-300'
          placeholder='신고할 내용을 작성해주세요. 허위 내용을 전송할 경우 서비스 이용에 불이익을 받을 수 있습니다.'
          {...register('reportContent', {
            required: '',
            maxLength: {
              value: 100,
              message: '100자 이내로 입력해주세요',
            },
          })}
        />
        <small>{errors.reportContent ? <>errors.reportContent.message</> : null}</small>
        <div className='mt-2 flex gap-2'>
          <button
            type='submit'
            className='py-1.5 px-3 bg-slate-500 rounded-md text-xs text-white font-semibold hover:bg-slate-500'
          >
            전송
          </button>
          <button
            type='button'
            onClick={onToggleCheckReport}
            className='py-1.5 px-3 bg-slate-500 rounded-md text-xs text-white font-semibold hover:bg-slate-500'
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostUserReport;
