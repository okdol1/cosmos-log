import { motion } from "framer-motion";
import { ExternalLink, ListVideo } from "lucide-react";
import type { YoutubePlaylist } from "../types/youtube";

interface YoutubeCardCompactProps {
  playlist: YoutubePlaylist;
}

const YoutubeCardCompact: React.FC<YoutubeCardCompactProps> = ({ playlist }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <a
        href={playlist.playlistUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 py-3 hover:bg-gray-50 dark:hover:bg-space-800/30 rounded-lg px-3 -mx-3 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <ListVideo
            size={16}
            className="flex-shrink-0 text-gray-400 dark:text-space-500"
          />
          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-space-500 dark:group-hover:text-space-400 transition-colors truncate text-sm">
            {playlist.title}
          </h3>
        </div>
        <ExternalLink
          size={12}
          className="flex-shrink-0 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </a>
    </motion.article>
  );
};

export default YoutubeCardCompact;
