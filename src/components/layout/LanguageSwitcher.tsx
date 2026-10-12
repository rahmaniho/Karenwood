'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function LanguageSwitcher() {
  const { locale, toggleLocale } = useTranslation();

  return (
    <button
      onClick={toggleLocale}
      type="button"
      aria-label={locale === 'fa' ? 'Switch language to English' : 'تغییر زبان به فارسی'}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-walnut/20 bg-cream/70 px-3 text-xs font-semibold text-walnut transition-all hover:border-bronze hover:bg-bronze/15 dark:border-cream/20 dark:bg-walnut-800/70 dark:text-cream"
    >
      <Globe className="h-3.5 w-3.5 text-bronze" />
      <span>{locale === 'fa' ? 'EN' : 'فا'}</span>
    </button>
  );
}
