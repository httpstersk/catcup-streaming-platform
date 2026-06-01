"use client"

import * as React from "react"
import Image from "next/image"

import { EMPTY_CAPTIONS_SRC } from "@/lib/site-metadata"
import { cn } from "@/lib/utils"
import { Show } from "@/lib/shows"

interface TrailerMediaProps {
  active?: boolean
  autoplay?: boolean
  className?: string
  imageClassName?: string
  previewOnHover?: boolean
  priority?: boolean
  show: Show
  sizes?: string
}

/**
 * Thumbnail with an optional muted preview clip. Hover cards defer loading until
 * first interaction; pass `autoplay` for always-on background playback (e.g. hero).
 */
export function TrailerMedia({
  active = false,
  autoplay = false,
  className,
  imageClassName,
  previewOnHover = true,
  priority = false,
  show,
  sizes,
}: TrailerMediaProps) {
  const [hovered, setHovered] = React.useState(false)
  const [hasLoaded, setHasLoaded] = React.useState(active || autoplay)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const shouldPlay = active || autoplay || (previewOnHover && hovered)
  // Only attach the preview clip source once playback is first requested, so
  // idle cards never fetch video and re-hovering stays instant.
  const shouldLoad = hasLoaded || shouldPlay

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (shouldPlay) {
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [shouldPlay])

  return (
    <div
      className={cn("relative overflow-hidden bg-surface-low", className)}
      onMouseEnter={() => {
        if (!previewOnHover) return
        setHasLoaded(true)
        setHovered(true)
      }}
      onMouseLeave={() => previewOnHover && setHovered(false)}
    >
      <Image
        src={show.thumbnail}
        alt={show.title}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        priority={priority}
        placeholder="blur"
        blurDataURL={show.blurDataURL}
        className={cn("object-cover", imageClassName)}
      />
      <video
        aria-label={`Preview: ${show.title}`}
        autoPlay={autoplay}
        className={cn(
          "absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-500",
          shouldPlay ? "opacity-100" : "opacity-0"
        )}
        loop
        muted
        playsInline
        poster={show.blurDataURL}
        preload={autoplay ? "auto" : "none"}
        ref={videoRef}
        src={shouldLoad ? show.preview : undefined}
      >
        <track default kind="captions" label="Captions" src={EMPTY_CAPTIONS_SRC} srcLang="en" />
      </video>
    </div>
  )
}
