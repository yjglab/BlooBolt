import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeNotice, confirmNotice } from '../reducers/global';

const NoticeModal = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const { content, type } = useSelector((state) => state.global.notice);
  // type 1: success / 2: failed

  const onClose = () => {
    dispatch(closeNotice());
    setIsOpen(false);
  };

  return (
    <>
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
                    className={`text-lg font-semibold leading-6 ${
                      type === 1 ? 'text-indigo-500' : type === 2 ? 'text-red-600' : 'text-slate-700'
                    }`}
                  >
                    {type === 1 ? 'Success' : type === 2 ? 'Failed' : 'Notice'}
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
    </>
  );
};

export default NoticeModal;
