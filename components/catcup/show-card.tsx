"use client"

import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Show } from "@/lib/shows"
import { usePlayerDispatch } from "@/components/catcup/player-provider"
import { CategoryBadge } from "@/components/catcup/category-badge"
import { TrailerMedia } from "@/components/catcup/trailer-media"

interface ShowCardProps {
  className?: string
  /** Renders the larger hero-grid variant with a visible description. */
  featured?: boolean
  show: Show
}

/**
 * Discovery card with a hover-preview trailer, status/category badge, and a
 * title overlay. The `featured` variant fills its grid cell and surfaces the
 * show description, matching the large card in the "More Shows" mock.
 */
export function ShowCard({ className, featured = false, show }: ShowCardProps) {
  const dispatch = usePlayerDispatch()

  return (
    <div
      className={cn(
        "group relative block overflow-hidden rounded-card border border-hairline bg-surface-low text-left transition-transform duration-200 hover:scale-[1.01] focus-within:scale-[1.01]",
        featured ? "aspect-video lg:aspect-auto lg:h-full" : "aspect-video",
        className
      )}
    >
      <button
        aria-label={`Play ${show.title}`}
        className="absolute inset-0 z-0 size-full rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        onClick={() => dispatch({ type: "play", showId: show.id })}
        type="button"
      />

      <TrailerMedia
        className="pointer-events-none absolute inset-0 size-full"
        imageClassName="transition-transform duration-300 group-hover:scale-105"
        show={show}
        sizes={
          featured
            ? "(max-width: 1024px) 100vw, 55vw"
            : "(max-width: 768px) 100vw, 30vw"
        }
      />

      <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

      <CategoryBadge
        category={show.category}
        className="pointer-events-none absolute top-3 left-3"
      />

      <button
        aria-label={`Add ${show.title} to queue`}
        className="absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-full bg-black/45 text-foreground opacity-0 backdrop-blur-md transition-opacity duration-200 hover:bg-black/65 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue group-hover:opacity-100 group-focus-within:opacity-100"
        onClick={(e) => {
          e.stopPropagation()
          dispatch({ type: "enqueue", showId: show.id })
        }}
        type="button"
      >
        <Plus className="size-4" />
      </button>

      <div className="pointer-events-none absolute right-4 bottom-4 left-4 flex flex-col gap-1">
        <h4
          className={cn(
            "font-bold text-foreground",
            featured ? "text-headline-lg" : "text-title-md"
          )}
        >
          {show.title}
        </h4>
        {featured ? (
          <p className="max-w-md text-body-sm text-foreground/75">
            {show.description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
