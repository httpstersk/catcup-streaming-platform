"use client"

import { HeroUpNext } from "@/components/catcup/hero-up-next"
import { PageContainer } from "@/components/catcup/page-container"

/**
 * Desktop-only overlay that places the Up Next queue panel at the bottom-right
 * of the first viewport using absolute positioning. Horizontal and bottom inset
 * mirror the shared `PageContainer` horizontal inset.
 */
export function StickyHeroUpNext() {
  return (
    <PageContainer className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden h-svh flex-col justify-end pb-4 sm:pb-6 lg:flex lg:pb-10">
      <div className="grid w-full grid-cols-[minmax(0,1fr)_320px]">
        <div aria-hidden className="min-h-0" />
        <div className="pointer-events-auto w-full">
          <HeroUpNext />
        </div>
      </div>
    </PageContainer>
  )
}
