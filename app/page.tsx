import { CategoryRail } from "@/components/catcup/category-rail"
import { Hero } from "@/components/catcup/hero"
import { PlayerProvider } from "@/components/catcup/player-provider"
import { ShowGrid } from "@/components/catcup/show-grid"
import { TopNav } from "@/components/catcup/top-nav"

export default function Page() {
  return (
    <PlayerProvider>
      <div className="relative mx-auto flex min-h-svh w-full max-w-[1440px] flex-col bg-background">
        <TopNav />
        <main className="flex flex-col gap-10 pb-16">
          <Hero />
          <div className="flex flex-col gap-10 px-4 sm:px-6 lg:px-10">
            <CategoryRail />
            <ShowGrid />
          </div>
        </main>
      </div>
    </PlayerProvider>
  )
}
