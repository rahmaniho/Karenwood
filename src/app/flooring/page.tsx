import React from 'react';
import type { Metadata } from 'next';
import { getSubsidiaryBySlug } from '@/data/subsidiaries';
import { SubsidiaryPageTemplate } from '@/components/sections/SubsidiaryPageTemplate';

const sub = getSubsidiaryBySlug('flooring')!;

export const metadata: Metadata = {
  title: `${sub.name.fa} | ${sub.name.en} — KARENWOOD`,
  description: sub.description.fa,
};

export default function FlooringPage() {
  return <SubsidiaryPageTemplate subsidiary={sub} />;
}
