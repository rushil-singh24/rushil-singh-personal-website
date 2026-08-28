'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useSceneState } from '@/lib/scene-state-context'
import { AboutSection } from '@/sections/about-section'
import { ExperienceSection } from '@/sections/experience-section'
import { TechStackSection } from '@/sections/tech-stack-section'
import { ProjectsSection } from '@/sections/projects-section'
import { ContactSection } from '@/sections/contact-section'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'techstack', label: 'Tech Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Personal Info' },
]

export function ScrollSite() {
  const { replayIntro } = useSceneState()
  const [open, setOpen] = useState(false)

  // Background shifts through the Spider-Verse night palette as you scroll.
  const { scrollYProgress } = useScroll()
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#171334', '#221a46', '#2c1942', '#141a3c', '#2a1230'],
  )

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative w-full">
      {/* Spider-Verse night wash that shifts hue while scrolling. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ backgroundColor: bgColor }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 28%, rgba(124,84,224,0.28), transparent 62%), radial-gradient(ellipse at 80% 90%, rgba(232,70,180,0.18), transparent 55%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.5px)',
          backgroundSize: '11px 11px',
        }}
      />

      {/* hamburger menu */}
      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-md border-2 border-black bg-white shadow-[3px_3px_0_0_#0b0b14] transition-transform active:translate-y-px"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-[2px] w-full bg-black transition-all duration-200 ${
                open ? 'top-[5px] rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-[5px] h-[2px] w-full bg-black transition-all duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 h-[2px] w-full bg-black transition-all duration-200 ${
                open ? 'top-[5px] -rotate-45' : 'top-[10px]'
              }`}
            />
          </span>
        </button>

        {open && (
          <nav className="absolute right-0 mt-2 w-56 overflow-hidden rounded-md border-2 border-black bg-white shadow-[5px_5px_0_0_#0b0b14]">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="block w-full border-b-2 border-black/10 px-4 py-3 text-left font-[family-name:var(--font-display)] text-lg uppercase tracking-tight text-black transition-colors hover:bg-black hover:text-white"
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                replayIntro()
              }}
              className="block w-full px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.15em] text-black/60 transition-colors hover:bg-black hover:text-white"
            >
              &#9654; Replay intro
            </button>
          </nav>
        )}
      </div>

      <main className="relative">
        <AboutSection />
        <ExperienceSection />
        <TechStackSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  )
}
