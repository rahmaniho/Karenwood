/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split('/')[1]
  : process.env.REPO_NAME || 'karenwood';

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? `/${repo}` : '';

// Debug marker so we can tell from CI logs whether this file is even being
// read. Next.js prints stderr from next.config.js during load.
process.stderr.write(
  `[next.config.js] loaded. NODE_ENV=${process.env.NODE_ENV || 'unset'} ` +
  `GITHUB_REPOSITORY=${process.env.GITHUB_REPOSITORY || 'unset'} ` +
  `repo=${repo} basePath=${basePath}\n`,
);
const tsconfigPaths = require('fs').existsSync('tsconfig.json')
  ? require('./tsconfig.json').compilerOptions?.paths
  : null;
process.stderr.write(`[next.config.js] tsconfig paths=${JSON.stringify(tsconfigPaths)}\n`);

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
  // Tap webpack's resolver to log every attempt to resolve @/* and confirm
  // whether the tsconfig paths alias is being applied at all. This is purely
  // diagnostic and gets removed once we identify the root cause of the CI
  // "Module not found" failures.
  webpack: (config, { webpack }) => {
    const origResolve = config.resolve || {};
    const origPlugin = origResolve.plugins || [];
    process.stderr.write(
      `[next.config.js] webpack resolve.plugins count=${origPlugin.length} ` +
      `alias=${JSON.stringify(origResolve.alias || {})}\n`,
    );
    return config;
  },
};

module.exports = nextConfig;
