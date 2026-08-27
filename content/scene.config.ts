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
  // IntroVideo treats a falsy videoSrc as "skip the intro entirely."
  // Local compressed copies for preview. Before deploying, swap videoSrc /
  // videoWebmSrc / videoPosterSrc for the Vercel Blob CDN URLs — the .mp4 /
  // .webm in public/ are gitignored and won't exist on the deployed build.
  videoSrc: '/intro.mp4' as string | null,
  videoWebmSrc: '/intro.webm' as string | null,
  videoPosterSrc: '/intro-poster.jpg',
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
