import {
  ArrowPathIcon,
  ArrowUpIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { backUrl } from "../config/config";
import { ArrowUpCircleIcon, PhotoIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import {
  editPost,
  uploadPost,
  loadPrevPostImages,
  cancelPostImage,
  uploadPostImages,
} from "../reducers/postSlice";
import { openNotice } from "../reducers/globalSlice";
import Router from "next/router";

const PostForm = ({
  onTogglePostForm,
  onTogglePostEditMode,
  post,
  squareKind,
  postEditMode,
  prevPostClass,
  prevTopic,
  prevContent,
  prevPostImages,
}) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const {
    postImagePaths,
    editPostDone,
    uploadPostLoading,
    uploadPostImagesError,
  } = useSelector((state) => state.post);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      topic: "",
      content: "",
    },
  });

  const onUploadPost = (formData) => {
    const { topic, content, postClass } = formData;
    if (!content.trim()) {
      return setError("content", {
        message: "빈 포스트를 업로드할 수 없습니다",
      });
    }
    if (postClass === "default") {
      return setError("postClass", {
        message: "포스트 분류를 선택해주세요.",
      });
    }
    reset();
    onTogglePostForm(false);

    dispatch(
      uploadPost({
        postUnique: squareKind,
        postClass,
        topic,
        content,
        postImagePaths,
      })
    );
    if (me.rank === 0) {
      dispatch(
        openNotice({
          content: "첫 포스트를 업로드 했습니다. 새로운 랭크로 등록되었습니다.",
          type: 1,
        })
      );
    } else {
      dispatch(openNotice({ content: "포스트가 업로드 되었습니다.", type: 1 }));
    }
  };

  const onEditPost = (editedFormData) => {
    const { postClass, topic, content } = editedFormData;
    if (postClass === "default") {
      return setError("postClass", {
        message: "포스트 분류를 선택해주세요.",
      });
    }
    if (!content.trim()) {
      return setError("content", {
        message: "빈 포스트를 업로드할 수 없습니다",
      });
    }

    reset();
    onTogglePostEditMode(false);
    dispatch(
      editPost({ PostId: post.id, postClass, topic, content, postImagePaths })
    );
    dispatch(
      openNotice({
        content: "포스트가 수정되었습니다.",
        type: 1,
      })
    );
  };

  const onLoadPrevPostImages = useCallback(() => {
    dispatch(loadPrevPostImages(prevPostImages.map((v) => v.src)));
  });

  useEffect(() => {
    if (postEditMode) {
      onLoadPrevPostImages();
      setValue("postClass", prevPostClass);
      setValue("topic", prevTopic ? prevTopic : "");
      setValue("content", prevContent);
    }
  }, []);

  const onCancelPostImage = useCallback((i) => () => {
    dispatch(cancelPostImage(i));
  });

  const onChangePostImages = () => {
    const postImages = watch("postImages");
    const postImagesFormData = new FormData();
    [].forEach.call(postImages, (file) => {
      if (file.size > 10 * 1024 * 1024) {
        setError("postImages", {
          message: "10MB 이하의 이미지 파일만 업로드 가능합니다.",
        });
        return;
      } else {
        postImagesFormData.append("postImages", file);
      }
    });
    dispatch(uploadPostImages(postImagesFormData));
  };

  return (
    <div className="fixed inset-0 bg-slate-500 bg-opacity-25 flex justify-center items-center  backdrop-blur-md  z-30">
      <div className="flex md:w-2/3 sm:w-4/5  w-11/12 rounded-md mb-10 relative top-8">
        <div className="flex relative flex-col w-full ">
          <form
            onSubmit={
              postEditMode
                ? handleSubmit(onEditPost)
                : handleSubmit(onUploadPost)
            }
            encType="multipart/form-data"
            className="mb-8 w-full relative "
          >
            <div className="pt-4 pb-4 px-4 mb-2  bg-white w-full rounded-md   ">
              <div className="flex my-1 gap-3 items-center justify-between">
                <div className="w-full">
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-slate-600"
                  ></label>
                  <input
                    id="topic"
                    type="text"
                    placeholder="토픽 설정"
                    className="px-1.5 py-2 block w-full placeholder:text-slate-300 text-sm rounded-md border-slate-300  focus:border-indigo-500 focus:ring-indigo-500 "
                    {...register("topic", {
                      maxLength: {
                        value: 30,
                        message: "토픽은 30자 이내로 제한됩니다.",
                      },
                    })}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="postClass"
                    className="block text-sm font-medium text-slate-600"
                  ></label>
                  {squareKind === "public" ? (
                    <select
                      id="postClass"
                      name="postClass"
                      className="relative block w-36 text-sm appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      {...register("postClass", {
                        required: "포스트 분류를 선택해주세요.",
                      })}
                    >
                      <option value="default">...분류</option>
                      <option value="normal">일반</option>
                      <option value="fedev">개발-프론트엔드</option>
                      <option value="bedev">개발-백엔드</option>
                      <option value="design">디자인-UX/UI</option>
                      <option value="plan">서비스-기획</option>
                    </select>
                  ) : (
                    <select
                      id="postClass"
                      name="postClass"
                      // disabled={true}
                      className="cursor-not-allowed relative block w-36 text-sm appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-600 placeholder-slate-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      {...register("postClass", {})}
                    >
                      <option value={squareKind}>
                        {squareKind === "fedev"
                          ? "프론트엔드"
                          : squareKind === "bedev"
                          ? "백엔드"
                          : squareKind === "design"
                          ? "디자인"
                          : squareKind === "plan"
                          ? "기획"
                          : null}
                      </option>
                    </select>
                  )}
                </div>
              </div>
              <label htmlFor="content" className="sr-only"></label>
              <textarea
                id="content"
                maxLength={1500}
                rows="14"
                className="px-1.5 pt-2 w-full text-sm xl:text-base  border-0 focus:ring-0 focus:outline-none placeholder:text-slate-300"
                placeholder="우측 아래를 드래그하여 입력창을 넓힐 수 있습니다."
                {...register("content", {
                  required: "내용을 입력해주세요",
                  maxLength: {
                    value: 1500,
                    message: "1000자 이내로 입력해주세요",
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
                      className="border border-slate-300 w-2/12 aspect-square lg:w-1/12 sm:w-2/12 mx-0.5 relative rounded-md overflow-hidden  "
                    >
                      {
                        <img
                          className="hover:opacity-25 z-0 aspect-square object-cover"
                          src={
                            process.env.NODE_ENV === "production"
                              ? `${v.replace(/\/thumb\//, "/original/")}`
                              : `${backUrl}/${v}`
                          }
                          alt={v}
                        />
                      }
                      <div className="z-1 flex justify-center items-center w-full h-full top-0 left-0 absolute opacity-0 hover:bg-slate-200 hover:opacity-100 hover:bg-opacity-50">
                        <TrashIcon className=" w-1/3 h-1/3 " />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="gap-1.5 absolute flex items-center right-0">
              <button
                type="button"
                onClick={postEditMode ? onTogglePostEditMode : onTogglePostForm}
                disabled={isSubmitting}
                className=" hover:bg-slate-200  flex h-10 w-10 items-center justify-center rounded-lg bg-white "
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <label
                htmlFor="postImages"
                className="cursor-pointer hover:bg-slate-200  flex h-10 w-10 items-center justify-center rounded-lg bg-white"
              >
                <PhotoIcon className="h-6 w-6" aria-hidden="true" />
              </label>

              <input
                name="postImages"
                id="postImages"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                {...register("postImages", {
                  onChange: onChangePostImages,
                })}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className=" hover:bg-indigo-600 text-white flex h-10 w-16 items-center justify-center rounded-lg bg-indigo-500"
              >
                {uploadPostLoading ? (
                  <ArrowPathIcon className="w-5  left-0 right-0 mx-auto animate-spin" />
                ) : (
                  "업로드"
                )}
              </button>
            </div>
          </form>
          <div
            className="absolute bottom-2 left-1.5 flex text-orange-400 text-xs "
            role="alert"
          >
            {errors.content ? (
              <>{errors.content.message}</>
            ) : errors.topic ? (
              <>{errors.topic.message}</>
            ) : errors.postImages ? (
              <>{errors.postImages.message}</>
            ) : errors.postClass ? (
              <>{errors.postClass.message}</>
            ) : uploadPostImagesError ? (
              <>{uploadPostImagesError}</>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  onTogglePostForm: PropTypes.func,
  onTogglePostEditMode: PropTypes.func,
  post: PropTypes.object,
  squareKind: PropTypes.string.isRequired,
  postEditMode: PropTypes.bool,
  prevPostClass: PropTypes.string,
  prevTopic: PropTypes.string,
  prevContent: PropTypes.string,
  prevPostImages: PropTypes.arrayOf(PropTypes.object),
};
export default PostForm;
