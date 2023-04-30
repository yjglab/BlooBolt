import React, { ReactNode } from 'react';
import NoticeModal from './NoticeModal';
import { useAppSelector } from '../store/configureStore';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { noticeCalled } = useAppSelector((state) => state.global);
  return (
    <>
      {children}
      {noticeCalled ? <NoticeModal /> : null}
    </>
  );
};

export default AppLayout;
