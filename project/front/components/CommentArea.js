import React from "react";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import CommentSection from "./CommentSection";

const CommentArea = ({ post, detailed, onToggleCommentArea }) => {
  return (
    <div className="h-full relative">
      <div className="w-full h-[75%] pb-32 overflow-y-auto  ">
        {post.Comments?.map((comment) => (
          <CommentSection key={comment.id} post={post} comment={comment} />
        ))}
      </div>
      <CommentForm
        post={post}
        detailed={detailed}
        onToggleCommentArea={onToggleCommentArea}
      />
    </div>
  );
};

CommentArea.propTypes = {
  post: PropTypes.object.isRequired,
  detailed: PropTypes.bool.isRequired,

  onToggleCommentArea: PropTypes.func.isRequired,
};
export default CommentArea;
