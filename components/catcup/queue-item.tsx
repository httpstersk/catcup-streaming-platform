"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { DotsSixVertical } from "@phosphor-icons/react"

import { fadeRise, springSoft } from "@/lib/motion"
import { QueueEntry, SHOWS_BY_ID } from "@/lib/shows"
import { usePlayerDispatch } from "@/components/catcup/player-provider"
import { CategoryBadge } from "@/components/catcup/category-badge"

export function QueueItem({ entry }: { entry: QueueEntry }) {
  const show = SHOWS_BY_ID[entry.showId]
  const dispatch = usePlayerDispatch()

  return (
    <motion.div
      animate="show"
      className="group flex items-center gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-surface-low"
      exit="hidden"
      initial="hidden"
      layout
      transition={springSoft}
      variants={fadeRise}
    >
      <button
        type="button"
        aria-label="Reorder"
        className="cursor-grab text-subtle/60 transition-colors hover:text-muted-foreground active:cursor-grabbing"
      >
        <DotsSixVertical className="size-4" />
      </button>

      <button
        type="button"
        onClick={() => dispatch({ type: "play", showId: show.id })}
        className="relative aspect-video w-20 shrink-0 overflow-hidden rounded-lg"
      >
        <Image
          src={show.thumbnail}
          alt={show.title}
          fill
          sizes="80px"
          placeholder="blur"
          blurDataURL={show.blurDataURL}
          className="object-cover"
        />
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <CategoryBadge category={show.category} className="self-start" />
        <span className="truncate text-body-sm font-semibold text-foreground">
          {show.title}
        </span>
      </div>

      <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
        {show.duration}
      </span>
    </motion.div>
  )
}
