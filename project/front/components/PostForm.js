import { TrashIcon } from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genPost } from "../db";
import useInput from "../hooks/useInput";
import { ADD_POST_REQUEST } from "../pages/reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { addPostDone, imagePaths } = useSelector((state) => state.post);

  const [text, onChangeText, setText] = useInput("");

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!text || !text.trim()) {
        return alert("빈 글을 업로드 할 수 없습니다.");
      }

      return dispatch({
        type: ADD_POST_REQUEST,
        data: genPost(me, text),
      });
    },
    [text, me]
  );

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  const onChangeImages = useCallback(() => {}, []);

  return (
    <div className="flex  rounded-lg mb-5">
      <div className="flex w-full py-6 ">
        <form
          action="submit"
          onSubmit={onSubmit}
          encType="multipart/form-data"
          className="mb-8 w-full relative "
        >
          <div className="py-2 px-4 mb-2 bg-white w-full shadow rounded-lg rounded-t-lg ">
            <label className="sr-only"></label>
            <textarea
              value={text}
              onChange={onChangeText}
              maxLength={800}
              rows="4"
              className="px-0 pt-2 w-full text-sm  border-0 focus:ring-0 focus:outline-none placeholder:text-gray-300"
              placeholder="새로운 주제를 제안해보세요. 우측 아래를 드래그하여 입력창을 넓힐 수 있습니다."
              required
            ></textarea>
            <div className="mt-2 border-t border-gray-200  py-2 w-full">
              <div className="mt-1 flex justify-between w-2/3">
                <button
                  type="button"
                  onClick={null}
                  className="w-2/12 lg:w-1/12 sm:w-2/12 mx-0.5 relative rounded overflow-hidden  "
                >
                  <img
                    className="hover:opacity-25 z-0 aspect-square object-cover"
                    src="https://i.guim.co.uk/img/media/c5e73ed8e8325d7e79babf8f1ebbd9adc0d95409/2_5_1754_1053/master/1754.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=d41b50ebb44dd5d055f57f30b97708ab"
                  />
                  <div className="z-1 flex justify-center items-center w-full h-full top-0 left-0 absolute opacity-0 hover:bg-white hover:opacity-100 hover:bg-opacity-50">
                    <TrashIcon className="text-gray-900 w-1/3 h-1/3 " />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="absolute flex items-center right-0">
            <input
              type="file"
              name="image"
              multiple
              hidden
              ref={imageInput}
              onChange={onChangeImages}
            />
            <button
              type="button"
              onClick={onClickImageUpload}
              className="py-1.5 px-1.5 text-xs font-medium text-center bg-white shadow text-gray-700 rounded-lg focus:ring-4 focus:ring-gray-200  hover:bg-gray-50"
            >
              <PhotoIcon className="stroke-2 block h-5 w-5  cursor-pointer" />
            </button>
            <button
              type="submit"
              className="ml-1.5 py-2 px-4 text-xs font-medium text-center shadow bg-indigo-500/90 rounded-lg text-white hover:bg-indigo-600"
            >
              Flash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
