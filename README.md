# CatCup — Streaming made for cats

A premium streaming platform concept built for feline audiences: birds, bugs,
chases, and calm. The homepage is a fully static, client-rendered Next.js app
with a cinematic hero, hover-preview discovery cards, and an immersive
fullscreen player.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, fully static output)
- React 19
- Tailwind CSS v4
- [Motion](https://motion.dev/) for animation
- [Radix UI](https://www.radix-ui.com/) primitives and [Phosphor Icons](https://phosphoricons.com/)

## Local development

```bash
bun install
bun run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Useful scripts:

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `bun run dev`       | Start the dev server                 |
| `bun run build`     | Production build                     |
| `bun run start`     | Serve the production build           |
| `bun run lint`      | Run ESLint                           |
| `bun run typecheck` | Type-check with `tsc --noEmit`       |
| `bun run format`    | Format with Prettier                 |

## Deploying to Vercel (Hobby plan)

This app has no API routes or server functions, so it deploys as a static site
with zero function usage.

1. Push to GitHub (repo: `httpstersk/catcup-streaming-platform`).
2. In the [Vercel dashboard](https://vercel.com/new), import the repository.
   The framework is auto-detected as Next.js — no build settings to change.
3. Deploy. Every push to the default branch triggers a new deployment.

### Staying within Hobby limits

The Hobby plan includes **100 GB Fast Data Transfer/month** and **5,000 image
transformations/month**. This project is tuned to stay comfortably inside both:

- **Video bandwidth** is the dominant cost (`public/videos` is ~85 MB). Preview
  clips load only on first hover, the fullscreen trailer mounts only when a show
  is played, and [`vercel.json`](vercel.json) sets `Cache-Control: public,
  max-age=31536000, immutable` on `/videos` and `/images` so repeat views are
  served from the browser cache instead of re-downloading.
- **Image optimization** uses `next/image` with a trimmed `deviceSizes` cap
  (1920px), a single allowed quality, and a one-year cache TTL in
  [`next.config.ts`](next.config.ts), keeping transformations far below the
  5,000/month quota.

Enable usage notifications (Vercel Dashboard → Settings → Notifications) to get
warned at ~75% consumption. If traffic later outgrows the 100 GB budget, the
next step is offloading the video assets to external storage (e.g. Cloudflare
R2) so they no longer count against Vercel bandwidth.
