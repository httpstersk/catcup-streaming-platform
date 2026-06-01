"use client"

import * as React from "react"

import {
  durationToSeconds,
  FEATURED_SHOW,
  INITIAL_QUEUE,
  QueueEntry,
  SHOWS_BY_ID,
} from "@/lib/shows"

/**
 * Represents the global playback and application state for the player.
 */
interface PlayerState {
  /** The currently active category filter for filtering lists. */
  activeFilter: string
  /** Flag indicating if the next video should start automatically when current ends. */
  autoPlay: boolean
  /** Flag indicating if the full-screen player view is active. */
  isFullscreen: boolean
  /** Flag indicating if media is actively playing. */
  isPlaying: boolean
  /** The selected nap timer value (e.g. "30 min"). */
  napTimer: string
  /** The identifier of the show currently playing. */
  nowPlayingId: string
  /** The list of upcoming shows in queue. */
  queue: QueueEntry[]
  /** The current active search query string. */
  search: string
}

/**
 * Action union type for mutating the player state.
 */
type PlayerAction =
  | { type: "clearQueue" }
  | { type: "enqueue"; showId: string }
  | { type: "next" }
  | { type: "play"; showId: string }
  | { type: "removeFromQueue"; key: string }
  | { type: "setFilter"; value: string }
  | { type: "setFullscreen"; value: boolean }
  | { type: "setNapTimer"; value: string }
  | { type: "setPlaying"; value: boolean }
  | { type: "setSearch"; value: string }
  | { type: "toggleAutoPlay" }
  | { type: "togglePlay" }

const initialState: PlayerState = {
  activeFilter: "all",
  autoPlay: true,
  isFullscreen: false,
  isPlaying: false,
  napTimer: "30 min",
  nowPlayingId: FEATURED_SHOW.id,
  queue: INITIAL_QUEUE,
  search: "",
}

/**
 * State reducer for the player context.
 *
 * @param state - The current state.
 * @param action - The action to process.
 * @returns The next state.
 */
function reducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "clearQueue":
      return { ...state, queue: [] }
    case "enqueue":
      if (state.queue.some((q) => q.showId === action.showId)) return state
      return {
        ...state,
        queue: [
          ...state.queue,
          { key: `q-${action.showId}-${Date.now()}`, showId: action.showId },
        ],
      }
    case "next": {
      const [head, ...rest] = state.queue
      if (!head) return state
      return {
        ...state,
        isFullscreen: true,
        isPlaying: true,
        nowPlayingId: head.showId,
        queue: rest,
      }
    }
    case "play":
      return {
        ...state,
        isFullscreen: true,
        isPlaying: true,
        nowPlayingId: action.showId,
      }
    case "removeFromQueue":
      return {
        ...state,
        queue: state.queue.filter((q) => q.key !== action.key),
      }
    case "setFilter":
      return { ...state, activeFilter: action.value }
    case "setFullscreen":
      return { ...state, isFullscreen: action.value }
    case "setNapTimer":
      return { ...state, napTimer: action.value }
    case "setPlaying":
      return { ...state, isPlaying: action.value }
    case "setSearch":
      return { ...state, search: action.value }
    case "toggleAutoPlay":
      return { ...state, autoPlay: !state.autoPlay }
    case "togglePlay": {
      const nextPlaying = !state.isPlaying
      return {
        ...state,
        isFullscreen: nextPlaying ? true : state.isFullscreen,
        isPlaying: nextPlaying,
      }
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
