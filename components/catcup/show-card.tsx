"use client"

import { Play } from "lucide-react"

import { Show } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"
import { CategoryBadge } from "@/components/catcup/category-badge"
import { TrailerMedia } from "@/components/catcup/trailer-media"

export function ShowCard({ show }: { show: Show }) {
  const { dispatch } = usePlayer()

  return (
    <button
      type="button"
      onClick={() => dispatch({ type: "play", showId: show.id })}
      className="group relative block overflow-hidden rounded-card border border-hairline bg-surface-low text-left transition-transform duration-200 hover:scale-[1.02] focus-visible:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
    >
      <TrailerMedia
        show={show}
        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 220px"
        className="aspect-video w-full"
        imageClassName="transition-transform duration-300 group-hover:scale-105"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

      <CategoryBadge category={show.category} className="absolute top-2.5 left-2.5" />

      <span className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-full bg-black/45 text-foreground opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
        <Play className="size-3.5 fill-current" />
      </span>
    </button>
  )
}
