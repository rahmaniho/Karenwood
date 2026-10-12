'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Cpu, Trees, ShieldCheck, Compass, Feather } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { withBasePath, formatLocalizedNumber } from '@/lib/utils';
import { StatsSection } from '@/components/sections/StatsSection';
import { CtaSection } from '@/components/sections/CtaSection';

const timeline = [
  {
    year: 1998,
    title: {
      fa: 'تاسیس کارگاه استادکاری رادمهر در تهران',
      en: 'Founding of Radmehr Master Joinery Atelier',
    },
    desc: {
      fa: 'آغاز فعالیت به عنوان آتلیه تخصصی ساخت مبلمان و گره‌چینی چوب گردو با تکیه بر اتصالات سنتی بدون میخ.',
      en: 'Established as a boutique hand-joinery workshop crafting heirloom Persian Walnut commissions using nail-free mortise techniques.',
    },
  },
  {
    year: 2006,
    title: {
      fa: 'راه‌اندازی خطوط تخصصی درب، کفپوش و آشپزخانه چوبی',
      en: 'Expansion into Architectural Doors, Parquet & Kitchens',
    },
    desc: {
      fa: 'واردات نخستین کوره‌های خشک‌کن خلاء ایتالیایی و آغاز تولید پارکت‌های مهندسی‌شده و آشپزخانه‌های تمام‌چوب.',
      en: 'Commissioned Italian vacuum kilns and launched dedicated divisions for bespoke culinary cabinetry and engineered parquet.',
    },
  },
  {
    year: 2015,
    title: {
      fa: 'افتتاح پردیس صنعتی ۴۲,۰۰۰ متری و رباتیک ۵ محوره آلمان',
      en: 'Inauguration of the 42,000 m² Jajrud Industrial Campus',
    },
    desc: {
      fa: 'تجهیز خطوط تولید به ماشین‌آلات ۵ محوره CNC هومگ آلمان و آزمایشگاه فرآوری هیدروترمال چوب‌های ضدآب حمام و فضای باز.',
      en: 'Integrated German 5-axis CNC robotics and hydro-thermal wood modification labs for waterproof spa and exterior structures.',
    },
  },
  {
    year: 2026,
    title: {
      fa: 'هلدینگ ۱۰گانه کارن‌وود؛ مرجع معماری چوب لوکس در منطقه',
      en: 'KARENWOOD 10-Division Luxury Wood Holding',
    },
    desc: {
      fa: 'همکاری با بیش از ۳۰۰ دفتر معماری برجسته و اجرای بیش از ۱,۴۸۰ پروژه شاخص مسکونی، ویلایی و دیپلماتیک.',
      en: 'Collaborating with over 300 leading architecture studios with 1,480+ completed landmark commissions across 10 specialized ateliers.',
    },
  },
];

const teamMembers = [
  {
    avatar: '/images/team/team-1.jpg',
    name: { fa: 'مهندس کوروش رادمهر', en: 'Kourosh Radmehr' },
    role: { fa: 'بنیان‌گذار و معمار ارشد هلدینگ', en: 'Founder & Principal Architect' },
    bio: {
      fa: 'فارغ‌التحصیل معماری از پلی‌تکنیک میلان با ۲۸ سال تجربه در طراحی سازه‌های چوبی مانیومنتال و احیای الوارهای کهنسال.',
      en: 'Politecnico di Milano alumnus with 28 years of mastery in monumental timber architecture and heritage slab curation.',
    },
  },
  {
    avatar: '/images/team/team-2.jpg',
    name: { fa: 'آوا رستمی', en: 'Ava Rostami' },
    role: { fa: 'مدیر ارشد طراحی داخلی و وابی‌سابی', en: 'Head of Interior & Wabi-Sabi Design' },
    bio: {
      fa: 'متخصص زیبایی‌شناسی Japandi و پیوند مینیمالیسم اسکاندیناوی با روح وابی‌سابی ژاپنی در فضاهای مسکونی لوکس.',
      en: 'Specialist in Japandi spatial harmony, uniting Scandinavian purism with tactile Japanese wabi-sabi materiality.',
    },
  },
  {
    avatar: '/images/team/team-3.jpg',
    name: { fa: 'استاد سهراب موحد', en: 'Master Sohrab Movahed' },
    role: { fa: 'مدیر استادکاران و اتصالات سنتی', en: 'Master Artisan & Joinery Director' },
    bio: {
      fa: 'نگهدارنده دانش ۴۰ اتصال قفل‌شونده چوبی بدون میخ، کومیکو ژاپنی و گره‌چینی اصیل ایرانی در آتلیه کارن آرت.',
      en: 'Custodian of 40 interlocking nail-free joinery geometries, Japanese Kumiko latticework, and Persian Orosi craft.',
    },
  },
  {
    avatar: '/images/team/team-4.jpg',
    name: { fa: 'دکتر ترانه فرزاد', en: 'Dr. Taraneh Farzad' },
    role: { fa: 'مدیر مهندسی چوب، نانوفناوری و پایداری', en: 'Timber Science & Sustainability Lead' },
    bio: {
      fa: 'دکترای علوم و صنایع چوب؛ سرپرست آزمایشگاه پوشش‌های گیاهی نانو، خشک‌کن‌های خلاء و زنجیره تامین FSC.',
      en: 'Ph.D. in Wood Science directing our vacuum kiln stabilization, hydrophobic bio-ceramic coatings, and FSC forestry.',
    },
  },
];

const values = [
  {
    icon: Compass,
    title: { fa: 'خلوص معماری اسکاندیناوی', en: 'Scandinavian Architectural Clarity' },
    desc: {
      fa: 'حذف زواید بصری و تمرکز بر تناسبات طلایی، خطوط خالص و عملکرد بی‌نقص هر قطعه در فضا.',
      en: 'Eliminating visual noise in favor of golden proportions, quiet lines, and effortless daily ergonomics.',
    },
  },
  {
    icon: Feather,
    title: { fa: 'اصالت وابی‌سابی ژاپنی', en: 'Japanese Wabi-Sabi Honesty' },
    desc: {
      fa: 'احترام به رگه‌ها، گره‌ها و تاریخ طبیعی هر درخت بدون پنهان‌کاری زیر رنگ‌های شیمیایی مصنوعی.',
      en: 'Honoring the organic figure, natural knots, and living soul of every tree without synthetic plasticized films.',
    },
  },
  {
    icon: Cpu,
    title: { fa: 'هم‌افزایی رباتیک و دست‌ساز', en: '5-Axis Robotics × Artisan Hand' },
    desc: {
      fa: 'دقت ۰.۰۲ میلی‌متری ماشین‌آلات ۵ محوره آلمانی در کنار پرداخت نهایی با رنده‌های دستی ژاپنی (Kanna).',
      en: '0.02mm German 5-axis CNC precision finished by hand with traditional Japanese Kanna planes and natural oils.',
    },
  },
  {
    icon: Trees,
    title: { fa: 'جنگل‌داری پایدار و میراث سبز', en: 'FSC Stewardship & Reforestation' },
    desc: {
      fa: 'استفاده ۱۰۰٪ از چوب‌های دارای گواهی FSC یا درختان احیاشده و کاشت ۳ نهال به ازای هر پروژه.',
      en: '100% FSC-certified or salvaged orchard timber backed by our 3-for-1 native sapling reforestation program.',
    },
  },
];

export default function AboutPage() {
  const { locale, localize } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-walnut py-20 text-cream lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${withBasePath('/images/patterns/wood-grain.jpg')})`,
            backgroundSize: '360px 360px',
          }}
        />
        <div className="container relative z-10 text-center max-w-4xl">
          <span className="inline-block rounded-full border border-bronze/40 bg-ink/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-bronze">
            {locale === 'fa' ? 'داستان و میراث کارن‌وود' : 'THE KARENWOOD HERITAGE'}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-cream sm:text-5xl lg:text-6xl">
            {locale === 'fa'
              ? 'بیست‌وهشت سال هم‌زیستی عاشقانه با شریف‌ترین عنصر طبیعت'
              : 'Twenty-Eight Years of Reverence for Living Timber'}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-cream/85 sm:text-lg">
            {locale === 'fa'
              ? 'از یک آتلیه کوچک گره‌چینی و مبلمان دست‌ساز در سال ۱۳۷۷ تا بزرگ‌ترین هلدینگ ۱۰گانه معماری و مهندسی چوب لوکس؛ فلسفه ما همواره یک چیز بوده است: خلق آثاری که نسل‌ها به ارث می‌برند.'
              : 'From a boutique hand-joinery studio in 1998 to a 10-division architectural holding, our mission has remained singular: crafting heirloom woodwork that outlives generations.'}
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-bronze">
              {locale === 'fa' ? 'ارزش‌های بنیادین' : 'PHILOSOPHICAL PILLARS'}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-walnut dark:text-cream sm:text-4xl">
              {locale === 'fa'
                ? 'چهار ستون فرهنگ ساخت در کارن‌وود'
                : 'Four Pillars of the Karenwood Atelier'}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl border border-walnut/15 bg-white/85 p-6 shadow-luxury dark:border-cream/12 dark:bg-walnut-900/85"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-walnut text-bronze">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-walnut dark:text-cream">
                    {localize(val.title)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink/75 dark:text-cream/75">
                    {localize(val.desc)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Heritage Timeline */}
      <section className="border-y border-walnut/10 bg-cream-300/35 py-20 dark:border-cream/10 dark:bg-walnut-950/60 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-bronze">
              {locale === 'fa' ? 'مسیر تکامل هلدینگ' : 'CHRONICLE OF MASTERY'}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-walnut dark:text-cream sm:text-4xl">
              {locale === 'fa' ? 'تاریخچه کارن‌وود (۱۹۹۸ تا ۲۰۲۶)' : 'Our Journey (1998 – 2026)'}
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-2xl border border-bronze/35 bg-white/90 p-6 shadow-luxury dark:bg-walnut-900/90"
              >
                <span className="font-serif text-3xl font-bold text-bronze">
                  {formatLocalizedNumber(item.year, locale)}
                </span>
                <h3 className="mt-3 text-base font-bold text-walnut dark:text-cream">
                  {localize(item.title)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/75 dark:text-cream/75">
                  {localize(item.desc)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Master Artisans Team */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-bronze">
              {locale === 'fa' ? 'رهبران و استادکاران' : 'MASTER ARCHITECTS & ARTISANS'}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-walnut dark:text-cream sm:text-4xl">
              {locale === 'fa'
                ? 'چهره‌های خلاق پشت امضای کارن‌وود'
                : 'The Minds & Hands Behind Karenwood'}
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="overflow-hidden rounded-2xl border border-walnut/15 bg-white/90 shadow-luxury dark:border-cream/12 dark:bg-walnut-900/90"
              >
                <div className="bg-walnut p-4">
                  <img
                    src={withBasePath(member.avatar)}
                    alt={localize(member.name)}
                    className="mx-auto h-52 w-52 rounded-2xl object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-walnut dark:text-cream">
                    {localize(member.name)}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-bronze">
                    {localize(member.role)}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-ink/75 dark:text-cream/75">
                    {localize(member.bio)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops & Industrial Campus */}
      <section className="border-t border-walnut/10 py-20 dark:border-cream/10">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-bronze/35 bg-walnut p-8 text-cream shadow-luxury-lg lg:grid-cols-12 sm:p-12">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-bronze">
                {locale === 'fa' ? 'پردیس صنعتی و آزمایشگاه‌ها' : 'INDUSTRIAL CAMPUS & LABS'}
              </span>
              <h2 className="text-2xl font-bold sm:text-4xl">
                {locale === 'fa'
                  ? '۴۲,۰۰۰ مترمربع شهرک اختصاصی مهندسی چوب، فلز برنز و سنگ'
                  : '42,000 m² Integrated Timber, Bronze & Stone Campus'}
              </h2>
              <p className="text-sm leading-relaxed text-cream/85 sm:text-base">
                {locale === 'fa'
                  ? 'پردیس صنعتی کارن‌وود شامل ۱۰ سالن مجزا برای هر زیرمجموعه، خزانه نگهداری اسلب‌های ۲۰۰ ساله، ۶ کوره خشک‌کن خلاء هوشمند، خطوط ۵ محوره CNC آلمانی، کارگاه ریخته‌گری برنز و اتاق‌های کلین‌روم روغن‌کاری گیاهی است.'
                  : 'Our campus houses 10 specialized fabrication halls, a climate-controlled heritage slab vault, 6 Italian vacuum kilns, German 5-axis CNC centers, an in-house bronze foundry, and positive-pressure botanical finishing cleanrooms.'}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-3 sm:grid-cols-3">
                <div className="rounded-xl border border-cream/15 bg-ink/40 p-3.5">
                  <ShieldCheck className="h-5 w-5 text-bronze" />
                  <p className="mt-1.5 text-xs font-bold">ISO 9001 & FSC®</p>
                  <p className="text-[11px] text-cream/65">
                    {locale === 'fa' ? 'استاندارد جهانی کیفیت' : 'Certified Chain of Custody'}
                  </p>
                </div>
                <div className="rounded-xl border border-cream/15 bg-ink/40 p-3.5">
                  <Cpu className="h-5 w-5 text-bronze" />
                  <p className="mt-1.5 text-xs font-bold">0.02 mm</p>
                  <p className="text-[11px] text-cream/65">
                    {locale === 'fa' ? 'دقت برش ۵ محوره' : '5-Axis CNC Tolerance'}
                  </p>
                </div>
                <div className="rounded-xl border border-cream/15 bg-ink/40 p-3.5">
                  <Award className="h-5 w-5 text-bronze" />
                  <p className="mt-1.5 text-xs font-bold">Zero-VOC</p>
                  <p className="text-[11px] text-cream/65">
                    {locale === 'fa' ? 'پوشش ۱۰۰٪ گیاهی' : '100% Botanical Finishes'}
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <img
                src={withBasePath('/images/subsidiaries/custom.jpg')}
                alt="Karenwood Master Workshop"
                className="w-full rounded-2xl border border-bronze/30 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <CtaSection />
    </div>
  );
}
