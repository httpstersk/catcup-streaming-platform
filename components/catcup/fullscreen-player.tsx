"use client"

import * as React from "react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import {
  CircleNotch,
  Pause,
  Play,
  SkipForward,
  SpeakerHigh,
  SpeakerX,
  X,
} from "@phosphor-icons/react"

import { usePlayer } from "@/components/catcup/player-provider"
import { overlayFade, springSoft } from "@/lib/motion"
import { EMPTY_CAPTIONS_SRC } from "@/lib/site-metadata"
import { secondsToLabel, SHOWS_BY_ID } from "@/lib/shows"
import { cn } from "@/lib/utils"

/** Inactivity delay before hiding fullscreen controls (ms). */
const CONTROLS_HIDE_DELAY_MS = 2500

/**
 * Props for the CloseButton component.
 */
interface CloseButtonProps {
  /** Callback fired when the close button is clicked. */
  onClose: () => void
}

/**
 * Props for the Controls component.
 */
interface ControlsProps {
  /** The current playback time in seconds. */
  currentTime: number
  /** The total duration of the media in seconds. */
  duration: number
  /** Whether the audio is currently muted. */
  isMuted: boolean
  /** Whether media is currently playing. */
  isPlaying: boolean
  /** Callback to toggle mute state. */
  onMuteToggle: () => void
  /** Callback to toggle play/pause state. */
  onPlayToggle: () => void
  /** Callback when seeking media time. */
  onSeek: (value: number) => void
  /** Callback to skip to the next queued show. */
  onSkipNext: () => void
  /** Whether controls overlay should be visible. */
  showControls: boolean
  /** The title of the current show. */
  title: string
}

/**
 * Local UI state for the fullscreen overlay (timeline, buffering, chrome).
 */
interface FullscreenUiState {
  currentTime: number
  duration: number
  isBuffering: boolean
  isMuted: boolean
  showControls: boolean
}

/** Actions for {@link fullscreenUiReducer}. */
type FullscreenUiAction =
  | { type: "setBuffering"; value: boolean }
  | { type: "setCurrentTime"; value: number }
  | { type: "setDuration"; value: number }
  | { type: "setShowControls"; value: boolean }
  | { type: "toggleMuted" }

const initialFullscreenUiState: FullscreenUiState = {
  currentTime: 0,
  duration: 0,
  isBuffering: false,
  isMuted: false,
  showControls: true,
}

/**
 * Reducer for fullscreen player chrome and playback timeline UI.
 *
 * @param state - Current UI state.
 * @param action - State mutation to apply.
 * @returns Next UI state.
 */
function fullscreenUiReducer(
  state: FullscreenUiState,
  action: FullscreenUiAction
): FullscreenUiState {
  switch (action.type) {
    case "setBuffering":
      return { ...state, isBuffering: action.value }
    case "setCurrentTime":
      return { ...state, currentTime: action.value }
    case "setDuration":
      return { ...state, duration: action.value }
    case "setShowControls":
      return { ...state, showControls: action.value }
    case "toggleMuted":
      return { ...state, isMuted: !state.isMuted }
    default:
      return state
  }
}

/**
 * Render a large, high-contrast close button for easy targeting.
 */
function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button
      aria-label="Close video player"
      className="grid size-12 place-items-center rounded-full bg-black/40 text-foreground backdrop-blur-md transition-all hover:bg-black/60 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
      onClick={onClose}
      type="button"
    >
      <X className="size-6" />
    </button>
  )
}

/**
 * Renders the overlays for playback, timeline, and title meta.
 */
function Controls({
  currentTime,
  duration,
  isMuted,
  isPlaying,
  onMuteToggle,
  onPlayToggle,
  onSeek,
  onSkipNext,
  showControls,
  title,
}: ControlsProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/85 via-black/10 to-transparent p-4 transition-opacity duration-300 md:p-6",
        showControls ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="pointer-events-auto mx-auto mb-2 flex w-full max-w-2xl flex-col gap-2.5 rounded-xl border border-hairline/30 bg-black/55 p-3 shadow-lift backdrop-blur-md md:mb-6">
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-medium text-muted-foreground/80 tabular-nums select-none">
            {secondsToLabel(currentTime)}
          </span>
          <input
            aria-label="Seek timeline"
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-surface-highest accent-lime outline-hidden transition-all hover:h-1.5"
            max={duration || 100}
            min={0}
            onChange={(e) => onSeek(Number(e.target.value))}
            type="range"
            value={currentTime}
          />
          <span className="text-[10px] font-medium text-muted-foreground/80 tabular-nums select-none">
            {secondsToLabel(duration)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label={isPlaying ? "Pause" : "Play"}
              className="grid size-9 place-items-center rounded-full bg-lime text-on-lime transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
              onClick={onPlayToggle}
              type="button"
            >
              {isPlaying ? (
                <Pause className="size-4" weight="fill" />
              ) : (
                <Play className="size-4 translate-x-0.5" weight="fill" />
              )}
            </button>

            <button
              aria-label="Skip to next show"
              className="grid size-8 place-items-center rounded-full border border-outline-variant bg-surface/30 text-foreground transition-all hover:bg-surface-container hover:text-foreground active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              onClick={onSkipNext}
              type="button"
            >
              <SkipForward className="size-3.5" weight="fill" />
            </button>

            <button
              aria-label={isMuted ? "Unmute sound" : "Mute sound"}
              className="grid size-8 place-items-center rounded-full border border-outline-variant bg-surface/30 text-foreground transition-all hover:bg-surface-container hover:text-foreground active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              onClick={onMuteToggle}
              type="button"
            >
              {isMuted ? (
                <SpeakerX className="size-3.5" />
              ) : (
                <SpeakerHigh className="size-3.5" />
              )}
            </button>

            <span className="ml-1 max-w-[200px] truncate text-xs font-semibold text-foreground select-none md:max-w-xs">
              Now Watching: <span className="text-lime">{title}</span>
            </span>
          </div>

          <div className="hidden sm:block">
            <span className="text-[10px] font-bold tracking-wider text-muted-foreground/80 uppercase select-none">
              Cinema Mode
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Immersive full-screen video player overlay.
 */
export function FullscreenPlayer() {
  const { dispatch, isFullscreen, isPlaying, nowPlayingId, queue } = usePlayer()
  const activeShow = SHOWS_BY_ID[nowPlayingId]
  const [ui, dispatchUi] = React.useReducer(
    fullscreenUiReducer,
    initialFullscreenUiState
  )

  const videoRef = React.useRef<HTMLVideoElement>(null)

  const closePlayer = React.useCallback(() => {
    dispatch({ type: "setFullscreen", value: false })
    dispatch({ type: "setPlaying", value: false })
  }, [dispatch])

  const closePlayerFromEffect = React.useEffectEvent(() => {
    dispatch({ type: "setFullscreen", value: false })
    dispatch({ type: "setPlaying", value: false })
  })

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isFullscreen) {
        closePlayerFromEffect()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen])

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isFullscreen && isPlaying) {
      video.play().catch((err) => {
        console.error("Playback execution failed:", err)
      })
    } else {
      video.pause()
    }
  }, [isFullscreen, isPlaying, nowPlayingId])

  React.useEffect(() => {
    if (!isFullscreen || !isPlaying) return

    let timeoutId: number | null = null

    const handleMouseMove = () => {
      dispatchUi({ type: "setShowControls", value: true })
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
      // setTimeout is used here as a last resort to implement the standard video player behavior of hiding UI controls after a period of mouse inactivity.
      timeoutId = window.setTimeout(() => {
        dispatchUi({ type: "setShowControls", value: false })
      }, CONTROLS_HIDE_DELAY_MS)
    }

    window.addEventListener("mousemove", handleMouseMove)
    handleMouseMove()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [isFullscreen, isPlaying])

  React.useEffect(() => {
    if (!isFullscreen && videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }, [isFullscreen])

  if (!activeShow) return null

  const isControlsVisible = ui.showControls || !isPlaying

  return (
    <AnimatePresence>
      {isFullscreen ? (
        <m.div
          animate="show"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-background"
          exit="hidden"
          initial="hidden"
          key="fullscreen-player"
          transition={springSoft}
          variants={overlayFade}
        >
          <video
            aria-label={`Playing ${activeShow.title}`}
            className="absolute inset-0 size-full object-cover"
            muted={ui.isMuted}
            onEnded={() => {
              if (queue.length > 0) {
                dispatch({ type: "next" })
              } else {
                closePlayer()
              }
            }}
            onLoadedMetadata={(e) =>
              dispatchUi({ type: "setDuration", value: e.currentTarget.duration })
            }
            onPlaying={() => dispatchUi({ type: "setBuffering", value: false })}
            onTimeUpdate={(e) =>
              dispatchUi({
                type: "setCurrentTime",
                value: e.currentTarget.currentTime,
              })
            }
            onWaiting={() => dispatchUi({ type: "setBuffering", value: true })}
            playsInline
            poster={activeShow.blurDataURL}
            preload="auto"
            ref={videoRef}
            src={activeShow.trailer}
          >
            <track
              default
              kind="captions"
              label="Captions"
              src={EMPTY_CAPTIONS_SRC}
              srcLang="en"
            />
          </video>

          <AnimatePresence>
            {ui.isBuffering ? (
              <m.div
                animate={{ opacity: 1 }}
                className="pointer-events-none absolute inset-0 grid place-items-center bg-black/20 backdrop-blur-xs"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              >
                <CircleNotch className="size-10 animate-spin text-lime" />
              </m.div>
            ) : null}
          </AnimatePresence>

          <div
            className={cn(
              "absolute top-6 right-6 z-10 transition-opacity duration-300",
              isControlsVisible
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            )}
          >
            <FullscreenPlayer.CloseButton onClose={closePlayer} />
          </div>

          <FullscreenPlayer.Controls
            currentTime={ui.currentTime}
            duration={ui.duration}
            isMuted={ui.isMuted}
            isPlaying={isPlaying}
            onMuteToggle={() => dispatchUi({ type: "toggleMuted" })}
            onPlayToggle={() => dispatch({ type: "togglePlay" })}
            onSeek={(val) => {
              if (videoRef.current) {
                videoRef.current.currentTime = val
              }
              dispatchUi({ type: "setCurrentTime", value: val })
            }}
            onSkipNext={() => dispatch({ type: "next" })}
            showControls={isControlsVisible}
            title={activeShow.title}
          />
        </m.div>
      ) : null}
    </AnimatePresence>
  )
}

FullscreenPlayer.CloseButton = CloseButton
FullscreenPlayer.Controls = Controls
