import React, { Fragment, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Menu, Transition } from "@headlessui/react";
import CommentForm from "./CommentForm";
import CommentSection from "./CommentSection";

const CommentArea = ({ post, onToggleCommentArea }) => {
  return (
    <>
      <div className="w-full h-[75%] pb-3 overflow-y-auto ">
        {post.Comments?.map((comment) => (
          <CommentSection key={comment.id} post={post} comment={comment} />
        ))}
      </div>

      <CommentForm post={post} onToggleCommentArea={onToggleCommentArea} />
    </>
  );
};

CommentArea.propTypes = {
  post: PropTypes.object.isRequired,
  onToggleCommentArea: PropTypes.func.isRequired,
};
export default CommentArea;
