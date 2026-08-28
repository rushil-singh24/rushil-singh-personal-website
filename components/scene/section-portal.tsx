'use client'

import { motion } from 'framer-motion'
import type { SectionPanel } from '@/content/scene.config'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const ACCENT: Record<
  SectionPanel['accent'],
  { ring: string; glow: string; split: string; fill: string }
> = {
  cyan: {
    ring: 'ring-cyan-300/50',
    glow: '0 0 48px -6px rgba(34,211,238,0.6), 0 0 130px -34px rgba(34,211,238,0.4)',
    split: '2px 0 0 rgba(34,211,238,0.55), -2px 0 0 rgba(255,60,95,0.5)',
    fill: 'linear-gradient(135deg, rgba(34,211,238,0.18), rgba(34,211,238,0.02) 70%)',
  },
  fuchsia: {
    ring: 'ring-fuchsia-300/50',
    glow: '0 0 48px -6px rgba(217,70,239,0.6), 0 0 130px -34px rgba(217,70,239,0.4)',
    split: '2px 0 0 rgba(217,70,239,0.55), -2px 0 0 rgba(34,211,238,0.5)',
    fill: 'linear-gradient(135deg, rgba(217,70,239,0.18), rgba(217,70,239,0.02) 70%)',
  },
  amber: {
    ring: 'ring-amber-300/50',
    glow: '0 0 48px -6px rgba(251,191,36,0.55), 0 0 130px -34px rgba(251,191,36,0.35)',
    split: '2px 0 0 rgba(251,191,36,0.55), -2px 0 0 rgba(217,70,239,0.5)',
    fill: 'linear-gradient(135deg, rgba(251,191,36,0.18), rgba(251,191,36,0.02) 70%)',
  },
  violet: {
    ring: 'ring-violet-300/50',
    glow: '0 0 48px -6px rgba(167,139,250,0.6), 0 0 130px -34px rgba(167,139,250,0.4)',
    split: '2px 0 0 rgba(167,139,250,0.55), -2px 0 0 rgba(255,60,95,0.5)',
    fill: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(167,139,250,0.02) 70%)',
  },
}

export function SectionPortal({
  panel,
  index,
  onClick,
  dimmed,
}: {
  panel: SectionPanel
  index: number
  onClick: () => void
  dimmed: boolean
}) {
  const reduced = useReducedMotion()
  const a = ACCENT[panel.accent]
  const size = panel.big
    ? 'h-[clamp(140px,24vw,260px)] w-[clamp(300px,62vw,560px)]'
    : 'h-[clamp(96px,17vw,168px)] w-[clamp(200px,42vw,320px)]'

  return (
    <div
      className="absolute"
      style={{
        left: `${panel.xPct}%`,
        top: `${panel.yPct}%`,
        transform: `translate(-50%, -50%) translateZ(${panel.z}px) rotateX(${panel.rotX}deg) rotateY(${panel.rotY}deg)`,
        transformStyle: 'preserve-3d',
        opacity: dimmed ? 0.18 : 1,
        transition: 'opacity 0.35s ease',
      }}
    >
      <motion.button
        onClick={onClick}
        aria-label={`Open ${panel.label}`}
        className={`group relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-md ${size} ${a.ring} ring-1 transition-colors hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70`}
        style={{ boxShadow: a.glow }}
        initial={false}
        animate={
          reduced
            ? undefined
            : {
                y: [0, index % 2 ? -12 : 12, 0],
                rotate: [0, index % 2 ? 1.4 : -1.4, 0],
              }
        }
        transition={
          reduced
            ? undefined
            : {
                duration: 9 + index * 1.7,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        whileHover={reduced ? undefined : { scale: 1.06 }}
        whileTap={{ scale: 0.98 }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: a.fill }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)',
            backgroundSize: '7px 7px',
          }}
        />
        <span
          className="relative select-none px-5 text-center font-[family-name:var(--font-display)] uppercase leading-[0.9] tracking-[0.03em] text-white"
          style={{
            fontSize: panel.big
              ? 'clamp(1.7rem, 4.6vw, 3.6rem)'
              : 'clamp(1rem, 2.9vw, 2rem)',
            textShadow: `${a.split}, 0 2px 16px rgba(0,0,0,0.55)`,
          }}
        >
          {panel.label}
        </span>
      </motion.button>
    </div>
  )
}
