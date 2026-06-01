"use client"

import { HeroUpNext } from "@/components/catcup/hero-up-next"

/**
 * Desktop-only overlay that pins the hero "Up Next" card below the top navigation
 * while scrolling the homepage. It starts vertically centered in the hero and
 * remains stuck under the nav for the rest of the page.
 */
export function StickyHeroUpNext() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-20 mx-auto hidden max-w-[1440px] px-4 sm:px-6 lg:block lg:px-10">
      <div className="grid h-full grid-cols-[minmax(0,1fr)_320px]">
        <div aria-hidden className="min-h-0" />
        <div className="pointer-events-auto h-full pt-[calc(41svh-7.75rem)]">
          <div className="sticky top-16 w-full">
            <HeroUpNext />
          </div>
        </div>
      </div>
    </div>
  )
}
