'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { CtaSection } from '@/components/sections/CtaSection';

const faqItems = [
  {
    q: {
      fa: 'فرآیند ثبت سفارش در هلدینگ کارن‌وود چگونه آغاز می‌شود؟',
      en: 'How does a bespoke commission begin at KARENWOOD?',
    },
    a: {
      fa: 'پس از ثبت درخواست مشاوره، جلسه‌ای در شوروم فرشته یا به صورت آنلاین با حضور معمار ارشد زیرمجموعه مرتبط برگزار می‌شود. سپس تیم فنی با اسکنر لیزری سه‌بعدی (LiDAR) ابعاد دقیق فضا را برداشت کرده و طرح سه‌بعدی همراه با جعبه نمونه چوب و برآورد شفاف ارائه می‌گردد.',
      en: 'Every commission begins with a private briefing at our Fereshteh Atelier or online. Our engineering team then performs a sub-millimeter 3D LiDAR site survey and presents photorealistic grain-mapped renders alongside physical timber sample boxes.',
    },
  },
  {
    q: {
      fa: 'آیا امکان اجرای هم‌زمان چند بخش (مثلاً آشپزخانه، پارکت، درب و پله) با یک پالت چوب واحد وجود دارد؟',
      en: 'Can multiple divisions (kitchen, parquet, doors, stairs) be grain-matched from the same timber batch?',
    },
    a: {
      fa: 'بله؛ بزرگ‌ترین مزیت رقابتی هلدینگ کارن‌وود دقیقاً همین یکپارچگی است. تمام ۱۰ زیرمجموعه از یک خزانه الوار و یک آزمایشگاه رنگ و روغن گیاهی تغذیه می‌شوند تا کد رنگ و بافت چوب در کل عمارت شما ۱۰۰٪ همگن باشد.',
      en: 'Yes — this is the defining advantage of the Karenwood Holding ecosystem. All 10 specialized ateliers draw from our central timber vault and finishing lab, guaranteeing 100% tonal and grain harmony across your entire residence.',
    },
  },
  {
    q: {
      fa: 'ضمانت ۲۵ ساله کارن‌وود شامل چه مواردی می‌شود؟',
      en: 'What does Karenwood’s 25-year written warranty cover?',
    },
    a: {
      fa: 'ضمانت‌نامه کتبی ما شامل پایداری ساختاری چوب در برابر ترک‌خوردگی یا تاب‌برداشتن، سلامت اتصالات کام و زبانه، عملکرد یراق‌آلات هیدرولیک و مقاومت پوشش‌های ضدآب در شرایط بهره‌برداری استاندارد است.',
      en: 'Our numbered warranty covers structural timber stability against warping or splitting, integrity of mortise-and-tenon joinery, hydraulic hardware performance, and waterproof coating endurance.',
    },
  },
  {
    q: {
      fa: 'چوب‌های مصرفی کارن‌وود از کجا تامین می‌شوند و چگونه خشک می‌گردند؟',
      en: 'Where is Karenwood timber sourced and how is it seasoned?',
    },
    a: {
      fa: 'الوارهای گردوی سیاه، بلوط سفید، ساج برمه، هینوکی ژاپن و ترمووود فنلاند از جنگل‌های دارای گواهی FSC وارد شده و الوارهای گردوی ایرانی صرفاً از درختان احیاشده و باغی تامین می‌گردند. تمامی چوب‌ها پس از ۱۸ ماه تنفس طبیعی، در کوره‌های خلاء ایتالیایی تا رطوبت ۸٪ تثبیت می‌شوند.',
      en: 'We source FSC-certified American Black Walnut, European White Oak, Burmese Teak, Japanese Hinoki, and Finnish Thermowood alongside salvaged heritage Persian Walnut, seasoned for 18 months and stabilized to 8% MC in Italian vacuum kilns.',
    },
  },
  {
    q: {
      fa: 'آیا خدمات نصب در شهرهای خارج از تهران و کشورهای منطقه نیز ارائه می‌شود؟',
      en: 'Do you install projects outside Tehran and internationally?',
    },
    a: {
      fa: 'بله؛ تیم‌های نصب مقیم کارن‌وود (White-Glove Fitters) در سراسر ایران (شمال، اصفهان، شیراز، مشهد، کیش و...) و همچنین پروژه‌های بین‌المللی در منطقه خلیج فارس و قفقاز با بسته‌بندی استاندارد موزه‌ای فعالیت می‌کنند.',
      en: 'Yes. Our in-house white-glove installation teams travel nationwide and across the Middle East, shipping components in climate-buffered architectural crates.',
    },
  },
  {
    q: {
      fa: 'چگونه از سطوح چوبی روغن‌کاری‌شده در طول سالیان نگهداری کنیم؟',
      en: 'How should botanical oil-finished wood surfaces be cared for?',
    },
    a: {
      fa: 'برای نظافت روزانه تنها یک دستمال میکروفایبر مرطوب کافی است. همچنین به همراه هر پروژه، «کیت مراقبت گیاهی کارن‌وود» شامل صابون گیاهی و موم احیاگر تحویل می‌شود و سرویس سال اول به صورت رایگان توسط تیم ما انجام می‌گیرد.',
      en: 'Daily care requires only a damp microfiber cloth. Every patron receives a complimentary Karenwood Botanical Care Kit and a free first-year maintenance inspection by our artisans.',
    },
  },
];

export default function FaqPage() {
  const { locale, localize } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <div className="min-h-screen">
      <section className="bg-walnut py-16 text-cream lg:py-24">
        <div className="container text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-bronze/40 bg-ink/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-bronze">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>{locale === 'fa' ? 'مرکز راهنمای کارفرمایان' : 'PATRON KNOWLEDGE BASE'}</span>
          </span>
          <h1 className="mt-4 text-3xl font-bold text-cream sm:text-5xl">
            {locale === 'fa'
              ? 'سوالات متداول درباره سفارش، ساخت و ضمانت'
              : 'Frequently Asked Questions'}
          </h1>
          <p className="mt-4 text-base text-cream/80">
            {locale === 'fa'
              ? 'پاسخ به مهم‌ترین پرسش‌های معماران و کارفرمایان پیرامون فرآیند مهندسی و اجرای آثار چوبی کارن‌وود.'
              : 'Everything architects and private patrons need to know about commissioning, timber science, and lifetime care.'}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container max-w-3xl space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-walnut/15 bg-white/90 shadow-luxury dark:border-cream/12 dark:bg-walnut-900/90"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-start font-bold text-walnut dark:text-cream"
                >
                  <span className="text-base sm:text-lg">{localize(item.q)}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-bronze transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-walnut/10 px-6 pb-6 pt-4 text-sm leading-relaxed text-ink/80 dark:border-cream/10 dark:text-cream/80">
                    {localize(item.a)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
