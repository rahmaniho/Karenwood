'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/hooks/useTranslation';

export function ThemeToggle() {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const { locale } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={
        locale === 'fa'
          ? theme === 'light'
            ? 'فعال‌سازی حالت تیره'
            : 'فعال‌سازی حالت روشن'
          : theme === 'light'
          ? 'Switch to dark mode'
          : 'Switch to light mode'
      }
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-walnut/20 bg-cream/70 text-walnut transition-all hover:border-bronze hover:bg-bronze/15 dark:border-cream/20 dark:bg-walnut-800/70 dark:text-cream"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 text-walnut" />
      ) : (
        <Sun className="h-4 w-4 text-bronze" />
      )}
    </button>
  );
}
