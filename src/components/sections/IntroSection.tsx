'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Compass, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const pillarIcons = [Compass, Feather, ShieldCheck];

export function IntroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left/Right Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5 space-y-4"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              {t.intro.eyebrow}
            </span>
            <h2 className="text-3xl font-bold leading-snug text-walnut dark:text-cream sm:text-4xl">
              {t.intro.title}
            </h2>
            <div className="h-1 w-20 rounded-full bg-bronze" />
          </motion.div>

          {/* Manifesto Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="lg:col-span-7 space-y-5"
          >
            <p className="text-lg font-medium leading-relaxed text-walnut dark:text-cream/95 sm:text-xl">
              {t.intro.lead}
            </p>
            <p className="text-base leading-relaxed text-ink/75 dark:text-cream/75">
              {t.intro.body}
            </p>
          </motion.div>
        </div>

        {/* 3 Architectural Pillars */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.intro.pillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx % pillarIcons.length];
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.12 }}
                className="group relative rounded-2xl border border-walnut/12 bg-white/75 p-7 shadow-luxury transition-all hover:-translate-y-1 hover:border-bronze/50 dark:border-cream/10 dark:bg-walnut-900/75"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-walnut text-bronze transition-colors group-hover:bg-bronze group-hover:text-ink">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-walnut dark:text-cream">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/75 dark:text-cream/75">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
