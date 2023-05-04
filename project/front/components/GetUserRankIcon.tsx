import { FaceSmileIcon, ShieldCheckIcon } from '@heroicons/react/20/solid';
import React, { FC } from 'react';

const GetUserRankIcon: FC<{ userRank: number | undefined }> = ({ userRank }) => {
  if (userRank === 6) {
    return (
      <>
        <FaceSmileIcon className='w-4 ml-0.5 ' aria-hidden='true' />
        {userRank}
      </>
    );
  }
  if (userRank === 0) {
    return <span>{userRank}</span>;
  }
  return (
    <>
      <ShieldCheckIcon className={`w-4 ml-0.5 flex-shrink-0 `} aria-hidden='true' />
      {userRank}
    </>
  );
};

export default GetUserRankIcon;
