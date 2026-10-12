'use client';

import React from 'react';
import { Shield } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function PrivacyPage() {
  const { locale } = useTranslation();

  return (
    <div className="min-h-screen">
      <section className="bg-walnut py-16 text-cream">
        <div className="container max-w-3xl text-center">
          <Shield className="mx-auto h-8 w-8 text-bronze" />
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            {locale === 'fa'
              ? 'سیاست حفظ حریم خصوصی و محرمانگی کارفرمایان'
              : 'Privacy Policy & Patron Confidentiality'}
          </h1>
          <p className="mt-2 text-xs text-cream/70">
            {locale === 'fa' ? 'آخرین به‌روزرسانی: مهر ۱۴۰۵ (۲۰۲۶)' : 'Last Updated: October 2026'}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="space-y-8 rounded-3xl border border-walnut/15 bg-white/90 p-8 shadow-luxury dark:border-cream/12 dark:bg-walnut-900/90 sm:p-12">
            {locale === 'fa' ? (
              <>
                <div>
                  <h2 className="text-xl font-bold text-walnut dark:text-cream">
                    ۱. تعهد به محرمانگی پروژه‌های معماری (NDA)
                  </h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/80 dark:text-cream/80">
                    هلدینگ صنایع چوب کارن‌وود به حریم خصوصی مالکان ویلاها، پنت‌هاوس‌ها و مجموعه‌های دیپلماتیک احترام کامل می‌گذارد. نقشه‌های معماری، اسکن‌های لیزری سه‌بعدی، آدرس پروژه‌ها و هویت کارفرمایان در آرشیو آفلاین رمزنگاری‌شده نگهداری شده و هیچ تصویری از پروژه بدون مجوز کتبی کارفرما منتشر نمی‌شود.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-walnut dark:text-cream">
                    ۲. اطلاعات گردآوری‌شده در وب‌سایت
                  </h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/80 dark:text-cream/80">
                    این وب‌سایت به صورت کاملاً استاتیک طراحی شده و هیچ‌گونه کوکی ردیاب تبلیغاتی (Third-Party Tracking Cookies) استفاده نمی‌کند. تنها اطلاعاتی که شما داوطلبانه در فرم درخواست مشاوره وارد می‌کنید (نام، شماره تماس و شرح پروژه) صرفاً جهت هماهنگی جلسه با معماران کارن‌وود به کار می‌رود.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-walnut dark:text-cream">
                    ۳. ذخیره‌سازی محلی (Local Storage)
                  </h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/80 dark:text-cream/80">
                    تنظیمات انتخاب زبان (فارسی / انگلیسی) و حالت نمایش (روشن / تیره) تنها در مرورگر دستگاه خودتان ذخیره می‌شود و به هیچ سروری ارسال نمی‌گردد.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-bold text-walnut dark:text-cream">
                    1. Architectural Non-Disclosure & Patron Confidentiality
                  </h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/80 dark:text-cream/80">
                    KARENWOOD Holding upholds strict confidentiality for private estate owners, diplomatic missions, and architectural partners. CAD blueprints, 3D LiDAR scans, and residential addresses are stored on encrypted air-gapped servers. No photography of any private commission is published without explicit written patron consent.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-walnut dark:text-cream">
                    2. Zero Third-Party Tracking
                  </h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/80 dark:text-cream/80">
                    This digital atelier operates as a static architecture without invasive advertising trackers. Information submitted via our consultation forms (name, phone, email, and project brief) is used solely by our in-house concierge to arrange your consultation.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-walnut dark:text-cream">
                    3. Local Browser Preferences
                  </h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/80 dark:text-cream/80">
                    Your preferred language (FA/EN) and theme mode (Light/Dark) are stored strictly in your browser’s localStorage for seamless navigation.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
