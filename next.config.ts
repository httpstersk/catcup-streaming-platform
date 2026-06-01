import type { NextConfig } from "next"

/** One year in seconds; optimized images are content-hashed so they can be cached aggressively. */
const ONE_YEAR_SECONDS = 31_536_000

/**
 * Widths used to generate `srcset` candidates. Trimmed from the Next.js
 * defaults (which reach 3840px) because the largest rendered image is the
 * full-bleed hero at `100vw`; capping at 1920px avoids needless 2K/4K
 * transformations that would burn through the Hobby plan's monthly quota.
 */
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920]

/** Single allowed quality keeps each image to one cached transformation. */
const IMAGE_QUALITIES = [75]

/** Small fixed widths for non-`fill` images; the app only uses `fill`, so keep this minimal. */
const IMAGE_SIZES = [256, 384]

const nextConfig: NextConfig = {
  images: {
    deviceSizes: DEVICE_SIZES,
    formats: ["image/avif", "image/webp"],
    imageSizes: IMAGE_SIZES,
    minimumCacheTTL: ONE_YEAR_SECONDS,
    qualities: IMAGE_QUALITIES,
  },
}

export default nextConfig
