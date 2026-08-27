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
