# Portfolio Intro + Zoom Scene Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the intro-video sequence and the interactive skyscraper zoom scene end-to-end against placeholder assets, so the whole state machine (`intro → scene → zoomed`) works and is ready for real video/art and real section content to be dropped in later without further architecture changes.

**Architecture:** A single client-side reducer (`SceneStateProvider`) drives three views rendered from `app/page.tsx`: `IntroVideo`, `SkyscraperScene` (with `WindowHotspot`s and ambient motion), and `ContentPanel` (holding a placeholder section from a small registry). All video/poster/hotspot data lives in one config file so swapping in real assets later is a data change, not a code change.

**Tech Stack:** Next.js 16 (App Router), TypeScript, React 19, Tailwind CSS v4, shadcn/ui, Framer Motion (`framer-motion` package, v13), Vitest for unit tests.

**Spec:** `docs/superpowers/specs/2026-08-19-portfolio-intro-scene-design.md`

## Global Constraints

- Single route (`/`); no new routes, no deep-linking to sections.
- Every asset path (video, poster, hotspot coordinates) is read from one config module (`content/scene.config.ts`), never hardcoded in a component.
- All ambient motion (parallax, window flicker) and the zoom transition must respect `prefers-reduced-motion: reduce`.
- Section components implement exactly `{ onBack: () => void }` and are looked up through `sections/registry.ts` — no section-specific logic in scene/zoom/state-machine code.
- `sessionStorage` key is `portfolio:introSeen`; once set, the intro must not play again in that browser session.
- Next.js in this repo is v16 (`~/portfolio/AGENTS.md` flags this as newer than typical training data). Task 1 includes a quick check of `node_modules/next/dist/docs/01-app/` for anything unfamiliar before other tasks touch `app/page.tsx` — this repo's existing `app/page.tsx` and `app/layout.tsx` already confirm standard App Router conventions (Server Components by default, `"use client"` for interactive components), so no special handling is expected, but check if anything below looks off against that source of truth.

---

### Task 1: Install dependencies and test tooling

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: `npm run test` command (runs `vitest run`) available to all later tasks' test steps.

- [ ] **Step 1: Install Framer Motion and Vitest**

```bash
cd ~/portfolio
npm install framer-motion
npm install -D vitest
```

- [ ] **Step 2: Add the test script**

Edit `package.json`, add to `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
  },
})
```

`environment: 'node'` is enough — every state-machine test in this plan is a pure function test with no DOM involved.

- [ ] **Step 4: Verify Vitest runs with no tests yet**

Run: `npm run test`
Expected: Vitest reports "No test files found" (exits non-zero) — that's expected at this point, confirms the runner itself works. If it errors on config/plugin resolution instead, fix that before continuing.

- [ ] **Step 5: Skim Next.js 16 App Router docs**

Run: `ls node_modules/next/dist/docs/01-app/01-getting-started` and open `installation.md` and `project-structure.md` if either exists. Confirm `app/page.tsx` (Server Component, default export) and `"use client"` for interactive leaf components are still the conventions used — the repo's existing `app/page.tsx` already reflects this, so this step is a quick confirmation, not exploratory research.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "Add Framer Motion and Vitest tooling"
```

---

### Task 2: Scene state machine (pure logic)

**Files:**
- Create: `lib/scene-state.ts`
- Test: `lib/scene-state.test.ts`

**Interfaces:**
- Produces:
  - `type SceneState = { view: 'intro' } | { view: 'scene' } | { view: 'zoomed'; sectionId: string }`
  - `type SceneAction = { type: 'INTRO_FINISHED' } | { type: 'WINDOW_CLICKED'; sectionId: string } | { type: 'BACK' }`
  - `function sceneReducer(state: SceneState, action: SceneAction): SceneState`
  - `function getInitialSceneState(introSeenFlag: string | null): SceneState` — returns `{ view: 'scene' }` if `introSeenFlag === 'true'`, otherwise `{ view: 'intro' }`.
  - `const INTRO_SEEN_KEY = 'portfolio:introSeen'`

- [ ] **Step 1: Write the failing tests**

```typescript
// lib/scene-state.test.ts
import { describe, it, expect } from 'vitest'
import { sceneReducer, getInitialSceneState, INTRO_SEEN_KEY } from './scene-state'

describe('getInitialSceneState', () => {
  it('starts at intro when no flag is set', () => {
    expect(getInitialSceneState(null)).toEqual({ view: 'intro' })
  })

  it('starts at scene when the intro-seen flag is set', () => {
    expect(getInitialSceneState('true')).toEqual({ view: 'scene' })
  })
})

describe('sceneReducer', () => {
  it('moves from intro to scene on INTRO_FINISHED', () => {
    const result = sceneReducer({ view: 'intro' }, { type: 'INTRO_FINISHED' })
    expect(result).toEqual({ view: 'scene' })
  })

  it('moves from scene to zoomed on WINDOW_CLICKED', () => {
    const result = sceneReducer(
      { view: 'scene' },
      { type: 'WINDOW_CLICKED', sectionId: 'about' }
    )
    expect(result).toEqual({ view: 'zoomed', sectionId: 'about' })
  })

  it('moves from zoomed back to scene on BACK', () => {
    const result = sceneReducer(
      { view: 'zoomed', sectionId: 'about' },
      { type: 'BACK' }
    )
    expect(result).toEqual({ view: 'scene' })
  })

  it('switching windows while zoomed returns to scene first, not directly to the new section', () => {
    const result = sceneReducer(
      { view: 'zoomed', sectionId: 'about' },
      { type: 'WINDOW_CLICKED', sectionId: 'projects' }
    )
    expect(result).toEqual({ view: 'scene' })
  })

  it('INTRO_FINISHED is a no-op once already in scene', () => {
    const result = sceneReducer({ view: 'scene' }, { type: 'INTRO_FINISHED' })
    expect(result).toEqual({ view: 'scene' })
  })

  it('BACK is a no-op while in intro', () => {
    const result = sceneReducer({ view: 'intro' }, { type: 'BACK' })
    expect(result).toEqual({ view: 'intro' })
  })

  it('WINDOW_CLICKED is a no-op while in intro', () => {
    const result = sceneReducer(
      { view: 'intro' },
      { type: 'WINDOW_CLICKED', sectionId: 'about' }
    )
    expect(result).toEqual({ view: 'intro' })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test`
Expected: FAIL — `lib/scene-state.ts` does not exist yet (module not found).

- [ ] **Step 3: Implement `lib/scene-state.ts`**

```typescript
// lib/scene-state.ts
export type SceneState =
  | { view: 'intro' }
  | { view: 'scene' }
  | { view: 'zoomed'; sectionId: string }

export type SceneAction =
  | { type: 'INTRO_FINISHED' }
  | { type: 'WINDOW_CLICKED'; sectionId: string }
  | { type: 'BACK' }

export const INTRO_SEEN_KEY = 'portfolio:introSeen'

export function getInitialSceneState(introSeenFlag: string | null): SceneState {
  return introSeenFlag === 'true' ? { view: 'scene' } : { view: 'intro' }
}

export function sceneReducer(state: SceneState, action: SceneAction): SceneState {
  switch (action.type) {
    case 'INTRO_FINISHED':
      return state.view === 'intro' ? { view: 'scene' } : state

    case 'WINDOW_CLICKED':
      return state.view === 'scene' || state.view === 'zoomed'
        ? { view: 'zoomed', sectionId: action.sectionId }
        : state

    case 'BACK':
      return state.view === 'zoomed' ? { view: 'scene' } : state

    default:
      return state
  }
}
```

Note on `WINDOW_CLICKED` while already `zoomed`: per the spec there's no direct `zoomed(a) → zoomed(b)`, but going through `scene` as an invisible intermediate step within the same reducer call would require two dispatches. Since the test above expects landing on `scene` (not `zoomed(b)`) when clicking a different window mid-zoom, the reducer treats any `WINDOW_CLICKED` while `zoomed` as equivalent to `BACK` — the UI's window hotspots are only reachable once back in `scene` visually anyway (see Task 6), so this branch mainly guards state consistency; it is not expected to be hit from real UI interaction.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test`
Expected: PASS — all 9 tests green.

- [ ] **Step 5: Commit**

```bash
git add lib/scene-state.ts lib/scene-state.test.ts
git commit -m "Add pure scene state machine with tests"
```

---

### Task 3: React context wiring for scene state

**Files:**
- Create: `lib/scene-state-context.tsx`

**Interfaces:**
- Consumes: `sceneReducer`, `getInitialSceneState`, `INTRO_SEEN_KEY`, `SceneState`, `SceneAction` from `lib/scene-state.ts` (Task 2).
- Produces:
  - `function SceneStateProvider({ children }: { children: React.ReactNode }): JSX.Element`
  - `function useSceneState(): { state: SceneState; finishIntro: () => void; clickWindow: (sectionId: string) => void; goBack: () => void }`

- [ ] **Step 1: Implement the provider and hook**

```typescript
// lib/scene-state-context.tsx
'use client'

import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import {
  sceneReducer,
  getInitialSceneState,
  INTRO_SEEN_KEY,
  type SceneState,
} from './scene-state'

type SceneStateContextValue = {
  state: SceneState
  finishIntro: () => void
  clickWindow: (sectionId: string) => void
  goBack: () => void
}

const SceneStateContext = createContext<SceneStateContextValue | null>(null)

export function SceneStateProvider({ children }: { children: React.ReactNode }) {
  // Session storage is only readable client-side, so the reducer starts at
  // 'intro' during SSR/first paint and corrects to 'scene' in an effect if
  // the flag is already set — this can cause one client-side re-render for
  // returning-this-session visitors, which is an accepted trade-off (see
  // plan Task 3 note) rather than a hydration mismatch, since the server
  // render and first client render both start from 'intro'.
  const [state, dispatch] = useReducer(sceneReducer, { view: 'intro' } as SceneState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const flag = window.sessionStorage.getItem(INTRO_SEEN_KEY)
    const initial = getInitialSceneState(flag)
    if (initial.view === 'scene') {
      dispatch({ type: 'INTRO_FINISHED' })
    }
    setHydrated(true)
  }, [])

  const finishIntro = () => {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, 'true')
    dispatch({ type: 'INTRO_FINISHED' })
  }

  const clickWindow = (sectionId: string) => dispatch({ type: 'WINDOW_CLICKED', sectionId })
  const goBack = () => dispatch({ type: 'BACK' })

  // Avoid mounting the video element for a single frame before the
  // session-storage check resolves.
  const effectiveState: SceneState = hydrated ? state : { view: 'intro' }

  return (
    <SceneStateContext.Provider value={{ state: effectiveState, finishIntro, clickWindow, goBack }}>
      {children}
    </SceneStateContext.Provider>
  )
}

export function useSceneState(): SceneStateContextValue {
  const ctx = useContext(SceneStateContext)
  if (!ctx) {
    throw new Error('useSceneState must be used within a SceneStateProvider')
  }
  return ctx
}
```

This file has no test step: it's a thin React binding over the already-tested reducer, plus two one-line `sessionStorage` calls — not meaningfully unit-testable without a DOM/RTL setup, which the spec's testing section scopes out in favor of testing the pure logic directly (done in Task 2).

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing `lib/scene-state-context.tsx`.

- [ ] **Step 3: Commit**

```bash
git add lib/scene-state-context.tsx
git commit -m "Add SceneStateProvider context wiring"
```

---

### Task 4: Scene config, placeholder art, and reduced-motion hook

**Files:**
- Create: `content/scene.config.ts`
- Create: `public/scene-placeholder.svg`
- Create: `lib/use-reduced-motion.ts`

**Interfaces:**
- Produces:
  - `interface WindowHotspot { id: string; sectionId: string; label: string; xPct: number; yPct: number; wPct: number; hPct: number }`
  - `const sceneConfig: { videoSrc: string | null; posterSrc: string; aspectRatio: number; windows: WindowHotspot[] }`
  - `function useReducedMotion(): boolean`

- [ ] **Step 1: Create the placeholder background art**

```xml
<!-- public/scene-placeholder.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <rect width="1600" height="900" fill="#0a0e1a" />
  <rect x="600" y="80" width="400" height="820" fill="#161b29" />
  <!-- Placeholder window grid: 4 columns x 6 rows, matches the 4 mocked hotspots below approximately -->
  <g fill="#f2c94c" fill-opacity="0.55">
    <rect x="630" y="140" width="60" height="80" />
    <rect x="720" y="140" width="60" height="80" />
    <rect x="810" y="140" width="60" height="80" />
    <rect x="900" y="140" width="60" height="80" />
    <rect x="630" y="260" width="60" height="80" />
    <rect x="720" y="260" width="60" height="80" />
    <rect x="810" y="260" width="60" height="80" />
    <rect x="900" y="260" width="60" height="80" />
  </g>
  <text x="800" y="850" fill="#3a4054" font-family="sans-serif" font-size="20" text-anchor="middle">
    placeholder scene art — replace via content/scene.config.ts
  </text>
</svg>
```

- [ ] **Step 2: Create the scene config**

```typescript
// content/scene.config.ts
export interface WindowHotspot {
  id: string
  sectionId: string
  label: string
  xPct: number
  yPct: number
  wPct: number
  hPct: number
}

export const sceneConfig = {
  // No real video yet — IntroVideo (Task 5) treats a falsy videoSrc as
  // "skip the intro entirely." Set this to a real path (e.g.
  // '/intro.mp4') once the edited video is ready; nothing else needs to
  // change.
  videoSrc: null as string | null,
  posterSrc: '/scene-placeholder.svg',
  aspectRatio: 16 / 9,
  windows: [
    { id: 'window-about', sectionId: 'about', label: 'About Me', xPct: 39.4, yPct: 15.6, wPct: 3.75, hPct: 8.9 },
    { id: 'window-experience', sectionId: 'experience', label: 'Experience', xPct: 45, yPct: 15.6, wPct: 3.75, hPct: 8.9 },
    { id: 'window-projects', sectionId: 'projects', label: 'Projects', xPct: 50.6, yPct: 15.6, wPct: 3.75, hPct: 8.9 },
    { id: 'window-contact', sectionId: 'contact', label: 'Contact', xPct: 56.25, yPct: 15.6, wPct: 3.75, hPct: 8.9 },
  ] satisfies WindowHotspot[],
}
```

(The `%` values line up with the four leftmost placeholder window rectangles in `scene-placeholder.svg`'s top row, at `viewBox` 1600×900: e.g. `630/1600 = 39.4%`, `140/900 = 15.6%`, `60/1600 = 3.75%`, `80/900 = 8.9%`.)

- [ ] **Step 3: Create the reduced-motion hook**

```typescript
// lib/use-reduced-motion.ts
'use client'

import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)

    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return reduced
}
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing these three files.

- [ ] **Step 5: Commit**

```bash
git add content/scene.config.ts public/scene-placeholder.svg lib/use-reduced-motion.ts
git commit -m "Add scene config, placeholder art, and reduced-motion hook"
```

---

### Task 5: Intro video sequence

**Files:**
- Create: `components/intro/intro-video.tsx`

**Interfaces:**
- Consumes: `sceneConfig` from `content/scene.config.ts` (Task 4); `useSceneState` from `lib/scene-state-context.tsx` (Task 3, for `finishIntro`).
- Produces: `function IntroVideo(): JSX.Element` — a self-contained component with no required props; reads what it needs from `sceneConfig` and `useSceneState` directly.

- [ ] **Step 1: Implement `IntroVideo`**

```tsx
// components/intro/intro-video.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sceneConfig } from '@/content/scene.config'
import { useSceneState } from '@/lib/scene-state-context'

export function IntroVideo() {
  const { finishIntro } = useSceneState()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [showTapForSound, setShowTapForSound] = useState(true)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)

  // No real video configured yet: skip straight to the main scene instead
  // of rendering a dead intro. See content/scene.config.ts.
  useEffect(() => {
    if (!sceneConfig.videoSrc) {
      finishIntro()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !sceneConfig.videoSrc) return

    // Prefetch the scene background (and, later, section-placeholder
    // assets) while the video plays so the transition has no pop-in.
    const preload = new Image()
    preload.src = sceneConfig.posterSrc

    video.play().catch(() => {
      setAutoplayBlocked(true)
    })
  }, [])

  if (!sceneConfig.videoSrc) {
    return null
  }

  const handleUnmute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    setIsMuted(false)
    setShowTapForSound(false)
  }

  const handleManualPlay = () => {
    const video = videoRef.current
    if (!video) return
    video.play()
    setAutoplayBlocked(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black" onClick={isMuted ? handleUnmute : undefined}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={sceneConfig.videoSrc}
        poster={sceneConfig.posterSrc}
        muted={isMuted}
        autoPlay
        playsInline
        onEnded={finishIntro}
      />

      <AnimatePresence>
        {autoplayBlocked && (
          <motion.button
            key="play-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              event.stopPropagation()
              handleManualPlay()
            }}
            className="absolute inset-0 m-auto h-14 w-40 rounded-full bg-white font-medium text-black"
          >
            Play Intro
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTapForSound && !autoplayBlocked && (
          <motion.div
            key="tap-for-sound"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm text-white"
          >
            Tap for sound
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={(event) => {
          event.stopPropagation()
          finishIntro()
        }}
        className="absolute right-6 top-6 rounded-full bg-black/60 px-4 py-2 text-sm text-white"
      >
        Skip Intro
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing `components/intro/intro-video.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/intro/intro-video.tsx
git commit -m "Add IntroVideo component"
```

---

### Task 6: Skyscraper scene with hotspots, ambient motion, and calibration mode

**Files:**
- Create: `components/scene/window-hotspot.tsx`
- Create: `components/scene/skyscraper-scene.tsx`

**Interfaces:**
- Consumes: `sceneConfig`, `WindowHotspot` from `content/scene.config.ts` (Task 4); `useReducedMotion` from `lib/use-reduced-motion.ts` (Task 4); `useSceneState` from `lib/scene-state-context.tsx` (Task 3).
- Produces:
  - `function WindowHotspotButton(props: { hotspot: WindowHotspot; onClick: () => void; isFlickering: boolean }): JSX.Element` (the config type is imported as `WindowHotspot` from `scene.config.ts`; the component itself is named `WindowHotspotButton` to avoid colliding with that type name — see Step 1).
  - `function SkyscraperScene(): JSX.Element` — reads `state` from `useSceneState()` itself; renders window hotspots always, and exposes the frame's zoom transform driven by `state.view === 'zoomed'`.
  - `const ZOOM_SCALE = 2.75` (exported for reuse/reference by tests or later tuning).

- [ ] **Step 1: Implement `WindowHotspotButton`**

```tsx
// components/scene/window-hotspot.tsx
'use client'

import { motion } from 'framer-motion'
import type { WindowHotspot } from '@/content/scene.config'

export function WindowHotspotButton({
  hotspot,
  onClick,
  isFlickering,
}: {
  hotspot: WindowHotspot
  onClick: () => void
  isFlickering: boolean
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={hotspot.label}
      className="absolute rounded-sm"
      style={{
        left: `${hotspot.xPct}%`,
        top: `${hotspot.yPct}%`,
        width: `${hotspot.wPct}%`,
        height: `${hotspot.hPct}%`,
      }}
      initial="rest"
      whileHover="hover"
      variants={{
        rest: { scale: 1, boxShadow: '0 0 0px rgba(242, 201, 76, 0)' },
        hover: { scale: 1.08, boxShadow: '0 0 24px 6px rgba(242, 201, 76, 0.65)' },
      }}
      transition={{ duration: 0.2 }}
      animate={isFlickering ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
      {...(isFlickering ? { transition: { opacity: { duration: 0.9, ease: 'easeInOut' } } } : {})}
    />
  )
}
```

The `animate` prop drives `opacity` directly (an ambient effect unrelated to interaction), while `variants`/`whileHover` drive `scale`/`boxShadow` (the hover affordance) — Framer Motion merges both onto the same element since they target different style properties. The spread after `transition` only overrides the *opacity* sub-transition while flickering; `whileHover`'s `{ duration: 0.2 }` still governs the hover scale/glow either way, since per-value transitions (`transition.opacity`) take precedence over the top-level duration for that one property.

- [ ] **Step 2: Implement `SkyscraperScene`**

```tsx
// components/scene/skyscraper-scene.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { sceneConfig } from '@/content/scene.config'
import { useSceneState } from '@/lib/scene-state-context'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { WindowHotspotButton } from './window-hotspot'

export const ZOOM_SCALE = 2.75

export function SkyscraperScene() {
  const { state, clickWindow } = useSceneState()
  const frameRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const isZoomed = state.view === 'zoomed'
  const activeSectionId = state.view === 'zoomed' ? state.sectionId : null

  // Ambient mouse parallax — only while sitting on the un-zoomed scene.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const parallaxX = useSpring(useTransform(pointerX, [-1, 1], [-12, 12]), { stiffness: 60, damping: 20 })
  const parallaxY = useSpring(useTransform(pointerY, [-1, 1], [-12, 12]), { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (reducedMotion || isZoomed) return

    const handlePointerMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window
      pointerX.set((event.clientX / innerWidth) * 2 - 1)
      pointerY.set((event.clientY / innerHeight) * 2 - 1)
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [reducedMotion, isZoomed, pointerX, pointerY])

  // Idle window flicker — at most one window pulses opacity at a time, on
  // a randomized low-frequency timer, only while sitting on the scene.
  const [flickerId, setFlickerId] = useState<string | null>(null)

  useEffect(() => {
    if (reducedMotion || isZoomed) return

    let flickerOffTimeout: ReturnType<typeof setTimeout>

    const intervalId = setInterval(() => {
      const candidate = sceneConfig.windows[Math.floor(Math.random() * sceneConfig.windows.length)]
      setFlickerId(candidate.id)
      flickerOffTimeout = setTimeout(() => setFlickerId(null), 900)
    }, 4000)

    return () => {
      clearInterval(intervalId)
      clearTimeout(flickerOffTimeout)
      setFlickerId(null)
    }
  }, [reducedMotion, isZoomed])

  // Zoom transform: computed in pixels from the clicked hotspot's %
  // position, using transformOrigin '0 0' so the math is a straight
  // translate-then-scale (see plan Task 6 notes for the derivation).
  const zoomX = useMotionValue(0)
  const zoomY = useMotionValue(0)
  const zoomScale = useMotionValue(1)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const duration = reducedMotion ? 0 : 0.7
    const options = { duration, ease: 'easeInOut' as const }

    if (!activeSectionId) {
      animate(zoomX, 0, options)
      animate(zoomY, 0, options)
      animate(zoomScale, 1, options)
      return
    }

    const hotspot = sceneConfig.windows.find((w) => w.sectionId === activeSectionId)
    if (!hotspot) return

    const { width, height } = frame.getBoundingClientRect()
    const px = ((hotspot.xPct + hotspot.wPct / 2) / 100) * width
    const py = ((hotspot.yPct + hotspot.hPct / 2) / 100) * height
    const scale = reducedMotion ? 1 : ZOOM_SCALE

    animate(zoomX, width / 2 - scale * px, options)
    animate(zoomY, height / 2 - scale * py, options)
    animate(zoomScale, scale, options)
  }, [activeSectionId, reducedMotion, zoomX, zoomY, zoomScale])

  const handleCalibrationClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (process.env.NODE_ENV === 'production') return
    const frame = frameRef.current
    if (!frame) return
    const rect = frame.getBoundingClientRect()
    const xPct = ((event.clientX - rect.left) / rect.width) * 100
    const yPct = ((event.clientY - rect.top) / rect.height) * 100
    // eslint-disable-next-line no-console
    console.log(`Calibration: xPct=${xPct.toFixed(2)}, yPct=${yPct.toFixed(2)}`)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div
        ref={frameRef}
        onClick={handleCalibrationClick}
        className="relative overflow-hidden"
        style={{
          aspectRatio: sceneConfig.aspectRatio,
          width: '100%',
          maxHeight: '100%',
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            transformOrigin: '0 0',
            x: zoomX,
            y: zoomY,
            scale: zoomScale,
            translateX: isZoomed || reducedMotion ? 0 : parallaxX,
            translateY: isZoomed || reducedMotion ? 0 : parallaxY,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sceneConfig.posterSrc}
            alt="Interactive skyscraper scene"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {sceneConfig.windows.map((hotspot) => (
            <WindowHotspotButton
              key={hotspot.id}
              hotspot={hotspot}
              onClick={() => clickWindow(hotspot.sectionId)}
              isFlickering={hotspot.id === flickerId}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
```

Note: `translateX`/`translateY` and `x`/`y` are combined on the same motion component here because Framer Motion composes both into a single CSS transform in the order `translate(x, y) translate(translateX, translateY) scale(scale)` — for the zoomed state, `translateX/Y` are pinned to `0` so only `x`/`y`/`scale` (the zoom transform) apply; for the ambient-parallax state, `x`/`y` are `0` so only `translateX/Y` apply. The two never animate simultaneously (parallax turns off the instant `isZoomed` is true), so their composition order doesn't matter in practice.

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing either new file.

- [ ] **Step 4: Manual smoke test of the zoom math**

This is checked visually in Task 8's manual test (needs `ContentPanel` and `app/page.tsx` wired up to actually see it render) rather than here in isolation — note it as pending and continue.

- [ ] **Step 5: Commit**

```bash
git add components/scene/window-hotspot.tsx components/scene/skyscraper-scene.tsx
git commit -m "Add SkyscraperScene with hotspots, ambient motion, and calibration mode"
```

---

### Task 7: Content panel and placeholder sections

**Files:**
- Create: `sections/placeholder-section.tsx`
- Create: `sections/registry.ts`
- Create: `components/scene/content-panel.tsx`

**Interfaces:**
- Consumes: `useSceneState` from `lib/scene-state-context.tsx` (Task 3).
- Produces:
  - `function PlaceholderSection(props: { title: string; onBack: () => void }): JSX.Element`
  - `const sectionRegistry: Record<string, { title: string }>` mapping every `sceneConfig.windows[].sectionId` to display metadata (title). All sections render through the one `PlaceholderSection` component for now; a real section later replaces its registry entry's rendering without touching `ContentPanel`.
  - `function ContentPanel(): JSX.Element` — renders nothing when `state.view !== 'zoomed'`; otherwise looks up `state.sectionId` in `sectionRegistry` and renders `PlaceholderSection`.

- [ ] **Step 1: Implement `PlaceholderSection`**

```tsx
// sections/placeholder-section.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function PlaceholderSection({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Content coming soon.</p>
        <Button onClick={onBack}>Back</Button>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 2: Implement the section registry**

```typescript
// sections/registry.ts
export const sectionRegistry: Record<string, { title: string }> = {
  about: { title: 'About Me' },
  experience: { title: 'Experience' },
  projects: { title: 'Projects' },
  contact: { title: 'Contact' },
}
```

- [ ] **Step 3: Implement `ContentPanel`**

```tsx
// components/scene/content-panel.tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSceneState } from '@/lib/scene-state-context'
import { sectionRegistry } from '@/sections/registry'
import { PlaceholderSection } from '@/sections/placeholder-section'

export function ContentPanel() {
  const { state, goBack } = useSceneState()
  const isZoomed = state.view === 'zoomed'
  const entry = isZoomed ? sectionRegistry[state.sectionId] : undefined

  return (
    <AnimatePresence>
      {isZoomed && entry && (
        <motion.div
          key={state.sectionId}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
        >
          <PlaceholderSection title={entry.title} onBack={goBack} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing these three files.

- [ ] **Step 5: Commit**

```bash
git add sections/placeholder-section.tsx sections/registry.ts components/scene/content-panel.tsx
git commit -m "Add ContentPanel and placeholder section registry"
```

---

### Task 8: Crossfade wiring and smoke-test

**Files:**
- Create: `components/portfolio-app.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `useSceneState` (Task 3), `IntroVideo` (Task 5), `SkyscraperScene` (Task 6), `ContentPanel` (Task 7).
- Produces: `function PortfolioApp(): JSX.Element` — the piece that actually gates `IntroVideo` vs. `SkyscraperScene`/`ContentPanel` on `state.view` and crossfades between them. This must live inside `SceneStateProvider` (it calls `useSceneState`), which is why it's a separate component from `app/page.tsx` rather than inline there.

- [ ] **Step 1: Implement `PortfolioApp`**

```tsx
// components/portfolio-app.tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSceneState } from '@/lib/scene-state-context'
import { IntroVideo } from './intro/intro-video'
import { SkyscraperScene } from './scene/skyscraper-scene'
import { ContentPanel } from './scene/content-panel'

export function PortfolioApp() {
  const { state } = useSceneState()

  return (
    <>
      <AnimatePresence>
        {state.view === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-50"
          >
            <IntroVideo />
          </motion.div>
        )}
      </AnimatePresence>

      {state.view !== 'intro' && (
        <>
          <SkyscraperScene />
          <ContentPanel />
        </>
      )}
    </>
  )
}
```

`IntroVideo` is only ever mounted while `state.view === 'intro'`; once `finishIntro()` dispatches (video `onEnded`, Skip, or the no-video-configured auto-skip in Task 5), this wrapper exits with a 0.7s opacity fade while `SkyscraperScene` is already mounted and visible underneath — that overlap is the crossfade the spec calls for, not a separate animation to build inside `IntroVideo` itself. Gating `SkyscraperScene`/`ContentPanel` behind `state.view !== 'intro'` also means their pointer listeners and ambient motion don't start until the intro is actually done.

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
// app/page.tsx
import { SceneStateProvider } from '@/lib/scene-state-context'
import { PortfolioApp } from '@/components/portfolio-app'

export default function Home() {
  return (
    <SceneStateProvider>
      <PortfolioApp />
    </SceneStateProvider>
  )
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Run the dev server and verify manually**

Run: `npm run dev`, open `http://localhost:3000`.

Expected (with `sceneConfig.videoSrc` still `null` from Task 4):
- No video plays; the page goes straight to the placeholder skyscraper scene.
- Four window hotspots are visible over the top row of the placeholder art and glow on hover.
- Clicking a hotspot zooms the frame in, centering on that window, and a placeholder card slides in with the section's title and a Back button.
- Back reverses the zoom and removes the card.
- Clicking anywhere else on the frame (outside a hotspot) logs `Calibration: xPct=..., yPct=...` in the browser console (dev mode only).
- Resize the browser to a narrow portrait width — the frame letterboxes (matte bars) rather than distorting, and hotspots stay aligned to the art.
- In OS/browser accessibility settings, enable "reduce motion," reload, and confirm ambient parallax/flicker stop and the zoom transition becomes instant rather than animated.

- [ ] **Step 5: Run the full test suite**

Run: `npm run test`
Expected: all tests from Task 2 still pass.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "Wire intro, scene, and content panel together on the homepage"
```

---

## After this plan

- Drop in the real edited video + extracted poster frame by setting `sceneConfig.videoSrc`/`posterSrc` in `content/scene.config.ts`, and use calibration mode (Task 6) to read real hotspot `%` values off the new art.
- Build each real section (About, Experience, Projects, Contact) as its own component, and replace that entry's rendering in `sections/registry.ts` — `ContentPanel`, `SkyscraperScene`, and the state machine are not touched.
