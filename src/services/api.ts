import { supabase } from '../lib/supabase';
import type { BlogPost, Category } from '../types/blog';

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
