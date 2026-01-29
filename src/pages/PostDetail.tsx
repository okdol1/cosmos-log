import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async";
import { Share2, ArrowLeft } from "lucide-react";
import { fetchPostById } from "../services/dataService";
import type { BlogPost } from "../types/blog";
import Loading from "../components/Loading";
import Footnote from "../components/Footnote";
import FootnoteList from "../components/FootnoteList";
import { parseFootnotes, type Footnote as FootnoteType } from "../utils/parseFootnotes";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [showShareToast, setShowShareToast] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (id) {
        setLoading(true);
        const data = await fetchPostById(id);
        setPost(data);
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  // Parse footnotes from content - must be before conditional returns
  const { content: parsedContent, footnotes } = useMemo(() => {
    if (!post) return { content: "", footnotes: [] as FootnoteType[] };
    return parseFootnotes(post.content);
  }, [post]);

  // Build footnote map for rendering - must be before conditional returns
  const footnoteMap = useMemo(() => {
    const map: Record<number, FootnoteType> = {};
    footnotes.forEach((fn) => {
      map[fn.id] = fn;
    });
    return map;
  }, [footnotes]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">{t("common.notFound")}</h2>
        <button
          onClick={() => navigate("/blog")}
          className="text-space-500 hover:underline"
        >
          {t("common.back")}
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto animate-fadeIn px-4 sm:px-0">
      <Helmet>
        <title>{post.title} | eunbin.space</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.thumbnailUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Top Navigation */}
      <nav className="mb-8 sm:mb-12">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <div className="p-1 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-space-800 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span>{t("common.back")}</span>
        </button>
      </nav>

      {/* Header */}
      <header className="mb-10 sm:mb-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 text-sm font-medium tracking-wider uppercase">
            <span className="text-space-500 dark:text-space-400">
              {post.category}
            </span>
            <span className="text-gray-300 dark:text-space-700">•</span>
            <time className="text-gray-500 dark:text-space-400">
              {post.date}
            </time>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-space-800 text-gray-600 dark:text-space-300 hover:bg-space-100 dark:hover:bg-space-700 hover:text-space-500 transition-colors text-xs font-medium"
          >
            <Share2 size={16} />
            {t("common.share")}
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-gray-500 dark:text-space-400 bg-gray-50 dark:bg-space-900/50 border border-gray-100 dark:border-space-800 px-2.5 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Thumbnail */}
      {post.thumbnailUrl && (
        <div className="mb-12 sm:mb-16 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-space-800 aspect-video relative bg-gray-50 dark:bg-space-900">
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-base dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white
        prose-p:text-[15px] prose-p:leading-7 prose-p:text-gray-600 dark:prose-p:text-space-200
        prose-a:text-space-500 hover:prose-a:text-space-600 dark:hover:prose-a:text-space-400 prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-xl prose-img:shadow-md
        prose-blockquote:border-l-2 prose-blockquote:border-space-500 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-space-800/30 prose-blockquote:not-italic prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
        prose-code:text-sm prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5 prose-code:bg-gray-100 dark:prose-code:bg-space-800 prose-code:before:content-none prose-code:after:content-none"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Custom footnotes rendering
            p: ({ node, children, ...props }: any) => {
              // Check if children contain footnote placeholders
              const processChildren = (child: any): any => {
                if (typeof child === "string") {
                  const parts = child.split(/(\{\{FN:\d+\}\})/g);
                  if (parts.length === 1) return child;

                  return parts.map((part, i) => {
                    const match = part.match(/\{\{FN:(\d+)\}\}/);
                    if (match) {
                      const fnId = parseInt(match[1], 10);
                      const fn = footnoteMap[fnId];
                      if (fn) {
                        return (
                          <Footnote
                            key={`fn-${fnId}-${i}`}
                            id={fn.id}
                            content={fn.content}
                          />
                        );
                      }
                    }
                    return part;
                  });
                }
                return child;
              };

              const processedChildren = Array.isArray(children)
                ? children.map(processChildren)
                : processChildren(children);

              return <p {...props}>{processedChildren}</p>;
            },
            // Standard markdown footnotes styling
            a: ({ node, ...props }: any) => {
              if (props.href?.startsWith("#user-content-fn")) {
                return (
                  <sup className="text-xs text-space-500 no-underline ml-0.5 hover:underline cursor-pointer select-none">
                    [{props.children}]
                  </sup>
                );
              }
              return <a {...props} />;
            },
          }}
        >
          {parsedContent}
        </ReactMarkdown>
      </div>

      {/* Footnotes List */}
      <FootnoteList footnotes={footnotes} />

      {/* Toast Notification */}
      {showShareToast && (
        <div className="fixed bottom-28 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeUp">
          {t("common.shareSuccess")}
        </div>
      )}
    </article>
  );
};

export default PostDetail;
