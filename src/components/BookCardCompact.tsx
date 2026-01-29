import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { Book } from "../types/book";

interface BookCardCompactProps {
  book: Book;
}

const BookCardCompact: React.FC<BookCardCompactProps> = ({ book }) => {
  const { t } = useTranslation();

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link
        to={`/book/${book.id}`}
        className="block py-3 hover:bg-gray-50 dark:hover:bg-space-800/30 rounded-lg px-3 -mx-3 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex-grow min-w-0">
            <time className="text-xs text-gray-500 dark:text-space-400 mb-1 block">
              {book.createdAt}
            </time>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-space-500 dark:group-hover:text-space-400 transition-colors truncate">
                {book.title}
              </h3>
              {book.status === "reading" && (
                <span className="flex-shrink-0 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:text-space-400 border border-gray-200 dark:border-space-700 rounded">
                  {t("book.status.reading")}
                </span>
              )}
            </div>
            {book.author && (
              <p className="text-xs text-gray-500 dark:text-space-400 mt-0.5 truncate">
                {book.author}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BookCardCompact;
