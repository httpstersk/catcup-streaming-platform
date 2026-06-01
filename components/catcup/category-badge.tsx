import { cn } from "@/lib/utils"
import { Category, CATEGORY_META } from "@/lib/shows"

/** Shared pill geometry for category badges across the hero, cards, and queue. */
export const BADGE_BASE_CLASS =
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-label-sm"

/** Category pill tinted with the category's brand color. */
export function CategoryBadge({
  category,
  className,
}: {
  category: Category
  className?: string
}) {
  const meta = CATEGORY_META[category]
  return (
    <span className={cn(BADGE_BASE_CLASS, meta.badgeClass, className)}>
      {meta.label}
    </span>
  )
}
