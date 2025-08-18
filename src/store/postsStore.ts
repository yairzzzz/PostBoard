import { create } from "zustand";

import { persist } from "zustand/middleware";

import { api } from "../lib/axios";
import { toast } from "react-toastify";
import type { Comment, Post, PostsState } from "../types/types";

export const postsStore = create<PostsState>()(
  persist(
    (set, get) => ({
      posts: [],
      localPosts: [],
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

          const locals = get().localPosts;
          set({ posts: [...locals, ...data] });
        } catch (error: unknown) {
          console.error(error);
          toast.error("Could not fetch posts");
        } finally {
          set({ isPostsLoading: false });
        }
      },

      addLocalPost: (title: string, body: string) => {
        const post: Post = {
          id: `local_${Date.now()}`,
          title,
          body,
        };
        set((s) => {
          const localPosts = [post, ...s.localPosts];
          const posts = [post, ...s.posts];
          return { localPosts, posts };
        });
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
      partialize: (s) => ({ localPosts: s.localPosts }),
    }
  )
);
