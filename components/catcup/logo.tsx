import { cn } from "@/lib/utils"

function CatCupMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("size-8", className)}
      fill="none"
      viewBox="0 0 64 64"
    >
      {/* cat ears */}
      <path
        d="M19 21 L20.5 8.5 L31 18 Z"
        fill="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M44.5 21 L43 8.5 L33 18 Z"
        fill="currentColor"
        strokeLinejoin="round"
      />
      {/* cup body */}
      <rect
        x="14"
        y="18"
        width="32"
        height="30"
        rx="9"
        stroke="currentColor"
        strokeWidth="5.5"
      />
      {/* handle */}
      <path
        d="M46 26 H50 a8 8 0 0 1 0 16 H46"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function CatCupLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CatCupMark className="size-9" />
      <span
        className={cn(
          "text-4xl text-title-md font-bold tracking-tight text-foreground"
        )}
      >
        CatCup
      </span>
    </div>
  )
}
