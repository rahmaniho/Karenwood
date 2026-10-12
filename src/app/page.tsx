import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { IntroSection } from '@/components/sections/IntroSection';
import { SubsidiariesSection } from '@/components/sections/SubsidiariesSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection';
import { CtaSection } from '@/components/sections/CtaSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <SubsidiariesSection />
      <StatsSection />
      <FeaturedProjectsSection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CtaSection />
    </>
  );
}
