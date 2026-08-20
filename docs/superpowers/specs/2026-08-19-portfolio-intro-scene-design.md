# Portfolio: Cinematic Intro + Interactive Skyscraper Scene

Date: 2026-08-19
Status: Approved for planning

## Summary

A single-page portfolio site. First visit plays a fullscreen video (with
audio, muted by default per browser autoplay policy) that transitions into
an interactive scene themed around the video (working concept: a skyscraper
at night, art possibly AI-generated to match the video's theme). Windows in
the scene are clickable; clicking one zooms the camera into it and reveals a
portfolio section (About, Experience, Projects, Contact, ...) as an overlay
panel. Everything happens on one page — no sub-routes, no page navigation.
Content for each section is out of scope for this spec and will be built
section-by-section afterward, against a fixed contract defined here.

This spec covers only the two systems that need to exist before any content
work: **the intro sequence** and **the interactive zoom scene**. It does not
cover the visual design of the video or background art (the user is
producing/editing those separately) or the content of any individual
section.

## Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui — already
  scaffolded at `~/portfolio` (renamed from an earlier, unrelated exercise).
- Framer Motion for all animation: hover glow, crossfade, zoom transform,
  panel reveal, ambient motion. Chosen over GSAP because the project is
  already React/Next-based and Framer Motion's declarative variants and
  layout animations map directly onto the state machine below — no second
  animation runtime needed alongside it.
- Single route (`/`). No new routes are introduced by this spec.

## Top-level state machine

One state value drives the whole page, held in a single reducer/context
(`SceneStateProvider`):

```
'intro'  -->  'scene'  -->  'zoomed' (with activeSectionId)
                 ^---------------|
```

- On mount, check `sessionStorage.getItem('portfolio:introSeen')`. If set,
  initial state is `'scene'` directly — the `<video>` element is never
  mounted for a returning-this-session visitor.
- `intro` → `scene`: fires on video `onEnded` or "Skip Intro" click. Sets
  the sessionStorage flag. Never fires more than once per session.
- `scene` → `zoomed(id)`: fires on clicking a window hotspot.
- `zoomed` → `scene`: fires on clicking the Back control.
- There is no `zoomed(a)` → `zoomed(b)` direct transition; clicking a
  different window while zoomed first returns to `scene` (state machine
  stays simple; the visual transition can still feel continuous via
  Framer Motion's shared transitions if needed later — not required for v1).

## Intro sequence

- Fullscreen `<video>`: `autoplay`, `muted`, `playsInline`, `loop={false}`,
  `poster` = the scene's background image (see Asset strategy below) so
  there is no blank frame before the video's first frame paints.
- Audio is present in the video file (edited by the user to include audio)
  but starts muted — this is a hard browser constraint (Chrome/Safari/
  Firefox all block audible autoplay without a prior user gesture), not a
  design choice being made narrower than requested. A **"tap for sound"**
  prompt is shown over the video until the first user interaction, at
  which point it unmutes and the prompt dismisses permanently for that
  playthrough.
- A **"Skip Intro"** button is visible immediately and remains clickable
  for the entire duration of playback, independent of the mute state.
- Autoplay fallback: if the browser blocks even muted autoplay (rare but
  possible), the component detects the play() promise rejection and shows
  the poster image immediately with a "Play Intro" button instead of a
  blank/frozen video element.
- While the video plays, a `useEffect` prefetches the scene's background
  image and any section-placeholder assets (`new Image()` / `next/image`
  priority hints), so the transition into `scene` has no pop-in regardless
  of connection speed.
- Transition to `scene` is a crossfade (`AnimatePresence`, opacity, ~600–
  800ms) between the video element and the scene layer. Because the scene's
  background image is thematically/visually matched to the video's ending
  frame (produced by the user, or an AI-generated image in the same theme,
  per the "jump around" concept), the crossfade reads as continuous motion
  rather than a hard cut, even though the two assets are not required to be
  pixel-identical.

## Interactive scene + zoom

- **Frame**: a fixed-aspect-ratio container (ratio matches the background
  art/video, e.g. 16:9 — exact value set when the real asset lands) that
  letterboxes (centers with matte bars) on viewport ratios that don't match.
  This is the responsiveness strategy for a photographic/rendered
  background: hotspots are positioned in `%` of this frame, so they stay
  pixel-locked to the art at any screen size without needing the art itself
  to reflow.
- **Background**: a single image element filling the frame.
- **Windows**: a config array —
  `{ id, sectionId, xPct, yPct, wPct, hPct, label }[]` — rendered as
  absolutely-positioned `motion.button` elements inside the frame, one per
  entry. Non-rectangular windows can add an optional `clipPath` later; not
  needed for v1.
- **Hover**: glow (animated box-shadow/opacity) + slight scale via Framer
  Motion `whileHover` variants.
- **Idle ambient motion** (only while `scene`, not while `zoomed`):
  - Slow parallax: background/foreground layers shift a few px opposite
    the pointer via `useMotionValue` + `useTransform` on pointer position.
  - Occasional window flicker: at most 1–2 windows subtly pulse opacity at
    a time, on a randomized low-frequency timer.
  - Both are fully disabled under `prefers-reduced-motion: reduce`.
- **Click → zoom**: the scene layer animates `scale` + `x`/`y` translate via
  Framer Motion, with `transform-origin` computed from the clicked window's
  `%` position, so that window becomes the new visual center at increased
  scale (~2.5–3x). A `ContentPanel` fades/slides in on top holding that
  section's component. A **Back** control (shadcn `Button`, keyboard-
  focusable) reverses the transform and removes the panel.
- **Section contract**: each section is a self-contained component under
  `sections/`, implementing `{ onBack: () => void }` as its only required
  prop. A registry (`sections/registry.ts`) maps `sectionId → component`.
  For this spec, every entry in the registry is a placeholder (title +
  "content coming soon" skeleton) — swapping in real content later never
  touches scene/zoom/state-machine code.

## Asset strategy (building without final art)

Neither the video nor the final background image exists yet. The system is
built now against swappable placeholders so none of the above is blocked:

- `IntroVideo` takes `videoSrc` / `posterSrc` as config values (e.g. from a
  small `content/scene.config.ts`), not hardcoded paths. If no file exists
  at the configured `videoSrc`, the component skips straight to the
  poster/placeholder background with the Skip control still present, so the
  rest of the flow is exercisable without a real video.
- The scene ships with a throwaway placeholder background and 4–6 mocked
  window hotspots at reasonable `%` positions, clearly temporary.
- **Calibration mode** (dev-only, e.g. gated behind a `?calibrate=1` query
  param or `NODE_ENV !== 'production'`): clicking anywhere on the scene logs
  the click's `xPct, yPct` to the console. Once the real background image
  lands, this is used to read off exact hotspot coordinates directly
  instead of eyeballing them.
- When the real video + background image are ready, integrating them is a
  config change (file paths + hotspot `%` values in `scene.config.ts`) —
  no architecture changes.

## Out of scope for this spec

- Visual design/content of the video and background art (user-produced).
- Content and design of individual sections (About, Experience, Projects,
  Contact, ...) — built one at a time after this system lands, against the
  section contract above.
- Deployment/hosting configuration.
- Deep-linking or shareable URLs to a specific section (explicitly
  rejected — this is a single interactive homepage, not a multi-page site).

## Testing approach

- State machine transitions (`intro`/`scene`/`zoomed`, sessionStorage skip
  logic) are unit-testable in isolation from animation/rendering.
- Hotspot `%`-to-pixel positioning and letterbox behavior should be checked
  at a few representative viewport sizes (ultrawide, standard 16:9, narrow
  mobile portrait) since that's the core responsiveness mechanism.
- `prefers-reduced-motion` behavior (ambient motion off, simplified zoom
  transition) is checked manually via OS/browser emulation.
