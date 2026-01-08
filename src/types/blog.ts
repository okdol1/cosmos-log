export type Category = "DEV" | "ESSAY" | "BOOK";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  date: string;
  category: Category;
  tags: string[];
  thumbnailUrl?: string;
}
