'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Calendar, Tag, ArrowRight, ArrowLeft, Quote } from 'lucide-react';
import { BlogArticle, blogArticles } from '@/data/blog';
import { useTranslation } from '@/hooks/useTranslation';
import { withBasePath, formatLocalizedNumber } from '@/lib/utils';
import { CtaSection } from './CtaSection';

export function BlogArticleClient({ article }: { article: BlogArticle }) {
  const { locale, t, localize, isRTL } = useTranslation();
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  const related = blogArticles.filter((b) => b.slug !== article.slug).slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <section className="relative overflow-hidden bg-walnut py-16 text-cream lg:py-24">
        <div className="container max-w-4xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-bronze hover:underline"
          >
            <BackIcon className="h-3.5 w-3.5" />
            <span>{locale === 'fa' ? 'بازگشت به مجله معماری چوب' : 'Back to Journal'}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-cream/75">
            <span className="rounded-full bg-bronze px-3.5 py-1 font-bold text-ink">
              {localize(article.category)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-bronze" />
              {localize(article.publishedAt)}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-bronze" />
              {formatLocalizedNumber(article.readingTimeMinutes, locale)}{' '}
              {t.blogSection.readingTime}
            </span>
          </div>

          <h1 className="mt-5 text-2xl font-bold leading-snug text-cream sm:text-4xl lg:text-5xl">
            {localize(article.title)}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-cream/85 sm:text-lg">
            {localize(article.excerpt)}
          </p>

          {/* Author Bar */}
          <div className="mt-8 flex items-center gap-3.5 border-t border-cream/15 pt-6">
            <img
              src={withBasePath(article.author.avatar)}
              alt={localize(article.author.name)}
              className="h-12 w-12 rounded-full border-2 border-bronze object-cover"
            />
            <div>
              <p className="text-sm font-bold text-cream">
                {localize(article.author.name)}
              </p>
              <p className="text-xs text-bronze">{localize(article.author.role)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image & Editorial Body */}
      <article className="py-14 lg:py-20">
        <div className="container max-w-4xl">
          <div className="mb-12 overflow-hidden rounded-3xl border border-bronze/35 bg-walnut shadow-luxury-lg">
            <img
              src={withBasePath(article.image)}
              alt={localize(article.alt)}
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>

          <div className="space-y-12 rounded-3xl border border-walnut/12 bg-white/90 p-7 shadow-luxury dark:border-cream/10 dark:bg-walnut-900/90 sm:p-12">
            {article.sections.map((sec, idx) => (
              <div key={idx} className="space-y-5">
                <h2 className="text-xl font-bold text-walnut dark:text-cream sm:text-2xl">
                  {localize(sec.heading)}
                </h2>

                {localize(sec.paragraphs).map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-base leading-loose text-ink/85 dark:text-cream/85"
                  >
                    {p}
                  </p>
                ))}

                {sec.pullQuote && (
                  <blockquote className="my-8 relative rounded-2xl border-s-4 border-bronze bg-walnut/5 p-6 dark:bg-ink/50">
                    <Quote className="mb-2 h-6 w-6 text-bronze" />
                    <p className="font-serif text-lg font-medium italic text-walnut dark:text-cream">
                      {localize(sec.pullQuote)}
                    </p>
                  </blockquote>
                )}
              </div>
            ))}

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 border-t border-walnut/10 pt-6 dark:border-cream/10">
              <Tag className="h-4 w-4 text-bronze" />
              {localize(article.tags).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-walnut/15 bg-cream px-3 py-1 text-xs font-medium text-walnut dark:border-cream/15 dark:bg-ink/60 dark:text-cream"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="mb-6 text-xl font-bold text-walnut dark:text-cream">
              {locale === 'fa' ? 'مقالات مرتبط در مجله کارن‌وود' : 'Related Monographs'}
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group flex gap-4 rounded-2xl border border-walnut/15 bg-white/85 p-4 shadow-luxury transition-all hover:border-bronze dark:border-cream/12 dark:bg-walnut-900/85"
                >
                  <img
                    src={withBasePath(rel.image)}
                    alt={localize(rel.alt)}
                    className="h-24 w-32 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-bronze">
                      {localize(rel.category)}
                    </span>
                    <h4 className="mt-1 line-clamp-2 text-sm font-bold text-walnut group-hover:text-bronze dark:text-cream">
                      {localize(rel.title)}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      <CtaSection />
    </div>
  );
}
