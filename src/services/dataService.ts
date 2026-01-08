import * as api from "./api";
import * as mock from "./mockData";

import type { BlogPost, Category } from "../types/blog";

const isSupabaseConfigured =
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

export const fetchPosts = async (): Promise<BlogPost[]> => {
  if (isSupabaseConfigured) {
    try {
      const posts = await api.getPosts();
      if (posts.length > 0) return posts;
    } catch (e) {
      console.warn(
        "Failed to fetch from Supabase, falling back to mock data",
        e
      );
    }
  }
  return mock.fetchPosts();
};

export const fetchPostById = async (
  id: string
): Promise<BlogPost | undefined> => {
  if (isSupabaseConfigured) {
    try {
      const post = await api.getPostById(id);
      if (post) return post;
    } catch (e) {
      console.warn(
        "Failed to fetch from Supabase, falling back to mock data",
        e
      );
    }
  }
  return mock.fetchPostById(id);
};

// Re-export types
export type { BlogPost, Category };
