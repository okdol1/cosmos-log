import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-0">
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-space-800">
            <img
              src="https://pbqumsltaplaywsnbfcg.supabase.co/storage/v1/object/public/blog-assets/IMG_5751.jpeg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bio & Info */}
        <div className="flex-grow space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("about.name")}
            </h1>
            <p className="text-sm font-medium uppercase tracking-widest text-space-500 dark:text-space-400">
              {t("about.role")}
            </p>
          </div>
          
          <div className="prose prose-sm dark:prose-invert text-gray-600 dark:text-space-200 leading-relaxed">
            <p>{t("about.bio")}</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-space-800">
            <a
              href="https://github.com/okdol1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-space-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/eunbinyeon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-space-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:okdol0611@gmail.com"
              className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-space-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Mail size={18} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
