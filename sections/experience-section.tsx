'use client'

import { SectionShell } from './section-shell'
import { Reveal } from '@/components/reveal'

type Role = {
  company: string
  title: string
  period: string
  location: string
  points: string[]
}

const ROLES: Role[] = [
  {
    company: 'Twinly',
    title: 'Software Engineer',
    period: 'Jun 2026 — Present',
    location: 'Remote',
    points: [
      'Designed and shipped cross-platform AI agent capabilities in Swift and Python — voice cloning, reservation booking, and automated gaming through natural prompts — supporting 100+ users and 2,000+ followers.',
      'Deployed Electron desktop builds across macOS and Windows, debugging platform-specific issues and maintaining releases through Git, code reviews, and PR/MR-based integration.',
    ],
  },
  {
    company: 'Perforated AI',
    title: 'Machine Learning Research Collaborator',
    period: 'May 2026 — Present',
    location: 'Pittsburgh, PA',
    points: [
      'Developed PyTorch transformer optimization using Perforated Backpropagation and artificial dendrite architectures — 60% fewer model parameters while accelerating trading-model inference by 15%+.',
      'Designed W&B hyperparameter sweeps and multi-seed experimentation across 15+ parameter combinations to tune dendrite thresholds, regularization, and module placement against baselines.',
    ],
  },
  {
    company: 'ListenFirst',
    title: 'AI Engineering Intern',
    period: 'Jul 2026 — Aug 2026',
    location: 'New York City, NY',
    points: [
      'Built AI-powered workflows shipped as organization-wide Claude Skills (Python, JavaScript, REST APIs) that cut manual reporting effort by 75% across 60+ projects — as the Partnerships unit’s sole intern.',
      'Developed production automation for monthly billing and scheduling across 40+ client accounts, cutting API call volume 90%+ and surfacing $15K+ in billing discrepancies missed manually.',
    ],
  },
]

const CAMPUS = [
  {
    org: '180 Degrees Consulting',
    role: 'Student Consultant',
    note: 'Selected from a competitive pool for consultant training in public speaking and deck design ahead of real nonprofit projects in Pittsburgh.',
  },
  {
    org: 'Traders @ CMU',
    role: 'Prediction Market Analyst',
    note: 'Built a crypto arbitrage tool with a 65% win rate by fine-tuning an ML model and backtesting against Kalshi’s BTC prediction market.',
  },
]

export function ExperienceSection({ onBack }: { onBack: () => void }) {
  return (
    <SectionShell index="// 02" title="Experience" accent="fuchsia" onBack={onBack}>
      <ol className="space-y-10 border-l border-fuchsia-400/25 pl-6 sm:pl-8">
        {ROLES.map((r, idx) => (
          <li key={r.company} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-fuchsia-400 shadow-[0_0_12px_2px_rgba(217,70,239,0.7)] sm:-left-[39px]" />
            <Reveal delay={idx * 0.04}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="text-lg font-semibold text-white sm:text-xl">
                  {r.title} <span className="text-fuchsia-300">· {r.company}</span>
                </p>
                <p className="font-mono text-sm text-zinc-500">{r.period}</p>
              </div>
              <p className="mt-1 text-sm text-zinc-500">{r.location}</p>
              <ul className="mt-3 space-y-2">
                {r.points.map((p, i) => (
                  <li key={i} className="text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            Campus involvement
          </p>
          <ul className="mt-4 space-y-4">
            {CAMPUS.map((c) => (
              <li key={c.org} className="text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                <span className="font-medium text-white">{c.org}</span>
                <span className="text-zinc-500"> — {c.role}. </span>
                {c.note}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </SectionShell>
  )
}
