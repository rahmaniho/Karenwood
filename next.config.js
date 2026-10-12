/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split('/')[1]
  : process.env.REPO_NAME || 'karenwood';

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? `/${repo}` : '';

const nextConfig = {
  output: 'export',
  // Disable automatic Google Fonts CSS inlining: build environments without
  // outbound internet (e.g. GitHub Actions build runners behind firewalls,
  // some sandboxes) would otherwise fail with "Failed to download the
  // stylesheet" while trying to fetch https://fonts.googleapis.com.
  // We keep the <link> tag in layout.tsx so the browser fetches fonts at runtime.
  optimizeFonts: false,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: isProd ? `/${repo}/` : '',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
