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

/** DOM id of the "More Shows for Kitty" section, used as a scroll anchor. */
export const MORE_SHOWS_SECTION_ID = "more-shows"

/** Type guard: true only for the specific browsable categories (excludes "all"/"live"). */
export function isCategory(value: string): value is Category {
  return value in CATEGORY_META
}

/**
 * Represents a single video show or stream on the platform.
 */
export interface Show {
  /** The content category of the show. */
  category: Category
  /** A short description of the show's content. */
  description: string
  /** The duration format label (e.g. "12:15"). */
  duration: string
  /** Unique identifier for the show. */
  id: string
  /** Optional flag indicating if the show is a live stream. */
  isLive?: boolean
  /** Tags for indexing and searching. */
  tags: string[]
  /** URL path to the thumbnail WebP image. */
  thumbnail: string
  /** Display title of the show. */
  title: string
  /** URL path to the MP4 trailer/video asset. */
  trailer: string
}

export const SHOWS: Show[] = [
  {
    category: "chase",
    description: "Watch agile jumpers navigate the canopy and leap from branch to branch. Fast moves, rustling leaves, and endless curiosity.",
    duration: "10:45",
    id: "branch-bounder",
    tags: ["Trees", "Jumping", "Active", "Outdoors"],
    thumbnail: "/images/tv-show-thumbnail-branch-bounder.webp",
    title: "Branch Bounder",
    trailer: "/videos/tv-show-trailer-branch-bounder.mp4",
  },
  {
    category: "calm",
    description: "Delight in the gentle, hypnotic dance of colorful butterflies drifting across a sunny garden. Perfect for a peaceful cat nap.",
    duration: "09:15",
    id: "butterfly-drift",
    tags: ["Butterflies", "Calming", "Garden", "Outdoors"],
    thumbnail: "/images/tv-show-thumbnail-butterfly-drift.webp",
    title: "Butterfly Drift",
    trailer: "/videos/tv-show-trailer-butterfly-drift.mp4",
  },
  {
    category: "birds",
    description: "Swirling, dancing feathers of all shapes and sizes designed to trigger your kitty's tracking reflexes and pouncing paw.",
    duration: "11:30",
    id: "feather-frenzy",
    tags: ["Feathers", "Playful", "Interactive", "Active"],
    thumbnail: "/images/tv-show-thumbnail-feather-frenzy.webp",
    title: "Feather Frenzy",
    trailer: "/videos/tv-show-trailer-feather-frenzy.mp4",
  },
  {
    category: "calm",
    description: "A serene, high-definition view of colorful tropical fish swimming lazily through clear blue water. An absolute cat favorite.",
    duration: "15:00",
    id: "fish-tank-live",
    isLive: true,
    tags: ["Aquarium", "Fish", "Calming", "Indoor"],
    thumbnail: "/images/tv-show-thumbnail-fish-tank-live.webp",
    title: "Fish Tank Live",
    trailer: "/videos/tv-show-trailer-fish-tank-life.mp4",
  },
  {
    category: "chase",
    description: "A high-speed chase through an icy wonderland. Follow the elusive snow hare as it darts between frost-covered pines. Perfect for stimulating active feline hunting instincts.",
    duration: "10:45",
    id: "frost-runner",
    isLive: true,
    tags: ["Snow", "Sprint", "Active", "Winter"],
    thumbnail: "/images/tv-show-thumbnail-frost-runner.webp",
    title: "Frost Runner",
    trailer: "/videos/tv-show-trailer-frost-runner.mp4",
  },
  {
    category: "bugs",
    description: "Spot the hidden gecko as it crawls stealthily around green leaves. Quick tail twitches will capture your cat's absolute focus.",
    duration: "07:45",
    id: "gecko-hideout",
    tags: ["Gecko", "Reptiles", "Hiding", "Plants"],
    thumbnail: "/images/tv-show-thumbnail-gecko-hideout.webp",
    title: "Gecko Hideout",
    trailer: "/videos/tv-show-trailer-gecko-hideout.mp4",
  },
  {
    category: "bugs",
    description: "Close-up meadow hops with a bright green grasshopper. Twitchy antennae and surprise leaps across the tall grass.",
    duration: "08:30",
    id: "grasshopper-leap",
    tags: ["Meadow", "Hopping", "Tiny", "Summer"],
    thumbnail: "/images/tv-show-thumbnail-grasshopper-leap.webp",
    title: "Grasshopper Leap",
    trailer: "/videos/tv-show-trailer-grasshopper-leap.mp4",
  },
  {
    category: "bugs",
    description: "A vivid green lizard suns on a warm rock then darts away in a flash. Sudden scampers built to trigger the pounce.",
    duration: "12:15",
    id: "lizard-scamper",
    isLive: true,
    tags: ["Rocks", "Darting", "Reptile", "Sunny"],
    thumbnail: "/images/tv-show-thumbnail-lizard-scamper.webp",
    title: "Lizard Scamper",
    trailer: "/videos/tv-show-trailer-lizard-scamper.mp4",
  },
  {
    category: "chase",
    description: "Follow a quick little field mouse patter back and forth, rustling through straw and sneaking behind boxes.",
    duration: "13:10",
    id: "mouse-patrol",
    tags: ["Mice", "Chase", "Fast-Moving", "Indoor"],
    thumbnail: "/images/tv-show-thumbnail-mouse-patrol.webp",
    title: "Mouse Patrol",
    trailer: "/videos/tv-show-trailer-mouse-patrol.mp4",
  },
  {
    category: "chase",
    description: "A red squirrel scrambles up bark at full speed, tail whirling. Blurred motion and zig-zag dashes around the trunk.",
    duration: "12:05",
    id: "squirrel-chase",
    tags: ["Trees", "Scramble", "Fast", "Outdoors"],
    thumbnail: "/images/tv-show-thumbnail-squirrel-chase.webp",
    title: "Squirrel Chase",
    trailer: "/videos/tv-show-trailer-squirrel-chase.mp4",
  },
  {
    category: "birds",
    description: "A busy backyard bird bath bursting with sparrows and jays. Fluttering wings and flicking water to keep every whisker twitching.",
    duration: "14:20",
    id: "wild-yard",
    tags: ["Garden", "Flocks", "Splashing", "Outdoors"],
    thumbnail: "/images/tv-show-thumbnail-wild-yard.webp",
    title: "Wild Yard",
    trailer: "/videos/tv-show-trailer-wild-yard.mp4",
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
