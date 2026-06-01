import { cn } from "@/lib/utils"
import { CATEGORY_ICONS } from "@/lib/category-icons"
import { Category, CATEGORY_META } from "@/lib/shows"

const BRAND_BADGE_CLASS =
  "inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-label-sm"

const THUMBNAIL_BADGE_CLASS =
  "inline-flex w-fit items-center gap-1 self-start rounded-full bg-white px-1 py-0.5 text-[9px] font-medium leading-none text-black"

/** Category pill for hero, queue, and other non-thumbnail surfaces. */
export function CategoryBadge({
  category,
  className,
  overlay = false,
}: {
  category: Category
  className?: string
  /** Compact black pill with icon for use on show thumbnails. */
  overlay?: boolean
}) {
  const meta = CATEGORY_META[category]

  if (overlay) {
    const IconComponent = CATEGORY_ICONS[category]
    return (
      <span className={cn(THUMBNAIL_BADGE_CLASS, className)}>
        <IconComponent
          aria-hidden
          className="size-2.5 shrink-0"
          weight="bold"
        />
        {meta.label}
      </span>
    )
  }

  return (
    <span className={cn(BRAND_BADGE_CLASS, meta.badgeClass, className)}>
      {meta.label}
    </span>
  )
}
