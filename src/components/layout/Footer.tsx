'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowUpRight, ArrowUpLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { subsidiaries } from '@/data/subsidiaries';
import { withBasePath } from '@/lib/utils';
import { KarenSoftCredit } from '@/components/layout/KarenSoftCredit';

export function Footer() {
  const { locale, t, localize, isRTL } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden border-t border-bronze/25 bg-walnut text-cream">
      {/* Subtle Wood Grain Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${withBasePath('/images/patterns/wood-grain.jpg')})`,
          backgroundSize: '360px 360px',
        }}
      />

      <div className="container relative z-10 py-16 lg:py-20">
        {/* Top Row: Brand + Newsletter */}
        <div className="mb-14 grid grid-cols-1 gap-8 border-b border-cream/12 pb-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Link href="/" className="inline-block">
              <img
                src={withBasePath('/logo-dark.svg')}
                alt="KARENWOOD Holding"
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/80">
              {t.footer.description}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-bronze/30 bg-ink/40 p-5 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-bronze">
                {t.footer.newsletterTitle}
              </p>
              {subscribed ? (
                <div className="mt-3 flex items-center gap-2 text-sm text-moss-200">
                  <CheckCircle2 className="h-4 w-4 text-bronze shrink-0" />
                  <span>{t.footer.newsletterSuccess}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.footer.newsletterPlaceholder}
                    aria-label={t.footer.newsletterTitle}
                    className="min-w-0 flex-1 rounded-lg border border-cream/20 bg-walnut-900/90 px-3.5 py-2.5 text-xs text-cream placeholder:text-cream/45 outline-none focus:border-bronze"
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-bronze px-4 py-2.5 text-xs font-bold text-ink transition-colors hover:bg-bronze-300"
                  >
                    <span>{t.footer.newsletterBtn}</span>
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* 10 Subsidiaries (5 cols) */}
          <div className="lg:col-span-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-bronze">
              {t.footer.subsidiariesTitle}
            </h3>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {subsidiaries.map((sub) => (
                <li key={sub.slug}>
                  <Link
                    href={sub.route}
                    className="group inline-flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-bronze"
                  >
                    <span className="font-mono text-[10px] text-bronze/75">{sub.code}</span>
                    <span>{localize(sub.shortName)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-bronze">
              {t.footer.quickLinksTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-cream/80 transition-colors hover:text-bronze">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-cream/80 transition-colors hover:text-bronze">
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/80 transition-colors hover:text-bronze">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-cream/80 transition-colors hover:text-bronze">
                  {t.nav.blog}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-cream/80 transition-colors hover:text-bronze">
                  {t.nav.faq}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream/80 transition-colors hover:text-bronze">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-cream/80 transition-colors hover:text-bronze">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-cream/80 transition-colors hover:text-bronze">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Showroom & Factory Contact (4 cols) */}
          <div className="lg:col-span-4">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-bronze">
              {t.footer.contactTitle}
            </h3>
            <ul className="space-y-3.5 text-sm text-cream/85">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-bronze" />
                <div>
                  <p>{t.footer.address}</p>
                  <p className="mt-1 text-xs text-cream/60">{t.footer.factoryAddress}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-bronze" />
                <a
                  href="tel:+982122048900"
                  className="hover:text-bronze transition-colors"
                  dir="ltr"
                >
                  {t.footer.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-bronze" />
                <a
                  href="mailto:atelier@karenwood.com"
                  className="hover:text-bronze transition-colors"
                >
                  {t.footer.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
                <span className="text-xs text-cream/75">{t.footer.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/12 pt-8 text-xs text-cream/65 lg:flex-row">
          <p className="text-center lg:text-start">{t.footer.copyright}</p>
          <KarenSoftCredit />
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-bronze transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="hover:text-bronze transition-colors">
              {t.footer.terms}
            </Link>
            <Link href="/faq" className="hover:text-bronze transition-colors">
              {t.footer.faq}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
