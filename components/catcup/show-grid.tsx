"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import {
  FEATURED_GRID_IDS,
  MORE_SHOWS_SECTION_ID,
  SHOWS,
  SHOWS_BY_ID,
  type Show,
} from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"
import { ShowCard } from "@/components/catcup/show-card"

/**
 * "More Shows for Kitty": a curated, asymmetric featured grid (one large card
 * plus two stacked cards) that also responds to the active filter and search.
 * Any matches beyond the first three flow into a standard responsive grid.
 */
export function ShowGrid() {
  const { activeFilter, search } = usePlayer()

  const shows = React.useMemo<Show[]>(() => {
    const query = search.trim().toLowerCase()
    const isDefaultView = activeFilter === "all" && query === ""

    if (isDefaultView) {
      const featured = FEATURED_GRID_IDS.map((id) => SHOWS_BY_ID[id]).filter(Boolean)
      const remaining = SHOWS.filter((show) => !FEATURED_GRID_IDS.includes(show.id))
      return [...featured, ...remaining]
    }

    return SHOWS.filter((show) => {
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

  const [featured, ...rest] = shows
  const stacked = rest.slice(0, 2)
  const overflow = rest.slice(2)

  return (
    <section className="flex flex-col gap-5 scroll-mt-20" id={MORE_SHOWS_SECTION_ID}>
      <h3 className="text-title-md inline-flex items-center gap-2 font-bold text-foreground">
        More Shows for Kitty
        <ArrowRight className="size-5 text-muted-foreground" />
      </h3>

      {shows.length === 0 ? (
        <p className="text-body-sm rounded-card border border-hairline bg-surface-low px-4 py-12 text-center text-muted-foreground">
          No shows match this filter yet.
        </p>
      ) : (
        <div className="grid gap-4 lg:min-h-[420px] lg:grid-cols-3">
          <ShowCard
            className="lg:col-span-2 lg:row-span-2"
            featured
            show={featured}
          />
          {stacked.map((show, index) => (
            <ShowCard key={`${show.id}-${index}`} show={show} />
          ))}
        </div>
      )}

      {overflow.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {overflow.map((show, index) => (
            <ShowCard key={`${show.id}-overflow-${index}`} show={show} />
          ))}
        </div>
      ) : null}
    </section>
  )
}
