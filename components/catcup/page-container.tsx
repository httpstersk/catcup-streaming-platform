import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

interface PageContainerProps extends ComponentPropsWithoutRef<"div"> {}

/**
 * Centers page content within the 1440px max-width grid with responsive
 * horizontal padding aligned to the homepage layout tokens.
 */
export function PageContainer({
  children,
  className,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
