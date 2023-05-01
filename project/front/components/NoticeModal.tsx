import { Dialog, Transition } from '@headlessui/react';
import React, { FC, Fragment, useState } from 'react';
import getNoticeModalColor from '../functions/getNoticeModalColor';
import { closeNotice } from '../reducers/global';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

const NoticeModal: FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const { content, type } = useAppSelector((state) => state.global.notice);
  // type 1: success / 2: failed

  const onClose = () => {
    dispatch(closeNotice());
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10 ' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-slate-900 bg-opacity-25 ' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className={`text-lg font-semibold leading-6 ${getNoticeModalColor(type)[0]}`}
                >
                  {getNoticeModalColor(type)[1]}
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-sm text-slate-500'>{content}</p>
                </div>

                <div className='mt-4 flex justify-end gap-2 md:justify-center '>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
                    onClick={onClose}
                  >
                    확인
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NoticeModal;
