import type { NextConfig } from "next"

/** One year in seconds; optimized images are content-hashed so they can be cached aggressively. */
const ONE_YEAR_SECONDS = 31_536_000

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: ONE_YEAR_SECONDS,
  },
}

export default nextConfig
