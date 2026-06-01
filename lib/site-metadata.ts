import type { Metadata } from "next"

/** Shared site metadata for the root layout and home page. */
export const siteMetadata: Metadata = {
  description:
    "A premium streaming platform built for feline audiences. Birds, bugs, chases and calm — curated shows for your cat.",
  icons: {
    icon: "/favicon.ico",
  },
  title: "CatCup — Streaming made for cats",
}

/** Path to a minimal WebVTT file used when no per-show captions exist yet. */
export const EMPTY_CAPTIONS_SRC = "/captions/empty.vtt"
