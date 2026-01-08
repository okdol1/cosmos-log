import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "../types/blog";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link
        to={`/post/${post.id}`}
        className="block p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-space-800/50 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {post.thumbnailUrl && (
            <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden hidden sm:block">
              <img
                src={post.thumbnailUrl}
                alt={post.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          
          <div className="flex-grow space-y-3">
            <div className="flex items-center gap-3 text-xs font-medium tracking-wider uppercase">
              <span className="text-space-500 dark:text-space-400">
                {post.category}
              </span>
              <span className="text-gray-400 dark:text-space-600">•</span>
              <time className="text-gray-500 dark:text-space-400">
                {post.date}
              </time>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-space-500 dark:group-hover:text-space-400 transition-colors duration-300">
              {post.title}
            </h2>

            <p className="text-gray-600 dark:text-space-300 line-clamp-2 text-sm leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-gray-500 dark:text-space-400 bg-gray-100 dark:bg-space-800 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
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

export default BlogCard;
