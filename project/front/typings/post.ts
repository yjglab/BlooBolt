import Comment from './comment';
import PostImage from './postImage';
import User from './user';

export default interface Post {
  id: number;
  unique: string;
  topic: string;
  class: string;
  content: string;
  edited: boolean;
  blinded: boolean;
  reverted: boolean;
  question: boolean;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  User: Partial<User>;
  PostProdders: Array<Partial<User> & { id: number }>;
  PostImages: PostImage[];
  Comments: Comment[];
}
