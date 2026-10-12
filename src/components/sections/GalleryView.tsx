'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, ArrowUpLeft, Sparkles, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryItems, galleryCategories, GalleryCategory } from '@/data/gallery';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppStore } from '@/lib/store';
import { withBasePath } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type CategoryFilter = GalleryCategory | 'all';

export function GalleryView() {
  const { locale, localize, isRTL } = useTranslation();
  const openConsultationModal = useAppStore((s) => s.openConsultationModal);

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Find selected item
  const selectedItem = useMemo(
    () => galleryItems.find((item) => item.id === selectedItemId) || null,
    [selectedItemId],
  );

  // Find current index in the FULL list (for lightbox nav)
  const currentIndex = useMemo(
    () => galleryItems.findIndex((item) => item.id === selectedItemId),
    [selectedItemId],
  );

  const goToNext = () => {
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setSelectedItemId(galleryItems[nextIndex].id);
  };

  const goToPrev = () => {
    if (currentIndex < 0) return;
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setSelectedItemId(galleryItems[prevIndex].id);
  };

  // Keyboard nav for lightbox
  useEffect(() => {
    if (!selectedItemId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItemId(null);
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItemId, currentIndex]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (selectedItemId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItemId]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-walnut py-16 text-cream lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${withBasePath('/images/patterns/wood-grain.jpg')})`,
            backgroundSize: '360px 360px',
          }}
        />
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs text-cream/70"
          >
            <Link href="/" className="hover:text-bronze transition-colors">
              {locale === 'fa' ? 'صفحه اصلی' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-bronze font-semibold">
              {locale === 'fa' ? 'گالری محصولات' : 'Product Gallery'}
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-bronze/40 bg-ink/40 px-4 py-1.5 text-xs font-semibold text-bronze">
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                {locale === 'fa'
                  ? `${galleryItems.length} اثر دست‌ساز، یک گالری`
                  : `${galleryItems.length} handcrafted pieces, one gallery`}
              </span>
            </div>
            <h1 className="text-3xl font-bold leading-tight text-cream sm:text-5xl">
              {locale === 'fa' ? 'گالری محصولات کارن‌وود' : 'Karenwood Product Gallery'}
            </h1>
            <p className="text-lg font-medium text-bronze">
              {locale === 'fa'
                ? 'مرور کامل کاسه‌ها، صنایع دستی، ظروف آشپزخانه و مجسمه‌های چوبی از آتلیه کارن آرت'
                : 'A complete view of bowls, handcrafts, kitchenware, and wood sculptures from the Karen Art studio'}
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-cream/80">
              {locale === 'fa'
                ? 'هر قطعه در این گالری توسط استادکاران آتلیه کارن آرت ساخته شده، با شناسنامه اصالت و امضای هنرمند. برای مشاهده جزئیات، روی هر تصویر کلیک کنید.'
                : 'Each piece in this gallery was crafted by the master artisans of Karen Art studio, with a provenance dossier and artisan signature. Click any image for details.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-16 z-30 border-b border-walnut/10 bg-cream/95 backdrop-blur-md dark:border-cream/10 dark:bg-ink/95">
        <div className="container py-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <Filter className="h-4 w-4 shrink-0 text-walnut/60 dark:text-cream/60" />
            <div className="flex gap-2">
              {galleryCategories.map((cat) => {
                const count =
                  cat.key === 'all'
                    ? galleryItems.length
                    : galleryItems.filter((i) => i.category === cat.key).length;
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                      isActive
                        ? 'border-bronze bg-bronze text-ink shadow-luxury'
                        : 'border-walnut/15 bg-cream text-walnut hover:border-bronze/50 dark:border-cream/15 dark:bg-ink dark:text-cream dark:hover:border-bronze/50'
                    }`}
                  >
                    <span>{localize(cat.label)}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? 'bg-ink/15 text-ink'
                          : 'bg-walnut/10 text-walnut/70 dark:bg-cream/10 dark:text-cream/70'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredItems.map((item, idx) => {
                const catLabel = galleryCategories.find((c) => c.key === item.category);
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.03, 0.4) }}
                    onClick={() => setSelectedItemId(item.id)}
                    className="group relative overflow-hidden rounded-2xl border border-walnut/10 bg-cream text-start shadow-luxury transition-all hover:-translate-y-1 hover:shadow-luxury-lg dark:border-cream/10 dark:bg-ink"
                    aria-label={localize(item.name)}
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-walnut/5">
                      <Image
                        src={withBasePath(item.image)}
                        alt={localize(item.alt)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Category badge */}
                      <div className="absolute top-3 start-3 rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream backdrop-blur">
                        {catLabel ? localize(catLabel.label) : item.category}
                      </div>
                    </div>
                    <div className="space-y-1 p-4">
                      <h3 className="line-clamp-1 text-base font-bold text-walnut dark:text-cream">
                        {localize(item.name)}
                      </h3>
                      <p className="line-clamp-2 text-xs text-walnut/65 dark:text-cream/65">
                        {localize(item.tagline)}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <p className="py-20 text-center text-walnut/60 dark:text-cream/60">
              {locale === 'fa' ? 'موردی یافت نشد' : 'No items found'}
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-walnut/10 bg-walnut py-12 text-cream dark:border-cream/10">
        <div className="container text-center">
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            {locale === 'fa'
              ? 'اثر خاص خود را بسازید'
              : 'Commission your own piece'}
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-cream/80">
            {locale === 'fa'
              ? 'تمامی آثار قابل سفارش با ابعاد، چوب و طرح دلخواه شما هستند. با کارگاه کارن آرت تماس بگیرید.'
              : 'All pieces can be commissioned to your dimensions, wood, and design. Contact the Karen Art studio.'}
          </p>
          <Button
            size="lg"
            onClick={() => openConsultationModal('gallery')}
            className="bg-bronze text-ink hover:bg-bronze/90"
          >
            {locale === 'fa' ? 'درخواست سفارش اختصاصی' : 'Request a Custom Commission'}
            <ArrowIcon className="ms-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedItemId(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItemId(null)}
              className="absolute top-4 end-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev / Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute start-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute end-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid max-h-[90vh] w-full max-w-5xl grid-cols-1 gap-0 overflow-hidden rounded-2xl bg-cream shadow-2xl dark:bg-ink lg:grid-cols-2"
            >
              {/* Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-walnut/5 lg:aspect-auto lg:h-full">
                <Image
                  src={withBasePath(selectedItem.image)}
                  alt={localize(selectedItem.alt)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Details */}
              <div className="flex max-h-[90vh] flex-col overflow-y-auto p-6 lg:p-8">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-bronze">
                  {localize(
                    galleryCategories.find((c) => c.key === selectedItem.category)?.label || {
                      fa: '',
                      en: '',
                    },
                  )}
                </div>
                <h2 className="mb-2 text-2xl font-bold text-walnut dark:text-cream sm:text-3xl">
                  {localize(selectedItem.name)}
                </h2>
                <p className="mb-4 text-sm font-medium text-bronze">
                  {localize(selectedItem.tagline)}
                </p>
                <p className="mb-6 text-sm leading-relaxed text-walnut/80 dark:text-cream/80">
                  {localize(selectedItem.description)}
                </p>

                <dl className="mb-6 space-y-3 border-t border-walnut/10 pt-4 text-xs dark:border-cream/10">
                  <div className="grid grid-cols-3 gap-2">
                    <dt className="font-bold text-walnut/60 dark:text-cream/60">
                      {locale === 'fa' ? 'جنس' : 'Materials'}
                    </dt>
                    <dd className="col-span-2 text-walnut dark:text-cream">
                      {localize(selectedItem.materials)}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <dt className="font-bold text-walnut/60 dark:text-cream/60">
                      {locale === 'fa' ? 'ابعاد' : 'Dimensions'}
                    </dt>
                    <dd className="col-span-2 text-walnut dark:text-cream">
                      {localize(selectedItem.dimensions)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      openConsultationModal('gallery');
                      setSelectedItemId(null);
                    }}
                    className="bg-bronze text-ink hover:bg-bronze/90"
                  >
                    {locale === 'fa' ? 'سفارش این اثر' : 'Commission this piece'}
                    <ArrowIcon className="ms-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => goToNext()}
                    className="border-walnut/20 dark:border-cream/20"
                  >
                    {locale === 'fa' ? 'اثر بعدی' : 'Next piece'}
                    <ChevronIcon className="ms-2 h-4 w-4" />
                  </Button>
                </div>

                <p className="mt-4 text-[10px] text-walnut/50 dark:text-cream/50">
                  {locale === 'fa'
                    ? `${currentIndex + 1} از ${galleryItems.length} • کلیدهای ← → برای جابجایی، Esc برای بستن`
                    : `${currentIndex + 1} of ${galleryItems.length} • Use ← → to navigate, Esc to close`}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
