"use client"

import { Check, ChevronDown } from "lucide-react"
import { Select } from "radix-ui"

import { NAP_TIMER_OPTIONS } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"

export function NapTimer() {
  const { napTimer, dispatch } = usePlayer()

  return (
    <div className="flex items-center justify-between rounded-card border border-hairline bg-surface-low px-4 py-3">
      <div>
        <p className="text-body-sm font-semibold text-foreground">Nap Timer</p>
        <p className="text-xs text-muted-foreground">Stop after</p>
      </div>
      <Select.Root
        value={napTimer}
        onValueChange={(value) => dispatch({ type: "setNapTimer", value })}
      >
        <Select.Trigger
          className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-surface-container px-3 py-1.5 text-body-sm font-semibold text-foreground outline-none transition-colors hover:bg-surface-high focus-visible:ring-2 focus-visible:ring-blue/40"
          aria-label="Nap timer"
        >
          <Select.Value />
          <Select.Icon>
            <ChevronDown className="size-4 text-muted-foreground" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={6}
            className="z-50 overflow-hidden rounded-lg border border-hairline bg-surface-high shadow-lift"
          >
            <Select.Viewport className="p-1">
              {NAP_TIMER_OPTIONS.map((option) => (
                <Select.Item
                  key={option}
                  value={option}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-1.5 text-body-sm text-foreground outline-none select-none data-[highlighted]:bg-surface-highest data-[state=checked]:text-lime"
                >
                  <Select.ItemText>{option}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="size-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
