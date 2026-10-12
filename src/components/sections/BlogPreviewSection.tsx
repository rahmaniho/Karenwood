'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowUpLeft, Clock, Calendar } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { blogArticles } from '@/data/blog';
import { withBasePath, formatLocalizedNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function BlogPreviewSection() {
  const { locale, t, localize, isRTL } = useTranslation();
  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  const latest = blogArticles.slice(0, 3);

  return (
    <section className="border-t border-walnut/10 bg-cream-300/30 py-24 dark:border-cream/10 dark:bg-walnut-950/50 lg:py-32">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              {t.blogSection.eyebrow}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-walnut dark:text-cream sm:text-4xl lg:text-5xl">
              {t.blogSection.title}
            </h2>
            <p className="mt-3 text-base text-ink/75 dark:text-cream/75">
              {t.blogSection.subtitle}
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/blog">
              <span>{t.blogSection.viewAll}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {latest.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-walnut/12 bg-white/90 shadow-luxury transition-all hover:-translate-y-1.5 hover:border-bronze dark:border-cream/12 dark:bg-walnut-900/85"
            >
              <div>
                <Link href={`/blog/${article.slug}`} className="block overflow-hidden bg-walnut">
                  <img
                    src={withBasePath(article.image)}
                    alt={localize(article.alt)}
                    loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-ink/60 dark:text-cream/60">
                    <span className="rounded-full bg-bronze/15 px-3 py-0.5 font-semibold text-walnut dark:text-bronze">
                      {localize(article.category)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-bronze" />
                      {formatLocalizedNumber(article.readingTimeMinutes, locale)}{' '}
                      {t.blogSection.readingTime}
                    </span>
                  </div>

                  <Link href={`/blog/${article.slug}`}>
                    <h3 className="mt-3.5 text-lg font-bold leading-snug text-walnut transition-colors group-hover:text-bronze dark:text-cream">
                      {localize(article.title)}
                    </h3>
                  </Link>

                  <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-ink/75 dark:text-cream/75">
                    {localize(article.excerpt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-walnut/10 px-6 py-4 text-xs dark:border-cream/10">
                <span className="inline-flex items-center gap-1.5 text-ink/60 dark:text-cream/60">
                  <Calendar className="h-3.5 w-3.5 text-bronze" />
                  {localize(article.publishedAt)}
                </span>
                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-1 font-bold text-walnut hover:text-bronze dark:text-bronze"
                >
                  <span>{t.blogSection.readMore}</span>
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
