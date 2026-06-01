"use client"

import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import { SkipForward } from "@phosphor-icons/react"

import { fadeRise, springSoft } from "@/lib/motion"
import { QueueEntry, SHOWS_BY_ID, type Show } from "@/lib/shows"
import { cn } from "@/lib/utils"
import { usePlayer, usePlayerDispatch } from "@/components/catcup/player-provider"
import { TrailerMedia } from "@/components/catcup/trailer-media"

interface FeaturedProps {
  /** The queue entry to spotlight as the next show. */
  entry: QueueEntry
}

interface HeaderProps {
  /** Callback invoked when the user skips to the next queued show. */
  onSkip: () => void
  /** The show title used for the skip button's accessible label. */
  skipTitle: string
}

interface HeroUpNextProps {
  /** Optional class names for the panel shell. */
  className?: string
}

interface LineupItemProps {
  /** The queue entry rendered in the compact lineup. */
  entry: QueueEntry
  /** The show's position in the queue (1-based). */
  position: number
}

interface LineupProps {
  /** Remaining queue entries after the featured show. */
  entries: QueueEntry[]
}

interface ShowMetaProps {
  /** The show whose metadata is displayed. */
  show: Show
}

/**
 * Glassy Up Next panel with a featured next show and a compact lineup below.
 * Animates in and out so the hero stays uncluttered while the queue is empty.
 */
function HeroUpNextRoot({ className }: HeroUpNextProps) {
  const { dispatch, queue } = usePlayer()
  const [next, ...upcoming] = queue
  const nextShow = next ? SHOWS_BY_ID[next.showId] : undefined

  return (
    <AnimatePresence>
      {next && nextShow ? (
        <m.aside
          animate="show"
          aria-label="Up next queue"
          className={cn(
            "flex flex-col gap-4 rounded-card border border-white/10 bg-surface-lowest/70 p-4 backdrop-blur-xl",
            className
          )}
          exit="hidden"
          initial="hidden"
          key="hero-up-next"
          transition={springSoft}
          variants={fadeRise}
        >
          <HeroUpNextHeader
            onSkip={() => dispatch({ type: "next" })}
            skipTitle={nextShow.title}
          />
          <HeroUpNextFeatured entry={next} />
          {upcoming.length > 0 ? (
            <HeroUpNextLineup entries={upcoming} />
          ) : null}
        </m.aside>
      ) : null}
    </AnimatePresence>
  )
}

/**
 * Panel header with title and skip control.
 */
function HeroUpNextHeader({ onSkip, skipTitle }: HeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-title-md font-bold text-foreground">Up Next</h2>
      <button
        aria-label={`Skip to ${skipTitle}`}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        onClick={onSkip}
        type="button"
      >
        Skip
        <SkipForward className="size-3.5" weight="fill" />
      </button>
    </div>
  )
}

/**
 * Full-width spotlight card for the next queued show.
 */
function HeroUpNextFeatured({ entry }: FeaturedProps) {
  const dispatch = usePlayerDispatch()
  const show = SHOWS_BY_ID[entry.showId]

  if (!show) return null

  return (
    <button
      className="group flex w-full flex-col gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
      onClick={() => dispatch({ type: "play", showId: show.id })}
      type="button"
    >
      <TrailerMedia
        className="aspect-video w-full overflow-hidden rounded-xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.01]"
        previewOnHover={false}
        show={show}
        sizes="320px"
      />
      <HeroUpNextShowMeta show={show} />
    </button>
  )
}

/**
 * Compact list of shows queued after the featured item.
 */
function HeroUpNextLineup({ entries }: LineupProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-label-sm px-1 text-subtle">Later in queue</p>
      <ol className="flex flex-col gap-1 rounded-xl bg-black/25 p-1.5">
        <AnimatePresence initial={false}>
          {entries.map((entry, index) => (
            <HeroUpNextLineupItem
              entry={entry}
              key={entry.key}
              position={index + 2}
            />
          ))}
        </AnimatePresence>
      </ol>
    </div>
  )
}

/**
 * Single compact row in the later-queue lineup.
 */
function HeroUpNextLineupItem({ entry, position }: LineupItemProps) {
  const dispatch = usePlayerDispatch()
  const show = SHOWS_BY_ID[entry.showId]

  if (!show) return null

  return (
    <m.li
      animate="show"
      className="list-none"
      exit="hidden"
      initial="hidden"
      layout
      transition={springSoft}
      variants={fadeRise}
    >
      <button
        className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        onClick={() => dispatch({ type: "play", showId: show.id })}
        type="button"
      >
        <span className="w-4 shrink-0 text-center text-xs font-medium text-subtle tabular-nums">
          {position}
        </span>
        <span className="min-w-0 flex-1 truncate text-body-sm text-foreground/90">
          {show.title}
        </span>
        <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
          {show.duration}
        </span>
      </button>
    </m.li>
  )
}

/**
 * Shared title and metadata block for a queued show.
 */
function HeroUpNextShowMeta({ show }: ShowMetaProps) {
  return (
    <span className="flex flex-col gap-2 px-1">
      <span className="truncate text-body-lg font-semibold text-foreground">
        {show.title}
      </span>
      <span className="text-xs text-muted-foreground tabular-nums">
        {show.duration}
      </span>
    </span>
  )
}

HeroUpNextRoot.Header = HeroUpNextHeader
HeroUpNextRoot.Featured = HeroUpNextFeatured
HeroUpNextRoot.Lineup = HeroUpNextLineup
HeroUpNextRoot.LineupItem = HeroUpNextLineupItem
HeroUpNextRoot.ShowMeta = HeroUpNextShowMeta

export const HeroUpNext = Object.assign(HeroUpNextRoot, {
  Featured: HeroUpNextFeatured,
  Header: HeroUpNextHeader,
  Lineup: HeroUpNextLineup,
  LineupItem: HeroUpNextLineupItem,
  ShowMeta: HeroUpNextShowMeta,
})
