'use client'

import { SectionShell } from './section-shell'

type Project = {
  name: string
  stack: string[]
  points: string[]
}

const PROJECTS: Project[] = [
  {
    name: 'TuneBloom — Music Discovery',
    stack: ['JavaScript', 'React', 'Tailwind CSS', 'REST API', 'PostgreSQL'],
    points: [
      'Content-based music recommendation engine using Euclidean-distance matching on Spotify audio features, with fallback strategies and exclusion logic filtering 1,000+ previously-heard tracks.',
      'Gamified UI/UX with Framer Motion and real-time feedback loops behind secure login auth, plus an API integration layer with smart caching and batch processing.',
    ],
  },
  {
    name: 'Option(al) Risk — Quant Finance Tool',
    stack: ['TypeScript', 'Python', 'Flask', 'React', 'REST API'],
    points: [
      'Full-stack dashboard for options-portfolio risk analytics, running the Black-Scholes model across 61+ tickers so traders can analyze portfolio sensitivity.',
      'Monte Carlo simulation engine processing 10,000+ price-path scenarios to compute Value-at-Risk at the 95th and 99th percentiles.',
    ],
  },
]

export function ProjectsSection({ onBack }: { onBack: () => void }) {
  return (
    <SectionShell index="// 04" title="Projects" accent="cyan" onBack={onBack}>
      <div className="space-y-5">
        {PROJECTS.map((p) => (
          <article
            key={p.name}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
          >
            <h3 className="text-[15px] font-semibold text-zinc-100">{p.name}</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded border border-cyan-400/20 bg-cyan-400/5 px-1.5 py-0.5 font-mono text-[11px] text-cyan-200"
                >
                  {s}
                </li>
              ))}
            </ul>
            <ul className="mt-3 space-y-1.5">
              {p.points.map((pt, i) => (
                <li key={i} className="text-[13.5px] leading-relaxed text-zinc-300">
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-5 font-mono text-xs text-zinc-500">
        More at{' '}
        <a
          href="https://github.com/rushil-singh24"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-300 underline-offset-4 hover:underline"
        >
          github.com/rushil-singh24
        </a>
      </p>
    </SectionShell>
  )
}
