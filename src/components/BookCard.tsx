import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Book } from "../types/book";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { t } = useTranslation();

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link
        to={`/book/${book.id}`}
        className="block p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-space-800/50 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {book.thumbnailUrl && (
            <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden hidden sm:block">
              <img
                src={book.thumbnailUrl}
                alt={book.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div className="flex-grow space-y-3">
            <time className="text-xs font-medium text-gray-500 dark:text-space-400">
              {book.createdAt}
            </time>

            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-space-500 dark:group-hover:text-space-400 transition-colors duration-300">
                {book.title}
              </h2>
              {book.status === "reading" && (
                <span className="px-2 py-0.5 text-xs font-medium text-gray-500 dark:text-space-400 border border-gray-200 dark:border-space-700 rounded-full">
                  {t("book.status.reading")}
                </span>
              )}
            </div>

            {book.author && (
              <p className="text-sm text-gray-500 dark:text-space-400">
                {book.author}
              </p>
            )}

            <p className="text-gray-600 dark:text-space-300 line-clamp-2 text-sm leading-relaxed">
              {book.content}
            </p>

            <div className="flex items-center justify-end pt-2">
              <div className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-space-500">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BookCard;
