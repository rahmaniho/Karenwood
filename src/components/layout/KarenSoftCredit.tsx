'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { withBasePath } from '@/lib/utils';

const KARENSOFT_URL = 'https://www.karen-soft.ir';
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Animated "Designed & Developed by KarenSoft | کارن سافت" credit.
 *
 * Uses the original KarenSoft logo artwork (KS mark + "کارن سافت" + "Karensoft"
 * wordmarks, cut from rahmaniho/karen-soft/public/images/logo.png) on a white
 * card so the brand colours render exactly as designed.
 *
 * Animation:
 *  - rotating blue/cyan gradient border around the card
 *  - KS mark spins in, floats, and emits pixel particles (echoing the logo)
 *  - "کارن سافت" is revealed right→left, "Karensoft" left→right
 *  - a light sweep passes over the card periodically and on hover
 *  - all motion is disabled for users with prefers-reduced-motion
 */
export function KarenSoftCredit() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.18, delayChildren: 0.15 } },
  };

  const fadeUp: Variants = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  const markIn: Variants = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, scale: 0.3, rotate: -180 },
        visible: {
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: { type: 'spring', stiffness: 180, damping: 13 },
        },
        hover: { scale: 1.1, rotate: -6, transition: { type: 'spring', stiffness: 300, damping: 12 } },
      };

  const revealFrom = (side: 'left' | 'right'): Variants =>
    reduceMotion
      ? {}
      : {
          hidden: {
            opacity: 0,
            clipPath: side === 'right' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
          },
          visible: {
            opacity: 1,
            clipPath: 'inset(0 0% 0 0%)',
            transition: { duration: 0.9, ease: EASE },
          },
        };

  const pixels = [
    { x: -20, y: 6, s: 4, d: 0 },
    { x: -15, y: 12, s: 3, d: 0.5 },
    { x: -24, y: 14, s: 3, d: 1 },
    { x: -12, y: 18, s: 2.5, d: 1.5 },
  ];

  return (
    <motion.a
      href={KARENSOFT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.footer.designedBy} کارن سافت | KarenSoft — www.karen-soft.ir`}
      title="کارن سافت | KarenSoft — www.karen-soft.ir"
      initial="hidden"
      whileInView="visible"
      whileHover={reduceMotion ? undefined : 'hover'}
      viewport={{ once: true, amount: 0.5 }}
      variants={container}
      className="ks-credit group inline-flex flex-col items-center gap-2 sm:flex-row sm:gap-3"
    >
      <motion.span
        variants={fadeUp}
        className="text-[11px] font-medium tracking-wide text-cream/60 transition-colors duration-300 group-hover:text-cream/90"
      >
        {t.footer.designedBy}
      </motion.span>

      {/* Card with rotating gradient border */}
      <motion.span
        variants={fadeUp}
        className="relative inline-flex overflow-hidden rounded-2xl p-[1.5px] shadow-[0_0_0_0_rgba(14,165,233,0)] transition-shadow duration-500 group-hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.55)]"
      >
        <span aria-hidden="true" className="ks-ring pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2" />

        <span
          dir="ltr"
          className="relative flex items-center gap-2.5 overflow-hidden rounded-[14px] bg-white px-3 py-1.5"
        >
          {/* Light sweep */}
          <span
            aria-hidden="true"
            className="ks-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-sky-200/70 to-transparent"
          />

          {/* KS mark */}
          <motion.span variants={markIn} className="relative block h-9 w-9 shrink-0">
            {!reduceMotion &&
              pixels.map((p, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  className="absolute rounded-[1px] bg-blue-600"
                  style={{ width: p.s, height: p.s, left: '50%', top: '50%' }}
                  initial={{ x: p.x, y: p.y, opacity: 0 }}
                  animate={{ x: [p.x, p.x - 7, p.x], y: [p.y, p.y + 2, p.y], opacity: [0, 0.85, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: p.d, ease: 'easeInOut' }}
                />
              ))}
            <img
              src={withBasePath('/images/karensoft/mark.png')}
              alt=""
              width={256}
              height={256}
              loading="lazy"
              className={`relative h-full w-full object-contain ${reduceMotion ? '' : 'ks-float'}`}
            />
          </motion.span>

          <span aria-hidden="true" className="h-8 w-px bg-gradient-to-b from-transparent via-sky-300 to-transparent" />

          {/* Wordmarks from the original logo */}
          <span className="flex flex-col items-center gap-[3px]">
            <motion.img
              variants={revealFrom('right')}
              src={withBasePath('/images/karensoft/wordmark-fa.png')}
              alt="کارن سافت"
              width={383}
              height={96}
              loading="lazy"
              className="h-[22px] w-auto"
            />
            <motion.img
              variants={revealFrom('left')}
              src={withBasePath('/images/karensoft/wordmark-en.png')}
              alt="KarenSoft"
              width={410}
              height={48}
              loading="lazy"
              className="h-[10px] w-auto"
            />
          </span>
        </span>
      </motion.span>
    </motion.a>
  );
}
