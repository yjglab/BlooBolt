import Post from './post';

export default interface User {
  id: number;
  usercode?: string;
  email?: string;
  username: string;
  realname?: string;
  password?: string;
  class: string;
  about: string;
  role: string;
  avatar: string;
  rank: number;
  rankPoint: number;
  country: string;
  address?: string;
  website: string;
  reported?: number;
  banned: boolean;
  social?: string | null;
  socialId?: string | null;
  createdAt: string;
  updatedAt: string;
  Posts: Post[];
  Tracings: Partial<User>[];
  Tracers: Partial<User>[];
}
