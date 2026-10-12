'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Award,
  CheckCircle2,
  ChevronDown,
  ArrowUpRight,
  ArrowUpLeft,
  Layers,
  MapPin,
} from 'lucide-react';
import { Subsidiary, subsidiaries } from '@/data/subsidiaries';
import { projects } from '@/data/projects';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/lib/store';
import { withBasePath, formatLocalizedNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CtaSection } from './CtaSection';

export function SubsidiaryPageTemplate({ subsidiary }: { subsidiary: Subsidiary }) {
  const { locale, localize, isRTL } = useTranslation();
  const openConsultationModal = useAppStore((s) => s.openConsultationModal);
  const [openFaq, setOpenFaq] = useState<number>(0);

  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  const relatedProjects = projects.filter((p) => p.category === subsidiary.slug);
  const galleryProjects =
    relatedProjects.length >= 3
      ? relatedProjects
      : [
          ...relatedProjects,
          ...projects.filter((p) => p.category !== subsidiary.slug).slice(0, 3 - relatedProjects.length),
        ];

  const otherSubsidiaries = subsidiaries.filter((s) => s.slug !== subsidiary.slug);

  return (
    <div className="min-h-screen">
      {/* Subsidiary Hero */}
      <section className="relative overflow-hidden bg-walnut py-16 text-cream lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${withBasePath('/images/patterns/wood-grain.svg')})`,
            backgroundSize: '360px 360px',
          }}
        />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs text-cream/70"
          >
            <Link href="/" className="hover:text-bronze transition-colors">
              {locale === 'fa' ? 'صفحه اصلی' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-bronze font-semibold">{localize(subsidiary.shortName)}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-bronze/40 bg-ink/40 px-4 py-1.5 text-xs font-semibold text-bronze">
                <span>{subsidiary.code}</span>
                <span>•</span>
                <span>
                  {locale === 'fa' ? 'آتلیه تخصصی کارن‌وود' : 'KARENWOOD SPECIALIZED ATELIER'}
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-tight text-cream sm:text-5xl">
                {localize(subsidiary.name)}
              </h1>

              <p className="text-lg font-medium text-bronze">{localize(subsidiary.tagline)}</p>

              <p className="max-w-2xl text-base leading-relaxed text-cream/85">
                {localize(subsidiary.heroLead)}
              </p>

              {/* Highlights List */}
              <div className="flex flex-wrap gap-3 pt-2">
                {localize(subsidiary.highlights).map((hl) => (
                  <span
                    key={hl}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-cream/15 bg-ink/45 px-3.5 py-2 text-xs text-cream"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-bronze shrink-0" />
                    <span>{hl}</span>
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Button
                  variant="bronze"
                  size="lg"
                  onClick={() => openConsultationModal(subsidiary.slug)}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>
                    {locale === 'fa'
                      ? `ثبت سفارش در ${localize(subsidiary.shortName)}`
                      : `Commission ${localize(subsidiary.shortName)}`}
                  </span>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-cream/30 text-cream hover:bg-cream hover:text-ink"
                >
                  <Link href="/projects">
                    <span>
                      {locale === 'fa' ? 'مشاهده گالری پروژه‌ها' : 'Explore Portfolio'}
                    </span>
                    <ArrowIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Hero Illustration Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="overflow-hidden rounded-3xl border border-bronze/40 bg-ink/70 p-5 shadow-luxury-lg">
                <img
                  src={withBasePath(subsidiary.image)}
                  alt={localize(subsidiary.alt)}
                  className="h-64 w-full rounded-2xl object-cover sm:h-72"
                />

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl border border-cream/10 bg-walnut/75 p-3">
                    <Award className="mx-auto h-4 w-4 text-bronze" />
                    <p className="mt-1 font-serif text-xl font-bold text-cream">
                      {formatLocalizedNumber(subsidiary.stats.projectsCount, locale)}+
                    </p>
                    <p className="text-[11px] text-cream/70">
                      {locale === 'fa' ? 'پروژه اجراشده' : 'Commissions'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-cream/10 bg-walnut/75 p-3">
                    <ShieldCheck className="mx-auto h-4 w-4 text-bronze" />
                    <p className="mt-1 font-serif text-xl font-bold text-cream">
                      {formatLocalizedNumber(subsidiary.stats.warrantyYears, locale)}
                    </p>
                    <p className="text-[11px] text-cream/70">
                      {locale === 'fa' ? 'سال ضمانت کتبی' : 'Years Warranty'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-cream/10 bg-walnut/75 p-3">
                    <Clock className="mx-auto h-4 w-4 text-bronze" />
                    <p className="mt-1 font-serif text-xl font-bold text-cream" dir="ltr">
                      {formatLocalizedNumber(subsidiary.stats.leadTimeWeeks, locale)}w
                    </p>
                    <p className="text-[11px] text-cream/70">
                      {locale === 'fa' ? 'زمان تحویل (هفته)' : 'Lead Time'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Craft Philosophy & Engineering Overview */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-3xl border border-walnut/15 bg-white/80 p-8 shadow-luxury dark:border-cream/12 dark:bg-walnut-900/80 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-widest text-bronze">
              {locale === 'fa'
                ? 'فلسفه ساخت و استاندارد مهندسی'
                : 'ATELIER CRAFT & ENGINEERING'}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-walnut dark:text-cream sm:text-3xl">
              {locale === 'fa'
                ? `چرا ${localize(subsidiary.shortName)} کارن‌وود متمایز است؟`
                : `What Defines ${localize(subsidiary.shortName)} at Karenwood`}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/80 dark:text-cream/85">
              {localize(subsidiary.craftPhilosophy)}
            </p>
          </div>
        </div>
      </section>

      {/* 6 Technical Features */}
      <section className="border-y border-walnut/10 bg-cream-300/35 py-20 dark:border-cream/10 dark:bg-walnut-950/60 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-bronze">
              {locale === 'fa' ? 'مشخصات فنی و اجرایی' : 'TECHNICAL SPECIFICATIONS'}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-walnut dark:text-cream sm:text-4xl">
              {locale === 'fa'
                ? '۶ ویژگی برجسته مهندسی و طراحی'
                : '6 Signature Engineering & Design Pillars'}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subsidiary.features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-2xl border border-walnut/12 bg-white/90 p-6 shadow-luxury dark:border-cream/10 dark:bg-walnut-900/85"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-walnut font-serif text-sm font-bold text-bronze">
                    0{idx + 1}
                  </span>
                  <Layers className="h-4 w-4 text-bronze" />
                </div>
                <h3 className="text-lg font-bold text-walnut dark:text-cream">
                  {localize(feat.title)}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-ink/75 dark:text-cream/75">
                  {localize(feat.desc)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Wood Species Palette */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-bronze">
              {locale === 'fa' ? 'پالت چوب‌های پیشنهادی' : 'CURATED TIMBER PALETTE'}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-walnut dark:text-cream">
              {locale === 'fa'
                ? 'گونه‌های چوب منتخب برای این آتلیه'
                : 'Recommended Hardwoods & Finishes'}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {subsidiary.woodSpecies.map((wood, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-walnut/15 bg-white/85 p-6 shadow-luxury dark:border-cream/12 dark:bg-walnut-900/85"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="h-14 w-14 shrink-0 rounded-2xl border-2 border-bronze shadow-inner"
                    style={{ backgroundColor: wood.tone }}
                  />
                  <div>
                    <h3 className="text-base font-bold text-walnut dark:text-cream">
                      {localize(wood.name)}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-bronze">
                      {wood.hardness}
                    </p>
                  </div>
                </div>
                <div className="mt-4 border-t border-walnut/10 pt-3 text-xs text-ink/75 dark:border-cream/10 dark:text-cream/75">
                  <span className="font-semibold text-walnut dark:text-cream">
                    {locale === 'fa' ? 'پوشش نهایی: ' : 'Surface Finish: '}
                  </span>
                  {localize(wood.finish)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Gallery */}
      <section className="border-t border-walnut/10 py-20 dark:border-cream/10 lg:py-24">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-bronze">
                {locale === 'fa' ? 'گالری آثار اجراشده' : 'ATELIER GALLERY'}
              </span>
              <h2 className="mt-1.5 text-3xl font-bold text-walnut dark:text-cream">
                {locale === 'fa'
                  ? `نمونه پروژه‌های ${localize(subsidiary.shortName)}`
                  : `Selected ${localize(subsidiary.shortName)} Commissions`}
              </h2>
            </div>

            <Button asChild variant="outline" size="sm">
              <Link href="/projects">
                <span>
                  {locale === 'fa' ? 'مشاهده کل آرشیو پروژه‌ها' : 'Full Portfolio'}
                </span>
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {galleryProjects.map((proj) => (
              <div
                key={proj.id}
                className="group overflow-hidden rounded-2xl border border-walnut/15 bg-white/90 shadow-luxury dark:border-cream/12 dark:bg-walnut-900/90"
              >
                <div className="relative h-56 overflow-hidden bg-walnut">
                  <img
                    src={withBasePath(proj.image)}
                    alt={localize(proj.alt)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 start-3 rounded-full bg-walnut/90 px-3 py-1 text-[11px] font-semibold text-bronze">
                    {proj.code}
                  </span>
                </div>
                <div className="p-5">
                  <p className="inline-flex items-center gap-1 text-xs text-ink/60 dark:text-cream/60">
                    <MapPin className="h-3.5 w-3.5 text-bronze" />
                    {localize(proj.location)} • {formatLocalizedNumber(proj.year, locale)}
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold text-walnut dark:text-cream">
                    {localize(proj.title)}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink/75 dark:text-cream/75">
                    {localize(proj.summary)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsidiary Specific FAQ */}
      <section className="border-t border-walnut/10 bg-cream-300/30 py-20 dark:border-cream/10 dark:bg-walnut-950/50">
        <div className="container max-w-3xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-bronze">
              {locale === 'fa' ? 'پرسش‌های تخصصی' : 'TECHNICAL FAQ'}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-walnut dark:text-cream sm:text-3xl">
              {locale === 'fa'
                ? `سوالات متداول درباره ${localize(subsidiary.shortName)}`
                : `Frequently Asked Questions — ${localize(subsidiary.shortName)}`}
            </h2>
          </div>

          <div className="mt-8 space-y-3">
            {subsidiary.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-walnut/15 bg-white/90 dark:border-cream/12 dark:bg-walnut-900/90"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-start font-bold text-walnut dark:text-cream"
                  >
                    <span className="text-sm sm:text-base">{localize(faq.q)}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-bronze transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-walnut/10 px-5 pb-5 pt-3 text-xs leading-relaxed text-ink/80 dark:border-cream/10 dark:text-cream/80 sm:text-sm">
                      {localize(faq.a)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore Other Subsidiaries */}
      <section className="py-16">
        <div className="container">
          <h3 className="mb-6 text-center text-lg font-bold text-walnut dark:text-cream">
            {locale === 'fa'
              ? 'سایر زیرمجموعه‌های تخصصی هلدینگ کارن‌وود'
              : 'Explore Sister Karenwood Ateliers'}
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {otherSubsidiaries.map((sub) => (
              <Link
                key={sub.slug}
                href={sub.route}
                className="inline-flex items-center gap-2 rounded-full border border-walnut/15 bg-white/80 px-4 py-2 text-xs font-semibold text-walnut transition-all hover:border-bronze hover:bg-walnut hover:text-cream dark:border-cream/15 dark:bg-walnut-900 dark:text-cream"
              >
                <span className="font-mono text-[10px] text-bronze">{sub.code}</span>
                <span>{localize(sub.shortName)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
