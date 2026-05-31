"use client"

import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { FILTERS } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"

export function FilterChips() {
  const { activeFilter, search, dispatch } = usePlayer()

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-0.5">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => dispatch({ type: "setFilter", value: filter.id })}
              aria-pressed={isActive}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-body-sm font-semibold transition-colors",
                isActive
                  ? "border-blue/70 bg-blue/15 text-blue-soft"
                  : "border-hairline bg-surface-low text-muted-foreground hover:border-outline-variant hover:text-foreground"
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      <label className="relative shrink-0 lg:w-64">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => dispatch({ type: "setSearch", value: e.target.value })}
          placeholder="Search shows"
          className="w-full rounded-full border border-hairline bg-surface-low py-2 pr-4 pl-10 text-body-sm text-foreground placeholder:text-muted-foreground/80 focus:border-outline focus:outline-none"
        />
      </label>
    </div>
  )
}
