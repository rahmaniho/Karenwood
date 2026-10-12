'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowUpLeft, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { subsidiaries } from '@/data/subsidiaries';
import { withBasePath, formatLocalizedNumber } from '@/lib/utils';
import { TiltCard } from '@/components/ui/tilt-card';

export function SubsidiariesSection() {
  const { locale, t, localize, isRTL } = useTranslation();
  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  return (
    <section
      id="subsidiaries"
      className="relative overflow-hidden border-y border-walnut/10 bg-cream-300/40 py-24 dark:border-cream/10 dark:bg-walnut-950/60 lg:py-32"
    >
      <div className="container">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-bronze">
            {t.subsidiariesSection.eyebrow}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-walnut dark:text-cream sm:text-4xl lg:text-5xl">
            {t.subsidiariesSection.title}
          </h2>
          <p className="mt-4 text-base text-ink/75 dark:text-cream/75">
            {t.subsidiariesSection.subtitle}
          </p>
        </div>

        {/* 10 Subsidiary Cards Grid with 3D Hover Tilt */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {subsidiaries.map((sub, idx) => (
            <motion.div
              key={sub.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (idx % 5) * 0.08 }}
            >
              <TiltCard className="h-full rounded-2xl border border-walnut/15 bg-white/90 shadow-luxury transition-colors hover:border-bronze dark:border-cream/12 dark:bg-walnut-900/90">
                <Link
                  href={sub.route}
                  className="flex h-full flex-col justify-between p-5 focus:outline-none"
                >
                  <div>
                    {/* SVG Illustration Preview */}
                    <div className="relative overflow-hidden rounded-xl border border-walnut/10 bg-walnut">
                      <img
                        src={withBasePath(sub.image)}
                        alt={localize(sub.alt)}
                        loading="lazy"
                        className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className="absolute top-2.5 start-2.5 rounded-md bg-walnut/90 px-2 py-0.5 font-mono text-[10px] font-bold text-bronze border border-bronze/30">
                        {sub.code}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="mt-4 text-lg font-bold text-walnut dark:text-cream">
                      {localize(sub.shortName)}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-ink/75 dark:text-cream/75">
                      {localize(sub.description)}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-walnut/10 pt-3.5 dark:border-cream/10">
                    <div className="mb-3 flex items-center justify-between text-[11px] text-ink/65 dark:text-cream/65">
                      <span className="inline-flex items-center gap-1 text-moss dark:text-bronze">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {formatLocalizedNumber(sub.stats.warrantyYears, locale)}{' '}
                        {locale === 'fa' ? 'سال ضمانت' : 'Yr Warranty'}
                      </span>
                      <span>
                        {formatLocalizedNumber(sub.stats.projectsCount, locale)}+{' '}
                        {t.subsidiariesSection.projectsCountSuffix}
                      </span>
                    </div>

                    <span className="inline-flex w-full items-center justify-between rounded-lg bg-walnut/5 px-3 py-2 text-xs font-bold text-walnut transition-colors group-hover:bg-bronze group-hover:text-ink dark:bg-cream/10 dark:text-cream">
                      <span>{t.subsidiariesSection.exploreBtn}</span>
                      <ArrowIcon className="h-3.5 w-3.5 text-bronze" />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
