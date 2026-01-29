import * as api from "./api";
import * as mock from "./mockData";

import type { BlogPost, Category } from "../types/blog";
import type { Book } from "../types/book";
import type { YoutubePlaylist } from "../types/youtube";

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
        e,
      );
    }
  }
  return mock.fetchPosts();
};

export const fetchPostById = async (
  id: string,
): Promise<BlogPost | undefined> => {
  if (isSupabaseConfigured) {
    try {
      const post = await api.getPostById(id);
      if (post) return post;
    } catch (e) {
      console.warn(
        "Failed to fetch from Supabase, falling back to mock data",
        e,
      );
    }
  }
  return mock.fetchPostById(id);
};

// Books
export const fetchBooks = async (): Promise<Book[]> => {
  if (isSupabaseConfigured) {
    try {
      const books = await api.getBooks();
      if (books.length > 0) return books;
    } catch (e) {
      console.warn(
        "Failed to fetch books from Supabase, falling back to mock data",
        e,
      );
    }
  }
  return mock.fetchBooks();
};

export const fetchBookById = async (id: string): Promise<Book | undefined> => {
  if (isSupabaseConfigured) {
    try {
      const book = await api.getBookById(id);
      if (book) return book;
    } catch (e) {
      console.warn(
        "Failed to fetch book from Supabase, falling back to mock data",
        e,
      );
    }
  }
  return mock.fetchBookById(id);
};

// YouTube Playlists
export const fetchYoutubePlaylists = async (): Promise<YoutubePlaylist[]> => {
  if (isSupabaseConfigured) {
    try {
      const playlists = await api.getYoutubePlaylists();
      if (playlists.length > 0) return playlists;
    } catch (e) {
      console.warn(
        "Failed to fetch youtube playlists from Supabase, falling back to mock data",
        e,
      );
    }
  }
  return mock.fetchYoutubePlaylists();
};

// Re-export types
export type { BlogPost, Category, Book, YoutubePlaylist };
