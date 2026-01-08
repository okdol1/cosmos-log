import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async";
import { Share2, ArrowLeft, Rocket } from "lucide-react";
import { fetchPostById } from "../services/dataService";
import type { BlogPost } from "../types/blog";

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
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Rocket size={48} className="text-space-500 animate-bounce" />
        <p className="mt-4 text-space-500 font-mono">{t("common.loading")}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">{t("common.notFound")}</h2>
        <button
          onClick={() => navigate("/")}
          className="text-space-500 hover:underline"
        >
          {t("common.back")}
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto animate-fadeIn">
      <Helmet>
        <title>{post.title} | Cosmos Log</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.thumbnailUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Header */}
      <header className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 sm:left-auto sm:translate-x-[-400%] p-2 rounded-full hover:bg-gray-100 dark:hover:bg-space-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="px-3 py-1 text-sm font-bold text-space-500 bg-space-100 dark:bg-space-900/50 rounded-full uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>

        <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-space-300">
          <time>{post.date}</time>
        </div>
      </header>

      {/* Thumbnail */}
      {post.thumbnailUrl && (
        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl aspect-video relative">
          <div className="absolute inset-0 bg-space-900/10 dark:bg-space-900/30" />
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-space-500 hover:prose-a:text-space-300 prose-img:rounded-xl">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Custom renderer for blockquotes to look like warnings/notes
            blockquote: ({ node, ...props }: any) => (
              <blockquote
                className="border-l-4 border-space-500 bg-gray-50 dark:bg-space-800/50 p-4 rounded-r-lg italic"
                {...props}
              />
            ),
            // Namuwiki style footnotes styling
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
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Share Section */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-space-800 flex justify-between items-center">
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm text-gray-500 dark:text-space-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-space-500 text-white hover:bg-space-600 transition-colors shadow-lg hover:shadow-space-500/30"
        >
          <Share2 size={18} />
          {t("common.share")}
        </button>
      </div>

      {/* Toast Notification */}
      {showShareToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeUp">
          {t("common.shareSuccess")}
        </div>
      )}
    </article>
  );
};

export default PostDetail;
