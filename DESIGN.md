---
name: Feline Cinema
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c3c5d9'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8d90a2'
  outline-variant: '#434656'
  surface-tint: '#b6c4ff'
  primary: '#b6c4ff'
  on-primary: '#00277f'
  primary-container: '#0056ff'
  on-primary-container: '#e4e7ff'
  inverse-primary: '#004ee8'
  secondary: '#ffffff'
  on-secondary: '#273500'
  secondary-container: '#bef500'
  on-secondary-container: '#536d00'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#696868'
  on-tertiary-container: '#ebe8e7'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#001550'
  on-primary-fixed-variant: '#003ab2'
  secondary-fixed: '#bef500'
  secondary-fixed-dim: '#a6d700'
  on-secondary-fixed: '#151f00'
  on-secondary-fixed-variant: '#3a4d00'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
  container-gap: 32px
---

## Brand & Style

The design system is engineered for a premium, high-end video streaming experience tailored specifically for feline audiences and their owners. The aesthetic is rooted in **Modern Minimalism** with a dark, cinematic foundation that allows rich, high-contrast imagery to dominate the visual field.

The personality is sophisticated yet functional, utilizing deep blacks and subtle grays to create a "theater-mode" environment by default. This reduces cognitive load and visual noise, focusing the user's (and the cat's) attention on the movement and color of the content. Vibrant pops of electric blue and lime green act as utilitarian signals for interactivity and status, creating a distinctive high-tech edge that differentiates the product from generic lifestyle streaming services.

## Colors

This design system utilizes a high-contrast dark palette designed for visibility in low-light environments typical of home cinema.

- **Primary (Electric Blue):** Used for primary actions, active navigation states, and branding accents. It signifies "active" or "playing."
- **Secondary (Lime Green):** Reserved for success states, progress indicators, and "Live" status badges. Its high luminescence is designed to be easily detectable by feline vision.
- **Surface Palette:** A range of deep neutrals starting from an absolute black background (#050505) to dark charcoal surface containers (#1A1A1A).
- **Functional Accents:** Vibrant red is used sparingly for urgent destructive actions or "Live" recording indicators.

## Typography

The typography system relies on **Plus Jakarta Sans** for its modern, clean, and geometric characteristics. The typeface is chosen for its excellent legibility at both large display sizes and small UI labels.

Headlines use a bold weight with tight letter-spacing to create a strong visual anchor for content sections. Labels for metadata (like "Bugs", "Live", or "Chase") are set in bold uppercase to provide a distinct stylistic contrast to the softer body text. Large display sizes should be used sparingly for hero content titles.

## Layout & Spacing

The design system employs a **Fixed Grid** approach for desktop viewing, centering content within a 1440px max-width container, while utilizing a fluid 4-column grid for mobile.

- **The Sidebar:** A fixed-width navigation rail (240px) persists on the left for desktop, providing immediate access to content categories.
- **The Content Area:** Uses a 12-column grid with 24px gutters. Content cards typically span 3, 4, or 6 columns depending on hierarchy.
- **Rhythm:** A 4px baseline grid ensures vertical consistency. Component internal padding should strictly follow multiples of 4 (e.g., 8px, 16px, 24px).
- **Safe Areas:** Generous margins are used around the edges of the screen to prevent visual clutter and ensure focus remains on the video thumbnails.

## Elevation & Depth

This design system avoids traditional heavy shadows in favor of **Tonal Layering** and **Low-Contrast Outlines**.

Hierarchy is established through surface color shifts:
- **Level 0 (Background):** Deepest black (#050505).
- **Level 1 (Containers):** Dark charcoal (#121212) with a 1px border of #2A2A2A.
- **Level 2 (Active/Hover):** Lighter charcoal (#1F1F1F) to indicate lift.

Subtle backdrop blurs (20px - 40px) are used for floating overlays or navigation bars to maintain context of the underlying content while providing clear separation. When cards are hovered, they should scale slightly (1.02x) rather than casting a large shadow, maintaining the "flat-premium" aesthetic.

## Shapes

The shape language is characterized by **Refined Softness**. Standard UI elements like buttons, input fields, and video thumbnails use a 0.5rem (8px) corner radius. This provides a approachable feel that balances the sharp, high-tech color palette.

- **Interactive Elements:** Buttons and tags use the base `rounded` (8px).
- **Large Containers:** Content cards and feature blocks use `rounded-lg` (16px).
- **Identity Elements:** Profile icons and status indicators (like the play button) utilize full pill-shaping (circular) to stand out against the rectilinear grid.

## Components

### Buttons
- **Primary:** Solid Electric Blue with white text. High-contrast, used for main CTAs like "Play Now".
- **Secondary:** Transparent with a 1px white or gray border.
- **Icon Buttons:** Circular background with a subtle hover state.

### Content Cards
- Thumbnails must maintain a 16:9 aspect ratio. 
- Category badges (e.g., "Chase", "Birds") are positioned in the top-left or top-right of the card using the `label-bold` type style and specific category colors.

### Progress & Seek Bars
- Use the Secondary (Lime Green) color for the active track.
- The scrubber handle should be a simple circular dot, appearing only on hover or active interaction to minimize visual distraction for the cat.

### Navigation Rail
- Active states are indicated by a solid Primary color block or a high-contrast white icon.
- Icons should be custom-contoured line art that mimics the "CatCup" brand style (minimalist, thick strokes).

### Chips & Tags
- Used for filtering content categories. These have a dark background (#1A1A1A) and transition to a bordered or blue state when selected.