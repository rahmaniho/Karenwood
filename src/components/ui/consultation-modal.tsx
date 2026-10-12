'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/hooks/useTranslation';
import { subsidiaries } from '@/data/subsidiaries';
import { Button } from '@/components/ui/button';

export function ConsultationModal() {
  const { consultationModalOpen, selectedSubsidiary, closeConsultationModal } = useAppStore();
  const { locale, localize } = useTranslation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState(selectedSubsidiary || 'kitchen');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (selectedSubsidiary) {
      setDivision(selectedSubsidiary);
    }
  }, [selectedSubsidiary]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && consultationModalOpen) {
        closeConsultationModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [consultationModalOpen, closeConsultationModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      const subject = encodeURIComponent(
        `KARENWOOD Private Consultation — ${division.toUpperCase()} (${name})`
      );
      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nAtelier Division: ${division}\n\nProject Brief:\n${notes}`
      );
      window.location.href = `mailto:atelier@karenwood.com?subject=${subject}&body=${body}`;
    }, 600);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    closeConsultationModal();
  };

  return (
    <AnimatePresence>
      {consultationModalOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-ink/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-bronze/35 bg-cream p-6 shadow-luxury-lg dark:bg-walnut-900 sm:p-8"
          >
            <button
              onClick={resetAndClose}
              aria-label={locale === 'fa' ? 'بستن پنجره' : 'Close dialog'}
              className="absolute top-5 end-5 flex h-9 w-9 items-center justify-center rounded-full border border-walnut/15 text-walnut transition-colors hover:bg-walnut hover:text-cream dark:border-cream/20 dark:text-cream"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-moss/20 text-moss">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h3 className="text-2xl font-bold text-walnut dark:text-cream">
                  {locale === 'fa'
                    ? 'درخواست مشاوره اختصاصی شما ثبت شد'
                    : 'Private Consultation Request Registered'}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-cream/75">
                  {locale === 'fa'
                    ? 'معمار ارشد زیرمجموعه انتخابی حداکثر ظرف ۲ ساعت کاری با شما تماس خواهد گرفت. همچنین پیش‌نویس ایمیل برای شما آماده شد.'
                    : 'A senior architect from your selected Karenwood atelier will contact you within 2 business hours.'}
                </p>
                <Button variant="bronze" className="mt-6" onClick={resetAndClose}>
                  {locale === 'fa' ? 'بازگشت به آتلیه کارن‌وود' : 'Return to Atelier'}
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-bronze">
                    <Sparkles className="h-3.5 w-3.5" />
                    {locale === 'fa' ? 'آتلیه خصوصی کارن‌وود' : 'KARENWOOD PRIVATE CONCIERGE'}
                  </span>
                  <h3
                    id="consultation-modal-title"
                    className="mt-1.5 text-2xl font-bold text-walnut dark:text-cream"
                  >
                    {locale === 'fa'
                      ? 'رزرو جلسه مشاوره با معماران ارشد'
                      : 'Book a Private Architectural Consultation'}
                  </h3>
                  <p className="mt-1 text-sm text-ink/70 dark:text-cream/70">
                    {locale === 'fa'
                      ? 'مشخصات پروژه خود را وارد کنید تا جلسه حضوری در شوروم فرشته یا بازدید از محل پروژه هماهنگ شود.'
                      : 'Share your brief to schedule an appointment at our Fereshteh Flagship Showroom or an on-site laser survey.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-walnut dark:text-cream/85">
                        {locale === 'fa' ? 'نام و نام خانوادگی *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={locale === 'fa' ? 'مثلاً: مهندس آرمان راد' : 'e.g. Arman Rad'}
                        className="w-full rounded-lg border border-walnut/20 bg-white/80 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-bronze dark:border-cream/15 dark:bg-ink/60 dark:text-cream"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-walnut dark:text-cream/85">
                        {locale === 'fa' ? 'شماره تماس مستقیم *' : 'Direct Phone *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={locale === 'fa' ? '۰۹۱۲xxxxxxx' : '+98 912 ...'}
                        className="w-full rounded-lg border border-walnut/20 bg-white/80 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-bronze dark:border-cream/15 dark:bg-ink/60 dark:text-cream"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-walnut dark:text-cream/85">
                        {locale === 'fa' ? 'ایمیل کاری' : 'Professional Email'}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="architect@studio.com"
                        className="w-full rounded-lg border border-walnut/20 bg-white/80 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-bronze dark:border-cream/15 dark:bg-ink/60 dark:text-cream"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-walnut dark:text-cream/85">
                        {locale === 'fa' ? 'زیرمجموعه تخصصی' : 'Specialized Atelier'}
                      </label>
                      <select
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        className="w-full rounded-lg border border-walnut/20 bg-white/80 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-bronze dark:border-cream/15 dark:bg-ink/60 dark:text-cream"
                      >
                        {subsidiaries.map((sub) => (
                          <option key={sub.slug} value={sub.slug}>
                            {localize(sub.shortName)} ({sub.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-walnut dark:text-cream/85">
                      {locale === 'fa'
                        ? 'شرح مختصر پروژه، موقعیت و متراژ تقریبی'
                        : 'Project Location, Scale & Timber Preferences'}
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={
                        locale === 'fa'
                          ? 'مثال: ویلای ۴۵۰ متری در لواسان، نیازمند طراحی آشپزخانه گردوی سیاه و درب ورودی پیوت...'
                          : 'e.g. 450 sqm penthouse requiring a monolith walnut kitchen and custom chevron oak parquet...'
                      }
                      className="w-full rounded-lg border border-walnut/20 bg-white/80 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-bronze dark:border-cream/15 dark:bg-ink/60 dark:text-cream"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <Button type="button" variant="ghost" onClick={resetAndClose}>
                      {locale === 'fa' ? 'انصراف' : 'Cancel'}
                    </Button>
                    <Button type="submit" variant="bronze">
                      <Send className="h-4 w-4" />
                      {locale === 'fa' ? 'ثبت و هماهنگی جلسه' : 'Submit Consultation Request'}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
