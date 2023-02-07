import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genPost } from "../db";
import useInput from "../hooks/useInput";
import { ADD_POST_REQUEST } from "../pages/reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { addPostDone } = useSelector((state) => state.post);

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
        {/* <img
            className="w-12 h-12 rounded-full object-cover mr-4 shadow border-4 border-gray-700"
            src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="avatar"
          /> */}
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
              maxLength={500}
              rows="6"
              className="px-0 pt-2 w-full text-sm  border-0 focus:ring-0 focus:outline-none placeholder:text-gray-300"
              placeholder="Suggest a new topic."
              required
            ></textarea>
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
              className="py-1.5 px-1.5 text-xs font-medium text-center bg-white shadow text-gray-700 rounded-lg focus:ring-4 focus:ring-gray-200 hover:text-white hover:bg-gray-700"
            >
              <PhotoIcon className="stroke-2 block h-5 w-5  cursor-pointer" />
            </button>
            <button
              type="submit"
              className="ml-1.5 py-2 px-4 text-xs font-medium text-center shadow bg-white rounded-lg hover:text-white hover:bg-gray-700"
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
