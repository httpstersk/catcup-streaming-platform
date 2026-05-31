import { cn } from "@/lib/utils"
import { Category, CATEGORY_META } from "@/lib/shows"

export function CategoryBadge({
  category,
  className,
}: {
  category: Category
  className?: string
}) {
  const meta = CATEGORY_META[category]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-label-bold",
        meta.badgeClass,
        className
      )}
    >
      {meta.label}
    </span>
  )
}
