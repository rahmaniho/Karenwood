'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowUpRight, ArrowUpLeft, Search } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { blogArticles } from '@/data/blog';
import { withBasePath, formatLocalizedNumber } from '@/lib/utils';
import { CtaSection } from '@/components/sections/CtaSection';

export default function BlogIndexPage() {
  const { locale, t, localize, isRTL } = useTranslation();
  const [query, setQuery] = useState('');
  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  const filtered = blogArticles.filter((art) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      art.title.fa.toLowerCase().includes(q) ||
      art.title.en.toLowerCase().includes(q) ||
      art.excerpt.fa.toLowerCase().includes(q) ||
      art.excerpt.en.toLowerCase().includes(q) ||
      art.category.fa.toLowerCase().includes(q) ||
      art.category.en.toLowerCase().includes(q)
    );
  });

  const featuredArticle = filtered[0] || blogArticles[0];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-walnut py-16 text-cream lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${withBasePath('/images/patterns/wood-grain.svg')})`,
            backgroundSize: '360px 360px',
          }}
        />
        <div className="container relative z-10 text-center max-w-4xl">
          <span className="inline-block rounded-full border border-bronze/40 bg-ink/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-bronze">
            {t.blogSection.eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-cream sm:text-5xl">
            {t.blogSection.title}
          </h1>
          <p className="mt-4 text-base text-cream/80 sm:text-lg">
            {t.blogSection.subtitle}
          </p>

          <div className="mx-auto mt-8 max-w-md relative">
            <Search className="pointer-events-none absolute top-1/2 start-4 h-4 w-4 -translate-y-1/2 text-bronze" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                locale === 'fa'
                  ? 'جستجو در مقالات مجله چوب...'
                  : 'Search essays and monographs...'
              }
              className="w-full rounded-full border border-cream/25 bg-ink/50 ps-11 pe-5 py-3 text-sm text-cream placeholder:text-cream/50 outline-none focus:border-bronze"
            />
          </div>
        </div>
      </section>

      {/* Featured Editorial */}
      <section className="py-16 lg:py-24">
        <div className="container">
          {!query && (
            <div className="mb-14 overflow-hidden rounded-3xl border border-bronze/40 bg-white/95 shadow-luxury-lg dark:bg-walnut-900/95">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <Link
                  href={`/blog/${featuredArticle.slug}`}
                  className="lg:col-span-6 overflow-hidden bg-walnut"
                >
                  <img
                    src={withBasePath(featuredArticle.image)}
                    alt={localize(featuredArticle.alt)}
                    className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-full"
                  />
                </Link>
                <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="rounded-full bg-bronze/20 px-3.5 py-1 font-bold text-walnut dark:text-bronze">
                        {localize(featuredArticle.category)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-ink/60 dark:text-cream/60">
                        <Clock className="h-3.5 w-3.5 text-bronze" />
                        {formatLocalizedNumber(
                          featuredArticle.readingTimeMinutes,
                          locale
                        )}{' '}
                        {t.blogSection.readingTime}
                      </span>
                    </div>

                    <Link href={`/blog/${featuredArticle.slug}`}>
                      <h2 className="mt-4 text-2xl font-bold leading-snug text-walnut hover:text-bronze transition-colors dark:text-cream sm:text-3xl">
                        {localize(featuredArticle.title)}
                      </h2>
                    </Link>

                    <p className="mt-4 text-sm leading-relaxed text-ink/75 dark:text-cream/75">
                      {localize(featuredArticle.excerpt)}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-walnut/10 pt-5 dark:border-cream/10">
                    <div className="flex items-center gap-3">
                      <img
                        src={withBasePath(featuredArticle.author.avatar)}
                        alt={localize(featuredArticle.author.name)}
                        className="h-10 w-10 rounded-full border border-bronze object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-walnut dark:text-cream">
                          {localize(featuredArticle.author.name)}
                        </p>
                        <p className="text-[11px] text-ink/60 dark:text-cream/60">
                          {localize(featuredArticle.publishedAt)}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-walnut px-4 py-2 text-xs font-bold text-cream hover:bg-bronze hover:text-ink dark:bg-bronze dark:text-ink"
                    >
                      <span>{t.blogSection.readMore}</span>
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All 6 Articles Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-walnut/15 bg-white/90 shadow-luxury transition-all hover:-translate-y-1.5 hover:border-bronze dark:border-cream/12 dark:bg-walnut-900/90"
              >
                <div>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="block overflow-hidden bg-walnut"
                  >
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
                      <h3 className="mt-3.5 text-lg font-bold leading-snug text-walnut group-hover:text-bronze transition-colors dark:text-cream">
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

      <CtaSection />
    </div>
  );
}
