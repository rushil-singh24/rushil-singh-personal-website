export interface WindowHotspot {
  id: string
  sectionId: string
  label: string
  sublabel?: string
  rotate?: number
  /** Multiplier on the label font size (1 = default). */
  labelScale?: number
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
    { id: 'billboard-about', sectionId: 'about', label: 'Rushil Singh', labelScale: 2, rotate: 1, xPct: 32.9, yPct: 42.5, wPct: 34, hPct: 24 },
    { id: 'billboard-experience', sectionId: 'experience', label: 'Experience', rotate: 2, xPct: 18.9, yPct: 25.4, wPct: 16, hPct: 15 },
    { id: 'billboard-techstack', sectionId: 'techstack', label: 'Tech Stack', rotate: -3, xPct: 65.9, yPct: 23.3, wPct: 16, hPct: 14 },
    { id: 'billboard-projects', sectionId: 'projects', label: 'Projects', rotate: -3, xPct: 11.8, yPct: 66.1, wPct: 16, hPct: 15 },
    { id: 'billboard-contact', sectionId: 'contact', label: 'Personal Info', labelScale: 0.92, rotate: 3, xPct: 67.5, yPct: 69.5, wPct: 18, hPct: 15 },
  ] satisfies WindowHotspot[],
}
