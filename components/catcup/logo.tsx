import { cn } from "@/lib/utils"

/** Outer silhouette of the CatCup mark (cup body, cat ears, and handle). */
const CATCUP_MARK_OUTER_PATH =
  "M 5.35 5.08 L 2.37 24.29 L 2.37 49.99 L 3.18 53.51 L 4.54 55.95 L 5.89 57.3 L 9.68 59.19 L 41.06 59.19 L 44.31 57.57 L 46.21 55.68 L 47.56 53.24 L 48.37 50.26 L 51.35 50.26 L 54.59 49.45 L 57.03 48.1 L 59.19 45.94 L 60.55 43.23 L 61.36 38.9 L 61.36 32.95 L 60.55 28.89 L 58.92 25.91 L 56.76 24.02 L 52.16 22.39 L 48.37 22.39 L 47.83 21.85 L 45.66 5.89 L 44.85 4.54 L 44.04 4.54 L 34.84 13.74 L 15.9 13.74 L 6.7 4.54 L 5.89 4.54 Z"

/** Inner cutout of the CatCup mark (cup opening and handle hole). */
const CATCUP_MARK_INNER_PATH =
  "M 11.03 24.56 L 12.65 22.94 L 13.46 22.66 L 38.09 22.66 L 39.17 23.21 L 40.52 24.83 L 40.52 28.35 L 40.79 28.62 L 50.81 28.62 L 51.89 28.89 L 53.51 29.97 L 54.32 31.05 L 54.86 32.95 L 54.86 39.17 L 54.59 40.52 L 54.05 41.61 L 52.43 43.23 L 51.08 43.77 L 40.79 43.77 L 40.52 44.04 L 40.52 48.1 L 39.44 49.72 L 37.82 50.54 L 13.46 50.54 L 12.38 49.99 L 10.76 47.83 L 10.76 25.37 Z"

/**
 * CatCup brand mark — a cat-eared mug icon with a uniform wall thickness,
 * rounded base, and handle cutout.
 */
function CatCupMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("size-8", className)}
      fill="currentColor"
      viewBox="0 0 64 64"
    >
      <path
        d={`${CATCUP_MARK_OUTER_PATH} ${CATCUP_MARK_INNER_PATH}`}
        fillRule="evenodd"
      />
    </svg>
  )
}

/** Full CatCup logo lockup with mark and wordmark. */
export function CatCupLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5 text-lime", className)}>
      <CatCupMark className="size-6" />
      <span className="text-title-md font-bold tracking-tight">CatCup</span>
    </div>
  )
}
