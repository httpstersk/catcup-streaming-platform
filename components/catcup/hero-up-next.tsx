"use client"

import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import { SkipForward } from "@phosphor-icons/react"

import { fadeRise, springSoft } from "@/lib/motion"
import { SHOWS_BY_ID } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"
import { QueueItem } from "@/components/catcup/queue-item"

/**
 * Glassy "Up Next" panel listing every queued show with a skip-to-next control.
 * Animates in and out so the hero stays uncluttered while the queue is empty.
 */
export function HeroUpNext() {
  const { dispatch, queue } = usePlayer()
  const next = queue[0]
  const nextShow = next ? SHOWS_BY_ID[next.showId] : undefined

  return (
    <AnimatePresence>
      {queue.length > 0 ? (
        <m.aside
          animate="show"
          aria-label="Up next queue"
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
            {nextShow ? (
              <button
                aria-label={`Skip to ${nextShow.title}`}
                className="grid size-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-container hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                onClick={() => dispatch({ type: "next" })}
                type="button"
              >
                <SkipForward className="size-4" weight="fill" />
              </button>
            ) : null}
          </div>

          <ul className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {queue.map((entry, index) => (
                <QueueItem entry={entry} isNext={index === 0} key={entry.key} />
              ))}
            </AnimatePresence>
          </ul>
        </m.aside>
      ) : null}
    </AnimatePresence>
  )
}
