'use client';

import { create } from 'zustand';
import fa from '@/locales/fa.json';
import en from '@/locales/en.json';

export type Locale = 'fa' | 'en';
export type ThemeMode = 'light' | 'dark';

interface AppState {
  locale: Locale;
  theme: ThemeMode;
  hasSeenLoader: boolean;
  consultationModalOpen: boolean;
  selectedSubsidiary: string;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setHasSeenLoader: (seen: boolean) => void;
  openConsultationModal: (subsidiary?: string) => void;
  closeConsultationModal: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  locale: 'fa',
  theme: 'light',
  hasSeenLoader: false,
  consultationModalOpen: false,
  selectedSubsidiary: '',

  setLocale: (locale) => {
    set({ locale });
    if (typeof window !== 'undefined') {
      localStorage.setItem('karenwood-locale', locale);
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
    }
  },

  toggleLocale: () => {
    const next: Locale = get().locale === 'fa' ? 'en' : 'fa';
    get().setLocale(next);
  },

  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== 'undefined') {
      localStorage.setItem('karenwood-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },

  toggleTheme: () => {
    const next: ThemeMode = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(next);
  },

  setHasSeenLoader: (seen) => set({ hasSeenLoader: seen }),

  openConsultationModal: (subsidiary = '') =>
    set({ consultationModalOpen: true, selectedSubsidiary: subsidiary }),

  closeConsultationModal: () => set({ consultationModalOpen: false }),
}));

export const dictionaries = { fa, en };
