/** @type {import('next').NextConfig} */
const path = require('path');

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
  // Defensive explicit '@' -> src/ alias for webpack's resolver. Next.js
  // also configures this via the tsconfig.json paths plugin; the explicit
  // alias is a no-op when the plugin works, and a safety net if for any
  // reason the plugin doesn't match a particular @/... import.
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

module.exports = nextConfig;
