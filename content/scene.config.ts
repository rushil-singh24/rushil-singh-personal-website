export type PanelAccent = 'cyan' | 'fuchsia' | 'amber' | 'violet'

export interface SectionPanel {
  id: string
  sectionId: string
  label: string
  accent: PanelAccent
  /** Panel centre as a % of the viewport. */
  xPct: number
  yPct: number
  /** Depth in px (negative pushes the panel further back). */
  z: number
  rotX: number
  rotY: number
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

  // Floating section panels in the void. All positions are DOM %, so the
  // label always sits on its panel — nothing to calibrate against baked art.
  panels: [
    { id: 'p-about', sectionId: 'about', label: 'Rushil Singh', accent: 'cyan', xPct: 50, yPct: 49, z: 40, rotX: 0, rotY: 0, big: true },
    { id: 'p-experience', sectionId: 'experience', label: 'Experience', accent: 'fuchsia', xPct: 17, yPct: 23, z: -80, rotX: 7, rotY: 18 },
    { id: 'p-techstack', sectionId: 'techstack', label: 'Tech Stack', accent: 'amber', xPct: 83, yPct: 22, z: -130, rotX: 8, rotY: -20 },
    { id: 'p-projects', sectionId: 'projects', label: 'Projects', accent: 'cyan', xPct: 16, yPct: 78, z: -60, rotX: -9, rotY: 19 },
    { id: 'p-contact', sectionId: 'contact', label: 'Personal Info', accent: 'violet', xPct: 84, yPct: 79, z: -150, rotX: -8, rotY: -20 },
  ] satisfies SectionPanel[],
}
