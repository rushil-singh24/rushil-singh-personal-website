'use client'

import { SectionShell } from './section-shell'
import { Reveal } from '@/components/reveal'
import { ExternalLink } from 'lucide-react'
import { SiGithub } from 'react-icons/si'

type Project = {
  name: string
  stack: string[]
  points: string[]
  demoHref: string
  sourceHref: string
}

const PROJECTS: Project[] = [
  {
    name: 'TuneBloom — Music Discovery',
    stack: ['JavaScript', 'React', 'Tailwind CSS', 'REST API', 'PostgreSQL'],
    points: [
      'Content-based music recommendation engine using Euclidean-distance matching on Spotify audio features, with fallback strategies and exclusion logic filtering 1,000+ previously-heard tracks.',
      'Gamified UI/UX with Framer Motion and real-time feedback loops behind secure login auth, plus an API integration layer with smart caching and batch processing.',
    ],
    demoHref: 'https://tune-bloom.vercel.app/login',
    // TODO(rushil): exact repo URL
    sourceHref: 'https://github.com/rushil-singh24',
  },
  {
    name: 'Option(al) Risk — Quant Finance Tool',
    stack: ['TypeScript', 'Python', 'Flask', 'React', 'REST API'],
    points: [
      'Full-stack dashboard for options-portfolio risk analytics, running the Black-Scholes model across 61+ tickers so traders can analyze portfolio sensitivity.',
      'Monte Carlo simulation engine processing 10,000+ price-path scenarios to compute Value-at-Risk at the 95th and 99th percentiles.',
    ],
    demoHref: 'https://options-risk-frontend.onrender.com/',
    // TODO(rushil): exact repo URL
    sourceHref: 'https://github.com/rushil-singh24',
  },
]

export function ProjectsSection() {
  return (
    <SectionShell id="projects" index="// 04" title="Projects" accent="cyan">
      <div className="grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((p, idx) => (
          <Reveal key={p.name} delay={idx * 0.05}>
            <article className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold text-white">{p.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded border border-cyan-400/20 bg-cyan-400/5 px-2 py-0.5 font-mono text-[11px] text-cyan-200"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex-1 space-y-2">
                {p.points.map((pt, i) => (
                  <li key={i} className="text-sm leading-relaxed text-zinc-300">
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href={p.demoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-cyan-200 transition-colors hover:bg-cyan-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                >
                  Live demo
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href={p.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-zinc-200 transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  Source code
                  <SiGithub className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
        <Reveal delay={0.12}>
          <article className="flex h-full min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              More coming soon
            </p>
            <p className="mt-2 text-sm text-zinc-600">New projects in progress.</p>
          </article>
        </Reveal>
      </div>
    </SectionShell>
  )
}
