import type { BlogPost } from "../types/blog";

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
  id: string
): Promise<BlogPost | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = MOCK_POSTS.find((p) => p.id === id);
      resolve(post);
    }, 500);
  });
};
