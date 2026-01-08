import { create } from 'zustand';
import i18n from '../locales/i18n';

type Theme = 'dark' | 'light';

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const getSystemTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const useStore = create<AppState>((set) => ({
  theme: getSystemTheme(),
  toggleTheme: () => set((state: AppState) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    return { theme: newTheme };
  }),
  setTheme: (theme: Theme) => set(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    return { theme };
  }),
  language: i18n.language,
  setLanguage: (lang: string) => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  },
}));