import { Bird, Bug, Crosshair, Leaf, type Icon } from "@phosphor-icons/react"

import type { Category } from "@/lib/shows"

/** Phosphor icons keyed by show category for thumbnail overlay badges. */
export const CATEGORY_ICONS: Record<Category, Icon> = {
  birds: Bird,
  bugs: Bug,
  calm: Leaf,
  chase: Crosshair,
}
