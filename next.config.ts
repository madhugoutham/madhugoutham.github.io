import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages deployment to madhugoutham.github.io/portfolios
  basePath: "/portfolios",
  assetPrefix: "/portfolios",
  trailingSlash: true,
};

export default nextConfig;
