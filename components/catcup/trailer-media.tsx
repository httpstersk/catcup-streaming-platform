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
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const shouldPlay = active || (previewOnHover && hovered)

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
      onMouseEnter={() => previewOnHover && setHovered(true)}
      onMouseLeave={() => previewOnHover && setHovered(false)}
    >
      <Image
        src={show.thumbnail}
        alt={show.title}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        priority={priority}
        className={cn("object-cover", imageClassName)}
      />
      <video
        ref={videoRef}
        src={show.trailer}
        muted
        loop
        playsInline
        preload="none"
        className={cn(
          "absolute inset-0 size-full object-cover transition-opacity duration-500",
          shouldPlay ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  )
}
