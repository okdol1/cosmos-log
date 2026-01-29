import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Moon, Sun, Languages, Github, Linkedin, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../store/useStore";

const Layout: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage, setTheme } = useStore();
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleLanguage = () => {
    setLanguage(language === "ko" ? "en" : "ko");
  };

  const navLinks = [
    { to: "/", label: t("nav.home"), active: location.pathname === "/" },
    { to: "/blog", label: t("nav.blog"), active: location.pathname === "/blog" || location.pathname.startsWith("/post/") },
    { to: "/about", label: t("nav.about"), active: location.pathname === "/about" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-space-900 text-slate-900 dark:text-space-100 transition-colors duration-300 relative overflow-hidden flex flex-col">
      {/* Background Stars Effect (CSS based) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-10 left-10 animate-twinkle opacity-70"></div>
        <div className="absolute w-[3px] h-[3px] bg-blue-300 rounded-full top-1/4 left-1/3 animate-twinkle opacity-50 delay-75"></div>
        <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-1/2 left-3/4 animate-twinkle opacity-80 delay-150"></div>
        <div className="absolute w-[1px] h-[1px] bg-white rounded-full top-3/4 left-1/4 animate-twinkle opacity-60 delay-300"></div>
        <div className="absolute w-[2px] h-[2px] bg-purple-300 rounded-full top-10 right-20 animate-twinkle opacity-40 delay-500"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-space-900/70 border-b border-gray-200 dark:border-space-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium hover:text-space-500 transition-colors ${
                  link.active ? "text-space-500" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-space-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Desktop Settings */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-space-800 transition-colors"
              aria-label="Toggle Language"
            >
              <Languages size={18} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-space-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Settings (visible on mobile) */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-space-800 transition-colors"
              aria-label="Toggle Language"
            >
              <Languages size={18} />
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

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-space-900 z-50 md:hidden shadow-xl"
            >
              <div className="flex items-center justify-end p-4">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-space-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      link.active
                        ? "bg-space-50 dark:bg-space-800 text-space-500"
                        : "hover:bg-gray-50 dark:hover:bg-space-800/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-space-800 py-8 relative z-10 bg-white/50 dark:bg-space-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-space-300">
            © 2026 eunbin.space
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
