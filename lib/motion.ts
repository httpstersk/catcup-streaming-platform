import type { Transition, Variants } from "motion/react"

/** Delay in seconds between consecutive children when a grid or list animates in. */
const STAGGER_CHILDREN = 0.04

/**
 * Fade-and-rise variant for cards and list items entering or leaving a layout.
 * Pair with {@link springSoft} for a settled, premium feel.
 */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
}

/**
 * Index-aware fade-and-rise variant for grids and lists. Pass the item index via
 * the motion component's `custom` prop to stagger the entrance; the per-item delay
 * lives on the entrance only, so hover/tap feedback stays immediate. Omitting
 * `custom` (defaulting to 0) yields an un-delayed entrance.
 */
export const fadeRiseStagger: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: (index: number = 0) => ({
    opacity: 1,
    transition: { ...springSoft, delay: index * STAGGER_CHILDREN },
    y: 0,
  }),
}

/**
 * Fade-and-scale variant for full-bleed overlays such as the fullscreen player.
 * The subtle scale keeps the transition smooth without drawing attention to itself.
 */
export const overlayFade: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1 },
}

/**
 * Snappy spring for small, direct interactive feedback (hover lifts, taps).
 * Higher stiffness gives a responsive feel without overshoot.
 */
export const springSnappy: Transition = {
  damping: 30,
  stiffness: 400,
  type: "spring",
}

/**
 * Soft, low-bounce spring for larger surface transitions (overlays, shared
 * layout indicators, list reordering) where understated motion reads as premium.
 */
export const springSoft: Transition = {
  damping: 32,
  stiffness: 260,
  type: "spring",
}
