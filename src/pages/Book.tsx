import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { fetchBooks } from "../services/dataService";
import type { Book } from "../types/book";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";

const BookPage: React.FC = () => {
  const { t } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const data = await fetchBooks();
      setBooks(data);
      setLoading(false);
    };
    loadBooks();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-12">
      {/* Books List */}
      <div className="max-w-4xl mx-auto space-y-4">
        <AnimatePresence mode="popLayout">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </AnimatePresence>
      </div>

      {books.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-space-300">
          {t("common.notFound")}
        </div>
      )}
    </div>
  );
};

export default BookPage;
