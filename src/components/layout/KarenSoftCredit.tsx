'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { withBasePath } from '@/lib/utils';

const KARENSOFT_URL = 'https://www.karen-soft.ir';
const EASE = [0.22, 1, 0.36, 1] as const;

const MARK = '/images/karensoft/mark.png';
const WORD_FA = '/images/karensoft/wordmark-fa.png';
const WORD_EN = '/images/karensoft/wordmark-en.png';

/**
 * A light band that sweeps continuously across a wordmark image.
 * The band is masked by the image itself, so only the letters light up.
 */
function TextShine({ src, delay }: { src: string; delay: string }) {
  const url = `url(${withBasePath(src)})`;
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
    >
      <span className="ks-text-shine absolute inset-y-0 left-0 w-1/2" style={{ animationDelay: delay }} />
    </span>
  );
}

/**
 * Animated "Designed & Developed by KarenSoft | کارن سافت" footer credit.
 *
 * Around the logo : rotating gradient ring, an orbiting glow dot, pulsing
 *                   ripples, floating mark, pixel particles; full spin on hover.
 * On the text     : label words rise in with a flowing cream→cyan gradient;
 *                   wordmarks are revealed (fa: right→left, en: left→right) and
 *                   then a cyan light sweeps across the letters continuously.
 * Card            : rotating gradient border + periodic light sweep.
 * Everything is disabled for prefers-reduced-motion.
 */
export function KarenSoftCredit() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const motionOn = !reduceMotion;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: motionOn ? 0.12 : 0, delayChildren: 0.1 } },
  };

  const wordUp: Variants = motionOn
    ? {
        hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE } },
      }
    : {};

  const cardIn: Variants = motionOn
    ? {
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
      }
    : {};

  const markIn: Variants = motionOn
    ? {
        hidden: { opacity: 0, scale: 0.3, rotate: -180 },
        visible: {
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: { type: 'spring', stiffness: 170, damping: 13, delay: 0.2 },
        },
        hover: { rotate: 360, scale: 1.08, transition: { duration: 0.8, ease: EASE } },
      }
    : {};

  const revealFrom = (side: 'left' | 'right', delay: number): Variants =>
    motionOn
      ? {
          hidden: {
            opacity: 0,
            clipPath: side === 'right' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
          },
          visible: {
            opacity: 1,
            clipPath: 'inset(0 0% 0 0%)',
            transition: { duration: 0.9, delay, ease: EASE },
          },
        }
      : {};

  const pixels = [
    { x: -27, y: 4, s: 4, d: 0 },
    { x: -22, y: 10, s: 3, d: 0.5 },
    { x: -31, y: 12, s: 3, d: 1 },
    { x: -19, y: 16, s: 2.5, d: 1.5 },
  ];

  const labelWords = t.footer.designedBy.split(' ');

  return (
    <motion.a
      href={KARENSOFT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.footer.designedBy} کارن سافت | KarenSoft — www.karen-soft.ir`}
      title="کارن سافت | KarenSoft — www.karen-soft.ir"
      initial="hidden"
      whileInView="visible"
      whileHover={motionOn ? 'hover' : undefined}
      viewport={{ once: true, amount: 0.5 }}
      variants={container}
      className="ks-credit group inline-flex flex-col items-center gap-2 sm:flex-row sm:gap-3"
    >
      {/* Label: words rise in, then a flowing gradient runs through them */}
      <span className="inline-flex gap-1 text-xs font-semibold tracking-wide">
        {labelWords.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={wordUp}
            className="ks-label-gradient inline-block"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {word}
          </motion.span>
        ))}
      </span>

      {/* Card with rotating gradient border */}
      <motion.span
        variants={cardIn}
        className="relative inline-flex overflow-hidden rounded-2xl p-[1.5px] transition-shadow duration-500 group-hover:shadow-[0_0_30px_-4px_rgba(34,211,238,0.6)]"
      >
        <span
          aria-hidden="true"
          className="ks-ring pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2"
        />

        <span
          dir="ltr"
          className="relative flex items-center gap-3 overflow-hidden rounded-[14px] bg-white py-2 pl-2.5 pr-3.5"
        >
          {/* Card light sweep */}
          <span
            aria-hidden="true"
            className="ks-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-sky-100/80 to-transparent"
          />

          {/* ── Logo with animated surroundings ── */}
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            {motionOn && (
              <>
                {/* Pulsing ripples */}
                <span aria-hidden="true" className="ks-ripple absolute inset-1 rounded-full border border-sky-400/70" />
                <span
                  aria-hidden="true"
                  className="ks-ripple absolute inset-1 rounded-full border border-blue-500/60"
                  style={{ animationDelay: '1.2s' }}
                />
              </>
            )}

            {/* Rotating gradient ring */}
            <span aria-hidden="true" className="ks-logo-ring absolute inset-0 rounded-full" />

            {/* Orbiting glow dot */}
            {motionOn && (
              <span aria-hidden="true" className="ks-orbit absolute inset-0">
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.85)]" />
              </span>
            )}

            {/* Soft inner glow */}
            <span aria-hidden="true" className="absolute inset-[5px] rounded-full bg-gradient-to-br from-sky-50 to-white" />

            {/* KS mark */}
            <motion.span variants={markIn} className="relative block h-9 w-9">
              {motionOn &&
                pixels.map((p, i) => (
                  <motion.span
                    key={i}
                    aria-hidden="true"
                    className="absolute rounded-[1px] bg-blue-600"
                    style={{ width: p.s, height: p.s, left: '50%', top: '50%' }}
                    initial={{ x: p.x, y: p.y, opacity: 0 }}
                    animate={{ x: [p.x, p.x - 6, p.x], y: [p.y, p.y + 2, p.y], opacity: [0, 0.9, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: p.d, ease: 'easeInOut' }}
                  />
                ))}
              <img
                src={withBasePath(MARK)}
                alt=""
                width={256}
                height={256}
                loading="lazy"
                className={`relative h-full w-full object-contain ${motionOn ? 'ks-float' : ''}`}
              />
            </motion.span>
          </span>

          <span aria-hidden="true" className="h-9 w-px bg-gradient-to-b from-transparent via-sky-300 to-transparent" />

          {/* ── Wordmarks: reveal, then continuous light sweep across the letters ── */}
          <span className="flex flex-col items-center gap-1">
            <motion.span variants={revealFrom('right', 0.35)} className="relative block">
              <img
                src={withBasePath(WORD_FA)}
                alt="کارن سافت"
                width={383}
                height={96}
                loading="lazy"
                className="block h-6 w-auto"
              />
              {motionOn && <TextShine src={WORD_FA} delay="1.4s" />}
            </motion.span>
            <motion.span variants={revealFrom('left', 0.55)} className="relative block">
              <img
                src={withBasePath(WORD_EN)}
                alt="KarenSoft"
                width={410}
                height={48}
                loading="lazy"
                className="block h-[11px] w-auto"
              />
              {motionOn && <TextShine src={WORD_EN} delay="1.9s" />}
            </motion.span>
          </span>
        </span>
      </motion.span>
    </motion.a>
  );
}
