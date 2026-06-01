import type { Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"

import "./globals.css"
import { siteMetadata } from "@/lib/site-metadata"
import { cn } from "@/lib/utils"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
})

export const metadata = siteMetadata

export const viewport: Viewport = {
  themeColor: "#131313",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(jakarta.variable)}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
