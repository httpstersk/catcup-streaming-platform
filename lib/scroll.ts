import { isCategory, MORE_SHOWS_SECTION_ID } from "@/lib/shows"

/**
 * Smoothly scrolls to the "More Shows" section when a specific category is
 * selected. No-ops for non-category filters ("all"/"live") or during SSR.
 *
 * @param filter - The filter value chosen by the user.
 */
export function scrollToCategoryShows(filter: string): void {
  if (!isCategory(filter)) return
  const section = document.getElementById(MORE_SHOWS_SECTION_ID)
  if (!section) return
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  section.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" })
}
