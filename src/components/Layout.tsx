import { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Moon, Sun, Languages, Github, Linkedin } from "lucide-react";
import { useStore } from "../store/useStore";

const Layout: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage, setTheme } = useStore();
  const { t } = useTranslation();
  const location = useLocation();

  // Initialize theme on mount
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  const toggleLanguage = () => {
    setLanguage(language === "ko" ? "en" : "ko");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-space-900 text-slate-900 dark:text-space-100 transition-colors duration-300 relative overflow-hidden flex flex-col">
      {/* Background Stars Effect (CSS based) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-10 left-10 animate-twinkle opacity-70"></div>
        <div className="absolute w-[3px] h-[3px] bg-blue-300 rounded-full top-1/4 left-1/3 animate-twinkle opacity-50 delay-75"></div>
        <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-1/2 left-3/4 animate-twinkle opacity-80 delay-150"></div>
        <div className="absolute w-[1px] h-[1px] bg-white rounded-full top-3/4 left-1/4 animate-twinkle opacity-60 delay-300"></div>
        <div className="absolute w-[2px] h-[2px] bg-purple-300 rounded-full top-10 right-20 animate-twinkle opacity-40 delay-500"></div>
        {/* More stars could be generated programmatically */}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-space-900/70 border-b border-gray-200 dark:border-space-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className={`text-sm font-medium hover:text-space-500 transition-colors ${
                location.pathname === "/" ? "text-space-500" : ""
              }`}
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium hover:text-space-500 transition-colors ${
                location.pathname === "/about" ? "text-space-500" : ""
              }`}
            >
              {t("nav.about")}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-space-800 transition-colors"
              aria-label="Toggle Language"
            >
              <Languages size={18} />
              <span className="sr-only">Toggle Language</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-space-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-space-800 py-8 relative z-10 bg-white/50 dark:bg-space-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-space-300">
            © 2026 Cosmos Log
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/okdol1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-space-500 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/eunbinyeon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-space-500 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
