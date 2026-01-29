import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Share2, ArrowLeft } from "lucide-react";
import { fetchBookById } from "../services/dataService";
import type { Book } from "../types/book";
import Loading from "../components/Loading";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [showShareToast, setShowShareToast] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      if (id) {
        setLoading(true);
        const data = await fetchBookById(id);
        setBook(data);
        setLoading(false);
      }
    };
    loadBook();
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
    return <Loading />;
  }

  if (!book) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">{t("common.notFound")}</h2>
        <button
          onClick={() => navigate("/book")}
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
        <title>{book.title} | eunbin.space</title>
        <meta name="description" content={book.content.slice(0, 160)} />
        <meta property="og:title" content={book.title} />
        <meta property="og:description" content={book.content.slice(0, 160)} />
        {book.thumbnailUrl && (
          <meta property="og:image" content={book.thumbnailUrl} />
        )}
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
          <div className="flex items-center gap-3 text-sm font-medium tracking-wider">
            <time className="text-gray-500 dark:text-space-400">
              {book.createdAt}
            </time>
            {book.status === "reading" && (
              <span className="px-2 py-0.5 text-xs font-medium text-gray-500 dark:text-space-400 border border-gray-200 dark:border-space-700 rounded-full">
                {t("book.status.reading")}
              </span>
            )}
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-space-800 text-gray-600 dark:text-space-300 hover:bg-space-100 dark:hover:bg-space-700 hover:text-space-500 transition-colors text-xs font-medium"
          >
            <Share2 size={16} />
            {t("common.share")}
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
          {book.title}
        </h1>

        {book.author && (
          <p className="text-lg text-gray-500 dark:text-space-400">
            {book.author}
          </p>
        )}
      </header>

      {/* Thumbnail */}
      {book.thumbnailUrl && (
        <div className="mb-12 sm:mb-16 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-space-800 aspect-video relative bg-gray-50 dark:bg-space-900">
          <img
            src={book.thumbnailUrl}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-base dark:prose-invert max-w-none prose-p:text-[15px] prose-p:leading-7 prose-p:text-gray-600 dark:prose-p:text-space-200">
        <p className="whitespace-pre-wrap">{book.content}</p>
      </div>

      {/* Toast Notification */}
      {showShareToast && (
        <div className="fixed bottom-28 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeUp">
          {t("common.shareSuccess")}
        </div>
      )}
    </article>
  );
};

export default BookDetail;
