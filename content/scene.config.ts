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
  posterSrc: '/scene-bg.png',
  // Matches public/scene-bg.png (1584x672). Re-derive if the art is regenerated.
  aspectRatio: 1584 / 672,
  // Coordinates are first-pass estimates off the central floating-window
  // cluster in scene-bg.png. Refine with calibration mode: run `npm run dev`,
  // click each target window, copy the logged xPct/yPct here.
  windows: [
    { id: 'window-about', sectionId: 'about', label: 'About', xPct: 43.5, yPct: 26, wPct: 5, hPct: 12 },
    { id: 'window-experience', sectionId: 'experience', label: 'Experience', xPct: 55.5, yPct: 26, wPct: 5, hPct: 12 },
    { id: 'window-techstack', sectionId: 'techstack', label: 'Tech Stack', xPct: 45, yPct: 39, wPct: 5, hPct: 12 },
    { id: 'window-projects', sectionId: 'projects', label: 'Projects', xPct: 60.5, yPct: 37, wPct: 5, hPct: 12 },
    { id: 'window-contact', sectionId: 'contact', label: 'Contact', xPct: 57.5, yPct: 49, wPct: 5, hPct: 11 },
  ] satisfies WindowHotspot[],
}
