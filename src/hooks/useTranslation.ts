'use client';

import { useAppStore, dictionaries, Locale } from '@/lib/store';

export function useTranslation() {
  const locale = useAppStore((state) => state.locale);
  const setLocale = useAppStore((state) => state.setLocale);
  const toggleLocale = useAppStore((state) => state.toggleLocale);
  const dir = locale === 'fa' ? 'rtl' : 'ltr';
  const isRTL = locale === 'fa';
  const t = dictionaries[locale];

  const localize = <T,>(obj: { fa: T; en: T }): T => {
    return obj[locale];
  };

  return {
    locale: locale as Locale,
    dir: dir as 'rtl' | 'ltr',
    isRTL,
    t,
    localize,
    setLocale,
    toggleLocale,
  };
}
