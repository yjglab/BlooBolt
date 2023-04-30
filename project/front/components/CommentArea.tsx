import React, { FC } from 'react';
import CommentForm from './CommentForm';
import CommentSection from './CommentSection';
import Post from '../typings/post';

interface CommentAreaProps {
  post: Post;
  detailed: boolean;
  onToggleCommentArea: () => void;
}
const CommentArea: FC<CommentAreaProps> = ({ post, detailed, onToggleCommentArea }) => {
  return (
    <div className='h-full relative'>
      <div className='w-full h-[75%] pb-32 overflow-y-auto  '>
        {post.Comments?.map((comment) => (
          <CommentSection key={comment.id} post={post} comment={comment} />
        ))}
      </div>
      <CommentForm post={post} detailed={detailed} onToggleCommentArea={onToggleCommentArea} />
    </div>
  );
};

export default CommentArea;
