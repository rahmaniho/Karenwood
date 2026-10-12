'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { formatLocalizedNumber, withBasePath } from '@/lib/utils';

function AnimatedCounter({
  target,
  suffix,
  locale,
}: {
  target: number;
  suffix: string;
  locale: 'fa' | 'en';
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1400;
    const stepTime = 16;
    const totalSteps = Math.round(duration / stepTime);
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  const formatted = count.toLocaleString('en-US');
  return (
    <span ref={ref}>
      {formatLocalizedNumber(formatted, locale)}
      {formatLocalizedNumber(suffix, locale)}
    </span>
  );
}

export function StatsSection() {
  const { locale, t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-walnut py-20 text-cream lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${withBasePath('/images/patterns/tree-rings.jpg')})`,
          backgroundSize: '320px 320px',
        }}
      />

      <div className="container relative z-10">
        <div className="mb-12 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-bronze">
            {t.stats.eyebrow}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-cream sm:text-3xl">
            {t.stats.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.items.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl border border-bronze/30 bg-ink/45 p-7 text-center backdrop-blur-sm"
            >
              <div className="font-serif text-4xl font-bold text-bronze sm:text-5xl" dir="ltr">
                <AnimatedCounter
                  target={item.value}
                  suffix={item.suffix}
                  locale={locale}
                />
              </div>
              <h3 className="mt-3 text-base font-bold text-cream">{item.label}</h3>
              <p className="mt-1 text-xs text-cream/70">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
