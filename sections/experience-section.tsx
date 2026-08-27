'use client'

import { SectionShell } from './section-shell'

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
      <ol className="space-y-6">
        {ROLES.map((r) => (
          <li key={r.company} className="border-l border-fuchsia-400/30 pl-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-[15px] font-semibold text-zinc-100">
                {r.title} <span className="text-fuchsia-300">· {r.company}</span>
              </p>
              <p className="font-mono text-xs text-zinc-500">{r.period}</p>
            </div>
            <p className="mt-0.5 text-xs text-zinc-500">{r.location}</p>
            <ul className="mt-2 space-y-1.5">
              {r.points.map((p, i) => (
                <li key={i} className="text-[13.5px] leading-relaxed text-zinc-300">
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-7">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          Campus involvement
        </p>
        <ul className="mt-3 space-y-3">
          {CAMPUS.map((c) => (
            <li key={c.org} className="text-[13.5px] leading-relaxed text-zinc-300">
              <span className="font-medium text-zinc-100">{c.org}</span>
              <span className="text-zinc-500"> — {c.role}. </span>
              {c.note}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}
