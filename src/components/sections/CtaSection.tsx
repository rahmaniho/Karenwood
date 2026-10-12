'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Phone, ArrowUpRight, ArrowUpLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/lib/store';
import { withBasePath } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  const { t, isRTL } = useTranslation();
  const openConsultationModal = useAppStore((s) => s.openConsultationModal);
  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-3xl border border-bronze/40 bg-walnut px-6 py-14 text-cream shadow-luxury-lg sm:px-14 sm:py-20"
        >
          {/* Decorative Pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url(${withBasePath('/images/patterns/kumiko.svg')})`,
              backgroundSize: '200px 200px',
            }}
          />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-bronze/40 bg-ink/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-bronze">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t.ctaSection.eyebrow}</span>
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-snug text-cream sm:text-4xl lg:text-5xl">
              {t.ctaSection.title}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-cream/85 sm:text-lg">
              {t.ctaSection.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="bronze"
                size="lg"
                onClick={() => openConsultationModal()}
              >
                <Sparkles className="h-4 w-4" />
                <span>{t.ctaSection.primaryBtn}</span>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-cream/35 text-cream hover:bg-cream hover:text-ink"
              >
                <Link href="/custom">
                  <span>{t.ctaSection.secondaryBtn}</span>
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-xs text-cream/75">
              <Phone className="h-3.5 w-3.5 text-bronze" />
              <span>{t.ctaSection.phoneLabel}</span>
              <a
                href="tel:+982122048900"
                className="font-bold text-bronze hover:underline"
                dir="ltr"
              >
                {t.footer.phone}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
