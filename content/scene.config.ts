export type PanelAccent = 'cyan' | 'fuchsia' | 'amber' | 'violet' | 'red'

export interface SectionPanel {
  id: string
  sectionId: string
  label: string
  accent: PanelAccent
  /** Panel centre as a % of the viewport (desktop comic layout). */
  xPct: number
  yPct: number
  /** Panel width as a % of the viewport. */
  wPct: number
  /** Slight comic-panel tilt, in degrees. */
  rotate: number
  big?: boolean
}

export const sceneConfig = {
  // IntroVideo treats a falsy videoSrc as "skip the intro entirely."
  // Local compressed copies for preview — swap for Vercel Blob URLs before
  // deploying (the media in public/ is gitignored).
  videoSrc: '/intro.mp4' as string | null,
  videoWebmSrc: '/intro.webm' as string | null,
  videoPosterSrc: '/intro-poster.jpg',
  posterSrc: '/intro-poster.jpg',

  // Comic-page panels. Labels live inside each panel, so nothing is
  // calibrated against baked art.
  panels: [
    { id: 'p-about', sectionId: 'about', label: 'Rushil Singh', accent: 'fuchsia', xPct: 48, yPct: 50, wPct: 44, rotate: -1, big: true },
    { id: 'p-experience', sectionId: 'experience', label: 'Experience', accent: 'violet', xPct: 15, yPct: 24, wPct: 28, rotate: -3 },
    { id: 'p-techstack', sectionId: 'techstack', label: 'Tech Stack', accent: 'amber', xPct: 85, yPct: 22, wPct: 28, rotate: 2.5 },
    { id: 'p-projects', sectionId: 'projects', label: 'Projects', accent: 'cyan', xPct: 15, yPct: 76, wPct: 28, rotate: 2 },
    { id: 'p-contact', sectionId: 'contact', label: 'Personal Info', accent: 'red', xPct: 85, yPct: 74, wPct: 28, rotate: -2.5 },
  ] satisfies SectionPanel[],
}
