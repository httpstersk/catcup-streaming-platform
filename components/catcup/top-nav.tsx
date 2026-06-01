"use client"

import * as m from "motion/react-m"
import { Bell, Cat, MagnifyingGlass } from "@phosphor-icons/react"

import { springSoft } from "@/lib/motion"
import { scrollToCategoryShows } from "@/lib/scroll"
import { cn } from "@/lib/utils"
import { CatCupLogo } from "@/components/catcup/logo"
import { usePlayer, usePlayerDispatch } from "@/components/catcup/player-provider"

interface NavLink {
  filter: string
  id: string
  label: string
}

/**
 * Primary navigation links. Each maps to a player filter so selecting a link
 * scopes the discovery grid, mirroring the homepage mock.
 */
const NAV_LINKS: NavLink[] = [
  { filter: "all", id: "home", label: "Home" },
  { filter: "birds", id: "birds", label: "Birds" },
  { filter: "bugs", id: "bugs", label: "Bugs" },
  { filter: "chase", id: "chase", label: "Chase" },
  { filter: "calm", id: "calm", label: "Calm" },
]

/**
 * Brand wordmark that returns the user to the personalized home feed.
 */
function TopNavBrand() {
  const dispatch = usePlayerDispatch()

  return (
    <button
      aria-label="CatCup home"
      className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
      onClick={() => dispatch({ type: "setFilter", value: "all" })}
      type="button"
    >
      <CatCupLogo />
    </button>
  )
}

/**
 * Horizontal category links with an underline indicator on the active filter.
 * Hidden on small screens, where the category rail provides navigation.
 */
function TopNavLinks() {
  const { activeFilter, dispatch } = usePlayer()

  return (
    <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
      {NAV_LINKS.map((link) => {
        const isActive = activeFilter === link.filter
        return (
          <button
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "text-body-sm relative py-1 font-semibold transition-colors",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            key={link.id}
            onClick={() => {
              dispatch({ type: "setFilter", value: link.filter })
              scrollToCategoryShows(link.filter)
            }}
            type="button"
          >
            {link.label}
            {isActive ? (
              <m.span
                className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-blue"
                layoutId="topnav-underline"
                transition={springSoft}
              />
            ) : null}
          </button>
        )
      })}
    </nav>
  )
}

/**
 * Trailing utilities: search, notifications with a live indicator, and the
 * active profile avatar.
 */
function TopNavActions() {
  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Search shows"
        className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-container hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        type="button"
      >
        <MagnifyingGlass className="size-5" weight="bold" />
      </button>

      <button
        aria-label="Notifications"
        className="relative grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-container hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        type="button"
      >
        <Bell className="size-5" weight="bold" />
        <span className="absolute top-1.5 right-2 size-2 rounded-full bg-lime ring-2 ring-background" />
      </button>

      <button
        aria-label="Kitty's profile"
        className="ml-1 grid size-9 place-items-center rounded-full bg-linear-to-br from-surface-high to-surface-low ring-2 ring-lime transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        type="button"
      >
        <Cat className="size-5 text-lime" weight="bold" />
      </button>
    </div>
  )
}

/**
 * Sticky, glassy top navigation bar that overlays the hero. Composed via the
 * compound component pattern: `TopNav.Brand`, `TopNav.Links`, `TopNav.Actions`.
 */
export function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 px-4 backdrop-blur-md sm:px-6 lg:px-10">
      <div className="flex items-center gap-9">
        <TopNav.Brand />
        <TopNav.Links />
      </div>
      <TopNav.Actions />
    </header>
  )
}

TopNav.Actions = TopNavActions
TopNav.Brand = TopNavBrand
TopNav.Links = TopNavLinks
