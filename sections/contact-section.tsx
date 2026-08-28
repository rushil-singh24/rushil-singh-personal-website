'use client'

import { SectionShell } from './section-shell'
import { Reveal } from '@/components/reveal'
import { FileText, Download } from 'lucide-react'

const RESUME = '/rushil-singh-resume.pdf'

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

export function ContactSection() {
  return (
    <SectionShell id="contact" index="// 05" title="Personal Info" accent="red">
      <Reveal>
        <p className="text-lg leading-relaxed text-zinc-200 sm:text-xl">
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

      <Reveal delay={0.06}>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-2.5">
            <FileText className="h-4 w-4 text-fuchsia-300" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-fuchsia-300">Resume</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-fuchsia-100 transition-colors hover:bg-fuchsia-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/50"
            >
              <FileText className="h-3.5 w-3.5" />
              View
            </a>
            <a
              href={RESUME}
              download="Rushil-Singh-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-zinc-200 transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <p className="font-mono text-sm text-zinc-500">Pittsburgh, PA</p>
      </Reveal>
    </SectionShell>
  )
}
