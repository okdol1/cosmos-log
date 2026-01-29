import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { fetchYoutubePlaylists } from "../services/dataService";
import type { YoutubePlaylist } from "../types/youtube";
import YoutubeCard from "../components/YoutubeCard";
import Loading from "../components/Loading";

const Playlist: React.FC = () => {
  const { t } = useTranslation();
  const [playlists, setPlaylists] = useState<YoutubePlaylist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaylists = async () => {
      setLoading(true);
      const data = await fetchYoutubePlaylists();
      setPlaylists(data);
      setLoading(false);
    };
    loadPlaylists();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-2">
      {playlists.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-space-300">
          {t("common.notFound")}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {playlists.map((playlist) => (
            <YoutubeCard key={playlist.id} playlist={playlist} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Playlist;
