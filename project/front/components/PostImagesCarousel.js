import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { backUrl } from "../config/config";

const PostImagesCarousel = ({ postImages, onCloseCarousel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? postImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === postImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="flex-col  w-screen h-screen fixed  flex z-50 justify-center items-center top-0 left-0 bg-slate-50">
      <div className="flex items-center w-[100%] h-full py-16 sm:py-0 sm:w-[93.5%] sm:h-[85%] group ">
        <XMarkIcon
          onClick={onCloseCarousel}
          className="text-slate-600 absolute top-5 right-[5%] p-0.5 stroke-2 cursor-pointer w-8 h-8  rounded-full"
        />
        <div className="w-full sm:h-full h-auto">
          <img
            src={
              process.env.NODE_ENV === "production"
                ? ``
                : `${backUrl}/${postImages[currentIndex].src}`
            }
            className="w-full sm:h-full h-[60%] object-cover  bg-center bg-cover sm:shadow sm:rounded-xl "
          ></img>
          <div className="bg-slate-700/30 hover:bg-slate-700/60 p-0.5 sm:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-[5%]  rounded-full  text-white cursor-pointer">
            <ArrowLeftCircleIcon onClick={prevSlide} className=" w-9 h-9   " />
          </div>
          <div className="bg-slate-700/30 hover:bg-slate-700/60 p-0.5 sm:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-[5%]  rounded-full  text-white  cursor-pointer">
            <ArrowRightCircleIcon onClick={nextSlide} className=" w-9 h-9   " />
          </div>
          <div className="flex top-4 justify-center py-2">
            {postImages.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className="cursor-pointer "
              >
                <div className="w-2.5 h-2.5 my-2 mx-1.5 rounded-full bg-slate-700  hover:bg-indigo-600 "></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

PostImagesCarousel.propTypes = {
  postImages: PropTypes.arrayOf(PropTypes.object),
};

export default PostImagesCarousel;
