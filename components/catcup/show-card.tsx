"use client"

import { Play } from "lucide-react"

import { cn } from "@/lib/utils"
import { Show } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"
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
  const { dispatch } = usePlayer()

  return (
    <button
      className={cn(
        "group relative block overflow-hidden rounded-card border border-hairline bg-surface-low text-left transition-transform duration-200 hover:scale-[1.01] focus-visible:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue",
        featured ? "aspect-video lg:aspect-auto lg:h-full" : "aspect-video",
        className
      )}
      onClick={() => dispatch({ type: "play", showId: show.id })}
      type="button"
    >
      <TrailerMedia
        className="absolute inset-0 size-full"
        imageClassName="transition-transform duration-300 group-hover:scale-105"
        show={show}
        sizes={
          featured
            ? "(max-width: 1024px) 100vw, 55vw"
            : "(max-width: 768px) 100vw, 30vw"
        }
      />

      <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

      {show.isLive ? (
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-lime px-2 py-1 text-label-bold text-on-lime">
          <span className="size-1.5 animate-pulse rounded-full bg-on-lime" />
          Live
        </span>
      ) : (
        <CategoryBadge category={show.category} className="absolute top-3 left-3" />
      )}

      <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-black/45 text-foreground opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
        <Play className="size-3.5 fill-current" />
      </span>

      <div className="absolute right-4 bottom-4 left-4 flex flex-col gap-1">
        <h4
          className={cn(
            "font-bold text-foreground",
            featured ? "text-title-md" : "text-body-lg"
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
    </button>
  )
}
