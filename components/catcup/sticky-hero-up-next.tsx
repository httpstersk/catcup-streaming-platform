"use client"

import { HeroUpNext } from "@/components/catcup/hero-up-next"

/**
 * Desktop-only overlay that places the Up Next queue panel at the bottom-right
 * of the first viewport using absolute positioning. Horizontal and bottom inset
 * mirror the category rail container (`px-4 sm:px-6 lg:px-10`).
 */
export function StickyHeroUpNext() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto hidden h-svh max-w-[1440px] flex-col justify-end px-4 pb-4 sm:px-6 sm:pb-6 lg:flex lg:px-10 lg:pb-10">
      <div className="grid w-full grid-cols-[minmax(0,1fr)_320px]">
        <div aria-hidden className="min-h-0" />
        <div className="pointer-events-auto w-full">
          <HeroUpNext />
        </div>
      </div>
    </div>
  )
}
