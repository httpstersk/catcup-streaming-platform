import { CategoryRail } from "@/components/catcup/category-rail"
import { FullscreenPlayer } from "@/components/catcup/fullscreen-player"
import { Hero } from "@/components/catcup/hero"
import { PlayerProvider } from "@/components/catcup/player-provider"
import { ShowGrid } from "@/components/catcup/show-grid"
import { StickyHeroUpNext } from "@/components/catcup/sticky-hero-up-next"
import { TopNav } from "@/components/catcup/top-nav"

export default function Page() {
  return (
    <PlayerProvider>
      <div className="relative min-h-svh w-full bg-background">
        <TopNav />
        <main className="relative flex flex-col gap-10 pb-16">
          <Hero />
          <StickyHeroUpNext />
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 sm:px-6 lg:px-10">
            <CategoryRail />
            <ShowGrid />
          </div>
        </main>
        <FullscreenPlayer />
      </div>
    </PlayerProvider>
  )
}
