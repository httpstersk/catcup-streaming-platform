"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  CircleNotch,
  Pause,
  Play,
  SkipForward,
  SpeakerHigh,
  SpeakerX,
  X,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { overlayFade, springSoft } from "@/lib/motion"
import { secondsToLabel, SHOWS_BY_ID } from "@/lib/shows"
import { usePlayer } from "@/components/catcup/player-provider"

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
 * Render a large, high-contrast close button for easy targeting.
 */
function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button
      onClick={onClose}
      type="button"
      aria-label="Close video player"
      className="grid size-12 place-items-center rounded-full bg-black/40 text-foreground backdrop-blur-md transition-all hover:bg-black/60 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
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
        "absolute inset-0 flex flex-col justify-end p-4 md:p-6 bg-linear-to-t from-black/85 via-black/10 to-transparent transition-opacity duration-300 pointer-events-none",
        showControls ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Bottom controls panel */}
      <div className="flex flex-col gap-2.5 w-full max-w-2xl mx-auto pointer-events-auto bg-black/55 backdrop-blur-md p-3 rounded-xl border border-hairline/30 shadow-lift mb-2 md:mb-6">
        {/* Timeline Scrubber */}
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-medium text-muted-foreground/80 tabular-nums select-none">
            {secondsToLabel(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => onSeek(Number(e.target.value))}
            aria-label="Seek timeline"
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-surface-highest accent-lime outline-hidden transition-all hover:h-1.5"
          />
          <span className="text-[10px] font-medium text-muted-foreground/80 tabular-nums select-none">
            {secondsToLabel(duration)}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={onPlayToggle}
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              className="grid size-9 place-items-center rounded-full bg-lime text-on-lime transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              {isPlaying ? (
                <Pause className="size-4" weight="fill" />
              ) : (
                <Play className="size-4 translate-x-0.5" weight="fill" />
              )}
            </button>

            {/* Skip Next Button */}
            <button
              onClick={onSkipNext}
              type="button"
              aria-label="Skip to next show"
              className="grid size-8 place-items-center rounded-full border border-outline-variant bg-surface/30 text-foreground transition-all hover:bg-surface-container hover:text-foreground active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              <SkipForward className="size-3.5" weight="fill" />
            </button>

            {/* Mute/Unmute Toggle */}
            <button
              onClick={onMuteToggle}
              type="button"
              aria-label={isMuted ? "Unmute sound" : "Mute sound"}
              className="grid size-8 place-items-center rounded-full border border-outline-variant bg-surface/30 text-foreground transition-all hover:bg-surface-container hover:text-foreground active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              {isMuted ? (
                <SpeakerX className="size-3.5" />
              ) : (
                <SpeakerHigh className="size-3.5" />
              )}
            </button>

            {/* Title display */}
            <span className="text-xs font-semibold text-foreground select-none truncate max-w-[200px] md:max-w-xs ml-1">
              Now Watching: <span className="text-lime">{title}</span>
            </span>
          </div>

          <div className="hidden sm:block">
            <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground/80 select-none">
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

  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [isBuffering, setIsBuffering] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(false)
  const [showControls, setShowControls] = React.useState(true)

  const videoRef = React.useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = React.useRef<number | null>(null)

  /**
   * Closes the player and stops playback.
   */
  const handleClose = React.useCallback(() => {
    dispatch({ type: "setFullscreen", value: false })
    dispatch({ type: "setPlaying", value: false })
  }, [dispatch])

  // Listen for Escape key to close player
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isFullscreen) {
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, handleClose])

  // Synchronize playback with global states
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

  // Track and handle mouse inactivity to fade controls
  React.useEffect(() => {
    if (!isFullscreen || !isPlaying) return

    const handleMouseMove = () => {
      setShowControls(true)
      if (controlsTimeoutRef.current !== null) {
        window.clearTimeout(controlsTimeoutRef.current)
      }
      // setTimeout is used here as a last resort to implement the standard video player behavior of hiding UI controls after a period of mouse inactivity.
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false)
      }, 2500)
    }

    window.addEventListener("mousemove", handleMouseMove)
    handleMouseMove() // Initialize visibility

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (controlsTimeoutRef.current !== null) {
        window.clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isFullscreen, isPlaying])

  // Reset timeline position when closing
  React.useEffect(() => {
    if (!isFullscreen) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0
      }
    }
  }, [isFullscreen])

  if (!activeShow) return null

  const isControlsVisible = showControls || !isPlaying

  return (
    <AnimatePresence>
      {isFullscreen ? (
        <motion.div
          key="fullscreen-player"
          animate="show"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black"
          exit="hidden"
          initial="hidden"
          transition={springSoft}
          variants={overlayFade}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src={activeShow.trailer}
            poster={activeShow.blurDataURL}
            muted={isMuted}
            playsInline
            preload="auto"
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => setIsBuffering(false)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onEnded={() => {
              if (queue.length > 0) {
                dispatch({ type: "next" })
              } else {
                handleClose()
              }
            }}
            className="absolute inset-0 size-full object-cover"
          />

          {/* Buffering/Loading Indicator */}
          <AnimatePresence>
            {isBuffering ? (
              <motion.div
                animate={{ opacity: 1 }}
                className="absolute inset-0 grid place-items-center bg-black/20 backdrop-blur-xs pointer-events-none"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              >
                <CircleNotch className="size-10 animate-spin text-lime" />
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Close button position overlay (always accessible) */}
          <div
            className={cn(
              "absolute top-6 right-6 z-10 transition-opacity duration-300",
              isControlsVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          >
            <FullscreenPlayer.CloseButton onClose={handleClose} />
          </div>

          {/* Controls Overlay Layer */}
          <FullscreenPlayer.Controls
            currentTime={currentTime}
            duration={duration}
            isMuted={isMuted}
            isPlaying={isPlaying}
            onMuteToggle={() => setIsMuted((m) => !m)}
            onPlayToggle={() => dispatch({ type: "togglePlay" })}
            onSeek={(val) => {
              if (videoRef.current) {
                videoRef.current.currentTime = val
              }
              setCurrentTime(val)
            }}
            onSkipNext={() => dispatch({ type: "next" })}
            showControls={isControlsVisible}
            title={activeShow.title}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

FullscreenPlayer.CloseButton = CloseButton
FullscreenPlayer.Controls = Controls
