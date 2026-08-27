'use client'

import { SectionShell } from './section-shell'

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
      <p className="text-[15px] leading-relaxed text-zinc-300">
        Open to internships and collaboration in AI/ML and full-stack engineering. Fastest way to
        reach me is email.
      </p>
      <ul className="mt-5 divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
        {LINKS.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-between gap-4 bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-fuchsia-300">
                {l.label}
              </span>
              <span className="text-sm text-zinc-200">{l.value}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-xs text-zinc-500">Pittsburgh, PA</p>
    </SectionShell>
  )
}
