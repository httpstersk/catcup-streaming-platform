"use client"

import * as m from "motion/react-m"
import { Play, Plus } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { fadeRiseStagger, springSnappy, springSoft } from "@/lib/motion"
import { Show } from "@/lib/shows"
import { usePlayerDispatch } from "@/components/catcup/player-provider"
import { CategoryBadge } from "@/components/catcup/category-badge"
import { TrailerMedia } from "@/components/catcup/trailer-media"

interface ShowCardProps {
  className?: string
  /** Renders the larger hero-grid variant with a visible description. */
  featured?: boolean
  /** Position within its grid, used to stagger the entrance animation. */
  index?: number
  show: Show
}

/**
 * Discovery card with a hover-preview trailer and a title overlay with the
 * category pill stacked directly above the title. The `featured` variant fills its grid cell and surfaces the
 * show description, matching the large card in the "More Shows" mock.
 */
export function ShowCard({
  className,
  featured = false,
  index = 0,
  show,
}: ShowCardProps) {
  const dispatch = usePlayerDispatch()

  return (
    <m.div
      animate="show"
      className={cn(
        "group relative block overflow-hidden rounded-card border border-hairline bg-surface-low text-left",
        featured ? "aspect-video lg:aspect-auto lg:h-full" : "aspect-video",
        className
      )}
      custom={index}
      exit="hidden"
      initial="hidden"
      layout
      transition={springSoft}
      variants={fadeRiseStagger}
      whileHover={{ scale: 1.02, transition: springSnappy }}
      whileTap={{ scale: 0.99, transition: springSnappy }}
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

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
      >
        <span
          className={cn(
            "grid scale-90 place-items-center rounded-full bg-black/60 text-foreground opacity-0 shadow-lift transition-[opacity,transform] duration-200 ease-out group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100",
            featured ? "size-20" : "size-16"
          )}
        >
          <Play
            className={cn(
              "translate-x-0.5",
              featured ? "size-10" : "size-8"
            )}
            weight="fill"
          />
        </span>
      </span>

      <button
        aria-label={`Add ${show.title} to queue`}
        className="absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-full bg-black/45 text-foreground opacity-0 backdrop-blur-md transition-opacity duration-200 hover:bg-black/65 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue group-hover:opacity-100 group-focus-within:opacity-100"
        onClick={() => dispatch({ type: "enqueue", showId: show.id })}
        type="button"
      >
        <Plus className="size-4" />
      </button>

      <div className="pointer-events-none absolute right-4 bottom-4 left-4 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <CategoryBadge category={show.category} overlay />
          <h4
            className={cn(
              "font-bold text-foreground",
              featured ? "text-headline-lg" : "text-title-md"
            )}
          >
            {show.title}
          </h4>
        </div>
        {featured ? (
          <p className="max-w-md text-body-sm text-foreground/75">
            {show.description}
          </p>
        ) : null}
      </div>
    </m.div>
  )
}
