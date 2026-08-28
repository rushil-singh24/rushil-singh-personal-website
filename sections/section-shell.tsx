'use client'

import type { ReactNode } from 'react'

type Accent = 'cyan' | 'fuchsia' | 'amber'

const ACCENT: Record<
  Accent,
  { text: string; grad: string; rule: string; watermark: string }
> = {
  cyan: {
    text: 'text-cyan-300',
    grad: 'from-cyan-500/15',
    rule: 'via-cyan-400/70',
    watermark: 'text-cyan-300',
  },
  fuchsia: {
    text: 'text-fuchsia-300',
    grad: 'from-fuchsia-500/15',
    rule: 'via-fuchsia-400/70',
    watermark: 'text-fuchsia-300',
  },
  amber: {
    text: 'text-amber-300',
    grad: 'from-amber-500/15',
    rule: 'via-amber-400/70',
    watermark: 'text-amber-300',
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
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-[#070912] text-zinc-100">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${a.grad} to-transparent`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)',
          backgroundSize: '8px 8px',
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-6 top-2 select-none font-mono text-[26vh] font-bold leading-none opacity-[0.06] ${a.watermark}`}
      >
        {index.replace('// ', '')}
      </div>

      <header className="relative z-10 flex items-center justify-between gap-4 px-6 py-5 sm:px-12 sm:py-7">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <span aria-hidden className="text-base transition-transform group-hover:-translate-x-1">
            &larr;
          </span>
          back to the city
        </button>
        <span className={`font-mono text-xs uppercase tracking-[0.2em] ${a.text}`}>
          {index}
        </span>
      </header>

      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-6 pb-28 pt-4 sm:px-12">
          <h2 className="relative font-mono text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl">
            <span aria-hidden className={`absolute left-[3px] top-[2px] ${a.text} opacity-50`}>
              {title}
            </span>
            <span className="relative">{title}</span>
          </h2>
          <div className={`mt-6 h-px w-full bg-gradient-to-r from-transparent ${a.rule} to-transparent`} />
          <div className="mt-12 space-y-12">{children}</div>
        </div>
      </div>
    </div>
  )
}
