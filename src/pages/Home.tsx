import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";
import { fetchPosts } from "../services/mockData";
import type { BlogPost, Category } from "../types/blog";
import BlogCard from "../components/BlogCard";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState<Category | "ALL">("ALL");
  const [loading, setLoading] = useState(true);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  // Easter Egg Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          setShowEasterEgg(true);
          setKonamiIndex(0);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex]);

  const filteredPosts =
    filter === "ALL" ? posts : posts.filter((post) => post.category === filter);

  const categories: { key: Category | "ALL"; label: string }[] = [
    { key: "ALL", label: t("filter.all") },
    { key: "DEV", label: t("filter.dev") },
    { key: "ESSAY", label: t("filter.essay") },
    { key: "BOOK", label: t("filter.book") },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Rocket size={48} className="text-space-500" />
        </motion.div>
        <p className="mt-4 text-space-500 font-mono animate-pulse">
          {t("common.loading")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat.key
                ? "bg-space-500 text-white shadow-lg shadow-space-500/30"
                : "bg-white dark:bg-space-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-space-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </AnimatePresence>
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-space-300">
          {t("common.notFound")}
        </div>
      )}

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowEasterEgg(false)}
          >
            <div className="bg-space-900 border border-space-500 p-8 rounded-2xl text-center max-w-sm w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-space-500/10 animate-pulse" />
              <h3 className="text-2xl font-bold text-space-100 mb-4 relative z-10">
                {t("easterEgg.found")}
              </h3>
              <div className="text-6xl mb-4 animate-bounce">🛸</div>
              <p className="text-space-300 relative z-10">
                Konami Code Accepted!
                <br />
                Admin Access Granted... (Just Kidding)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
