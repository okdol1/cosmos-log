import { supabase } from '../lib/supabase';
import type { BlogPost, Category } from '../types/blog';
import type { Book, BookStatus } from '../types/book';
import type { YoutubePlaylist } from '../types/youtube';

// Map database row to BlogPost type
const mapPost = (row: any): BlogPost => ({
  id: row.id,
  title: row.title,
  excerpt: row.excerpt,
  content: row.content,
  date: new Date(row.created_at).toISOString().split('T')[0],
  category: row.category as Category,
  tags: row.tags || [],
  thumbnailUrl: row.thumbnail_url,
});

export const getPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data.map(mapPost);
};

export const getPostById = async (id: string): Promise<BlogPost | undefined> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return undefined;
  }

  return mapPost(data);
};

export interface CreatePostData {
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  tags: string[];
  thumbnail_url?: string;
  read_time: number;
}

export const createPost = async (postData: CreatePostData) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([postData])
    .select()
    .single();

  if (error) throw error;
  return mapPost(data);
};

export const updatePost = async (id: string, postData: Partial<CreatePostData>) => {
  const { data, error } = await supabase
    .from('posts')
    .update(postData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapPost(data);
};

export const uploadImage = async (file: File): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from('blog-assets')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  const { data } = supabase.storage
    .from('blog-assets')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

// Books API
const mapBook = (row: any): Book => ({
  id: row.id,
  title: row.title,
  author: row.author,
  status: (row.status as BookStatus) || "completed",
  content: row.content,
  thumbnailUrl: row.thumbnail_url,
  createdAt: new Date(row.created_at).toISOString().split('T')[0],
});

export const getBooks = async (): Promise<Book[]> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching books:', error);
    return [];
  }

  return data.map(mapBook);
};

export const getBookById = async (id: string): Promise<Book | undefined> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching book:', error);
    return undefined;
  }

  return mapBook(data);
};

// YouTube Playlists API
const mapYoutubePlaylist = (row: any): YoutubePlaylist => ({
  id: row.id,
  title: row.title,
  playlistUrl: row.playlist_url,
  createdAt: new Date(row.created_at).toISOString().split('T')[0],
});

export const getYoutubePlaylists = async (): Promise<YoutubePlaylist[]> => {
  const { data, error } = await supabase
    .from('youtube_playlists')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching youtube playlists:', error);
    return [];
  }

  return data.map(mapYoutubePlaylist);
};
