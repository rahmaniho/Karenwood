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
  // Diagnostic: log webpack resolve state, AND defensively add an explicit
  // @ -> src/ alias to the resolver so that, if the tsconfig.json paths
  // plugin is somehow not picking up the @ mapping, the build still works.
  // This is a no-op when the plugin works (the alias is shadowed by the
  // more-specific plugin) but a safety net when it doesn't.
  webpack: (config, { webpack }) => {
    const origResolve = config.resolve || {};
    const origPlugin = origResolve.plugins || [];
    process.stderr.write(
      `[next.config.js] webpack resolve.plugins count=${origPlugin.length} ` +
      `before-alias=${JSON.stringify(origResolve.alias || {})}\n`,
    );
    config.resolve = {
      ...origResolve,
      alias: {
        ...(origResolve.alias || {}),
        '@': require('path').resolve(__dirname, 'src'),
      },
    };
    process.stderr.write(
      `[next.config.js] webpack resolve.plugins count=${origPlugin.length} ` +
      `after-alias=${JSON.stringify(config.resolve.alias)}\n`,
    );
    return config;
  },
};

module.exports = nextConfig;
