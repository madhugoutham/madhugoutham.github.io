import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment with username.github.io
  // If deploying to a repo like username.github.io/repo-name, uncomment:
  // basePath: "/repo-name",
  // assetPrefix: "/repo-name",
  trailingSlash: true,
};

export default nextConfig;
