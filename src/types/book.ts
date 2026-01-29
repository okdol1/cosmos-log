export type BookStatus = "reading" | "completed";

export interface Book {
  id: string;
  title: string;
  author?: string;
  status: BookStatus;
  content: string;
  thumbnailUrl?: string;
  createdAt: string;
}
