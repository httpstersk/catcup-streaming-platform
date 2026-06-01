export type Category = "birds" | "bugs" | "chase" | "calm"

export interface CategoryMeta {
  badgeClass: string
  id: Category
  label: string
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  birds: {
    badgeClass: "bg-blue text-on-blue",
    id: "birds",
    label: "Birds",
  },
  bugs: {
    badgeClass: "bg-lime text-on-lime",
    id: "bugs",
    label: "Bugs",
  },
  calm: {
    badgeClass: "bg-olive text-on-olive",
    id: "calm",
    label: "Calm",
  },
  chase: {
    badgeClass: "bg-blue text-on-blue",
    id: "chase",
    label: "Chase",
  },
}

/** DOM id of the "More Shows for Kitty" section, used as a scroll anchor. */
export const MORE_SHOWS_SECTION_ID = "more-shows"

/** Type guard: true only for the specific browsable categories (excludes "all"). */
export function isCategory(value: string): value is Category {
  return value in CATEGORY_META
}

/**
 * Represents a single video show or stream on the platform.
 */
export interface Show {
  /** Tiny base64 WebP used as the `next/image` blur placeholder. */
  blurDataURL: string
  /** The content category of the show. */
  category: Category
  /** A short description of the show's content. */
  description: string
  /** The duration format label (e.g. "12:15"). */
  duration: string
  /** Unique identifier for the show. */
  id: string
  /** URL path to the short, muted MP4 preview clip used for hover playback. */
  preview: string
  /** Tags for indexing and searching. */
  tags: string[]
  /** URL path to the thumbnail WebP image. */
  thumbnail: string
  /** Display title of the show. */
  title: string
  /** URL path to the full MP4 trailer/video asset. */
  trailer: string
}

export const SHOWS: Show[] = [
  {
    blurDataURL:
      "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADQAQCdASoQAAkAA8BgJZgAAjxaKZfiQAD+5nlwLpZfyX2I357RhmDZ/BKE50nuLWnng159Dra4GjpFn3BG2HDp2s9wVNJSefP+/9rKj5wAAA==",
    category: "chase",
    description: "Watch agile jumpers navigate the canopy and leap from branch to branch. Fast moves, rustling leaves, and endless curiosity.",
    duration: "10:45",
    id: "branch-bounder",
    preview: "/videos/tv-show-preview-branch-bounder.mp4",
    tags: ["Trees", "Jumping", "Active", "Outdoors"],
    thumbnail: "/images/tv-show-thumbnail-branch-bounder.webp",
    title: "Branch Bounder",
    trailer: "/videos/tv-show-trailer-branch-bounder.mp4",
  },
  {
    blurDataURL:
      "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQAgCdASoQAAkAA8BgJbACdAEO5ywiOUwAAP7IpbEa9AUTLAWLL2X64jUIWpN6ZLGomfYZMqf0x0eSw+vXVAdxyj+TdtjS2pSHAAAA",
    category: "calm",
    description: "Delight in the gentle, hypnotic dance of colorful butterflies drifting across a sunny garden. Perfect for a peaceful cat nap.",
    duration: "09:15",
    id: "butterfly-drift",
    preview: "/videos/tv-show-preview-butterfly-drift.mp4",
    tags: ["Butterflies", "Calming", "Garden", "Outdoors"],
    thumbnail: "/images/tv-show-thumbnail-butterfly-drift.webp",
    title: "Butterfly Drift",
    trailer: "/videos/tv-show-trailer-butterfly-drift.mp4",
  },
  {
    blurDataURL:
      "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAwAgCdASoQAAkAA8BgJbACdDBMwYsKi1JX4ADNppyPLqaLwIwL1kiOQsK9zPfqLiAPrdenLiwzOyinHlUalDPmlx+u+u7CfjdoVw4DqJ6OeE3z0Wch3f8m/8caEjX2sl864rn6oKK7ubAAAAA=",
    category: "birds",
    description: "Swirling, dancing feathers of all shapes and sizes designed to trigger your kitty's tracking reflexes and pouncing paw.",
    duration: "11:30",
    id: "feather-frenzy",
    preview: "/videos/tv-show-preview-feather-frenzy.mp4",
    tags: ["Feathers", "Playful", "Interactive", "Active"],
    thumbnail: "/images/tv-show-thumbnail-feather-frenzy.webp",
    title: "Feather Frenzy",
    trailer: "/videos/tv-show-trailer-feather-frenzy.mp4",
  },
  {
    blurDataURL:
      "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAABwAgCdASoQAAkAA8BgJbACdH8Agqy/GIEUtf+gAP7AYIqk4GMzT+p9YiFnFMo5QMfpCCXQvg3B6nbqOLvO77qlwaDrAXiNTsUpkbI+FjjJ+ZQjx8aLyh92AZlgEk0sLznsLghuB9AkepEGKAAAAA==",
    category: "calm",
    description: "A serene, high-definition view of colorful tropical fish swimming lazily through clear blue water. An absolute cat favorite.",
    duration: "15:00",
    id: "fish-tank-live",
    preview: "/videos/tv-show-preview-fish-tank-live.mp4",
    tags: ["Aquarium", "Fish", "Calming", "Indoor"],
    thumbnail: "/images/tv-show-thumbnail-fish-tank-live.webp",
    title: "Fish Tank Live",
    trailer: "/videos/tv-show-trailer-fish-tank-life.mp4",
  },
  {
    blurDataURL:
      "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAACwAQCdASoQAAkAA8BgJQBOgBUIO38gAPdI9hfJGl0qFuCRR7y6V/sG8pgB1IezLoa29pV8PCZZCJAn1Zk2Ia8gEZvT6BCAAAA=",
    category: "chase",
    description: "A high-speed chase through an icy wonderland. Follow the elusive snow hare as it darts between frost-covered pines. Perfect for stimulating active feline hunting instincts.",
    duration: "10:45",
    id: "frost-runner",
    preview: "/videos/tv-show-preview-frost-runner.mp4",
    tags: ["Snow", "Sprint", "Active", "Winter"],
    thumbnail: "/images/tv-show-thumbnail-frost-runner.webp",
    title: "Frost Runner",
    trailer: "/videos/tv-show-trailer-frost-runner.mp4",
  },
  {
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoQAAkAA8BgJbACdAEPD32Cc9gA4nZeBVaJspvk6/0IoqkXHLRN3nWchNOIJAsKhCvrz00s4N5KimOaZFN5ZMUXvxfP+hmaFmdS2CLrxxX7gAAA",
    category: "bugs",
    description: "Spot the hidden gecko as it crawls stealthily around green leaves. Quick tail twitches will capture your cat's absolute focus.",
    duration: "07:45",
    id: "gecko-hideout",
    preview: "/videos/tv-show-preview-gecko-hideout.mp4",
    tags: ["Gecko", "Reptiles", "Hiding", "Plants"],
    thumbnail: "/images/tv-show-thumbnail-gecko-hideout.webp",
    title: "Gecko Hideout",
    trailer: "/videos/tv-show-trailer-gecko-hideout.mp4",
  },
  {
    blurDataURL:
      "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAACwAQCdASoQAAkAA8BgJbACdADvZ8+sAP6p2S7l4Y1jtBnPY31ZK5tGcGFW4yilBOJGG3hzn7Ih4/nYnB/d9QxhimMegAAA",
    category: "bugs",
    description: "Close-up meadow hops with a bright green grasshopper. Twitchy antennae and surprise leaps across the tall grass.",
    duration: "08:30",
    id: "grasshopper-leap",
    preview: "/videos/tv-show-preview-grasshopper-leap.mp4",
    tags: ["Meadow", "Hopping", "Tiny", "Summer"],
    thumbnail: "/images/tv-show-thumbnail-grasshopper-leap.webp",
    title: "Grasshopper Leap",
    trailer: "/videos/tv-show-trailer-grasshopper-leap.mp4",
  },
  {
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoQAAkAA8BgJbACdAEXs+T5rWgA/vEZTPUz+BWvjBP3mt8Tpe8I8tv94rqZIw3dG1YwFbWyA9Ta5vL3m5LxxIcHOYlu1Yf5bvfWkJXpkEiDAAAA",
    category: "bugs",
    description: "A vivid green lizard suns on a warm rock then darts away in a flash. Sudden scampers built to trigger the pounce.",
    duration: "12:15",
    id: "lizard-scamper",
    preview: "/videos/tv-show-preview-lizard-scamper.mp4",
    tags: ["Rocks", "Darting", "Reptile", "Sunny"],
    thumbnail: "/images/tv-show-thumbnail-lizard-scamper.webp",
    title: "Lizard Scamper",
    trailer: "/videos/tv-show-trailer-lizard-scamper.mp4",
  },
  {
    blurDataURL:
      "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADQAQCdASoQAAkAA8BgJbACdAEDmJsEQADONaHqFDGJpueLOk0evbZJUuCKubUU9Sz9oeC09xMb2ka0UfXYGc+xvYNWIx/d9YQo6KbcMAAAAA==",
    category: "chase",
    description: "Follow a quick little field mouse patter back and forth, rustling through straw and sneaking behind boxes.",
    duration: "13:10",
    id: "mouse-patrol",
    preview: "/videos/tv-show-preview-mouse-patrol.mp4",
    tags: ["Mice", "Chase", "Fast-Moving", "Indoor"],
    thumbnail: "/images/tv-show-thumbnail-mouse-patrol.webp",
    title: "Mouse Patrol",
    trailer: "/videos/tv-show-trailer-mouse-patrol.mp4",
  },
  {
    blurDataURL:
      "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAwAgCdASoQAAkAA8BgJQBOgMWbzkc+u2hcAAD+W/6oop4wHsz/V8JyLuai4cdM+VFPpiryh2f+2fjo/OC2n4gWgwcuc9BbMRmlSF7bE5GH484ppObA32Y6fU1WSQjgAAA=",
    category: "chase",
    description: "A red squirrel scrambles up bark at full speed, tail whirling. Blurred motion and zig-zag dashes around the trunk.",
    duration: "12:05",
    id: "squirrel-chase",
    preview: "/videos/tv-show-preview-squirrel-chase.mp4",
    tags: ["Trees", "Scramble", "Fast", "Outdoors"],
    thumbnail: "/images/tv-show-thumbnail-squirrel-chase.webp",
    title: "Squirrel Chase",
    trailer: "/videos/tv-show-trailer-squirrel-chase.mp4",
  },
  {
    blurDataURL:
      "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAACwAQCdASoQAAkAA8BgJbAC7ADIYlWAAP7sWrDbpu34QvNi/20C2rGwjSRPKEFGFchGB5eggQebrR4qOfwUmKEq2DoyA+ZPJNhi/ZoRXFoAAA==",
    category: "birds",
    description: "A busy backyard bird bath bursting with sparrows and jays. Fluttering wings and flicking water to keep every whisker twitching.",
    duration: "14:20",
    id: "wild-yard",
    preview: "/videos/tv-show-preview-wild-yard.mp4",
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

export interface QueueEntry {
  key: string
  showId: string
}

export const INITIAL_QUEUE: QueueEntry[] = [
  { key: "q1", showId: "lizard-scamper" },
  { key: "q2", showId: "grasshopper-leap" },
  { key: "q3", showId: "squirrel-chase" },
]

export function durationToSeconds(duration: string): number {
  const [m, s] = duration.split(":").map(Number)
  return m * 60 + (s || 0)
}

export function secondsToLabel(total: number): string {
  const m = Math.floor(total / 60)
  const s = Math.round(total % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}
