@AGENTS.md

## Project map (personal portfolio site)

Single-page Next.js 16 App Router site. Intro video plays, then fades into
one long scroll page with a fixed top nav. Spider-Man: Into the Spider-Verse
theme (comic ink borders, halftone, neon accents, scroll-linked bg colour).

### Where things live
- `app/layout.tsx` — `<head>` metadata, fonts (Geist + Anton), OG/Twitter tags.
- `app/page.tsx` — mounts `SceneStateProvider` + `PortfolioApp`.
- `components/portfolio-app.tsx` — intro-vs-site gate (crossfade).
- `components/intro/intro-video.tsx` — the intro clip, Skip button, Sound on/off toggle, attribution.
- `components/scroll-site.tsx` — the scroll page: fixed top nav (+ scroll-spy),
  scroll-linked purple bg wash, section order, Miles easter-egg at the bottom.
- `components/reveal.tsx` — mount fade-in wrapper used by section content.
- `components/use-key-click.ts` — keycap hover sound for Tech Stack (Web Audio + public/sfx/*.mp3).
- `components/cursor-trail.tsx` — red pointer trail.
- `sections/section-shell.tsx` — the comic card wrapper (title, `// 0N`, accent, scroll-tilt).
- `sections/*-section.tsx` — the five sections. **All resume copy lives here as
  plain arrays/consts** — About, Experience (roles + bullets + `logo`/`logoBg`),
  Tech Stack (grouped skills), Projects (name/stack/points/note/demoHref/sourceHref).
- `content/scene.config.ts` — intro video paths only.
- `lib/scene-state*.ts(x)` — tiny reducer for intro | scene | zoomed views (+ tests).
- `public/logos/*.png` — company logos for Experience.
- `public/rushil-singh-resume.pdf` — the downloadable resume (Personal Info section links to it).
- `public/intro.mp4` / `.webm` / `intro-poster.jpg` — the 15s intro (committed; `!`-exempted in .gitignore).

### Updating the resume
1. Replace `public/rushil-singh-resume.pdf` with the new file (keep the name).
2. Update whatever changed in the matching section file(s): roles/bullets →
   `sections/experience-section.tsx` (Work + Involvement share one date-scaled
   vertical timeline; each entry needs `start`/`end` `YYYY-MM` — row order and
   dot spacing derive from those, not array position); coursework/interests → `about-section.tsx`;
   skills → `tech-stack-section.tsx`; projects → `projects-section.tsx`.
   Bullet text is verbatim from the resume — do not rephrase it.

### Verify before pushing
`npm run build` (must compile) and `npm test` (11 tests). Then commit + push to
`main` — Vercel auto-deploys in ~90s.
