'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionShell } from './section-shell'
import { Reveal } from '@/components/reveal'
import { Briefcase, Users, ChevronDown } from 'lucide-react'

type Entry = {
  id: string
  kind: 'work' | 'involvement'
  title: string
  org: string
  period: string
  location?: string
  points: string[]
}

// Newest first within each column. TODO(rushil): add more entries here.
const ENTRIES: Entry[] = [
  {
    id: 'twinly',
    kind: 'work',
    title: 'Software Engineer',
    org: 'Twinly',
    period: 'Jun 2026 — Present',
    location: 'Remote',
    points: [
      'Designed and shipped cross-platform AI agent capabilities in Swift and Python — voice cloning, reservation booking, and automated gaming through natural prompts — supporting 100+ users and 2,000+ followers.',
      'Deployed Electron desktop builds across macOS and Windows, debugging platform-specific issues and maintaining releases through Git, code reviews, and PR/MR-based integration.',
    ],
  },
  {
    id: 'perforated-ai',
    kind: 'work',
    title: 'ML Research Collaborator',
    org: 'Perforated AI',
    period: 'May 2026 — Present',
    location: 'Pittsburgh, PA',
    points: [
      'Developed PyTorch transformer optimization using Perforated Backpropagation and artificial dendrite architectures — 60% fewer model parameters while accelerating trading-model inference by 15%+.',
      'Designed W&B hyperparameter sweeps and multi-seed experimentation across 15+ parameter combinations to tune dendrite thresholds, regularization, and module placement against baselines.',
    ],
  },
  {
    id: 'listenfirst',
    kind: 'work',
    title: 'AI Engineering Intern',
    org: 'ListenFirst',
    period: 'Jul 2026 — Aug 2026',
    location: 'New York City, NY',
    points: [
      'Built AI-powered workflows shipped as organization-wide Claude Skills (Python, JavaScript, REST APIs) that cut manual reporting effort by 75% across 60+ projects — as the Partnerships unit’s sole intern.',
      'Developed production automation for monthly billing and scheduling across 40+ client accounts, cutting API call volume 90%+ and surfacing $15K+ in billing discrepancies missed manually.',
    ],
  },
  {
    id: 'unanimous',
    kind: 'work',
    title: 'Research Intern',
    org: 'Unanimous AI',
    period: 'Sep 2025 — Apr 2026',
    location: 'San Francisco, CA',
    points: [
      'Partnered with Professor Ganesh Mani (CMU) and Unanimous AI to advance conversational swarm intelligence for sports-contract prediction-market accuracy, in an IRB-standard research study.',
      'Built and tested predictive models with APIs, the Thinkscape platform, and published research — turning data from 40+ users per swarm into ~25% outperformance of benchmark Kalshi / Polymarket lines.',
    ],
  },
  {
    id: 'firefly',
    kind: 'work',
    title: 'Dev Intern & Lead Instructor',
    org: 'Firefly Coders',
    period: 'Jan 2025 — Apr 2025',
    location: 'Northborough, MA',
    points: [
      'Built an interactive learning library of multi-format materials — 100+ hours of practice problems and videos — improving accessibility for 80+ elementary and middle-school students.',
      'Piloted competition-math and coding-camp curriculums in Python, Scratch, and Sphero, with scalable lesson plans and frameworks for future instructors and program branches.',
    ],
  },
  {
    id: 'scottylabs',
    kind: 'involvement',
    title: 'Software Engineer',
    org: 'ScottyLabs | Labrador Committee',
    period: 'Sep 2025 — Jan 2026',
    location: 'Pittsburgh, PA',
    points: [
      'Led development for ScottyLinked, a LinkedIn-style platform connecting CMU students for on-campus jobs and research — core data models and matching logic sorting users by 5+ skill-proficiency factors.',
      'Drove Design + Technology collaboration with 6 others on a UI/UX validated through user surveys and research across 10+ social platforms; features built with Next, React, and Supabase.',
    ],
  },
  {
    id: '180dc',
    kind: 'involvement',
    title: 'Student Consultant',
    org: '180 Degrees Consulting',
    period: 'Active member',
    points: [
      'Selected from a competitive pool for consultant training in public speaking and deck design ahead of real nonprofit projects in Pittsburgh.',
    ],
  },
  {
    id: 'traders',
    kind: 'involvement',
    title: 'Prediction Market Analyst',
    org: 'Traders @ CMU',
    period: 'Active member',
    points: [
      'Built a crypto arbitrage tool with a 65% win rate by fine-tuning an ML model and backtesting against Kalshi’s BTC prediction market.',
    ],
  },
]

const WORK = ENTRIES.filter((e) => e.kind === 'work')
const INVOLVEMENT = ENTRIES.filter((e) => e.kind === 'involvement')

function TimelineColumn({
  heading,
  entries,
  side,
  openId,
  onToggle,
}: {
  heading: string
  entries: Entry[]
  side: 'work' | 'involvement'
  openId: string | null
  onToggle: (id: string) => void
}) {
  const Icon = side === 'work' ? Briefcase : Users
  const railClasses =
    side === 'work'
      ? 'border-l border-fuchsia-400/25 pl-5 md:border-l-0 md:border-r md:pl-0 md:pr-5'
      : 'border-l border-fuchsia-400/25 pl-5'
  const nodeClasses =
    side === 'work'
      ? 'absolute top-3.5 h-2.5 w-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_2px_rgba(217,70,239,0.7)] -left-[26px] md:left-auto md:-right-[26px]'
      : 'absolute top-3.5 h-2.5 w-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_2px_rgba(217,70,239,0.7)] -left-[26px]'

  return (
    <div className={railClasses}>
      <p
        className={`mb-5 font-mono text-xs uppercase tracking-[0.2em] text-fuchsia-300 ${
          side === 'work' ? 'md:text-right' : ''
        }`}
      >
        {heading}
      </p>
      <ol className="space-y-5">
        {entries.map((e, idx) => {
          const isOpen = openId === e.id
          return (
            <li key={e.id} className="relative">
              <span className={nodeClasses} />
              <Reveal delay={idx * 0.03}>
                <button
                  onClick={() => onToggle(e.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-4 rounded-lg px-3 py-4 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/50"
                >
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-fuchsia-300" />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-lg font-semibold text-white">{e.title}</span>
                      <span className="text-sm text-fuchsia-300">· {e.org}</span>
                    </span>
                    <span className="mt-1 block font-mono text-xs text-zinc-500">
                      {e.period}
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
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 pb-1 pl-9 pt-2">
                        {e.location && (
                          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                            {e.location}
                          </p>
                        )}
                        <ul className="space-y-2.5">
                          {e.points.map((p, i) => (
                            <li key={i} className="text-[15px] leading-relaxed text-zinc-300">
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function ExperienceSection({ onBack }: { onBack: () => void }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id))

  return (
    <SectionShell index="// 02" title="Experience" accent="fuchsia" onBack={onBack}>
      <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-10 md:gap-y-0">
        <TimelineColumn
          heading="Work"
          entries={WORK}
          side="work"
          openId={openId}
          onToggle={toggle}
        />
        <TimelineColumn
          heading="Involvement"
          entries={INVOLVEMENT}
          side="involvement"
          openId={openId}
          onToggle={toggle}
        />
      </div>
    </SectionShell>
  )
}
