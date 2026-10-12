'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { withBasePath } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

export function LoadingScreen() {
  const { hasSeenLoader, setHasSeenLoader } = useAppStore();
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const alreadySeen = sessionStorage.getItem('karenwood-loader-shown');
    if (alreadySeen || hasSeenLoader) {
      setHasSeenLoader(true);
      return;
    }
    setVisible(true);
    const timer = setTimeout(
      () => {
        sessionStorage.setItem('karenwood-loader-shown', 'true');
        setHasSeenLoader(true);
        setVisible(false);
      },
      reduceMotion ? 700 : 2000
    );

    return () => clearTimeout(timer);
  }, [hasSeenLoader, setHasSeenLoader, reduceMotion]);

  const markSrc = withBasePath('/brand/karenwood-mark.png');

  // Reveal-from-centre used for the wordmark lines.
  const reveal = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { clipPath: 'inset(0 50% 0 50%)', opacity: 0 },
          animate: { clipPath: 'inset(0 0% 0 0%)', opacity: 1 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-cream text-walnut"
          role="status"
          aria-label="Loading KARENWOOD — هلدینگ کارن چوب"
        >
          {/* Soft radial light behind the logo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 42%, rgba(255,255,255,0.95) 0%, rgba(245,241,234,0) 55%)',
            }}
          />

          <div className="relative flex flex-col items-center">
            {/* Monogram: rises in, then a light sweep passes across the wood */}
            <motion.div
              className="relative h-40 w-[130px] sm:h-48 sm:w-[156px]"
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.88, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <img
                src={markSrc}
                alt=""
                width={260}
                height={320}
                className="h-full w-full object-contain drop-shadow-[0_18px_30px_rgba(59,42,30,0.22)]"
              />
              {!reduceMotion && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{
                    WebkitMaskImage: `url(${markSrc})`,
                    maskImage: `url(${markSrc})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                  }}
                >
                  <motion.span
                    className="absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    initial={{ left: '-60%' }}
                    animate={{ left: '120%' }}
                    transition={{ duration: 1.1, delay: 0.75, ease: 'easeInOut' }}
                  />
                </span>
              )}
            </motion.div>

            {/* KARENWOOD */}
            <motion.img
              src={withBasePath('/brand/karenwood-wordmark.png')}
              alt="KARENWOOD"
              width={1124}
              height={120}
              className="mt-5 h-7 w-auto sm:h-9"
              {...reveal(0.55)}
            />

            {/* ── HOLDING ── */}
            <motion.img
              src={withBasePath('/brand/karenwood-holding.png')}
              alt="Holding"
              width={1197}
              height={40}
              className="mt-3 h-[9px] w-auto sm:h-[11px]"
              {...reveal(0.85)}
            />

            {/* هلدینگ کارن چوب */}
            <motion.img
              src={withBasePath('/brand/karenwood-fa.png')}
              alt="هلدینگ کارن چوب"
              width={514}
              height={60}
              className="mt-3 h-4 w-auto sm:h-5"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
            />
          </div>

          {/* Progress line */}
          {!reduceMotion && (
            <div className="absolute bottom-14 h-px w-40 overflow-hidden bg-walnut/10">
              <motion.div
                className="h-full origin-left bg-bronze"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
