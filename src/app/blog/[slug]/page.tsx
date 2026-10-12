import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogArticles, getBlogBySlug } from '@/data/blog';
import { BlogArticleClient } from '@/components/sections/BlogArticleClient';

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getBlogBySlug(params.slug);
  if (!article) {
    return {
      title: 'Article Not Found | KARENWOOD',
    };
  }
  return {
    title: `${article.title.fa} | KARENWOOD Journal`,
    description: article.excerpt.fa,
  };
}

export default function BlogSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getBlogBySlug(params.slug);
  if (!article) {
    notFound();
  }
  return <BlogArticleClient article={article} />;
}
