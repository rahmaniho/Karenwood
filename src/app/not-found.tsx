'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Home } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const { locale } = useTranslation();

  return (
    <section className="flex min-h-[75vh] items-center justify-center py-20">
      <div className="container max-w-2xl text-center">
        {/* Custom Concentric Wood Ring 404 SVG */}
        <div className="mx-auto mb-8 flex h-44 w-44 items-center justify-center rounded-full border border-bronze/40 bg-walnut text-cream shadow-luxury-lg">
          <svg viewBox="0 0 160 160" className="h-40 w-40">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#C8A165"
              strokeWidth="1.2"
              strokeDasharray="8 5"
              opacity="0.5"
            />
            <circle
              cx="80"
              cy="80"
              r="54"
              fill="none"
              stroke="#7A8B6F"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <circle
              cx="80"
              cy="80"
              r="38"
              fill="none"
              stroke="#C8A165"
              strokeWidth="1.5"
            />
            <text
              x="80"
              y="88"
              textAnchor="middle"
              fill="#F5F1EA"
              fontFamily="Georgia, serif"
              fontSize="28"
              fontWeight="bold"
            >
              404
            </text>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-walnut dark:text-cream sm:text-4xl">
          {locale === 'fa'
            ? 'این مسیر در جنگل کارن‌وود یافت نشد'
            : 'This Path Through the Timber Was Not Found'}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-cream/75 sm:text-base">
          {locale === 'fa'
            ? 'صفحه‌ای که به دنبال آن هستید جابه‌جا شده یا وجود ندارد. می‌توانید به آتلیه اصلی یا گالری پروژه‌ها بازگردید.'
            : 'The page you are looking for may have moved. Return to our main atelier or explore our portfolio.'}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="bronze" size="lg">
            <Link href="/">
              <Home className="h-4 w-4" />
              <span>{locale === 'fa' ? 'بازگشت به صفحه اصلی' : 'Return to Atelier Home'}</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">
              <Compass className="h-4 w-4" />
              <span>{locale === 'fa' ? 'مشاهده گالری پروژه‌ها' : 'Explore Projects'}</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
