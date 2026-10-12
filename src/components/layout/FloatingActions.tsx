'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function FloatingActions() {
  const { locale } = useTranslation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 360);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 end-6 z-50 flex flex-col items-center gap-3">
      {/* Back to top button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          type="button"
          aria-label={locale === 'fa' ? 'بازگشت به بالای صفحه' : 'Back to top'}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-bronze/40 bg-walnut text-cream shadow-luxury transition-all hover:-translate-y-1 hover:bg-bronze hover:text-ink"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      {/* WhatsApp Direct Concierge */}
      <a
        href="https://wa.me/989120000000?text=Hello%20KARENWOOD%20Atelier"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={locale === 'fa' ? 'گفتگو در واتساپ با مشاوران کارن‌وود' : 'Chat on WhatsApp with Karenwood Concierge'}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-moss text-cream shadow-luxury transition-all hover:scale-105 hover:bg-moss-500"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="pointer-events-none absolute end-14 whitespace-nowrap rounded-lg bg-walnut px-3 py-1.5 text-xs font-medium text-cream opacity-0 shadow-md transition-opacity group-hover:opacity-100">
          {locale === 'fa' ? 'مشاوره آنلاین واتساپ' : 'WhatsApp Concierge'}
        </span>
      </a>
    </div>
  );
}
