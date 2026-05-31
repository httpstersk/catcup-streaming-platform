"use client"

import { CalendarPlus, Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"
import { FEATURED_SHOW } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"
import { CategoryBadge } from "@/components/catcup/category-badge"
import { TrailerMedia } from "@/components/catcup/trailer-media"

export function Hero() {
  const { nowPlayingId, isPlaying, dispatch } = usePlayer()
  const show = FEATURED_SHOW
  const isActive = nowPlayingId === show.id && isPlaying

  function handlePlay() {
    if (nowPlayingId === show.id) {
      dispatch({ type: "togglePlay" })
    } else {
      dispatch({ type: "play", showId: show.id })
    }
  }

  return (
    <section className="grid overflow-hidden rounded-card border border-hairline bg-surface-low/60 lg:grid-cols-[1.6fr_1fr]">
      <div className="relative aspect-video lg:aspect-auto">
        <TrailerMedia
          show={show}
          active={isActive}
          previewOnHover={false}
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="absolute inset-0 size-full"
        />
        {show.isLive ? (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-label-bold text-foreground backdrop-blur-md">
            <span className="size-2 animate-pulse rounded-full bg-lime" />
            Live
          </span>
        ) : null}
      </div>

      <div className="flex flex-col justify-center gap-4 p-6 lg:p-7">
        <CategoryBadge category={show.category} className="self-start" />
        <h2 className="text-headline-lg text-foreground">{show.title}</h2>
        <p className="text-body-sm text-muted-foreground">{show.description}</p>

        <div className="flex flex-wrap gap-2">
          {show.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-hairline bg-surface-container px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-1 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handlePlay}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-4 py-3 text-body-sm font-semibold text-on-blue transition-colors hover:bg-blue/85"
            )}
          >
            {isActive ? (
              <Pause className="size-4 fill-current" />
            ) : (
              <Play className="size-4 fill-current" />
            )}
            {isActive ? "Pause" : "Play Now"}
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "enqueue", showId: show.id })}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-transparent px-4 py-3 text-body-sm font-semibold text-foreground transition-colors hover:bg-surface-container"
          >
            <CalendarPlus className="size-4" />
            Add to Routine
          </button>
        </div>
      </div>
    </section>
  )
}
