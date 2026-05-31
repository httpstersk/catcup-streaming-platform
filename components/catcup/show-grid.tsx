"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"

import { GRID_SHOW_IDS, SHOWS_BY_ID } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"
import { ShowCard } from "@/components/catcup/show-card"

export function ShowGrid() {
  const { activeFilter, search } = usePlayer()

  const shows = React.useMemo(() => {
    const query = search.trim().toLowerCase()
    return GRID_SHOW_IDS.map((id, index) => ({
      key: `${id}-${index}`,
      show: SHOWS_BY_ID[id],
    })).filter(({ show }) => {
      if (activeFilter === "live" && !show.isLive) return false
      if (
        activeFilter !== "all" &&
        activeFilter !== "live" &&
        show.category !== activeFilter
      ) {
        return false
      }
      if (query && !show.title.toLowerCase().includes(query)) return false
      return true
    })
  }, [activeFilter, search])

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-title-md text-foreground">More Shows for Milo</h3>

      {shows.length === 0 ? (
        <p className="rounded-card border border-hairline bg-surface-low px-4 py-10 text-center text-body-sm text-muted-foreground">
          No shows match this filter yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {shows.map(({ key, show }) => (
            <ShowCard key={key} show={show} />
          ))}
        </div>
      )}

      <button
        type="button"
        className="mx-auto inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-body-sm font-semibold text-blue-soft transition-colors hover:text-foreground"
      >
        See all shows
        <ChevronRight className="size-4" />
      </button>
    </section>
  )
}
