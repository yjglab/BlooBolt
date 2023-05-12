import { PhotoIcon } from '@heroicons/react/20/solid';
import React, { FC } from 'react';

const PostLoading: FC = () => {
  return (
    <div
      className={`h-[27.5rem] animate-pulse ring-1 ring-slate-200 duration-150 p-1 bg-white  relative rounded-xl  overflow-hidden `}
    >
      <div className='px-5 pt-3  flex flex-col justify-between'>
        <div className='relative'>
          <div className='flex my-2 relative'>
            <div className='h-2.5 w-32 rounded-lg bg-slate-200' />
            <div className='h-2.5 w-8 rounded-lg bg-slate-200 absolute right-0.5' />
          </div>

          <div className='mb-2.5 bg-slate-200 w-44 h-5 rounded-2xl' />
        </div>

        <div className='mb-3 flex items-center'>
          <div
            className={` bg-slate-200 cursor-pointer h-[45px] w-[45px] aspect-square  p-0.5 rounded-full object-cover`}
          />
          <div className='ml-2 w-full flex flex-col'>
            <h1 className='cursor-pointer text-sm font-bold flex items-center'>
              <div className='h-4 w-20 rounded-lg bg-slate-200 ' />
              <div className='ml-1 rounded-full w-4 h-4 bg-slate-200' />
            </h1>
            <div className='h-2 mt-1 w-32 rounded-lg bg-slate-200 ' />
          </div>
        </div>

        <div className={` h-full text-sm break-words  font-normal `}>
          <div className='h-3 my-1.5 w-full rounded-lg bg-slate-200 ' />
          <div className='h-3 my-1.5 w-full rounded-lg bg-slate-200 ' />
          <div className='h-3 my-1.5 w-full rounded-lg bg-slate-200 ' />
          <div className='h-3 my-1.5 w-4/5 rounded-lg bg-slate-200 ' />
        </div>

        <div className='flex w-full justify-between items-center left-2.5 absolute bottom-2.5 text-sm'>
          <div className='flex justify-between w-full'>
            <div className='flex gap-3 px-2.5 '>
              <div className='w-5 h-5 rounded-full bg-slate-200' />
              <div className='w-5 h-5 rounded-full bg-slate-200' />
              <div className='w-5 h-5 rounded-full bg-slate-200' />
            </div>
            <div className='w-5 h-5 absolute right-8 rounded-full bg-slate-200' />
          </div>
        </div>
      </div>

      <div className='h-40 mt-3 gap-1 flex justify-center items-center rounded-xl bg-slate-200 overflow-hidden'>
        <PhotoIcon className='w-12 text-white/70' />
      </div>
    </div>
  );
};

export default PostLoading;
