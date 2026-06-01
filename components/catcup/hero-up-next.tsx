"use client"

import { AnimatePresence, motion } from "motion/react"
import { SkipForward } from "@phosphor-icons/react"

import { fadeRise, springSoft } from "@/lib/motion"
import { SHOWS_BY_ID } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"
import { TrailerMedia } from "@/components/catcup/trailer-media"

/**
 * Compact, glassy "Up Next" preview for the hero. Shows the first queued show
 * with its runtime and a skip-to-next control. Animates in and out so the hero
 * stays uncluttered while the queue is empty.
 */
export function HeroUpNext() {
  const { dispatch, queue } = usePlayer()
  const next = queue[0]
  const show = next ? SHOWS_BY_ID[next.showId] : undefined

  return (
    <AnimatePresence>
      {next && show ? (
        <motion.div
          animate="show"
          className="flex flex-col gap-3 rounded-card border border-white/10 bg-surface-lowest/70 p-3.5 backdrop-blur-xl"
          exit="hidden"
          initial="hidden"
          key="hero-up-next"
          transition={springSoft}
          variants={fadeRise}
        >
          <div className="flex items-center justify-between">
            <span className="text-body-sm font-semibold text-foreground">
              Up Next
            </span>
            <button
              aria-label={`Skip to ${show.title}`}
              className="grid size-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-container hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              onClick={() => dispatch({ type: "next" })}
              type="button"
            >
              <SkipForward className="size-4" weight="fill" />
            </button>
          </div>

          <button
            className="group flex items-center gap-3 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
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
                Coming up &middot; {show.duration}
              </span>
              <span className="block truncate text-body-sm font-semibold text-foreground">
                {show.title}
              </span>
            </span>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
