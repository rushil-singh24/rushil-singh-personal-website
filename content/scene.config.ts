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
  // Matches public/scene-bg.png (1441x762). Re-derive if the art is regenerated.
  aspectRatio: 1441 / 762,
  // Coordinates are first-pass estimates read off scene-bg.png. Refine with
  // calibration mode: run `npm run dev`, click each target window in the
  // scene, copy the logged xPct/yPct here.
  windows: [
    { id: 'window-about', sectionId: 'about', label: 'About', xPct: 46, yPct: 14, wPct: 7, hPct: 13 },
    { id: 'window-experience', sectionId: 'experience', label: 'Experience', xPct: 53.5, yPct: 19, wPct: 5.5, hPct: 11 },
    { id: 'window-techstack', sectionId: 'techstack', label: 'Tech Stack', xPct: 14, yPct: 27, wPct: 5, hPct: 20 },
    { id: 'window-projects', sectionId: 'projects', label: 'Projects', xPct: 43.5, yPct: 29, wPct: 5, hPct: 9 },
    { id: 'window-contact', sectionId: 'contact', label: 'Contact', xPct: 73, yPct: 47, wPct: 5.5, hPct: 9 },
  ] satisfies WindowHotspot[],
}
