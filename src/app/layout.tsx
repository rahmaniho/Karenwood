import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { ConsultationModal } from '@/components/ui/consultation-modal';
import { withBasePath } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL('https://rahmaniho.github.io'),
  title: 'KARENWOOD | هلدینگ صنایع چوب لوکس کارن‌وود',
  description:
    'KARENWOOD — Luxury Wood Industry Holding. Scandinavian minimalist × Japanese wabi-sabi × Modern luxury architectural woodwork across 10 specialized ateliers.',
  keywords: [
    'KARENWOOD',
    'کارن‌وود',
    'هلدینگ صنایع چوب',
    'آشپزخانه چوبی',
    'درب چوبی پیوت',
    'حمام چوبی هینوکی',
    'پارکت شورون',
    'پله معلق چوبی',
    'دکوراسیون چوبی لوکس',
    'مبلمان اداری چوبی',
    'ترمووود و پرگولا',
  ],
  openGraph: {
    title: 'KARENWOOD — Luxury Wood Industry Holding | هلدینگ صنایع چوب کارن‌وود',
    description:
      'Scandinavian minimalist × Japanese wabi-sabi × Modern luxury architectural woodwork across 10 specialized ateliers.',
    type: 'website',
    locale: 'fa_IR',
    alternateLocale: 'en_US',
    images: [
      {
        url: withBasePath('/og-image.png'),
        width: 1200,
        height: 630,
        alt: 'KARENWOOD — Luxury Wood Industry Holding',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KARENWOOD — Luxury Wood Industry Holding',
    description:
      'Scandinavian minimalist × Japanese wabi-sabi × Modern luxury architectural woodwork.',
    images: [withBasePath('/og-image.png')],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/aminabedi68/Estedad@master/Estedad-font-face.css"
          rel="stylesheet"
        />
        <link rel="icon" href={withBasePath('/favicon.ico')} sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={withBasePath('/favicon-32.png')}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={withBasePath('/favicon-16.png')}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={withBasePath('/apple-touch-icon.png')}
        />
        <link rel="manifest" href={withBasePath('/manifest.json')} />
      </head>
      <body className="min-h-screen bg-cream text-ink antialiased transition-colors duration-300 dark:bg-walnut-950 dark:text-cream">
        <SmoothScroll>
          <LoadingScreen />
          <CustomCursor />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingActions />
          <ConsultationModal />
        </SmoothScroll>
      </body>
    </html>
  );
}
