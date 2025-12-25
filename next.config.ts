import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages deployment to madhugoutham.github.io (root)
  // No basePath needed for root deployment
  trailingSlash: true,
};

export default nextConfig;
