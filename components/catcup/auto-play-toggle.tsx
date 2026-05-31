"use client"

import { Switch } from "radix-ui"

import { usePlayer } from "@/components/catcup/player-provider"

export function AutoPlayToggle() {
  const { autoPlay, dispatch } = usePlayer()

  return (
    <div className="flex items-center justify-between rounded-card border border-hairline bg-surface-low px-4 py-3">
      <div>
        <p className="text-body-sm font-semibold text-foreground">Auto Play</p>
        <p className="text-xs text-muted-foreground">Keep the fun going</p>
      </div>
      <Switch.Root
        checked={autoPlay}
        onCheckedChange={() => dispatch({ type: "toggleAutoPlay" })}
        className="relative h-6 w-11 shrink-0 rounded-full bg-surface-highest transition-colors outline-none data-[state=checked]:bg-lime focus-visible:ring-2 focus-visible:ring-lime/50"
        aria-label="Toggle auto play"
      >
        <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px]" />
      </Switch.Root>
    </div>
  )
}
