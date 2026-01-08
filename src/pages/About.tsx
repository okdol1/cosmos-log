import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center text-center space-y-8">
        {/* Profile Image with float animation */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-48 h-48"
        >
          <div className="absolute inset-0 bg-space-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <img
            src="https://pbqumsltaplaywsnbfcg.supabase.co/storage/v1/object/public/blog-assets/IMG_5751.jpeg"
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-white dark:border-space-800 shadow-2xl relative z-10"
          />
          <div className="absolute -bottom-2 -right-2 bg-white dark:bg-space-800 p-2 rounded-full shadow-lg z-20">
            <span className="text-2xl">👨‍🚀</span>
          </div>
        </motion.div>

        {/* Bio */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("about.name")}
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-200 dark:border-space-800 pb-2">
            {t("about.role")}
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto">
            {t("about.bio")}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 mt-8">
          <a
            href="https://github.com/okdol1"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-100 dark:bg-space-800 rounded-full text-gray-700 dark:text-space-300 hover:bg-space-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/eunbinyeon"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-100 dark:bg-space-800 rounded-full text-gray-700 dark:text-space-300 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:okdol0611@gmail.com"
            className="p-3 bg-gray-100 dark:bg-space-800 rounded-full text-gray-700 dark:text-space-300 hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
