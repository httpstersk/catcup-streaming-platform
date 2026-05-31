"use client"

import * as React from "react"
import {
  Bird,
  Bug,
  Cat,
  ChevronDown,
  Crosshair,
  House,
  Leaf,
  ListMusic,
  Radio,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { usePlayer } from "@/components/catcup/player-provider"
import { CatCupLogo, CatCupMark } from "@/components/catcup/logo"

interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  filter?: string
}

const NAV_ITEMS: NavItem[] = [
  { id: "for-you", label: "For You", icon: House, filter: "all" },
  { id: "live", label: "Live", icon: Radio, filter: "live" },
  { id: "birds", label: "Birds", icon: Bird, filter: "birds" },
  { id: "bugs", label: "Bugs", icon: Bug, filter: "bugs" },
  { id: "chase", label: "Chase", icon: Crosshair, filter: "chase" },
  { id: "calm", label: "Calm", icon: Leaf, filter: "calm" },
  { id: "queue", label: "Queue", icon: ListMusic },
]

export function Sidebar() {
  const { activeFilter, dispatch } = usePlayer()

  return (
    <aside className="flex h-full flex-col gap-6 px-5 py-7">
      <div className="px-1">
        <CatCupLogo />
      </div>

      <button
        type="button"
        className="flex items-center gap-3 rounded-2xl border border-hairline bg-surface-low/60 p-2.5 text-left transition-colors hover:bg-surface-container"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-surface-high to-surface-low ring-2 ring-lime">
          <Cat className="size-5 text-lime" strokeWidth={2.25} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-body-sm font-semibold text-foreground">
            Milo
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            Curious Explorer
          </span>
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
      </button>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.filter
            ? activeFilter === item.filter
            : false
          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                item.filter && dispatch({ type: "setFilter", value: item.filter })
              }
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-body-sm font-semibold transition-colors",
                isActive
                  ? "bg-blue text-on-blue shadow-[0_8px_20px_-10px_var(--color-blue)]"
                  : "text-muted-foreground hover:bg-surface-container hover:text-foreground"
              )}
            >
              <item.icon
                className={cn("size-5 shrink-0", isActive && "text-on-blue")}
                strokeWidth={2}
              />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="px-2 pt-2">
        <CatCupMark className="size-7 text-foreground/90" />
      </div>
    </aside>
  )
}
