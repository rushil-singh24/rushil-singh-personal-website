'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionShell } from './section-shell'
import { Reveal } from '@/components/reveal'
import { Briefcase, Users, ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Entry = {
  id: string
  title: string
  org: string
  period: string
  location?: string
  icon: LucideIcon
  points: string[]
}

// Newest first. TODO(rushil): add more experiences here as you send them.
const ENTRIES: Entry[] = [
  {
    id: 'twinly',
    title: 'Software Engineer',
    org: 'Twinly',
    period: 'Jun 2026 — Present',
    location: 'Remote',
    icon: Briefcase,
    points: [
      'Designed and shipped cross-platform AI agent capabilities in Swift and Python — voice cloning, reservation booking, and automated gaming through natural prompts — supporting 100+ users and 2,000+ followers.',
      'Deployed Electron desktop builds across macOS and Windows, debugging platform-specific issues and maintaining releases through Git, code reviews, and PR/MR-based integration.',
    ],
  },
  {
    id: 'perforated-ai',
    title: 'Machine Learning Research Collaborator',
    org: 'Perforated AI',
    period: 'May 2026 — Present',
    location: 'Pittsburgh, PA',
    icon: Briefcase,
    points: [
      'Developed PyTorch transformer optimization using Perforated Backpropagation and artificial dendrite architectures — 60% fewer model parameters while accelerating trading-model inference by 15%+.',
      'Designed W&B hyperparameter sweeps and multi-seed experimentation across 15+ parameter combinations to tune dendrite thresholds, regularization, and module placement against baselines.',
    ],
  },
  {
    id: 'listenfirst',
    title: 'AI Engineering Intern',
    org: 'ListenFirst',
    period: 'Jul 2026 — Aug 2026',
    location: 'New York City, NY',
    icon: Briefcase,
    points: [
      'Built AI-powered workflows shipped as organization-wide Claude Skills (Python, JavaScript, REST APIs) that cut manual reporting effort by 75% across 60+ projects — as the Partnerships unit’s sole intern.',
      'Developed production automation for monthly billing and scheduling across 40+ client accounts, cutting API call volume 90%+ and surfacing $15K+ in billing discrepancies missed manually.',
    ],
  },
  {
    id: '180dc',
    title: 'Student Consultant',
    org: '180 Degrees Consulting',
    period: 'Active member',
    icon: Users,
    points: [
      'Selected from a competitive pool for consultant training in public speaking and deck design ahead of real nonprofit projects in Pittsburgh.',
    ],
  },
  {
    id: 'traders',
    title: 'Prediction Market Analyst',
    org: 'Traders @ CMU',
    period: 'Active member',
    icon: Users,
    points: [
      'Built a crypto arbitrage tool with a 65% win rate by fine-tuning an ML model and backtesting against Kalshi’s BTC prediction market.',
    ],
  },
]

export function ExperienceSection({ onBack }: { onBack: () => void }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id))

  return (
    <SectionShell index="// 02" title="Experience" accent="fuchsia" onBack={onBack}>
      <ol className="w-full border-r border-fuchsia-400/25 pr-6 sm:pr-10">
        {ENTRIES.map((e, idx) => {
          const isOpen = openId === e.id
          return (
            <li key={e.id} className="relative pb-6 last:pb-0">
              <span className="absolute -right-[31px] top-3 h-3 w-3 rounded-full bg-fuchsia-400 shadow-[0_0_12px_2px_rgba(217,70,239,0.7)] sm:-right-[43px]" />
              <Reveal delay={idx * 0.04}>
                <button
                  onClick={() => toggle(e.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/50"
                >
                  <e.icon className="mt-0.5 h-5 w-5 shrink-0 text-fuchsia-300" />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-base font-semibold text-white sm:text-lg">{e.title}</span>
                      <span className="text-fuchsia-300">· {e.org}</span>
                    </span>
                    <span className="mt-0.5 block font-mono text-xs text-zinc-500">
                      {e.period}
                      {e.location ? ` · ${e.location}` : ''}
                    </span>
                  </span>
                  <ChevronDown
                    className={`mt-1 h-4 w-4 shrink-0 text-zinc-500 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 px-2 pb-1 pl-10 pt-2">
                        {e.points.map((p, i) => (
                          <li key={i} className="text-[15px] leading-relaxed text-zinc-300">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </SectionShell>
  )
}
