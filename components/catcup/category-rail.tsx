"use client"

import {
  Bird,
  Bug,
  Crosshair,
  Leaf,
  LayoutGrid,
  Radio,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { usePlayer } from "@/components/catcup/player-provider"

interface RailItem {
  filter: string
  icon: LucideIcon
  isLive?: boolean
  label: string
}

/**
 * Quick-access category filters rendered as circular icon buttons, mirroring
 * the homepage mock. `Live` carries a pulsing lime status dot.
 */
const RAIL_ITEMS: RailItem[] = [
  { filter: "all", icon: LayoutGrid, label: "All" },
  { filter: "live", icon: Radio, isLive: true, label: "Live" },
  { filter: "birds", icon: Bird, label: "Birds" },
  { filter: "bugs", icon: Bug, label: "Bugs" },
  { filter: "chase", icon: Crosshair, label: "Chase" },
  { filter: "calm", icon: Leaf, label: "Calm" },
]

/**
 * Horizontal rail of circular category shortcuts wired to the player filter.
 */
export function CategoryRail() {
  const { activeFilter, dispatch } = usePlayer()

  return (
    <nav aria-label="Browse categories" className="no-scrollbar overflow-x-auto">
      <ul className="flex items-start gap-5 sm:gap-7">
        {RAIL_ITEMS.map((item) => {
          const isActive = activeFilter === item.filter
          return (
            <li key={item.filter}>
              <button
                aria-pressed={isActive}
                className="group flex w-14 flex-col items-center gap-2 focus-visible:outline-none"
                onClick={() => dispatch({ type: "setFilter", value: item.filter })}
                type="button"
              >
                <span
                  className={cn(
                    "relative grid size-12 place-items-center rounded-full border transition-colors group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-blue",
                    isActive
                      ? "border-transparent bg-blue text-on-blue"
                      : "border-hairline bg-surface-container text-foreground hover:bg-surface-high"
                  )}
                >
                  <item.icon className="size-5" strokeWidth={2} />
                  {item.isLive ? (
                    <span className="absolute top-0 right-0 size-2.5 animate-pulse rounded-full bg-lime ring-2 ring-background" />
                  ) : null}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
