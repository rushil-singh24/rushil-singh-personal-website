'use client'

import { useEffect, useState } from 'react'
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
  const [active, setActive] = useState('about')

  // Background shifts through the Spider-Verse night palette as you scroll.
  const { scrollYProgress } = useScroll()
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#171334', '#221a46', '#2c1942', '#141a3c', '#2a1230'],
  )

  // Scroll-spy for the top nav.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    )
    NAV.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

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

      {/* Top nav bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
        <nav className="flex max-w-[96vw] flex-wrap items-center justify-center gap-1 overflow-x-auto rounded-xl border-2 border-black bg-white/95 px-2 py-1.5 shadow-[4px_4px_0_0_#0b0b14] backdrop-blur">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`shrink-0 rounded-md px-3 py-1.5 font-[family-name:var(--font-display)] text-sm uppercase tracking-tight transition-colors ${
                active === n.id
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-black hover:text-white'
              }`}
            >
              {n.label}
            </button>
          ))}
          <span className="mx-1 hidden h-4 w-px bg-black/20 sm:block" />
          <button
            onClick={replayIntro}
            className="shrink-0 rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-black/60 transition-colors hover:bg-black hover:text-white"
          >
            &#9654; Replay intro
          </button>
        </nav>
      </header>

      <main className="relative">
        <AboutSection />
        <ExperienceSection />
        <TechStackSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* easter egg */}
      <footer className="relative flex justify-center pb-28 pt-8">
        <motion.img
          src="/miles.png"
          alt=""
          aria-hidden
          draggable={false}
          className="h-auto w-[70px] select-none opacity-85 sm:w-20"
          animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </footer>
    </div>
  )
}
