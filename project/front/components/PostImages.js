import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostImagesCarousel from "./PostImagesCarousel";
import PropTypes from "prop-types";

const PostImages = ({ images }) => {
  const [openCarousel, setOpenCarousel] = useState(false);

  const onOpenCarousel = useCallback(() => {
    setOpenCarousel(true);
  }, []);
  const onCloseCarousel = useCallback(() => {
    setOpenCarousel(false);
  }, []);

  const imageLength = 3;

  if (imageLength === 1) {
    return (
      <div className="my-7 pr-2 w-full flex justify-between ">
        <button onClick={onOpenCarousel} className="w-5/11 mx-0.5">
          <img
            className="rounded  aspect-square object-cover"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg"
            role="presentation"
            alt=""
          />
        </button>

        {openCarousel && (
          <PostImagesCarousel
            images={images}
            onCloseCarousel={onCloseCarousel}
          />
        )}
      </div>
    );
  }
  if (imageLength === 2) {
    return (
      <div className="my-7 pr-2 w-full flex justify-between ">
        <button onClick={onOpenCarousel} className="w-5/11 mx-0.5">
          <img
            className="rounded  aspect-square object-cover"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg"
            role="presentation"
            alt=""
          />
        </button>
        <button onClick={onOpenCarousel} className="w-5/11 mx-0.5">
          <img
            className="rounded  aspect-square object-cover"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg"
            role="presentation"
            alt=""
          />
        </button>
        {openCarousel && (
          <PostImagesCarousel
            images={images}
            onCloseCarousel={onCloseCarousel}
          />
        )}
      </div>
    );
  }
  if (imageLength === 3) {
    return (
      <div className="my-7 pr-2 w-full flex justify-between ">
        <button onClick={onOpenCarousel} className="w-4/12 mx-0.5">
          <img
            className="rounded  aspect-square object-cover"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg"
            role="presentation"
            alt=""
          />
        </button>
        <button onClick={onOpenCarousel} className="w-4/12 mx-0.5">
          <img
            className="rounded  aspect-square object-cover"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg"
            role="presentation"
            alt=""
          />
        </button>
        <button onClick={onOpenCarousel} className="w-4/12 mx-0.5 relative">
          <img
            className="rounded  aspect-square object-cover"
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg"
            role="presentation"
            alt=""
          />
        </button>
        {openCarousel && (
          <PostImagesCarousel
            images={images}
            onCloseCarousel={onCloseCarousel}
          />
        )}
      </div>
    );
  }
  return (
    <div className="my-7 pr-2 w-full flex justify-between ">
      <button onClick={onOpenCarousel} className="w-4/12 mx-0.5">
        <img
          className="rounded  aspect-square object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg"
          role="presentation"
          alt=""
        />
      </button>
      <button onClick={onOpenCarousel} className="w-4/12 mx-0.5">
        <img
          className="rounded  aspect-square object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg"
          role="presentation"
          alt=""
        />
      </button>
      <button onClick={onOpenCarousel} className="w-4/12 mx-0.5 relative">
        <button
          onClick={onOpenCarousel}
          className="hover:text-white hover:bg-slate-700 text-xs font-semibold py-0.5 absolute rounded bg-white px-1.5 right-2 top-2 flex justify-between items-center"
        >
          MORE +{3}
        </button>

        <img
          className="rounded  aspect-square object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg"
          role="presentation"
          alt=""
        />
      </button>
      {openCarousel && (
        <PostImagesCarousel images={images} onCloseCarousel={onCloseCarousel} />
      )}
    </div>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
