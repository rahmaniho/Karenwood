'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function TermsPage() {
  const { locale } = useTranslation();

  return (
    <div className="min-h-screen">
      <section className="bg-walnut py-16 text-cream">
        <div className="container max-w-3xl text-center">
          <FileText className="mx-auto h-8 w-8 text-bronze" />
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            {locale === 'fa'
              ? 'شرایط و ضوابط سفارشات اختصاصی کارن‌وود'
              : 'Terms of Commission & Architectural Warranty'}
          </h1>
          <p className="mt-2 text-xs text-cream/70">
            {locale === 'fa'
              ? 'مصوب شورای حقوقی هلدینگ کارن‌وود — ۱۴۰۵'
              : 'KARENWOOD Holding Legal Charter — 2026'}
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
                    ۱. ماهیت طبیعی چوب و اصالت تک‌نسخه‌ای
                  </h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/80 dark:text-cream/80">
                    تمامی محصولات کارن‌وود از چوب طبیعی و زنده ساخته می‌شوند. تفاوت‌های ظریف در نقش رگه‌ها، گره‌های طبیعی و طیف رنگی میان اسلب‌ها، نشانه اصالت چوب طبیعی و فلسفه وابی‌سابی بوده و پیش از برش نهایی، اسلب انتخابی به تایید کارفرما می‌رسد.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-walnut dark:text-cream">
                    ۲. فرآیند تایید شاپ‌دراوینگ و زمان‌بندی ساخت
                  </h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/80 dark:text-cream/80">
                    زمان‌بندی تولید (بین ۳ تا ۱۲ هفته بسته به زیرمجموعه) از تاریخ امضای نقشه‌های اجرایی ۱:۱ (Shop Drawings) و تایید جعبه نمونه متریال آغاز می‌گردد.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-walnut dark:text-cream">
                    ۳. ضمانت‌نامه ۲۵ ساله و شناسنامه اصالت
                  </h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/80 dark:text-cream/80">
                    هر اثر پس از نصب توسط تیم رسمی کارن‌وود، دارای پلاک برنجی شماره‌دار و گواهی ضمانت ۲۰ تا ۳۰ ساله (بسته به زیرمجموعه) در برابر عیوب ساختاری، اتصالات و خشک‌کن چوب می‌باشد.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-bold text-walnut dark:text-cream">
                    1. Natural Timber Provenance & Organic Character
                  </h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/80 dark:text-cream/80">
                    All Karenwood commissions are crafted from solid living timber. Variations in grain figure, medullary rays, and tonal warmth are hallmarks of authentic hardwood. Patrons approve specific flitch selections prior to milling.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-walnut dark:text-cream">
                    2. Shop Drawing Sign-Off & Fabrication Lead Times
                  </h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/80 dark:text-cream/80">
                    Production lead times (ranging from 3 to 12 weeks by division) commence upon written sign-off of 1:1 CAD shop drawings and physical finish samples.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-walnut dark:text-cream">
                    3. 25-Year Structural Guarantee
                  </h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/80 dark:text-cream/80">
                    Every installation completed by Karenwood master fitters receives a numbered brass registry plate and a 20-to-30-year written structural warranty.
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
