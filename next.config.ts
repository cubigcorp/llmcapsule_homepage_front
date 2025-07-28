import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  basePath:
    process.env.NODE_ENV === 'production' ? '/llmcapsule_homepage_front' : '',
  assetPrefix:
    process.env.NODE_ENV === 'production' ? '/llmcapsule_homepage_front' : '',
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
