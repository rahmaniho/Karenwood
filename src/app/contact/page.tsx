'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Factory,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { subsidiaries } from '@/data/subsidiaries';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const { locale, t, localize } = useTranslation();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subsidiary, setSubsidiary] = useState('kitchen');
  const [woodPref, setWoodPref] = useState('walnut');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeLocation, setActiveLocation] = useState<'showroom' | 'factory'>('showroom');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const subject = encodeURIComponent(
      `KARENWOOD Commission Inquiry — ${subsidiary.toUpperCase()} (${fullName})`
    );
    const body = encodeURIComponent(
      `Client: ${fullName}\nPhone: ${phone}\nEmail: ${email}\nAtelier: ${subsidiary}\nPreferred Timber: ${woodPref}\n\nMessage:\n${message}`
    );
    setTimeout(() => {
      window.location.href = `mailto:atelier@karenwood.com?subject=${subject}&body=${body}`;
    }, 500);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-walnut py-16 text-cream lg:py-24">
        <div className="container text-center max-w-3xl">
          <span className="inline-block rounded-full border border-bronze/40 bg-ink/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-bronze">
            {locale === 'fa' ? 'ارتباط با هلدینگ کارن‌وود' : 'PRIVATE ATELIER CONCIERGE'}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-cream sm:text-5xl">
            {locale === 'fa'
              ? 'تماس و رزرو جلسه مشاوره اختصاصی'
              : 'Connect with Our Master Architects'}
          </h1>
          <p className="mt-4 text-base text-cream/80 sm:text-lg">
            {locale === 'fa'
              ? 'میزبان شما در عمارت مرکزی فرشته و پردیس صنعتی ۴۲,۰۰۰ متری جاجرود هستیم.'
              : 'Welcome to Karenwood House on Fereshteh Avenue or our 42,000 m² Industrial Campus.'}
          </p>
        </div>
      </section>

      {/* Main Content: Contact Details + Form */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left/Right Info Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-walnut/15 bg-walnut p-8 text-cream shadow-luxury-lg space-y-6">
                <h2 className="text-2xl font-bold text-bronze">
                  {locale === 'fa' ? 'اطلاعات تماس مستقیم' : 'Direct Concierge Channels'}
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-bronze" />
                    <div>
                      <p className="font-bold text-cream">
                        {locale === 'fa' ? 'عمارت مرکزی و شوروم:' : 'Flagship Atelier:'}
                      </p>
                      <p className="mt-0.5 text-cream/80">{t.footer.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Factory className="mt-1 h-5 w-5 shrink-0 text-bronze" />
                    <div>
                      <p className="font-bold text-cream">
                        {locale === 'fa' ? 'پردیس صنعتی و کارخانه:' : 'Industrial Campus:'}
                      </p>
                      <p className="mt-0.5 text-cream/80">{t.footer.factoryAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Phone className="h-5 w-5 shrink-0 text-bronze" />
                    <div>
                      <p className="font-bold text-cream">
                        {locale === 'fa' ? 'تلفن ویژه:' : 'Telephone:'}
                      </p>
                      <a
                        href="tel:+982122048900"
                        className="text-bronze hover:underline"
                        dir="ltr"
                      >
                        {t.footer.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Mail className="h-5 w-5 shrink-0 text-bronze" />
                    <div>
                      <p className="font-bold text-cream">
                        {locale === 'fa' ? 'پست الکترونیک:' : 'Email:'}
                      </p>
                      <a
                        href="mailto:atelier@karenwood.com"
                        className="text-bronze hover:underline"
                      >
                        {t.footer.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-bronze" />
                    <div>
                      <p className="font-bold text-cream">
                        {locale === 'fa' ? 'ساعات میزبانی:' : 'Visiting Hours:'}
                      </p>
                      <p className="mt-0.5 text-cream/80">{t.footer.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Architectural Map Embed */}
              <div className="overflow-hidden rounded-3xl border border-walnut/15 bg-white/90 p-5 shadow-luxury dark:border-cream/12 dark:bg-walnut-900/90">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-bronze">
                    {locale === 'fa' ? 'موقعیت روی نقشه معماری' : 'ARCHITECTURAL LOCATION MAP'}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveLocation('showroom')}
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                        activeLocation === 'showroom'
                          ? 'bg-walnut text-cream dark:bg-bronze dark:text-ink'
                          : 'bg-walnut/10 text-walnut dark:bg-cream/10 dark:text-cream'
                      }`}
                    >
                      <Building2 className="h-3 w-3" />
                      <span>{locale === 'fa' ? 'شوروم فرشته' : 'Showroom'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLocation('factory')}
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                        activeLocation === 'factory'
                          ? 'bg-walnut text-cream dark:bg-bronze dark:text-ink'
                          : 'bg-walnut/10 text-walnut dark:bg-cream/10 dark:text-cream'
                      }`}
                    >
                      <Factory className="h-3 w-3" />
                      <span>{locale === 'fa' ? 'کارخانه' : 'Campus'}</span>
                    </button>
                  </div>
                </div>

                {/* Self-contained Stylized Architectural Map SVG */}
                <div className="relative overflow-hidden rounded-2xl border border-bronze/30 bg-walnut">
                  <svg
                    viewBox="0 0 500 280"
                    className="h-56 w-full object-cover"
                    role="img"
                    aria-label="Karenwood Tehran Location Map"
                  >
                    <rect width="500" height="280" fill="#1A1A1A" />
                    {/* Street Grid */}
                    <g stroke="#3B2A1E" strokeWidth="2">
                      <line x1="0" y1="60" x2="500" y2="60" />
                      <line x1="0" y1="140" x2="500" y2="140" />
                      <line x1="0" y1="220" x2="500" y2="220" />
                      <line x1="110" y1="0" x2="110" y2="280" />
                      <line x1="250" y1="0" x2="250" y2="280" />
                      <line x1="390" y1="0" x2="390" y2="280" />
                    </g>
                    {/* Major Arteries */}
                    <path
                      d="M0 190 Q180 120 340 135 T500 85"
                      stroke="#C8A165"
                      strokeWidth="3.5"
                      fill="none"
                      opacity="0.55"
                    />
                    <path
                      d="M195 0 L235 280"
                      stroke="#7A8B6F"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.45"
                    />
                    {/* Active Pin */}
                    <g
                      transform={
                        activeLocation === 'showroom'
                          ? 'translate(220, 128)'
                          : 'translate(370, 102)'
                      }
                    >
                      <circle r="32" fill="#C8A165" fillOpacity="0.2" />
                      <circle r="16" fill="#C8A165" fillOpacity="0.4" />
                      <circle r="8" fill="#C8A165" stroke="#F5F1EA" strokeWidth="2" />
                    </g>
                    <text
                      x="24"
                      y="256"
                      fill="#C8A165"
                      fontSize="12"
                      fontFamily="monospace"
                    >
                      {activeLocation === 'showroom'
                        ? '35.7925° N, 51.4258° E — FERESHTEH ATELIER'
                        : '35.7412° N, 51.7219° E — JAJRUD 42,000m² CAMPUS'}
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-walnut/15 bg-white/95 p-8 shadow-luxury-lg dark:border-cream/12 dark:bg-walnut-900/95 sm:p-12">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss/20 text-moss">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>
                    <h3 className="text-2xl font-bold text-walnut dark:text-cream">
                      {locale === 'fa'
                        ? 'پیام و درخواست مشاوره شما با موفقیت ثبت شد'
                        : 'Your Inquiry Has Been Received'}
                    </h3>
                    <p className="mx-auto max-w-md text-sm leading-relaxed text-ink/75 dark:text-cream/75">
                      {locale === 'fa'
                        ? 'کارشناسان ارشد آتلیه انتخابی شما حداکثر تا ۲ ساعت کاری آینده جهت هماهنگی جلسه با شما تماس خواهند گرفت.'
                        : 'A senior architect from your chosen division will reach out within 2 business hours.'}
                    </p>
                    <Button
                      variant="bronze"
                      onClick={() => {
                        setSubmitted(false);
                        setFullName('');
                        setPhone('');
                        setEmail('');
                        setMessage('');
                      }}
                    >
                      {locale === 'fa' ? 'ارسال درخواست جدید' : 'Send Another Inquiry'}
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-walnut dark:text-cream sm:text-3xl">
                      {locale === 'fa'
                        ? 'فرم درخواست مشاوره و استعلام پروژه'
                        : 'Project Brief & Consultation Form'}
                    </h2>
                    <p className="mt-2 text-sm text-ink/70 dark:text-cream/70">
                      {locale === 'fa'
                        ? 'اطلاعات پروژه خود را وارد نمایید تا جلسه اختصاصی با معماران همان زیرمجموعه تنظیم گردد.'
                        : 'Complete the brief below to connect directly with the lead architect of your desired division.'}
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-walnut dark:text-cream">
                            {locale === 'fa' ? 'نام و نام خانوادگی *' : 'Full Name *'}
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder={
                              locale === 'fa' ? 'مهندس سهند فرهادی' : 'e.g. Sahand Farhadi'
                            }
                            className="w-full rounded-xl border border-walnut/20 bg-cream/60 px-4 py-3 text-sm text-ink outline-none focus:border-bronze dark:border-cream/15 dark:bg-ink/50 dark:text-cream"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-walnut dark:text-cream">
                            {locale === 'fa' ? 'شماره همراه یا تلفن مستقیم *' : 'Phone Number *'}
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={locale === 'fa' ? '۰۹۱۲xxxxxxx' : '+98 912 ...'}
                            className="w-full rounded-xl border border-walnut/20 bg-cream/60 px-4 py-3 text-sm text-ink outline-none focus:border-bronze dark:border-cream/15 dark:bg-ink/50 dark:text-cream"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-walnut dark:text-cream">
                            {locale === 'fa' ? 'ایمیل کاری' : 'Email Address'}
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@domain.com"
                            className="w-full rounded-xl border border-walnut/20 bg-cream/60 px-4 py-3 text-sm text-ink outline-none focus:border-bronze dark:border-cream/15 dark:bg-ink/50 dark:text-cream"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-walnut dark:text-cream">
                            {locale === 'fa' ? 'زیرمجموعه تخصصی' : 'Specialized Atelier'}
                          </label>
                          <select
                            value={subsidiary}
                            onChange={(e) => setSubsidiary(e.target.value)}
                            className="w-full rounded-xl border border-walnut/20 bg-cream/60 px-4 py-3 text-sm text-ink outline-none focus:border-bronze dark:border-cream/15 dark:bg-ink/50 dark:text-cream"
                          >
                            {subsidiaries.map((s) => (
                              <option key={s.slug} value={s.slug}>
                                {localize(s.shortName)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-walnut dark:text-cream">
                            {locale === 'fa' ? 'گونه چوب مورد علاقه' : 'Preferred Timber'}
                          </label>
                          <select
                            value={woodPref}
                            onChange={(e) => setWoodPref(e.target.value)}
                            className="w-full rounded-xl border border-walnut/20 bg-cream/60 px-4 py-3 text-sm text-ink outline-none focus:border-bronze dark:border-cream/15 dark:bg-ink/50 dark:text-cream"
                          >
                            <option value="walnut">
                              {locale === 'fa' ? 'گردوی سیاه آمریکایی' : 'American Black Walnut'}
                            </option>
                            <option value="oak">
                              {locale === 'fa' ? 'بلوط سفید و دودی' : 'Smoked / White Oak'}
                            </option>
                            <option value="hinoki">
                              {locale === 'fa' ? 'سرو هینوکی ژاپنی' : 'Japanese Hinoki'}
                            </option>
                            <option value="teak">
                              {locale === 'fa' ? 'ساج دریایی برمه' : 'Burmese Marine Teak'}
                            </option>
                            <option value="thermo">
                              {locale === 'fa' ? 'ترمووود فنلاندی' : 'Finnish Thermowood'}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-walnut dark:text-cream">
                          {locale === 'fa'
                            ? 'توضیحات پروژه، متراژ و زمان‌بندی مدنظر *'
                            : 'Project Description, Location & Timeline *'}
                        </label>
                        <textarea
                          rows={5}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={
                            locale === 'fa'
                              ? 'لطفاً موقعیت پروژه، مرحله فعلی ساخت و نیازمندی‌های خود را شرح دهید...'
                              : 'Describe your project location, architectural stage, and bespoke requirements...'
                          }
                          className="w-full rounded-xl border border-walnut/20 bg-cream/60 px-4 py-3 text-sm text-ink outline-none focus:border-bronze dark:border-cream/15 dark:bg-ink/50 dark:text-cream"
                        />
                      </div>

                      <Button type="submit" variant="bronze" size="lg" className="w-full sm:w-auto">
                        <Send className="h-4 w-4" />
                        <span>
                          {locale === 'fa'
                            ? 'ارسال درخواست و دریافت مشاوره تخصصی'
                            : 'Submit Brief to Karenwood Atelier'}
                        </span>
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
