'use client'

import type { ReactNode } from 'react'

type Accent = 'cyan' | 'fuchsia' | 'amber'

const ACCENT: Record<
  Accent,
  { text: string; ring: string; glow: string; marker: string; rule: string }
> = {
  cyan: {
    text: 'text-cyan-300',
    ring: 'ring-cyan-400/30',
    glow: 'shadow-[0_0_60px_-12px_rgba(34,211,238,0.45),0_0_140px_-48px_rgba(217,70,239,0.35)]',
    marker: 'text-cyan-400',
    rule: 'from-cyan-400/70',
  },
  fuchsia: {
    text: 'text-fuchsia-300',
    ring: 'ring-fuchsia-400/30',
    glow: 'shadow-[0_0_60px_-12px_rgba(217,70,239,0.45),0_0_140px_-48px_rgba(34,211,238,0.35)]',
    marker: 'text-fuchsia-400',
    rule: 'from-fuchsia-400/70',
  },
  amber: {
    text: 'text-amber-300',
    ring: 'ring-amber-400/30',
    glow: 'shadow-[0_0_60px_-12px_rgba(251,191,36,0.4),0_0_140px_-48px_rgba(217,70,239,0.3)]',
    marker: 'text-amber-400',
    rule: 'from-amber-400/70',
  },
}

export function SectionShell({
  index,
  title,
  accent,
  onBack,
  children,
}: {
  index: string
  title: string
  accent: Accent
  onBack: () => void
  children: ReactNode
}) {
  const a = ACCENT[accent]
  return (
    <div
      className={`relative flex max-h-[85vh] w-[min(92vw,640px)] flex-col overflow-hidden rounded-2xl bg-[#0b0e1f]/92 text-zinc-100 ring-1 backdrop-blur-xl ${a.ring} ${a.glow}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)',
          backgroundSize: '7px 7px',
        }}
      />

      <div className="relative flex items-center justify-between gap-4 px-6 pt-5 sm:px-8">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-md px-2 py-1 font-mono text-xs uppercase tracking-widest text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            &larr;
          </span>
          back to the city
        </button>
        <span className={`font-mono text-xs uppercase tracking-widest ${a.marker}`}>
          {index}
        </span>
      </div>

      <div className="relative px-6 pt-3 sm:px-8">
        <h2 className="relative font-mono text-2xl font-bold uppercase tracking-tight sm:text-3xl">
          <span aria-hidden className={`absolute left-[2px] top-[1px] ${a.text} opacity-60`}>
            {title}
          </span>
          <span className="relative">{title}</span>
        </h2>
        <div className={`mt-3 h-px w-full bg-gradient-to-r ${a.rule} to-transparent`} />
      </div>

      <div className="relative overflow-y-auto px-6 py-5 sm:px-8 sm:py-6">{children}</div>
    </div>
  )
}
