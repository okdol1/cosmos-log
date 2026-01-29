import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

const getInitialLanguage = (): string => {
  return navigator.language.startsWith('ko') ? 'ko' : 'en';
};

const applyTheme = (theme: Theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: getSystemTheme(),
      toggleTheme: () => set((state: AppState) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        return { theme: newTheme };
      }),
      setTheme: (theme: Theme) => set(() => {
        applyTheme(theme);
        return { theme };
      }),
      language: getInitialLanguage(),
      setLanguage: (lang: string) => {
        i18n.changeLanguage(lang);
        set({ language: lang });
      },
    }),
    {
      name: 'eunbin-space-settings',
      onRehydrateStorage: () => (state) => {
        // Apply saved settings after rehydration
        if (state) {
          applyTheme(state.theme);
          i18n.changeLanguage(state.language);
        }
      },
    }
  )
);