"use client"

import * as React from "react"
import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { secondsToLabel } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"

export function PlaybackControls() {
  const { isPlaying, totalQueueSeconds, dispatch } = usePlayer()
  const [elapsed, setElapsed] = React.useState(45)
  const [scrubbing, setScrubbing] = React.useState(false)

  const total = Math.max(totalQueueSeconds, elapsed)

  React.useEffect(() => {
    if (!isPlaying) return
    const id = window.setInterval(() => {
      setElapsed((prev) => (prev >= total ? 0 : prev + 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [isPlaying, total])

  const progress = total > 0 ? Math.min((elapsed / total) * 100, 100) : 0

  function handleSeek(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - rect.left) / rect.width
    setElapsed(Math.round(Math.max(0, Math.min(1, ratio)) * total))
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-body-sm">
        <span className="text-muted-foreground">Total Playtime</span>
        <span className="font-semibold text-foreground tabular-nums">
          {secondsToLabel(total)}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <div
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={elapsed}
          tabIndex={0}
          onClick={handleSeek}
          onMouseEnter={() => setScrubbing(true)}
          onMouseLeave={() => setScrubbing(false)}
          className="group relative h-1.5 cursor-pointer rounded-full bg-surface-highest"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-lime"
            style={{ width: `${progress}%` }}
          />
          <span
            className={cn(
              "absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime shadow transition-opacity",
              scrubbing ? "opacity-100" : "opacity-0"
            )}
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground tabular-nums">
          <span>{secondsToLabel(elapsed)}</span>
          <span>{secondsToLabel(total)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-1 pt-1">
        <TransportButton label="Shuffle">
          <Shuffle className="size-5" />
        </TransportButton>
        <TransportButton label="Previous">
          <SkipBack className="size-5" weight="fill" />
        </TransportButton>

        <button
          type="button"
          onClick={() => dispatch({ type: "togglePlay" })}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="grid size-14 place-items-center rounded-full bg-lime text-on-lime transition-transform hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <Pause className="size-6" weight="fill" />
          ) : (
            <Play className="size-6 translate-x-0.5" weight="fill" />
          )}
        </button>

        <TransportButton label="Next" onClick={() => dispatch({ type: "next" })}>
          <SkipForward className="size-5" weight="fill" />
        </TransportButton>
        <TransportButton label="Repeat">
          <Repeat className="size-5" />
        </TransportButton>
      </div>
    </div>
  )
}

function TransportButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-container hover:text-foreground"
    >
      {children}
    </button>
  )
}
