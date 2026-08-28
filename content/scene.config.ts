export interface WindowHotspot {
  id: string
  sectionId: string
  label: string
  sublabel?: string
  rotate?: number
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
  // Matches public/scene-bg.png (1376x768, ~16:9).
  aspectRatio: 1376 / 768,
  // Billboard hotspots as % of the frame (top-left origin). Tuned against
  // scene-bg.png; re-tune with calibration mode (run `npm run dev`, click a
  // billboard, copy the logged xPct/yPct).
  // `rotate` (deg) tilts a hotspot to match its billboard's angle in the
  // art so the label reads as painted on. Tune alongside x/y/w/h.
  windows: [
    { id: 'billboard-about', sectionId: 'about', label: 'Rushil Singh', rotate: 1, xPct: 37, yPct: 44, wPct: 24, hPct: 20 },
    { id: 'billboard-experience', sectionId: 'experience', label: 'Experience', rotate: 9, xPct: 21, yPct: 24, wPct: 13, hPct: 14 },
    { id: 'billboard-techstack', sectionId: 'techstack', label: 'Tech Stack', rotate: -9, xPct: 68, yPct: 22, wPct: 13, hPct: 14 },
    { id: 'billboard-projects', sectionId: 'projects', label: 'Projects', rotate: -8, xPct: 12.5, yPct: 65, wPct: 13.5, hPct: 15 },
    { id: 'billboard-contact', sectionId: 'contact', label: 'Personal Info', rotate: 11, xPct: 70, yPct: 72, wPct: 17, hPct: 15 },
  ] satisfies WindowHotspot[],
}
