import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  env: {
    // Embed the build time in both the static HTML and the client bundle.
    NEXT_PUBLIC_BUILD_TIMESTAMP: new Date().toISOString(),
  },
  images: {
    unoptimized: true,
  },
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.bib$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
