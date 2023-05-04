import React, { FC, useCallback, useState } from 'react';
import PostImagesCarousel from './PostImagesCarousel';
import { backUrl } from '../config/config';
import PostImage from '../typings/postImage';

interface PostImagesProps {
  postImages: PostImage[];
}
const PostImages: FC<PostImagesProps> = ({ postImages }) => {
  const [openCarousel, setOpenCarousel] = useState(false);

  const onOpenCarousel = useCallback(() => {
    setOpenCarousel(true);
  }, []);
  const onCloseCarousel = useCallback(() => {
    setOpenCarousel(false);
  }, []);

  if (postImages.length === 1) {
    return (
      <>
        <img
          alt={postImages[0].src}
          onClick={onOpenCarousel}
          className='object-cover w-full cursor-pointer'
          src={
            process.env.NODE_ENV === 'production' ? `${postImages[0].src}` : `${backUrl}/${postImages[0].src}`
          }
        />
        {openCarousel && <PostImagesCarousel postImages={postImages} onCloseCarousel={onCloseCarousel} />}
      </>
    );
  }
  if (postImages.length === 2) {
    return (
      <>
        <img
          onClick={onOpenCarousel}
          className='object-cover w-1/2 cursor-pointer'
          src={
            process.env.NODE_ENV === 'production' ? `${postImages[0].src}` : `${backUrl}/${postImages[0].src}`
          }
          alt={postImages[0].src}
        />
        <img
          onClick={onOpenCarousel}
          className='object-cover w-1/2 cursor-pointer'
          src={
            process.env.NODE_ENV === 'production' ? `${postImages[1].src}` : `${backUrl}/${postImages[1].src}`
          }
          alt={postImages[1].src}
        />
        {openCarousel && <PostImagesCarousel postImages={postImages} onCloseCarousel={onCloseCarousel} />}
      </>
    );
  }
  if (postImages.length === 3) {
    return (
      <>
        <img
          onClick={onOpenCarousel}
          className='object-cover w-1/2 cursor-pointer'
          src={
            process.env.NODE_ENV === 'production' ? `${postImages[0].src}` : `${backUrl}/${postImages[0].src}`
          }
          alt={postImages[0].src}
        />
        <div className='w-1/2 flex flex-col gap-1  '>
          <img
            onClick={onOpenCarousel}
            className='object-cover h-1/2 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[1].src}`
                : `${backUrl}/${postImages[1].src}`
            }
            alt={postImages[1].src}
          />
          <img
            onClick={onOpenCarousel}
            className='object-cover h-1/2 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[2].src}`
                : `${backUrl}/${postImages[2].src}`
            }
            alt={postImages[2].src}
          />
        </div>
        {openCarousel && <PostImagesCarousel postImages={postImages} onCloseCarousel={onCloseCarousel} />}
      </>
    );
  }
  if (postImages.length === 4) {
    return (
      <>
        <div className='w-1/2 flex flex-col gap-1  relative '>
          <img
            onClick={onOpenCarousel}
            className='object-cover h-1/2 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[0].src}`
                : `${backUrl}/${postImages[0].src}`
            }
            alt={postImages[0].src}
          />
          <img
            onClick={onOpenCarousel}
            className='object-cover h-1/2 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[1].src}`
                : `${backUrl}/${postImages[1].src}`
            }
            alt={postImages[1].src}
          />
        </div>
        <div className='w-1/2 flex flex-col gap-1  relative '>
          <img
            onClick={onOpenCarousel}
            className='object-cover h-1/2 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[2].src}`
                : `${backUrl}/${postImages[2].src}`
            }
            alt={postImages[2].src}
          />
          <img
            onClick={onOpenCarousel}
            className='object-cover h-1/2 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[3].src}`
                : `${backUrl}/${postImages[3].src}`
            }
            alt={postImages[3].src}
          />
        </div>
        {openCarousel && <PostImagesCarousel postImages={postImages} onCloseCarousel={onCloseCarousel} />}
      </>
    );
  }
  if (postImages.length === 5) {
    return (
      <div className='flex flex-col w-full gap-1'>
        <div className='w-full h-1/2 flex justify-center gap-1 '>
          <img
            onClick={onOpenCarousel}
            className='object-cover w-1/2 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[0].src}`
                : `${backUrl}/${postImages[0].src}`
            }
            alt={postImages[0].src}
          />
          <img
            onClick={onOpenCarousel}
            className='object-cover w-1/2 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[1].src}`
                : `${backUrl}/${postImages[1].src}`
            }
            alt={postImages[1].src}
          />
        </div>
        <div className='w-full h-1/2 flex justify-center gap-1  '>
          <img
            onClick={onOpenCarousel}
            className='object-cover w-1/3 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[2].src}`
                : `${backUrl}/${postImages[2].src}`
            }
            alt={postImages[2].src}
          />
          <img
            onClick={onOpenCarousel}
            className='object-cover w-1/3 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[3].src}`
                : `${backUrl}/${postImages[3].src}`
            }
            alt={postImages[3].src}
          />
          <img
            onClick={onOpenCarousel}
            className='object-cover w-1/3 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[4].src}`
                : `${backUrl}/${postImages[4].src}`
            }
            alt={postImages[4].src}
          />
        </div>
        {openCarousel && <PostImagesCarousel postImages={postImages} onCloseCarousel={onCloseCarousel} />}
      </div>
    );
  }
  if (postImages.length === 6) {
    return (
      <div className='flex flex-col w-full gap-1'>
        <div className='w-full h-1/2 justify-center flex  gap-1 '>
          <img
            onClick={onOpenCarousel}
            className='object-cover w-1/3 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[0].src}`
                : `${backUrl}/${postImages[0].src}`
            }
            alt={postImages[0].src}
          />
          <img
            onClick={onOpenCarousel}
            className='object-cover w-1/3 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[1].src}`
                : `${backUrl}/${postImages[1].src}`
            }
            alt={postImages[1].src}
          />
          <img
            onClick={onOpenCarousel}
            className='object-cover w-1/3 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[2].src}`
                : `${backUrl}/${postImages[2].src}`
            }
            alt={postImages[2].src}
          />
        </div>
        <div className='w-full h-1/2 justify-center flex  gap-1  '>
          <img
            onClick={onOpenCarousel}
            className='object-cover w-1/3 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[3].src}`
                : `${backUrl}/${postImages[3].src}`
            }
            alt={postImages[3].src}
          />
          <img
            onClick={onOpenCarousel}
            className='object-cover w-1/3 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[4].src}`
                : `${backUrl}/${postImages[4].src}`
            }
            alt={postImages[4].src}
          />
          <img
            onClick={onOpenCarousel}
            className='object-cover w-1/3 cursor-pointer'
            src={
              process.env.NODE_ENV === 'production'
                ? `${postImages[5].src}`
                : `${backUrl}/${postImages[5].src}`
            }
            alt={postImages[5].src}
          />
        </div>
        {openCarousel && <PostImagesCarousel postImages={postImages} onCloseCarousel={onCloseCarousel} />}
      </div>
    );
  }
  return null;
};

export default PostImages;
