import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostImagesCarousel from "./PostImagesCarousel";
import PropTypes from "prop-types";
import Image from "next/image";
import { backUrl } from "../config/config";

const PostImages = ({ postImages }) => {
  const [openCarousel, setOpenCarousel] = useState(false);

  const onOpenCarousel = useCallback(() => {
    setOpenCarousel(true);
  }, []);
  const onCloseCarousel = useCallback(() => {
    setOpenCarousel(false);
  }, []);

  if (postImages.length === 1) {
    return (
      <div className="my-7 pr-2 w-full flex justify-between ">
        <button onClick={onOpenCarousel} className="w-5/11 mx-0.5">
          <img
            className="rounded aspect-square object-cover"
            src={
              process.env.NODE_ENV === "production"
                ? `${postImages[0].src}`
                : `${backUrl}/${postImages[0].src}`
            }
            role="presentation"
            alt=""
          />
        </button>

        {openCarousel && (
          <PostImagesCarousel
            postImages={postImages}
            onCloseCarousel={onCloseCarousel}
          />
        )}
      </div>
    );
  }
  if (postImages.length === 2) {
    return (
      <div className="my-7 pr-2 w-full flex justify-between ">
        <button onClick={onOpenCarousel} className="w-5/11 mx-0.5">
          <img
            className="rounded aspect-square object-cover"
            src={
              process.env.NODE_ENV === "production"
                ? `${postImages[0].src}`
                : `${backUrl}/${postImages[0].src}`
            }
            role="presentation"
            alt=""
          />
        </button>
        <button onClick={onOpenCarousel} className="w-5/11 mx-0.5">
          <img
            className="rounded aspect-square object-cover"
            src={
              process.env.NODE_ENV === "production"
                ? `${postImages[1].src}`
                : `${backUrl}/${postImages[1].src}`
            }
            role="presentation"
            alt=""
          />
        </button>
        {openCarousel && (
          <PostImagesCarousel
            postImages={postImages}
            onCloseCarousel={onCloseCarousel}
          />
        )}
      </div>
    );
  }
  if (postImages.length === 3) {
    return (
      <div className="my-7 pr-2 w-full flex justify-between ">
        <button onClick={onOpenCarousel} className="w-4/12 mx-0.5">
          <img
            className="rounded aspect-square object-cover"
            src={
              process.env.NODE_ENV === "production"
                ? `${postImages[0].src}`
                : `${backUrl}/${postImages[0].src}`
            }
            role="presentation"
            alt=""
          />
        </button>
        <button onClick={onOpenCarousel} className="w-4/12 mx-0.5">
          <img
            className="rounded aspect-square object-cover"
            src={
              process.env.NODE_ENV === "production"
                ? `${postImages[1].src}`
                : `${backUrl}/${postImages[1].src}`
            }
            role="presentation"
            alt=""
          />
        </button>
        <button onClick={onOpenCarousel} className="w-4/12 mx-0.5 relative">
          <img
            className="rounded aspect-square object-cover"
            src={
              process.env.NODE_ENV === "production"
                ? `${postImages[2].src}`
                : `${backUrl}/${postImages[2].src}`
            }
            role="presentation"
            alt=""
          />
        </button>
        {openCarousel && (
          <PostImagesCarousel
            postImages={postImages}
            onCloseCarousel={onCloseCarousel}
          />
        )}
      </div>
    );
  }
  return (
    <div className="my-7 pr-2 w-full flex justify-between ">
      <button onClick={onOpenCarousel} className="w-4/12 mx-0.5 relative">
        <img
          className="rounded aspect-square object-cover"
          src={
            process.env.NODE_ENV === "production"
              ? `${postImages[0].src}`
              : `${backUrl}/${postImages[0].src}`
          }
          role="presentation"
          alt=""
        />
      </button>

      <button onClick={onOpenCarousel} className="w-4/12 mx-0.5 relative">
        <img
          className="rounded aspect-square object-cover"
          src={
            process.env.NODE_ENV === "production"
              ? `${postImages[1].src}`
              : `${backUrl}/${postImages[1].src}`
          }
          role="presentation"
          alt=""
        />
      </button>

      <button onClick={onOpenCarousel} className="w-4/12 mx-0.5 relative">
        <button
          onClick={onOpenCarousel}
          className="hover:text-white border border-slate-200 hover:bg-slate-700 text-xs font-semibold py-0.5 absolute rounded bg-white px-1.5 right-2 top-2 flex justify-between items-center"
        >
          MORE +{postImages.length - 3}
        </button>

        <img
          className="rounded aspect-square object-cover"
          src={
            process.env.NODE_ENV === "production"
              ? `${postImages[2].src}`
              : `${backUrl}/${postImages[2].src}`
          }
          role="presentation"
          alt=""
        />
      </button>

      {openCarousel && (
        <PostImagesCarousel
          postImages={postImages}
          onCloseCarousel={onCloseCarousel}
        />
      )}
    </div>
  );
};

PostImages.propTypes = {
  postImages: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
