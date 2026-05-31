export type Category = "birds" | "bugs" | "chase" | "calm"

export interface CategoryMeta {
  id: Category
  label: string
  badgeClass: string
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  birds: {
    id: "birds",
    label: "Birds",
    badgeClass: "bg-blue text-on-blue",
  },
  bugs: {
    id: "bugs",
    label: "Bugs",
    badgeClass: "bg-lime text-on-lime",
  },
  chase: {
    id: "chase",
    label: "Chase",
    badgeClass: "bg-blue text-on-blue",
  },
  calm: {
    id: "calm",
    label: "Calm",
    badgeClass: "bg-olive text-on-olive",
  },
}

export interface Show {
  id: string
  title: string
  category: Category
  duration: string
  thumbnail: string
  trailer: string
  tags: string[]
  description: string
  isLive?: boolean
}

export const SHOWS: Show[] = [
  {
    id: "branch-bounder",
    title: "Branch Bounder",
    category: "chase",
    duration: "10:45",
    thumbnail: "/images/tv-show-thumbnail-branch-bounder.webp",
    trailer: "/videos/tv-show-trailer-branch-bounder.mp4",
    tags: ["Trees", "Jumping", "Active", "Outdoors"],
    description:
      "Watch agile jumpers navigate the canopy and leap from branch to branch. Fast moves, rustling leaves, and endless curiosity.",
  },
  {
    id: "wild-yard",
    title: "Wild Yard",
    category: "birds",
    duration: "14:20",
    thumbnail: "/images/tv-show-thumbnail-wild-yard.webp",
    trailer: "/videos/tv-show-trailer-wild-yard.mp4",
    tags: ["Garden", "Flocks", "Splashing", "Outdoors"],
    description:
      "A busy backyard bird bath bursting with sparrows and jays. Fluttering wings and flicking water to keep every whisker twitching.",
  },
  {
    id: "frost-runner",
    title: "Frost Runner",
    category: "chase",
    duration: "10:45",
    thumbnail: "/images/tv-show-thumbnail-frost-runner.webp",
    trailer: "/videos/tv-show-trailer-frost-runner.mp4",
    tags: ["Snow", "Sprint", "Active", "Winter"],
    description:
      "A high-speed chase through an icy wonderland. Follow the elusive snow hare as it darts between frost-covered pines. Perfect for stimulating active feline hunting instincts.",
    isLive: true,
  },
  {
    id: "grasshopper-leap",
    title: "Grasshopper Leap",
    category: "bugs",
    duration: "08:30",
    thumbnail: "/images/tv-show-thumbnail-grasshopper-leap.webp",
    trailer: "/videos/tv-show-trailer-grasshopper-leap.mp4",
    tags: ["Meadow", "Hopping", "Tiny", "Summer"],
    description:
      "Close-up meadow hops with a bright green grasshopper. Twitchy antennae and surprise leaps across the tall grass.",
  },
  {
    id: "squirrel-chase",
    title: "Squirrel Chase",
    category: "chase",
    duration: "12:05",
    thumbnail: "/images/tv-show-thumbnail-squirrel-chase.webp",
    trailer: "/videos/tv-show-trailer-squirrel-chase.mp4",
    tags: ["Trees", "Scramble", "Fast", "Outdoors"],
    description:
      "A red squirrel scrambles up bark at full speed, tail whirling. Blurred motion and zig-zag dashes around the trunk.",
  },
  {
    id: "lizard-scamper",
    title: "Lizard Scamper",
    category: "bugs",
    duration: "12:15",
    thumbnail: "/images/tv-show-thumbnail-lizard-scamper.webp",
    trailer: "/videos/tv-show-trailer-lizard-scamper.mp4",
    tags: ["Rocks", "Darting", "Reptile", "Sunny"],
    description:
      "A vivid green lizard suns on a warm rock then darts away in a flash. Sudden scampers built to trigger the pounce.",
    isLive: true,
  },
]

export const SHOWS_BY_ID: Record<string, Show> = Object.fromEntries(
  SHOWS.map((show) => [show.id, show])
)

export const FEATURED_SHOW = SHOWS_BY_ID["frost-runner"]

/**
 * "More Shows for Kitty" featured layout: the first id renders as the large
 * card, the rest stack beside it. Ordered to match the homepage mock.
 */
export const FEATURED_GRID_IDS: string[] = [
  "wild-yard",
  "branch-bounder",
  "lizard-scamper",
]

/** Mockup grid uses 8 tiles; fill the layout by reusing assets after the unique six. */
export const GRID_SHOW_IDS: string[] = [
  "wild-yard",
  "branch-bounder",
  "frost-runner",
  "grasshopper-leap",
  "squirrel-chase",
  "lizard-scamper",
  "frost-runner",
  "grasshopper-leap",
]

export interface QueueEntry {
  key: string
  showId: string
}

export const INITIAL_QUEUE: QueueEntry[] = [
  { key: "q1", showId: "lizard-scamper" },
  { key: "q2", showId: "grasshopper-leap" },
  { key: "q3", showId: "squirrel-chase" },
]

export interface FilterOption {
  id: string
  label: string
}

export const FILTERS: FilterOption[] = [
  { id: "all", label: "All Shows" },
  { id: "live", label: "Live Now" },
  { id: "birds", label: "Birds" },
  { id: "bugs", label: "Bugs" },
  { id: "chase", label: "Chase" },
  { id: "calm", label: "Calm" },
]

export const NAP_TIMER_OPTIONS = ["15 min", "30 min", "45 min", "60 min", "Off"]

export function durationToSeconds(duration: string): number {
  const [m, s] = duration.split(":").map(Number)
  return m * 60 + (s || 0)
}

export function secondsToLabel(total: number): string {
  const m = Math.floor(total / 60)
  const s = Math.round(total % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}
