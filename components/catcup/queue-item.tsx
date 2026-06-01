"use client"

import * as m from "motion/react-m"

import { fadeRise, springSoft } from "@/lib/motion"
import { QueueEntry, SHOWS_BY_ID } from "@/lib/shows"
import { usePlayerDispatch } from "@/components/catcup/player-provider"
import { TrailerMedia } from "@/components/catcup/trailer-media"

interface QueueItemProps {
  /** The queued show entry to render. */
  entry: QueueEntry
  /** Whether this entry is the next show to play. */
  isNext?: boolean
}

/**
 * Compact row for a single queued show inside the floating Up Next panel.
 */
export function QueueItem({ entry, isNext = false }: QueueItemProps) {
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
        className="group flex w-full items-center gap-3 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        onClick={() => dispatch({ type: "play", showId: show.id })}
        type="button"
      >
        <TrailerMedia
          className="aspect-video w-[88px] shrink-0 rounded-md"
          previewOnHover={false}
          show={show}
          sizes="88px"
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs text-muted-foreground">
            {isNext ? "Coming up" : "Queued"} &middot; {show.duration}
          </span>
          <span className="block truncate text-body-sm font-semibold text-foreground">
            {show.title}
          </span>
        </span>
      </button>
    </m.li>
  )
}
