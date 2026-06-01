"use client"

import * as React from "react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import { CaretDown, SkipForward } from "@phosphor-icons/react"

import { fadeRise, springSoft } from "@/lib/motion"
import { QueueEntry, SHOWS_BY_ID, type Show } from "@/lib/shows"
import { cn } from "@/lib/utils"
import { usePlayer, usePlayerDispatch } from "@/components/catcup/player-provider"
import { TrailerMedia } from "@/components/catcup/trailer-media"

/** ID linking the collapse toggle to the expandable queue body. */
const HERO_UP_NEXT_CONTENT_ID = "hero-up-next-content"

interface BodyProps {
  /** Remaining queue entries after the featured show. */
  entries: QueueEntry[]
  /** The queue entry to spotlight as the next show. */
  next: QueueEntry
}

interface FeaturedProps {
  /** The queue entry to spotlight as the next show. */
  entry: QueueEntry
}

interface HeaderProps {
  /** Whether the queue body is collapsed. */
  isCollapsed: boolean
  /** Callback invoked when the user skips to the next queued show. */
  onSkip: () => void
  /** Callback invoked when the user toggles the collapsed state. */
  onToggleCollapse: () => void
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
 * Collapses to a minimal header bar and animates in and out when the queue is empty.
 */
function HeroUpNextRoot({ className }: HeroUpNextProps) {
  const { dispatch, queue } = usePlayer()
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [next, ...upcoming] = queue
  const nextShow = next ? SHOWS_BY_ID[next.showId] : undefined

  return (
    <AnimatePresence>
      {next && nextShow ? (
        <m.aside
          animate="show"
          aria-label="Up next queue"
          className={cn(
            "flex flex-col rounded-card border border-white/10 bg-surface-lowest/70 p-4 backdrop-blur-xl",
            className
          )}
          exit="hidden"
          initial="hidden"
          key="hero-up-next"
          layout
          transition={springSoft}
          variants={fadeRise}
        >
          <HeroUpNextHeader
            isCollapsed={isCollapsed}
            onSkip={() => dispatch({ type: "next" })}
            onToggleCollapse={() => setIsCollapsed((value) => !value)}
            skipTitle={nextShow.title}
          />
          <HeroUpNextBody
            entries={upcoming}
            isCollapsed={isCollapsed}
            next={next}
          />
        </m.aside>
      ) : null}
    </AnimatePresence>
  )
}

/**
 * Panel header with collapse toggle and skip control.
 */
function HeroUpNextHeader({
  isCollapsed,
  onSkip,
  onToggleCollapse,
  skipTitle,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        aria-controls={HERO_UP_NEXT_CONTENT_ID}
        aria-expanded={!isCollapsed}
        className="flex min-w-0 flex-1 items-center gap-2 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        onClick={onToggleCollapse}
        type="button"
      >
        <m.span
          animate={{ rotate: isCollapsed ? -90 : 0 }}
          className="grid size-5 shrink-0 place-items-center text-muted-foreground"
          transition={springSoft}
        >
          <CaretDown className="size-3.5" weight="bold" />
        </m.span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-body-sm font-semibold text-foreground">
            Up Next
          </span>
          {isCollapsed ? (
            <span className="truncate text-xs text-muted-foreground">
              {skipTitle}
            </span>
          ) : null}
        </span>
      </button>
      <button
        aria-label={`Skip to ${skipTitle}`}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        onClick={onSkip}
        type="button"
      >
        Skip
        <SkipForward className="size-3.5" weight="fill" />
      </button>
    </div>
  )
}

interface HeroUpNextBodyProps extends BodyProps {
  /** Whether the queue body is collapsed. */
  isCollapsed: boolean
}

/**
 * Animated expandable body containing the featured show and lineup.
 */
function HeroUpNextBody({ entries, isCollapsed, next }: HeroUpNextBodyProps) {
  return (
    <m.div
      animate={{
        height: isCollapsed ? 0 : "auto",
        opacity: isCollapsed ? 0 : 1,
      }}
      className="overflow-hidden"
      id={HERO_UP_NEXT_CONTENT_ID}
      initial={false}
      transition={springSoft}
    >
      <div className="flex flex-col gap-4 pt-4">
        <HeroUpNextFeatured entry={next} />
        {entries.length > 0 ? <HeroUpNextLineup entries={entries} /> : null}
      </div>
    </m.div>
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

HeroUpNextRoot.Body = HeroUpNextBody
HeroUpNextRoot.Featured = HeroUpNextFeatured
HeroUpNextRoot.Header = HeroUpNextHeader
HeroUpNextRoot.Lineup = HeroUpNextLineup
HeroUpNextRoot.LineupItem = HeroUpNextLineupItem
HeroUpNextRoot.ShowMeta = HeroUpNextShowMeta

export const HeroUpNext = Object.assign(HeroUpNextRoot, {
  Body: HeroUpNextBody,
  Featured: HeroUpNextFeatured,
  Header: HeroUpNextHeader,
  Lineup: HeroUpNextLineup,
  LineupItem: HeroUpNextLineupItem,
  ShowMeta: HeroUpNextShowMeta,
})
