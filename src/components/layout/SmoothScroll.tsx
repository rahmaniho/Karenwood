'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useAppStore, Locale, ThemeMode } from '@/lib/store';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const setLocale = useAppStore((s) => s.setLocale);
  const setTheme = useAppStore((s) => s.setTheme);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedLocale = localStorage.getItem('karenwood-locale') as Locale | null;
    if (savedLocale === 'fa' || savedLocale === 'en') {
      setLocale(savedLocale);
    } else {
      setLocale('fa');
    }

    const savedTheme = localStorage.getItem('karenwood-theme') as ThemeMode | null;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    } else {
      setTheme('light');
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [setLocale, setTheme]);

  return <>{children}</>;
}
