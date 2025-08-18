import { type To } from "react-router-dom";

export type CardProps = {
  title: string;
  body: string;
  to: To;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

export type ThemeState = {
  theme: string;
  setTheme: (theme: string) => void;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type CommentProps = {
  id: number;
  name: string;
  email: string;
  body: string;
  index: number;
};

export type PostsState = {
  posts: Post[];
  comments: Comment[];
  selectedPostId: number | null;
  isPostsLoading: boolean;
  isCommentsLoading: boolean;
  setSelectedPostId: (postId: number) => void;
  getPosts: () => void;
  getComments: (postId: number) => void;
};

export type SearchProps = {
  value: string;
  onChange: (v: string) => void;
};
