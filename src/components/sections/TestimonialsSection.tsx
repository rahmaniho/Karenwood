'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronRight, ChevronLeft, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { withBasePath } from '@/lib/utils';

const avatars = [
  '/images/team/team-1.jpg',
  '/images/team/team-2.jpg',
  '/images/team/team-3.jpg',
];

export function TestimonialsSection() {
  const { locale, t, isRTL } = useTranslation();
  const [index, setIndex] = useState(0);

  const items = t.testimonials.items;
  const current = items[index];

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              {t.testimonials.eyebrow}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-walnut dark:text-cream sm:text-4xl">
              {t.testimonials.title}
            </h2>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-3xl border border-bronze/35 bg-walnut p-8 text-cream shadow-luxury-lg sm:p-12">
            <Quote
              aria-hidden="true"
              className="pointer-events-none absolute top-6 end-8 h-24 w-24 text-bronze/15"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 24 : -24 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <div className="mb-5 flex items-center gap-1 text-bronze">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-bronze" />
                  ))}
                </div>

                <blockquote className="text-lg font-medium leading-relaxed text-cream sm:text-2xl">
                  “{current.quote}”
                </blockquote>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-cream/15 pt-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={withBasePath(avatars[index % avatars.length])}
                      alt={current.author}
                      className="h-14 w-14 rounded-full border-2 border-bronze object-cover"
                    />
                    <div>
                      <p className="text-base font-bold text-cream">{current.author}</p>
                      <p className="text-xs text-bronze">{current.role}</p>
                      <p className="mt-0.5 text-xs text-cream/65">{current.project}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label={locale === 'fa' ? 'دیدگاه قبلی' : 'Previous testimonial'}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-bronze hover:bg-bronze hover:text-ink"
                    >
                      {isRTL ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <ChevronLeft className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label={locale === 'fa' ? 'دیدگاه بعدی' : 'Next testimonial'}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-bronze hover:bg-bronze hover:text-ink"
                    >
                      {isRTL ? (
                        <ChevronLeft className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="mt-6 flex justify-center gap-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === idx ? 'w-8 bg-bronze' : 'w-2 bg-cream/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
