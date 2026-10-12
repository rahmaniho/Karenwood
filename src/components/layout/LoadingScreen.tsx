'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

export function LoadingScreen() {
  const { hasSeenLoader, setHasSeenLoader } = useAppStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const alreadySeen = sessionStorage.getItem('karenwood-loader-shown');
    if (alreadySeen || hasSeenLoader) {
      setHasSeenLoader(true);
      return;
    }
    setVisible(true);
    const timer = setTimeout(() => {
      sessionStorage.setItem('karenwood-loader-shown', 'true');
      setHasSeenLoader(true);
      setVisible(false);
    }, 950);

    return () => clearTimeout(timer);
  }, [hasSeenLoader, setHasSeenLoader]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-walnut text-cream"
          aria-label="Loading Karenwood Atelier"
        >
          {/* Animated Saw Blade / Wood Grain Ring */}
          <div className="relative flex h-28 w-28 items-center justify-center">
            <motion.svg
              viewBox="0 0 120 120"
              className="h-28 w-28 text-bronze"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
              <circle
                cx="60"
                cy="60"
                r="40"
                fill="none"
                stroke="#7A8B6F"
                strokeWidth="1.2"
                strokeDasharray="12 6"
              />
              <circle
                cx="60"
                cy="60"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </motion.svg>
            <span className="absolute font-serif text-3xl font-bold tracking-widest text-cream">
              K
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 font-serif text-lg tracking-[0.35em] text-bronze"
          >
            KARENWOOD
          </motion.p>
          <p className="mt-1 text-xs text-cream/70">هلدینگ صنایع چوب لوکس کارن‌وود</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
