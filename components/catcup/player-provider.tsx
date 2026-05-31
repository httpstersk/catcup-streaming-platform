"use client"

import * as React from "react"

import {
  durationToSeconds,
  FEATURED_SHOW,
  INITIAL_QUEUE,
  QueueEntry,
  SHOWS_BY_ID,
} from "@/lib/shows"

interface PlayerState {
  isPlaying: boolean
  autoPlay: boolean
  napTimer: string
  activeFilter: string
  search: string
  nowPlayingId: string
  queue: QueueEntry[]
}

type PlayerAction =
  | { type: "togglePlay" }
  | { type: "setPlaying"; value: boolean }
  | { type: "toggleAutoPlay" }
  | { type: "setNapTimer"; value: string }
  | { type: "setFilter"; value: string }
  | { type: "setSearch"; value: string }
  | { type: "play"; showId: string }
  | { type: "enqueue"; showId: string }
  | { type: "removeFromQueue"; key: string }
  | { type: "clearQueue" }
  | { type: "next" }

const initialState: PlayerState = {
  isPlaying: false,
  autoPlay: true,
  napTimer: "30 min",
  activeFilter: "all",
  search: "",
  nowPlayingId: FEATURED_SHOW.id,
  queue: INITIAL_QUEUE,
}

function reducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "togglePlay":
      return { ...state, isPlaying: !state.isPlaying }
    case "setPlaying":
      return { ...state, isPlaying: action.value }
    case "toggleAutoPlay":
      return { ...state, autoPlay: !state.autoPlay }
    case "setNapTimer":
      return { ...state, napTimer: action.value }
    case "setFilter":
      return { ...state, activeFilter: action.value }
    case "setSearch":
      return { ...state, search: action.value }
    case "play":
      return { ...state, nowPlayingId: action.showId, isPlaying: true }
    case "enqueue":
      if (state.queue.some((q) => q.showId === action.showId)) return state
      return {
        ...state,
        queue: [
          ...state.queue,
          { key: `q-${action.showId}-${Date.now()}`, showId: action.showId },
        ],
      }
    case "removeFromQueue":
      return {
        ...state,
        queue: state.queue.filter((q) => q.key !== action.key),
      }
    case "clearQueue":
      return { ...state, queue: [] }
    case "next": {
      const [head, ...rest] = state.queue
      if (!head) return state
      return { ...state, nowPlayingId: head.showId, queue: rest, isPlaying: true }
    }
    default:
      return state
  }
}

interface PlayerContextValue extends PlayerState {
  dispatch: React.Dispatch<PlayerAction>
  totalQueueSeconds: number
}

const PlayerContext = React.createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const totalQueueSeconds = React.useMemo(() => {
    const nowPlaying = SHOWS_BY_ID[state.nowPlayingId]
    const base = nowPlaying ? durationToSeconds(nowPlaying.duration) : 0
    return state.queue.reduce(
      (sum, entry) => sum + durationToSeconds(SHOWS_BY_ID[entry.showId].duration),
      base
    )
  }, [state.queue, state.nowPlayingId])

  const value = React.useMemo<PlayerContextValue>(
    () => ({ ...state, dispatch, totalQueueSeconds }),
    [state, totalQueueSeconds]
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const ctx = React.useContext(PlayerContext)
  if (!ctx) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return ctx
}
