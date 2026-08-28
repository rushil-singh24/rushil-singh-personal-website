'use client'

import type { ReactNode } from 'react'

type Accent = 'cyan' | 'fuchsia' | 'amber' | 'violet' | 'red'

const ACCENT: Record<Accent, { text: string; rule: string }> = {
  cyan: { text: 'text-cyan-300', rule: 'via-cyan-400/70' },
  fuchsia: { text: 'text-fuchsia-300', rule: 'via-fuchsia-400/70' },
  amber: { text: 'text-amber-300', rule: 'via-amber-400/70' },
  violet: { text: 'text-violet-300', rule: 'via-violet-400/70' },
  red: { text: 'text-rose-300', rule: 'via-rose-400/70' },
}

export function SectionShell({
  id,
  index,
  title,
  accent,
  children,
}: {
  id: string
  index: string
  title: string
  accent: Accent
  children: ReactNode
}) {
  const a = ACCENT[accent]
  return (
    <section
      id={id}
      className="flex w-full scroll-mt-4 justify-center px-4 py-20 first:pt-28 sm:px-8 sm:py-28"
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border-[3px] border-black bg-[#0b0c16]/[0.97] p-6 text-zinc-100 shadow-[10px_12px_0_0_rgba(0,0,0,0.5)] sm:p-10">
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
          className={`pointer-events-none absolute -right-4 -top-4 select-none font-[family-name:var(--font-display)] text-[22vh] leading-none opacity-[0.06] ${a.text}`}
        >
          {index.replace('// ', '')}
        </div>

        <div className="relative">
          <span className={`font-mono text-xs uppercase tracking-[0.2em] ${a.text}`}>
            {index}
          </span>
          <h2 className="relative mt-2 font-[family-name:var(--font-display)] text-5xl uppercase leading-[0.88] tracking-tight sm:text-7xl">
            <span aria-hidden className={`absolute left-[3px] top-[3px] ${a.text} opacity-35`}>
              {title}
            </span>
            <span className="relative">{title}</span>
          </h2>
          <div
            className={`mt-5 h-px w-full bg-gradient-to-r from-transparent ${a.rule} to-transparent`}
          />
          <div className="mt-10 space-y-12">{children}</div>
        </div>
      </div>
    </section>
  )
}
