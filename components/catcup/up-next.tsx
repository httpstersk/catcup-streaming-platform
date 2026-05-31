"use client"

import { usePlayer } from "@/components/catcup/player-provider"
import { QueueItem } from "@/components/catcup/queue-item"
import { PlaybackControls } from "@/components/catcup/playback-controls"
import { AutoPlayToggle } from "@/components/catcup/auto-play-toggle"
import { NapTimer } from "@/components/catcup/nap-timer"

export function UpNext() {
  const { queue, dispatch } = usePlayer()

  return (
    <div className="flex h-full flex-col gap-5 px-5 py-7">
      <div className="flex items-center justify-between">
        <h2 className="text-title-md text-foreground">Up Next</h2>
        <button
          type="button"
          onClick={() => dispatch({ type: "clearQueue" })}
          disabled={queue.length === 0}
          className="rounded-full border border-hairline px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-outline-variant hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear Queue
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {queue.length === 0 ? (
          <p className="rounded-xl border border-hairline bg-surface-low px-4 py-8 text-center text-body-sm text-muted-foreground">
            Your queue is empty.
          </p>
        ) : (
          queue.map((entry) => <QueueItem key={entry.key} entry={entry} />)
        )}
      </div>

      <div className="mt-auto flex flex-col gap-5 border-t border-hairline pt-5">
        <PlaybackControls />
        <div className="flex flex-col gap-3">
          <AutoPlayToggle />
          <NapTimer />
        </div>
      </div>
    </div>
  )
}
