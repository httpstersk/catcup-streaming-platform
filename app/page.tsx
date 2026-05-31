import { Cat } from "lucide-react"

import { PlayerProvider } from "@/components/catcup/player-provider"
import { Sidebar } from "@/components/catcup/sidebar"
import { FilterChips } from "@/components/catcup/filter-chips"
import { Hero } from "@/components/catcup/hero"
import { ShowGrid } from "@/components/catcup/show-grid"
import { UpNext } from "@/components/catcup/up-next"
import { CatCupLogo } from "@/components/catcup/logo"

export default function Page() {
  return (
    <PlayerProvider>
      <div className="mx-auto flex min-h-svh w-full max-w-[1440px] bg-background">
        <aside className="sticky top-0 hidden h-svh w-60 shrink-0 border-r border-hairline lg:block">
          <Sidebar />
        </aside>

        <main className="scrollbar-thin h-svh min-w-0 flex-1 overflow-y-auto">
          <MobileTopBar />

          <div className="flex flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
            <header className="flex flex-col gap-5">
              <h1 className="text-[24px] leading-8 font-bold tracking-tight lg:text-headline-lg">
                Choose today&apos;s cat show
              </h1>
              <FilterChips />
            </header>

            <Hero />
            <ShowGrid />

            <section className="rounded-card border border-hairline bg-surface-low/40 xl:hidden">
              <UpNext />
            </section>
          </div>
        </main>

        <aside className="scrollbar-thin sticky top-0 hidden h-svh w-[340px] shrink-0 overflow-y-auto border-l border-hairline xl:block">
          <UpNext />
        </aside>
      </div>
    </PlayerProvider>
  )
}

function MobileTopBar() {
  return (
    <div className="flex items-center justify-between border-b border-hairline px-4 py-3 lg:hidden">
      <CatCupLogo />
      <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-surface-high to-surface-low ring-2 ring-lime">
        <Cat className="size-5 text-lime" strokeWidth={2.25} />
      </span>
    </div>
  )
}
