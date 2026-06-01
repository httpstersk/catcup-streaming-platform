"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Show } from "@/lib/shows"

interface TrailerMediaProps {
  show: Show
  active?: boolean
  previewOnHover?: boolean
  priority?: boolean
  sizes?: string
  className?: string
  imageClassName?: string
}

export function TrailerMedia({
  show,
  active = false,
  previewOnHover = true,
  priority = false,
  sizes,
  className,
  imageClassName,
}: TrailerMediaProps) {
  const [hovered, setHovered] = React.useState(false)
  const [hasLoaded, setHasLoaded] = React.useState(active)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const shouldPlay = active || (previewOnHover && hovered)
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
        ref={videoRef}
        src={shouldLoad ? show.preview : undefined}
        poster={show.blurDataURL}
        muted
        loop
        playsInline
        preload="none"
        className={cn(
          "absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-500",
          shouldPlay ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  )
}
