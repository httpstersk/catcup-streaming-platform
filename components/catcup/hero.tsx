"use client"

import { Pause, Play, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { FEATURED_SHOW } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"
import { CategoryBadge } from "@/components/catcup/category-badge"
import { HeroUpNext } from "@/components/catcup/hero-up-next"
import { TrailerMedia } from "@/components/catcup/trailer-media"

/**
 * Full-bleed cinematic hero for the featured show. The trailer plays behind a
 * directional scrim while the title, status badges, and primary actions sit on
 * the lower-left, matching the homepage mock. A floating `HeroUpNext` card
 * previews the next queued show.
 */
export function Hero() {
  const { dispatch, isFullscreen, isPlaying, nowPlayingId } = usePlayer()
  const show = FEATURED_SHOW
  const isActive = nowPlayingId === show.id && isPlaying && !isFullscreen

  function handlePlay() {
    dispatch({ type: "play", showId: show.id })
  }

  return (
    <section className="relative -mt-16 min-h-[82svh] w-full overflow-hidden">
      <TrailerMedia
        active={isActive}
        className="absolute inset-0 size-full"
        previewOnHover={false}
        priority
        show={show}
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-linear-to-r from-background via-background/55 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />

      <div className="relative mx-auto flex min-h-[82svh] w-full max-w-[1440px] flex-col justify-end px-4 pt-24 pb-10 sm:px-6 lg:px-10 lg:pb-14">
        <div className="flex flex-col items-start gap-4 lg:max-w-xl">
          <CategoryBadge category={show.category} />

          <h1 className="text-display-xl text-foreground">{show.title}</h1>

          <p className="max-w-md text-body-sm text-muted-foreground">
            {show.description}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-5 py-3 text-body-sm font-semibold text-on-blue transition-colors hover:bg-blue/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-soft"
              )}
              onClick={handlePlay}
              type="button"
            >
              {isActive ? (
                <Pause className="size-4 fill-current" />
              ) : (
                <Play className="size-4 fill-current" />
              )}
              {isActive ? "Pause" : "Play Now"}
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface/40 px-5 py-3 text-body-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              onClick={() => dispatch({ type: "enqueue", showId: show.id })}
              type="button"
            >
              <Plus className="size-4" />
              Queue
            </button>
          </div>
        </div>

        <div className="mt-6 w-full max-w-sm lg:absolute lg:right-10 lg:bottom-1/2 lg:mt-0 lg:w-[320px] lg:translate-y-1/2">
          <HeroUpNext />
        </div>
      </div>
    </section>
  )
}
