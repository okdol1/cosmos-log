import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { BlogPost } from "../types/blog";

interface BlogCardCompactProps {
  post: BlogPost;
}

const BlogCardCompact: React.FC<BlogCardCompactProps> = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link
        to={`/post/${post.id}`}
        className="block py-3 hover:bg-gray-50 dark:hover:bg-space-800/30 rounded-lg px-3 -mx-3 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-space-400 mb-1">
              <span className="text-space-500 dark:text-space-400 font-medium">
                {post.category}
              </span>
              <span>•</span>
              <time>{post.date}</time>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-space-500 dark:group-hover:text-space-400 transition-colors truncate">
              {post.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCardCompact;
