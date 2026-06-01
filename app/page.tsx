import type { Metadata } from "next"

import { CategoryRail } from "@/components/catcup/category-rail"
import { PageContainer } from "@/components/catcup/page-container"
import { siteMetadata } from "@/lib/site-metadata"
import { FullscreenPlayer } from "@/components/catcup/fullscreen-player"
import { Hero } from "@/components/catcup/hero"
import { PlayerProvider } from "@/components/catcup/player-provider"
import { ShowGrid } from "@/components/catcup/show-grid"
import { StickyHeroUpNext } from "@/components/catcup/sticky-hero-up-next"
import { TopNav } from "@/components/catcup/top-nav"

export const metadata: Metadata = siteMetadata

export default function Page() {
  return (
    <PlayerProvider>
      <div className="relative min-h-svh w-full bg-background">
        <TopNav />
        <StickyHeroUpNext />
        <main className="relative flex flex-col gap-10 pb-16">
          <Hero />
          <PageContainer className="flex flex-col gap-10">
            <CategoryRail />
            <ShowGrid />
          </PageContainer>
        </main>
        <FullscreenPlayer />
      </div>
    </PlayerProvider>
  )
}
