import User from './user';

export default interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  PostId: number;
  User: Partial<User>;
  CommentProdders: Array<Partial<User> & { id: number }>;
}
