'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trees, ScanLine, Cpu, Droplets, Award } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const stepIcons = [Trees, ScanLine, Cpu, Droplets, Award];

export function ProcessSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative overflow-hidden border-y border-walnut/10 bg-cream-300/35 py-24 dark:border-cream/10 dark:bg-walnut-950/60 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-bronze">
            {t.process.eyebrow}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-walnut dark:text-cream sm:text-4xl lg:text-5xl">
            {t.process.title}
          </h2>
          <p className="mt-4 text-base text-ink/75 dark:text-cream/75">
            {t.process.subtitle}
          </p>
        </div>

        {/* 5-Step Interactive Architectural Timeline */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {t.process.steps.map((step, idx) => {
            const Icon = stepIcons[idx % stepIcons.length];
            const isActive = activeIndex === idx;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                  isActive
                    ? 'border-bronze bg-walnut text-cream shadow-luxury-lg -translate-y-1.5'
                    : 'border-walnut/15 bg-white/80 text-walnut hover:border-bronze/50 dark:border-cream/10 dark:bg-walnut-900/75 dark:text-cream'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-serif text-3xl font-bold ${
                      isActive ? 'text-bronze' : 'text-walnut/35 dark:text-cream/35'
                    }`}
                  >
                    {step.number}
                  </span>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                      isActive
                        ? 'bg-bronze text-ink'
                        : 'bg-walnut/10 text-walnut dark:bg-cream/10 dark:text-bronze'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3
                  className={`mt-6 text-lg font-bold leading-snug ${
                    isActive ? 'text-cream' : 'text-walnut dark:text-cream'
                  }`}
                >
                  {step.title}
                </h3>

                <p
                  className={`mt-3 text-xs leading-relaxed ${
                    isActive ? 'text-cream/85' : 'text-ink/70 dark:text-cream/70'
                  }`}
                >
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
