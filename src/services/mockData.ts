import type { BlogPost } from "../types/blog";
import type { Book } from "../types/book";
import type { YoutubePlaylist } from "../types/youtube";

const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Title",
    excerpt: "excerpt",
    content: `# Content H1

내용 입력

## 코드 입력

\`\`\`tsx
const [state, setState] = useState(0);
\`\`\`

> [!NOTE]
> 노트
    `,
    date: "2026-01-08",
    category: "DEV",
    tags: ["Frontend"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Title",
    excerpt: "excerpt",
    content: `# Dev Memoir
    `,
    date: "2025-12-25",
    category: "ESSAY",
    tags: ["Memoir", "Coding"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516339901601-2e1b87b0914b?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Title",
    excerpt: "excerpt",
    content: `# 코스모스
    `,
    date: "2025-11-11",
    category: "BOOK",
    tags: ["Book", "Carl Sagan", "Cosmos"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1080&auto=format&fit=crop",
  },
];

// Simulate AWS S3 fetch latency
export const fetchPosts = async (): Promise<BlogPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_POSTS);
    }, 800); // 0.8s artificial delay
  });
};

export const fetchPostById = async (
  id: string,
): Promise<BlogPost | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = MOCK_POSTS.find((p) => p.id === id);
      resolve(post);
    }, 500);
  });
};

// Mock Books
const MOCK_BOOKS: Book[] = [
  {
    id: "b1",
    title: "코스모스",
    author: "칼 세이건",
    status: "reading",
    content:
      "우주의 광활함과 인류의 작은 존재를 동시에 느끼게 해주는 책. 과학적 사실을 시적으로 풀어내는 칼 세이건의 문체가 인상적이다.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1080&auto=format&fit=crop",
    createdAt: "2026-01-15",
  },
  {
    id: "b2",
    title: "사피엔스",
    author: "유발 하라리",
    status: "completed",
    content:
      "인류의 역사를 거시적 관점에서 바라본 책. 인지혁명, 농업혁명, 과학혁명을 통해 호모 사피엔스가 어떻게 세상을 지배하게 되었는지 탐구한다.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1080&auto=format&fit=crop",
    createdAt: "2026-01-10",
  },
];

export const fetchBooks = async (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_BOOKS);
    }, 800);
  });
};

export const fetchBookById = async (id: string): Promise<Book | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const book = MOCK_BOOKS.find((b) => b.id === id);
      resolve(book);
    }, 500);
  });
};

// Mock YouTube Playlists
const MOCK_YOUTUBE_PLAYLISTS: YoutubePlaylist[] = [
  {
    id: "p1",
    title: "202601",
    playlistUrl:
      "https://youtube.com/playlist?list=PLlS2SFohXFotXX3qKzVFSGDEbDdPXRBt3",
    createdAt: "2026-01-20",
  },
];

export const fetchYoutubePlaylists = async (): Promise<YoutubePlaylist[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_YOUTUBE_PLAYLISTS);
    }, 800);
  });
};
