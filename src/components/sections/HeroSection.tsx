'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowUpLeft, Sparkles, Compass, Layers } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/lib/store';
import { withBasePath, formatLocalizedNumber } from '@/lib/utils';
import { SplitText } from '@/components/ui/split-text';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const { locale, t, isRTL } = useTranslation();
  const openConsultationModal = useAppStore((s) => s.openConsultationModal);
  const [selectedWood, setSelectedWood] = useState(0);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 700], [0, 160]);
  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-walnut text-cream flex items-center">
      {/* Parallax Wood Texture SVG Background */}
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <img
          src={withBasePath('/images/hero-bg.svg')}
          alt=""
          className="h-[115%] w-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-walnut/60 via-ink/40 to-walnut/95" />
      </motion.div>

      <div className="container relative z-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Headline & Copy (7 columns) */}
          <div className="lg:col-span-7 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-bronze/40 bg-ink/50 px-4 py-1.5 text-xs font-medium tracking-wider text-bronze backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t.hero.badge}</span>
            </motion.div>

            <h1 className="text-3xl font-bold leading-[1.22] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              <SplitText text={t.hero.titleLine1} />
              <br />
              <span className="text-bronze">
                <SplitText text={t.hero.titleLine2} delayOffset={0.25} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35 }}
              className="max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button asChild variant="bronze" size="lg">
                <Link href="/projects">
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => openConsultationModal()}
                className="border-cream/30 text-cream hover:bg-cream hover:text-ink"
              >
                <Compass className="h-4 w-4 text-bronze" />
                <span>{t.hero.ctaSecondary}</span>
              </Button>
            </motion.div>

            {/* Interactive Timber Species Selector Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4 border-t border-cream/15"
            >
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-bronze">
                <Layers className="h-3.5 w-3.5" />
                <span>{t.hero.woodSpeciesLabel}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {t.hero.species.map((sp, idx) => (
                  <button
                    key={sp.name}
                    type="button"
                    onClick={() => setSelectedWood(idx)}
                    className={`inline-flex items-center gap-2.5 rounded-xl border px-3.5 py-2 text-xs transition-all ${
                      selectedWood === idx
                        ? 'border-bronze bg-bronze/20 text-cream shadow-sm'
                        : 'border-cream/15 bg-ink/40 text-cream/75 hover:border-bronze/50'
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-cream/40"
                      style={{ backgroundColor: sp.tone }}
                    />
                    <span className="font-medium">{sp.name}</span>
                    <span className="text-[10px] text-cream/55">({sp.origin})</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Architectural Showcase Card (5 columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl border border-bronze/35 bg-ink/65 p-5 shadow-luxury-lg backdrop-blur-xl sm:p-6">
              <div className="overflow-hidden rounded-2xl border border-bronze/25">
                <img
                  src={withBasePath('/images/subsidiaries/kitchen.svg')}
                  alt={
                    locale === 'fa'
                      ? 'نمایش آتلیه معماری چوب کارن‌وود'
                      : 'Karenwood Architectural Woodwork Showcase'
                  }
                  className="h-64 w-full object-cover sm:h-72"
                />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-cream/12 pt-4 text-center">
                <div className="rounded-xl bg-walnut/60 p-3 border border-cream/10">
                  <p className="font-serif text-2xl font-bold text-bronze">
                    {formatLocalizedNumber(10, locale)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-cream/75">
                    {locale === 'fa' ? 'زیرمجموعه تخصصی' : 'Specialized Ateliers'}
                  </p>
                </div>
                <div className="rounded-xl bg-walnut/60 p-3 border border-cream/10">
                  <p className="font-serif text-2xl font-bold text-bronze">
                    {formatLocalizedNumber(25, locale)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-cream/75">
                    {locale === 'fa' ? 'سال ضمانت اصالت' : 'Years Warranty'}
                  </p>
                </div>
                <div className="rounded-xl bg-walnut/60 p-3 border border-cream/10">
                  <p className="font-serif text-2xl font-bold text-bronze">FSC®</p>
                  <p className="mt-0.5 text-[11px] text-cream/75">
                    {locale === 'fa' ? 'جنگل‌داری پایدار' : 'Certified Timber'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
