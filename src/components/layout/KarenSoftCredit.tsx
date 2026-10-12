'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { withBasePath } from '@/lib/utils';

const KARENSOFT_URL = 'https://www.karen-soft.ir';

/**
 * Animated "Designed & Developed by KarenSoft" credit.
 *
 * - Logo: rotating conic-gradient ring, gentle float, and pixel particles
 *   that drift in (echoing the pixel trail in the KarenSoft mark).
 * - Text: staggered reveal when scrolled into view + a continuously
 *   flowing blue/cyan gradient across the brand name.
 *
 * Persian text is revealed word-by-word (never letter-by-letter) so that
 * Arabic-script letter joining is preserved.
 */
export function KarenSoftCredit() {
  const { t, isRTL } = useTranslation();
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.06, delayChildren: 0.25 },
    },
  };

  const piece: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { type: 'spring', stiffness: 260, damping: 20 },
        },
      };

  // Primary brand name follows the active locale; the other spelling is shown as a subtitle.
  const primaryName = isRTL ? 'کارن سافت' : 'KarenSoft';
  const secondaryName = isRTL ? 'KarenSoft' : 'کارن سافت';
  const primaryPieces = isRTL ? primaryName.split(' ') : primaryName.split('');

  const pixels = [
    { x: -14, y: 10, s: 5, d: 0 },
    { x: -9, y: 18, s: 4, d: 0.4 },
    { x: -18, y: 22, s: 3, d: 0.8 },
    { x: -6, y: 26, s: 3, d: 1.2 },
  ];

  return (
    <motion.a
      href={KARENSOFT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.footer.designedBy} ${primaryName} (${secondaryName}) — www.karen-soft.ir`}
      title="www.karen-soft.ir"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={container}
      whileHover={reduceMotion ? undefined : 'hover'}
      className="ks-credit group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-cream/10 bg-ink/30 py-1.5 ps-1.5 pe-4 backdrop-blur-sm transition-colors duration-500 hover:border-sky-400/40 hover:bg-ink/50"
    >
      {/* Hover shine sweep */}
      <span
        aria-hidden="true"
        className="ks-shine pointer-events-none absolute inset-y-0 -start-1/2 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100"
      />

      {/* Logo badge */}
      <motion.span
        variants={
          reduceMotion
            ? undefined
            : {
                hidden: { scale: 0.4, rotate: -90, opacity: 0 },
                visible: {
                  scale: 1,
                  rotate: 0,
                  opacity: 1,
                  transition: { type: 'spring', stiffness: 200, damping: 14 },
                },
                hover: { scale: 1.08, rotate: isRTL ? 8 : -8 },
              }
        }
        className="relative flex h-10 w-10 shrink-0 items-center justify-center"
      >
        {/* Rotating gradient ring */}
        <span
          aria-hidden="true"
          className="ks-ring absolute inset-0 rounded-full"
        />
        <span aria-hidden="true" className="absolute inset-[2px] rounded-full bg-white shadow-[0_0_18px_-2px_rgba(14,165,233,0.65)]" />

        {/* Pixel particles drifting into the mark */}
        {!reduceMotion &&
          pixels.map((p, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute rounded-[1px] bg-sky-400"
              style={{ width: p.s, height: p.s, left: '50%', top: '50%' }}
              initial={{ x: p.x - 10, y: p.y - 14, opacity: 0 }}
              animate={{
                x: [p.x - 10, p.x - 2, p.x - 10],
                y: [p.y - 14, p.y - 16, p.y - 14],
                opacity: [0, 0.9, 0],
              }}
              transition={{ duration: 2.8, repeat: Infinity, delay: p.d, ease: 'easeInOut' }}
            />
          ))}

        <img
          src={withBasePath('/images/karensoft/mark.png')}
          alt="KarenSoft"
          width={26}
          height={26}
          loading="lazy"
          className={`relative h-[26px] w-[26px] object-contain ${reduceMotion ? '' : 'ks-float'}`}
        />
      </motion.span>

      {/* Text block */}
      <span className="relative flex flex-col leading-tight">
        <motion.span
          variants={piece}
          className="text-[10px] font-medium uppercase tracking-wider text-cream/60"
        >
          {t.footer.designedBy}
        </motion.span>

        <span className="flex items-baseline gap-2">
          <span
            className={`inline-flex text-sm font-extrabold ${
              isRTL ? 'gap-1 font-faHeading' : 'tracking-wide'
            }`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {primaryPieces.map((chunk, i) => (
              // Gradient is applied per piece: background-clip:text on a parent does not
              // paint through children that are transformed/filtered by the animation.
              <motion.span key={`${chunk}-${i}`} variants={piece} className="ks-gradient-text inline-block">
                {chunk}
              </motion.span>
            ))}
          </span>

          <motion.span
            variants={piece}
            className={`text-[10px] text-cream/45 transition-colors duration-300 group-hover:text-sky-300 ${
              isRTL ? 'font-sans' : 'font-faBody'
            }`}
            dir={isRTL ? 'ltr' : 'rtl'}
          >
            {secondaryName}
          </motion.span>
        </span>
      </span>
    </motion.a>
  );
}
