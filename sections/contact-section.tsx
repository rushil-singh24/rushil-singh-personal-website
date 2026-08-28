'use client'

import { SectionShell } from './section-shell'
import { Reveal } from '@/components/reveal'

const LINKS = [
  { label: 'Email', value: 'rushils@andrew.cmu.edu', href: 'mailto:rushils@andrew.cmu.edu' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/rushil-singh1',
    href: 'https://linkedin.com/in/rushil-singh1',
  },
  { label: 'GitHub', value: 'github.com/rushil-singh24', href: 'https://github.com/rushil-singh24' },
  { label: 'Phone', value: '(774) 777-8174', href: 'tel:+17747778174' },
]

export function ContactSection({ onBack }: { onBack: () => void }) {
  return (
    <SectionShell index="// 05" title="Contact" accent="fuchsia" onBack={onBack}>
      <Reveal>
        <p className="text-xl leading-relaxed text-zinc-200 sm:text-2xl">
          Open to internships and collaboration in AI/ML and full-stack engineering. Fastest way to
          reach me is email.
        </p>
      </Reveal>

      <div className="space-y-3">
        {LINKS.map((l, idx) => (
          <Reveal key={l.label} delay={idx * 0.04}>
            <a
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-5 transition-colors hover:border-fuchsia-400/40 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-fuchsia-300">
                {l.label}
              </span>
              <span className="text-base text-zinc-100 sm:text-lg">{l.value}</span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="font-mono text-sm text-zinc-500">Pittsburgh, PA</p>
      </Reveal>
    </SectionShell>
  )
}
