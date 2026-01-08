import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "../types/blog";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white dark:bg-space-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-space-500/20 transition-all duration-300 border border-gray-100 dark:border-space-700 flex flex-col h-full"
    >
      <Link
        to={`/post/${post.id}`}
        className="block h-48 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img
          src={post.thumbnailUrl}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 text-xs font-bold text-white bg-space-500/80 backdrop-blur-sm rounded-full uppercase tracking-wider">
            {post.category}
          </span>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-space-300 mb-3">
          <time>{post.date}</time>
        </div>

        <Link
          to={`/post/${post.id}`}
          className="block group-hover:text-space-500 transition-colors"
        >
          <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-space-500 dark:text-space-300 bg-space-100 dark:bg-space-900/50 px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
          <Link
            to={`/post/${post.id}`}
            className="p-2 rounded-full bg-gray-50 dark:bg-space-900 text-gray-600 dark:text-space-300 group-hover:bg-space-500 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1"
          >
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
