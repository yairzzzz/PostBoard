import { create } from "zustand";

import { persist } from "zustand/middleware";

import { api } from "../lib/axios";
import { toast } from "react-toastify";
import type { Comment, Post, PostsState } from "../types/types";

export const postsStore = create<PostsState>()(
  persist(
    (set) => ({
      posts: [],
      comments: [],

      selectedPostId: null,

      isPostsLoading: false,
      isCommentsLoading: false,

      setSelectedPostId: (postId) => set({ selectedPostId: postId }),

      getPosts: async () => {
        set({ isPostsLoading: true });
        try {
          // delaying slightly the execution time-250ms to display the skeleton on mount
          await new Promise((resolve) => setTimeout(resolve, 250));
          const { data } = await api.get<Post[]>("/posts");
          set({ posts: data });
        } catch (error: unknown) {
          console.error(error);
          toast.error("Could not fetch posts");
        } finally {
          set({ isPostsLoading: false });
        }
      },

      getComments: async (postId) => {
        set({ isCommentsLoading: true });
        try {
          // delaying slightly the execution time-250ms to display the skeleton on mount
          await new Promise((resolve) => setTimeout(resolve, 250));
          const { data } = await api.get<Comment[]>(
            `/comments?postId=${postId}`
          );
          set({ comments: data });
        } catch (error) {
        } finally {
          set({ isCommentsLoading: false });
        }
      },
    }),
    {
      name: "posts-storage",
    }
  )
);
