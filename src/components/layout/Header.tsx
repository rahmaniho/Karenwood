'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  ArrowUpLeft,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/lib/store';
import { subsidiaries, Subsidiary } from '@/data/subsidiaries';
import { withBasePath, formatLocalizedNumber } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();
  const { locale, t, localize, isRTL } = useTranslation();
  const theme = useAppStore((s) => s.theme);
  const openConsultationModal = useAppStore((s) => s.openConsultationModal);

  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSub, setActiveSub] = useState<Subsidiary>(subsidiaries[0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 28);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/projects', label: t.nav.projects },
    { href: '/gallery', label: t.nav.gallery },
    { href: '/about', label: t.nav.about },
    { href: '/blog', label: t.nav.blog },
    { href: '/faq', label: t.nav.faq },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[120] focus:rounded-lg focus:bg-bronze focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
      >
        {locale === 'fa' ? 'پرش به محتوای اصلی' : 'Skip to main content'}
      </a>

      <header
        onMouseLeave={() => setMegaOpen(false)}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-walnut/12 bg-cream/92 py-2.5 shadow-luxury backdrop-blur-xl dark:border-cream/10 dark:bg-ink/92'
            : 'border-b border-walnut/10 bg-cream/80 py-4 backdrop-blur-md dark:border-cream/10 dark:bg-ink/80'
        }`}
      >
        <div className="container flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none"
            aria-label="KARENWOOD Home"
          >
            <img
              src={withBasePath(theme === 'dark' ? '/logo-dark.svg' : '/logo.svg')}
              alt={
                locale === 'fa'
                  ? 'لوگوی هلدینگ صنایع چوب کارن‌وود'
                  : 'KARENWOOD Luxury Wood Holding Logo'
              }
              className={`w-auto transition-all duration-300 ${
                scrolled ? 'h-10 sm:h-11' : 'h-11 sm:h-12'
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label={locale === 'fa' ? 'منوی اصلی' : 'Primary Navigation'}
            className="hidden xl:flex items-center gap-1"
          >
            <Link
              href="/"
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'text-bronze font-semibold'
                  : 'text-walnut hover:text-bronze dark:text-cream/90 dark:hover:text-bronze'
              }`}
            >
              {t.nav.home}
            </Link>

            {/* Mega Menu Trigger */}
            <div className="relative" onMouseEnter={() => setMegaOpen(true)}>
              <button
                type="button"
                onClick={() => setMegaOpen((prev) => !prev)}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  megaOpen
                    ? 'bg-walnut/5 text-bronze dark:bg-cream/10'
                    : 'text-walnut hover:text-bronze dark:text-cream/90 dark:hover:text-bronze'
                }`}
              >
                <span>{t.nav.subsidiaries}</span>
                <span className="rounded-full bg-bronze/20 px-1.5 py-0.5 text-[10px] font-bold text-walnut dark:text-bronze">
                  {formatLocalizedNumber(10, locale)}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    megaOpen ? 'rotate-180 text-bronze' : ''
                  }`}
                />
              </button>
            </div>

            {navLinks.slice(1).map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-bronze font-semibold'
                      : 'text-walnut hover:text-bronze dark:text-cream/90 dark:hover:text-bronze'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls: Language, Theme, CTA, Mobile Menu */}
          <div className="flex items-center gap-2.5">
            <LanguageSwitcher />
            <ThemeToggle />

            <Button
              variant="default"
              size="sm"
              onClick={() => openConsultationModal()}
              className="hidden sm:inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5 text-bronze" />
              <span>{t.nav.requestConsultation}</span>
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={locale === 'fa' ? 'باز کردن منوی موبایل' : 'Toggle mobile menu'}
              aria-expanded={mobileOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-walnut/20 text-walnut xl:hidden dark:border-cream/20 dark:text-cream"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu with Live Image Previews */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="hidden xl:block absolute inset-x-0 top-full border-b border-bronze/30 bg-cream/98 shadow-luxury-lg backdrop-blur-2xl dark:bg-walnut-950/98"
            >
              <div className="container py-7">
                <div className="grid grid-cols-12 gap-8">
                  {/* 10 Subsidiaries Grid (8 columns) */}
                  <div className="col-span-8">
                    <div className="mb-3 flex items-center justify-between border-b border-walnut/10 pb-2.5 dark:border-cream/10">
                      <span className="text-xs font-semibold uppercase tracking-widest text-bronze">
                        {t.subsidiariesSection.eyebrow}
                      </span>
                      <span className="text-xs text-ink/60 dark:text-cream/60">
                        {t.nav.holdingTagline}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {subsidiaries.map((sub) => {
                        const isHovered = activeSub.slug === sub.slug;
                        return (
                          <Link
                            key={sub.slug}
                            href={sub.route}
                            onMouseEnter={() => setActiveSub(sub)}
                            onClick={() => setMegaOpen(false)}
                            className={`group flex items-start gap-3.5 rounded-xl p-3 transition-all ${
                              isHovered
                                ? 'bg-walnut text-cream shadow-md dark:bg-bronze/20 dark:text-cream'
                                : 'hover:bg-walnut/5 dark:hover:bg-cream/5'
                            }`}
                          >
                            <img
                              src={withBasePath(sub.image)}
                              alt={localize(sub.alt)}
                              className="h-12 w-16 shrink-0 rounded-lg border border-bronze/30 object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <span
                                  className={`text-sm font-bold truncate ${
                                    isHovered
                                      ? 'text-cream'
                                      : 'text-walnut dark:text-cream'
                                  }`}
                                >
                                  {localize(sub.shortName)}
                                </span>
                                <span className="text-[10px] font-mono text-bronze">
                                  {sub.code}
                                </span>
                              </div>
                              <p
                                className={`mt-0.5 line-clamp-1 text-xs ${
                                  isHovered
                                    ? 'text-cream/80'
                                    : 'text-ink/65 dark:text-cream/65'
                                }`}
                              >
                                {localize(sub.tagline)}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Preview Showcase Card (4 columns) */}
                  <div className="col-span-4 flex flex-col justify-between rounded-2xl border border-bronze/35 bg-walnut p-5 text-cream shadow-luxury">
                    <div>
                      <div className="relative overflow-hidden rounded-xl border border-bronze/30 bg-ink">
                        <img
                          src={withBasePath(activeSub.image)}
                          alt={localize(activeSub.alt)}
                          className="h-44 w-full object-cover transition-transform duration-500"
                        />
                        <span className="absolute top-3 start-3 rounded-full bg-walnut/90 px-3 py-1 text-[11px] font-semibold text-bronze border border-bronze/30">
                          {activeSub.code}
                        </span>
                      </div>

                      <h4 className="mt-4 text-lg font-bold text-cream">
                        {localize(activeSub.name)}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-cream/80 line-clamp-3">
                        {localize(activeSub.description)}
                      </p>
                    </div>

                    <div className="mt-4 border-t border-cream/15 pt-3.5">
                      <div className="flex items-center justify-between text-xs text-cream/80 mb-3">
                        <span className="inline-flex items-center gap-1 text-bronze">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {formatLocalizedNumber(activeSub.stats.warrantyYears, locale)}{' '}
                          {locale === 'fa' ? 'سال ضمانت کتبی' : 'Yr Warranty'}
                        </span>
                        <span>
                          {formatLocalizedNumber(activeSub.stats.projectsCount, locale)}+{' '}
                          {t.subsidiariesSection.projectsCountSuffix}
                        </span>
                      </div>

                      <Link
                        href={activeSub.route}
                        onClick={() => setMegaOpen(false)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-bronze px-4 py-2.5 text-xs font-bold text-ink transition-colors hover:bg-bronze-300"
                      >
                        <span>{t.subsidiariesSection.exploreBtn}</span>
                        <ArrowIcon className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden overflow-hidden border-t border-walnut/10 bg-cream dark:border-cream/10 dark:bg-walnut-950"
            >
              <div className="container max-h-[82vh] overflow-y-auto py-5 space-y-5">
                <div className="flex flex-col space-y-1">
                  {navLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-base font-medium text-walnut hover:bg-walnut/5 dark:text-cream dark:hover:bg-cream/5"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-walnut/10 pt-4 dark:border-cream/10">
                  <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-bronze">
                    {t.nav.subsidiaries} ({formatLocalizedNumber(10, locale)})
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {subsidiaries.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={sub.route}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-xl border border-walnut/10 bg-white/60 p-2.5 dark:border-cream/10 dark:bg-walnut-900/60"
                      >
                        <img
                          src={withBasePath(sub.image)}
                          alt={localize(sub.alt)}
                          className="h-10 w-14 rounded-md object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-walnut dark:text-cream truncate">
                            {localize(sub.shortName)}
                          </p>
                          <p className="text-[11px] text-ink/60 dark:text-cream/60 truncate">
                            {localize(sub.tagline)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="bronze"
                    className="w-full"
                    onClick={() => {
                      setMobileOpen(false);
                      openConsultationModal();
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>{t.nav.requestConsultation}</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
