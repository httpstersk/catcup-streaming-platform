"use client"

import Image from "next/image"
import { GripVertical } from "lucide-react"

import { QueueEntry, SHOWS_BY_ID } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"
import { CategoryBadge } from "@/components/catcup/category-badge"

export function QueueItem({ entry }: { entry: QueueEntry }) {
  const show = SHOWS_BY_ID[entry.showId]
  const { dispatch } = usePlayer()

  return (
    <div className="group flex items-center gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-surface-low">
      <button
        type="button"
        aria-label="Reorder"
        className="cursor-grab text-subtle/60 transition-colors hover:text-muted-foreground active:cursor-grabbing"
      >
        <GripVertical className="size-4" />
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
    </div>
  )
}
