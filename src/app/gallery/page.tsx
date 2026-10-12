import React from 'react';
import type { Metadata } from 'next';
import { GalleryView } from '@/components/sections/GalleryView';

export const metadata: Metadata = {
  title: 'گالری محصولات | Product Gallery — KARENWOOD',
  description:
    'مرور کامل آثار دست‌ساز کارن‌وود: کاسه‌های چوبی، صنایع دستی، ظروف آشپزخانه، دکوراتیو و مجسمه‌های هنری.',
};

export default function GalleryPage() {
  return <GalleryView />;
}
