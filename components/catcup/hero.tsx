"use client"

import { Pause, Play, Plus } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { FEATURED_SHOW } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"
import { CategoryBadge } from "@/components/catcup/category-badge"
import { HeroUpNext } from "@/components/catcup/hero-up-next"
import { TrailerMedia } from "@/components/catcup/trailer-media"

/**
 * Full-bleed cinematic hero for the featured show. The trailer plays behind a
 * directional scrim while the title, status badges, and primary actions sit on
 * the lower-left, matching the homepage mock. On desktop, `StickyHeroUpNext`
 * absolutely positions the full queue panel at the bottom-right of the viewport.
 */
export function Hero() {
  const { dispatch, isFullscreen, isPlaying, nowPlayingId } = usePlayer()
  const show = FEATURED_SHOW
  const isActive = nowPlayingId === show.id && isPlaying && !isFullscreen

  function handlePlay() {
    dispatch({ type: "play", showId: show.id })
  }

  return (
    <section className="relative -mt-16 min-h-[82svh] w-full">
      <div className="absolute inset-0 overflow-hidden">
        <TrailerMedia
          active={isActive}
          autoplay
          className="absolute inset-0 size-full"
          previewOnHover={false}
          priority
          show={show}
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-linear-to-r from-background via-background/55 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[82svh] w-full max-w-[1440px] grid-cols-1 items-end gap-6 px-4 pt-24 pb-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center lg:gap-8 lg:px-10 lg:pb-14">
        <div className="flex flex-col items-start gap-4 lg:max-w-xl">
          <CategoryBadge category={show.category} />

          <h1 className="text-display-xl text-foreground">{show.title}</h1>

          <p className="max-w-md text-body-sm text-muted-foreground">
            {show.description}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              className={cn(
                "inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-blue px-8 py-4 text-body-lg font-semibold text-on-blue transition-colors hover:bg-blue/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-soft"
              )}
              onClick={handlePlay}
              type="button"
            >
              {isActive ? (
                <Pause className="size-7" weight="fill" />
              ) : (
                <Play className="size-7" weight="fill" />
              )}
              {isActive ? "Pause" : "Play Now"}
            </button>
            <button
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-outline-variant bg-surface/40 px-8 py-4 text-body-lg font-semibold text-foreground backdrop-blur-md transition-colors hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              onClick={() => dispatch({ type: "enqueue", showId: show.id })}
              type="button"
            >
              <Plus className="size-6" />
              Queue
            </button>
          </div>
        </div>

        <div className="z-20 w-full max-w-sm lg:hidden">
          <HeroUpNext />
        </div>
      </div>
    </section>
  )
}
