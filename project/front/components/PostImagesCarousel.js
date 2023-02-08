import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const PostImagesCarousel = ({ images, onCloseCarousel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    // <div className="fixed top-0 left-0 w-full h-96 z-50 bg-red-400 p-16"></div>
    <div className="flex-col  w-screen h-screen fixed  flex z-50 justify-center items-center top-0 left-0 bg-gray-50">
      <div className="relative w-[96%] h-full py-16 sm:py-0 sm:w-[93.5%] sm:h-[90%] group ">
        <XMarkIcon
          onClick={onCloseCarousel}
          className="text-gray-700 absolute top-5 right-5 sm:hidden group-hover:block p-0.5 stroke-2 cursor-pointer w-8 h-8  sm:text-white rounded-full"
        />
        <img
          src={images[currentIndex].src}
          className="w-full h-full object-cover  bg-center bg-cover shadow-md rounded-md "
        ></img>
        <div className="bg-gray-700/30 hover:bg-white/30 p-0.5 sm:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5  rounded-full  text-white cursor-pointer">
          <ArrowLeftCircleIcon
            onClick={prevSlide}
            className=" w-9 h-9 hover:text-cyan-400  "
          />
        </div>
        <div className="bg-gray-700/30 hover:bg-white/30 p-0.5 sm:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5  rounded-full  text-white  cursor-pointer">
          <ArrowRightCircleIcon
            onClick={nextSlide}
            className=" w-9 h-9 hover:text-cyan-400  "
          />
        </div>
        <div className="flex top-4 justify-center py-2">
          {images.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="cursor-pointer "
            >
              <div className="w-2.5 h-2.5 my-2 mx-1.5 rounded-full bg-gray-700  hover:bg-cyan-400 "></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

PostImagesCarousel.propTypes = {};

export default PostImagesCarousel;
