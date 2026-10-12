'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Calendar,
  Maximize2,
  X,
  Layers,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/lib/store';
import {
  projects,
  woodTypeFilters,
  styleFilters,
  ProjectItem,
} from '@/data/projects';
import { subsidiaries } from '@/data/subsidiaries';
import { withBasePath, formatLocalizedNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CtaSection } from '@/components/sections/CtaSection';

export default function ProjectsPage() {
  const { locale, localize } = useTranslation();
  const openConsultationModal = useAppStore((s) => s.openConsultationModal);

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [woodFilter, setWoodFilter] = useState<string>('all');
  const [styleFilter, setStyleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchCategory =
        categoryFilter === 'all' || proj.category === categoryFilter;
      const matchWood = woodFilter === 'all' || proj.woodType === woodFilter;
      const matchStyle = styleFilter === 'all' || proj.style === styleFilter;

      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        proj.title.fa.toLowerCase().includes(q) ||
        proj.title.en.toLowerCase().includes(q) ||
        proj.location.fa.toLowerCase().includes(q) ||
        proj.location.en.toLowerCase().includes(q) ||
        proj.woodLabel.fa.toLowerCase().includes(q) ||
        proj.woodLabel.en.toLowerCase().includes(q);

      return matchCategory && matchWood && matchStyle && matchSearch;
    });
  }, [categoryFilter, woodFilter, styleFilter, searchQuery]);

  const resetFilters = () => {
    setCategoryFilter('all');
    setWoodFilter('all');
    setStyleFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-walnut py-16 text-cream lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${withBasePath('/images/patterns/kumiko.jpg')})`,
            backgroundSize: '200px 200px',
          }}
        />
        <div className="container relative z-10 text-center max-w-4xl">
          <span className="inline-block rounded-full border border-bronze/40 bg-ink/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-bronze">
            {locale === 'fa' ? 'آرشیو پروژه‌های ماندگار' : 'ARCHITECTURAL PORTFOLIO'}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-cream sm:text-5xl">
            {locale === 'fa'
              ? 'گالری جامع پروژه‌های هلدینگ کارن‌وود'
              : 'Curated Archive of Bespoke Commissions'}
          </h1>
          <p className="mt-4 text-base text-cream/80 sm:text-lg">
            {locale === 'fa'
              ? 'جستجو و فیلتر در میان آثار اجراشده بر اساس زیرمجموعه تخصصی، گونه چوب مصرفی و سبک معماری.'
              : 'Filter our completed residences, villas, and executive suites by specialized atelier, timber species, and architectural style.'}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-12">
        <div className="container">
          <div className="rounded-3xl border border-walnut/15 bg-white/90 p-6 shadow-luxury dark:border-cream/12 dark:bg-walnut-900/90 space-y-6">
            {/* Search + Active Count + Reset */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="pointer-events-none absolute top-1/2 start-3.5 h-4 w-4 -translate-y-1/2 text-bronze" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    locale === 'fa'
                      ? 'جستجوی نام پروژه، محله (زعفرانیه، لواسان...) یا نوع چوب...'
                      : 'Search project title, neighborhood, or timber...'
                  }
                  className="w-full rounded-xl border border-walnut/20 bg-cream/60 ps-10 pe-4 py-2.5 text-sm text-ink outline-none focus:border-bronze dark:border-cream/15 dark:bg-ink/50 dark:text-cream"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-ink/70 dark:text-cream/70">
                  {locale === 'fa' ? 'تعداد آثار نمایش‌داده‌شده:' : 'Showing:'}{' '}
                  <strong className="text-bronze">
                    {formatLocalizedNumber(filteredProjects.length, locale)}
                  </strong>{' '}
                  / {formatLocalizedNumber(projects.length, locale)}
                </span>

                {(categoryFilter !== 'all' ||
                  woodFilter !== 'all' ||
                  styleFilter !== 'all' ||
                  searchQuery) && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-bronze/40 px-3 py-1.5 text-xs font-semibold text-walnut hover:bg-bronze hover:text-ink dark:text-cream"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{locale === 'fa' ? 'حذف فیلترها' : 'Reset Filters'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* 1. Category Filter Pills */}
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-bronze">
                {locale === 'fa' ? '۱. فیلتر بر اساس زیرمجموعه:' : '1. Filter by Atelier Category:'}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCategoryFilter('all')}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    categoryFilter === 'all'
                      ? 'bg-walnut text-cream dark:bg-bronze dark:text-ink'
                      : 'border border-walnut/15 bg-cream/60 text-walnut hover:border-bronze dark:border-cream/15 dark:bg-ink/40 dark:text-cream'
                  }`}
                >
                  {locale === 'fa' ? 'همه زیرمجموعه‌ها (۱۰)' : 'All Ateliers (10)'}
                </button>
                {subsidiaries.map((sub) => (
                  <button
                    key={sub.slug}
                    type="button"
                    onClick={() => setCategoryFilter(sub.slug)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      categoryFilter === sub.slug
                        ? 'bg-walnut text-cream dark:bg-bronze dark:text-ink'
                        : 'border border-walnut/15 bg-cream/60 text-walnut hover:border-bronze dark:border-cream/15 dark:bg-ink/40 dark:text-cream'
                    }`}
                  >
                    {localize(sub.shortName)}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Wood Type & 3. Design Style */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 pt-2 border-t border-walnut/10 dark:border-cream/10">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-bronze">
                  {locale === 'fa' ? '۲. گونه چوب:' : '2. Timber Species:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {woodTypeFilters.map((wf) => (
                    <button
                      key={wf.key}
                      type="button"
                      onClick={() => setWoodFilter(wf.key)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        woodFilter === wf.key
                          ? 'bg-moss text-cream'
                          : 'border border-walnut/15 bg-cream/50 text-walnut hover:border-moss dark:border-cream/15 dark:bg-ink/40 dark:text-cream'
                      }`}
                    >
                      {localize(wf.label)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-bronze">
                  {locale === 'fa' ? '۳. سبک طراحی:' : '3. Design Style:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {styleFilters.map((sf) => (
                    <button
                      key={sf.key}
                      type="button"
                      onClick={() => setStyleFilter(sf.key)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        styleFilter === sf.key
                          ? 'bg-bronze text-ink font-semibold'
                          : 'border border-walnut/15 bg-cream/50 text-walnut hover:border-bronze dark:border-cream/15 dark:bg-ink/40 dark:text-cream'
                      }`}
                    >
                      {localize(sf.label)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-walnut/15 bg-white/70 p-12 text-center dark:border-cream/15 dark:bg-walnut-900/60">
              <p className="text-lg font-bold text-walnut dark:text-cream">
                {locale === 'fa'
                  ? 'پروژه‌ای با این ترکیب فیلتر یافت نشد.'
                  : 'No projects matched this exact filter combination.'}
              </p>
              <Button variant="bronze" size="sm" className="mt-4" onClick={resetFilters}>
                {locale === 'fa' ? 'نمایش همه پروژه‌ها' : 'Show All Projects'}
              </Button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, idx) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-walnut/15 bg-white/90 shadow-luxury transition-all hover:-translate-y-1.5 hover:border-bronze dark:border-cream/12 dark:bg-walnut-900/90"
                >
                  <div className="relative h-60 overflow-hidden bg-walnut">
                    <img
                      src={withBasePath(project.image)}
                      alt={localize(project.alt)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                      <span className="rounded-full bg-walnut/90 px-3 py-1 text-[11px] font-semibold text-bronze border border-bronze/30">
                        {project.code} • {localize(project.styleLabel)}
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/20 text-cream backdrop-blur-sm group-hover:bg-bronze group-hover:text-ink">
                        <Maximize2 className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-ink/60 dark:text-cream/60">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-bronze" />
                        {localize(project.location)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-bronze" />
                        {formatLocalizedNumber(project.year, locale)} •{' '}
                        {formatLocalizedNumber(project.areaSqm, locale)} m²
                      </span>
                    </div>

                    <h2 className="mt-2.5 text-lg font-bold text-walnut group-hover:text-bronze transition-colors dark:text-cream">
                      {localize(project.title)}
                    </h2>

                    <p className="mt-1 text-xs font-medium text-moss dark:text-bronze">
                      {localize(project.woodLabel)}
                    </p>

                    <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-ink/75 dark:text-cream/75">
                      {localize(project.summary)}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-ink/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-bronze/40 bg-cream shadow-luxury-lg dark:bg-walnut-900"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
                className="absolute top-4 end-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-walnut text-cream hover:bg-bronze hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-6 bg-walnut">
                  <img
                    src={withBasePath(selectedProject.image)}
                    alt={localize(selectedProject.alt)}
                    className="h-64 w-full object-cover md:h-full"
                  />
                </div>
                <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-bronze">
                      <Layers className="h-3.5 w-3.5" />
                      {selectedProject.code} • {localize(selectedProject.styleLabel)}
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-walnut dark:text-cream">
                      {localize(selectedProject.title)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/80 dark:text-cream/80">
                      {localize(selectedProject.summary)}
                    </p>
                    <div className="mt-4 space-y-1.5">
                      {localize(selectedProject.deliverables).map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-xs text-ink/80 dark:text-cream/80"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-moss shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-walnut/10 pt-4 dark:border-cream/10">
                    <Button
                      variant="bronze"
                      size="sm"
                      onClick={() => {
                        const cat = selectedProject.category;
                        setSelectedProject(null);
                        openConsultationModal(cat);
                      }}
                    >
                      {locale === 'fa' ? 'سفارش پروژه مشابه' : 'Commission Similar Project'}
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/${selectedProject.category}`}>
                        {locale === 'fa' ? 'صفحه آتلیه تخصصی' : 'Visit Atelier'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CtaSection />
    </div>
  );
}
