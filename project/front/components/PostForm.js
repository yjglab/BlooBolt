import { TrashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  UPLOAD_POST_IMAGES_REQUEST,
  UPLOAD_POST_REQUEST,
  CANCEL_POST_IMAGE,
} from "../reducers/post";
import { backUrl } from "../config/config";
import { PhotoIcon } from "@heroicons/react/24/outline";

const PostForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { postImagePaths, uploadPostImagesError } = useSelector(
    (state) => state.post
  );
  const [uploadPostBlock, setUploadPostBlock] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      topic: "",
      content: "",
    },
  });

  const onUploadPost = (formData) => {
    const { topic, content } = formData;
    reset();

    return dispatch({
      type: UPLOAD_POST_REQUEST,
      data: { topic, content, postImagePaths },
    });
  };

  const onCancelPostImage = useCallback((i) => () => {
    dispatch({
      type: CANCEL_POST_IMAGE,
      data: i,
    });
  });

  const onChangePostImages = () => {
    const postImages = watch("image");
    const postImagesFormData = new FormData();
    [].forEach.call(postImages, (file) => {
      postImagesFormData.append("postImages", file);
    });

    dispatch({
      type: UPLOAD_POST_IMAGES_REQUEST,
      data: postImagesFormData,
    });
  };

  return (
    <div className="flex  rounded mb-10">
      <div className="flex relative flex-col w-full ">
        <form
          onSubmit={handleSubmit(onUploadPost)}
          encType="multipart/form-data"
          className="mb-8 w-full relative "
        >
          <div className="py-2 px-4 mb-2 bg-white w-full shadow-md rounded  ">
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-slate-600"
            ></label>
            <input
              id="topic"
              type="text"
              placeholder="토픽 설정"
              className="my-1  py-1.5 block w-1/3 placeholder:text-slate-300 text-sm rounded border-slate-300  focus:border-indigo-500 focus:ring-indigo-500 "
              {...register("topic", {
                maxLength: {
                  value: 10,
                  message: "토픽은 10자 이내로 설정해야 합니다",
                },
              })}
            />
            <label htmlFor="content" className="sr-only"></label>
            <textarea
              id="content"
              maxLength={800}
              rows="3"
              className="px-0 pt-2 w-full text-sm  border-0 focus:ring-0 focus:outline-none placeholder:text-slate-300"
              placeholder="우측 아래를 드래그하여 입력창을 넓힐 수 있습니다."
              {...register("content", {
                required: "내용을 입력해주세요",
                maxLength: {
                  value: 800,
                  message: "800자 이내로 입력해주세요",
                },
              })}
            ></textarea>
            <div className="mt-2 border-t border-slate-200  py-2 w-full">
              <div className="mt-1 flex w-full">
                {postImagePaths.map((v, i) => (
                  <button
                    type="button"
                    key={v}
                    onClick={onCancelPostImage(i)}
                    className="border border-slate-300 w-2/12 aspect-square lg:w-1/12 sm:w-2/12 mx-0.5 relative rounded overflow-hidden  "
                  >
                    {
                      <img
                        className="hover:opacity-25 z-0 aspect-square object-cover"
                        src={
                          process.env.NODE_ENV === "production"
                            ? ``
                            : `${backUrl}/${v}`
                        }
                        alt={v}
                      />
                    }
                    {/* <Image
                      className="hover:opacity-25 z-0 aspect-square object-cover"
                      layout="fill"
                      src={
                        process.env.NODE_ENV === "production"
                          ? ``
                          : `${backUrl}/${v}`
                      }
                      alt={v}
                    /> */}
                    <div className="z-1 flex justify-center items-center w-full h-full top-0 left-0 absolute opacity-0 hover:bg-gray-200 hover:opacity-100 hover:bg-opacity-50">
                      <TrashIcon className="text-slate-600 w-1/3 h-1/3 " />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute flex items-center right-0">
            <label
              htmlFor="postImages"
              className="py-1 px-1 cursor-pointer text-xs font-medium text-center bg-white shadow-md text-slate-600 rounded focus:ring-4 focus:ring-slate-200  hover:bg-slate-50"
            >
              <PhotoIcon className="stroke-2 block h-5 w-5 " />
            </label>
            <input
              name="postImages"
              id="postImages"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              {...register("image", {
                onChange: onChangePostImages,
              })}
            />
            <button
              type="submit"
              disabled={uploadPostBlock || isSubmitting}
              className="ml-1.5 py-1.5 px-4 text-xs font-medium text-center shadow-md bg-indigo-500 rounded text-white hover:bg-indigo-600"
            >
              Flash
            </button>
          </div>
        </form>
        <div
          className="absolute bottom-2 left-1.5 flex text-amber-400 text-xs "
          role="alert"
        >
          {errors.content ? (
            <>{errors.content.message}</>
          ) : errors.topic ? (
            <>{errors.topic.message}</>
          ) : errors.postImages ? (
            <>{errors.postImages.message}</>
          ) : uploadPostImagesError ? (
            <>{uploadPostImagesError}</>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default PostForm;
