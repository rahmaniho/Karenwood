'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowUpLeft,
  MapPin,
  Calendar,
  Maximize2,
  X,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/lib/store';
import { projects, ProjectItem } from '@/data/projects';
import { subsidiaries } from '@/data/subsidiaries';
import { withBasePath, formatLocalizedNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function FeaturedProjectsSection() {
  const { locale, t, localize, isRTL } = useTranslation();
  const openConsultationModal = useAppStore((s) => s.openConsultationModal);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  const displayedProjects =
    activeCategory === 'all'
      ? projects.slice(0, 6)
      : projects.filter((p) => p.category === activeCategory).slice(0, 6);

  const filterTabs = [
    { key: 'all', label: t.featuredProjects.filterAll },
    ...subsidiaries.slice(0, 6).map((s) => ({
      key: s.slug,
      label: localize(s.shortName),
    })),
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        {/* Section Header + Category Filter Pills */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              {t.featuredProjects.eyebrow}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-walnut dark:text-cream sm:text-4xl lg:text-5xl">
              {t.featuredProjects.title}
            </h2>
            <p className="mt-3 text-base text-ink/75 dark:text-cream/75">
              {t.featuredProjects.subtitle}
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/projects">
              <span>{t.featuredProjects.viewAll}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveCategory(tab.key)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeCategory === tab.key
                  ? 'bg-walnut text-cream shadow-sm dark:bg-bronze dark:text-ink'
                  : 'border border-walnut/15 bg-white/70 text-walnut hover:border-bronze dark:border-cream/15 dark:bg-walnut-900/60 dark:text-cream'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry Project Cards */}
        <div className="mt-10 columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
          {displayedProjects.map((project, idx) => {
            const heightClass =
              project.aspect === 'tall'
                ? 'h-80 sm:h-96'
                : project.aspect === 'wide'
                ? 'h-64 sm:h-72'
                : 'h-72 sm:h-80';

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedProject(project)}
                className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-2xl border border-walnut/15 bg-walnut shadow-luxury transition-all hover:border-bronze"
              >
                <div className={`relative w-full overflow-hidden ${heightClass}`}>
                  <img
                    src={withBasePath(project.image)}
                    alt={localize(project.alt)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-transparent" />

                  <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                    <span className="rounded-full border border-bronze/40 bg-walnut/90 px-3 py-1 text-[11px] font-semibold text-bronze">
                      {localize(project.woodLabel)}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-sm transition-colors group-hover:bg-bronze group-hover:text-ink">
                      <Maximize2 className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="flex items-center gap-3 text-xs text-cream/75">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-bronze" />
                        {localize(project.location)}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-bronze" />
                        {formatLocalizedNumber(project.year, locale)}
                      </span>
                    </div>

                    <h3 className="mt-2 text-xl font-bold text-cream group-hover:text-bronze transition-colors">
                      {localize(project.title)}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-cream/80">
                      {localize(project.summary)}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Project Dossier Lightbox Modal */}
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
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-bronze/40 bg-cream shadow-luxury-lg dark:bg-walnut-900"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-4 end-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-walnut/90 text-cream transition-colors hover:bg-bronze hover:text-ink"
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

                    <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-walnut/10 bg-walnut/5 p-3.5 text-xs dark:border-cream/10 dark:bg-ink/40">
                      <div>
                        <span className="text-ink/55 dark:text-cream/55 block">
                          {locale === 'fa' ? 'موقعیت:' : 'Location:'}
                        </span>
                        <strong className="text-walnut dark:text-cream">
                          {localize(selectedProject.location)}
                        </strong>
                      </div>
                      <div>
                        <span className="text-ink/55 dark:text-cream/55 block">
                          {locale === 'fa' ? 'متراژ / سال:' : 'Scale / Year:'}
                        </span>
                        <strong className="text-walnut dark:text-cream">
                          {formatLocalizedNumber(selectedProject.areaSqm, locale)} m² •{' '}
                          {formatLocalizedNumber(selectedProject.year, locale)}
                        </strong>
                      </div>
                      <div className="col-span-2">
                        <span className="text-ink/55 dark:text-cream/55 block">
                          {locale === 'fa' ? 'گونه چوب مصرفی:' : 'Timber Species:'}
                        </span>
                        <strong className="text-bronze">
                          {localize(selectedProject.woodLabel)}
                        </strong>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-bold text-walnut dark:text-cream mb-2">
                        {locale === 'fa' ? 'بخش‌های اجراشده:' : 'Commission Deliverables:'}
                      </p>
                      <ul className="space-y-1.5">
                        {localize(selectedProject.deliverables).map((d) => (
                          <li
                            key={d}
                            className="flex items-center gap-2 text-xs text-ink/80 dark:text-cream/80"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-moss shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-walnut/10 dark:border-cream/10">
                    <Button
                      variant="bronze"
                      size="sm"
                      onClick={() => {
                        const cat = selectedProject.category;
                        setSelectedProject(null);
                        openConsultationModal(cat);
                      }}
                    >
                      {locale === 'fa'
                        ? 'سفارش پروژه مشابه'
                        : 'Commission Similar Work'}
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/${selectedProject.category}`}>
                        {locale === 'fa' ? 'مشاهده آتلیه تخصصی' : 'Visit Atelier Page'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
