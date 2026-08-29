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
  // Drop a square logo at public/logos/<file> and set it here to replace
  // the generic briefcase / people icon. `logoBg: 'dark'` for light/white
  // logos that need a dark chip to be visible.
  logo?: string
  logoBg?: 'light' | 'dark'
  points: string[]
}

// Work is newest-first. Involvement lists active roles first, then ended ones.
// Bullet text is verbatim from Rushil's resume / messages — do not rephrase.
const ENTRIES: Entry[] = [
  {
    id: 'twinly',
    kind: 'work',
    title: 'Software Engineer',
    org: 'Twinly',
    period: 'June 2026 – Present',
    location: 'Remote',
    logo: '/logos/twinly.png',
    points: [
      'Designed and shipped cross-platform AI agent capabilities in Swift and Python including voice cloning, reservation booking, and automated gaming accessible through natural prompts, supporting 100+ users and 2,000+ followers',
      'Deployed Electron desktop builds across macOS and Windows, debugging platform-specific issues and maintaining consistently updated releases through Git version control, code reviews, and PR/MR-based feature integration',
    ],
  },
  {
    id: 'perforated-ai',
    kind: 'work',
    title: 'Machine Learning Research Collaborator',
    org: 'Perforated AI',
    period: 'May 2026 – Present',
    location: 'Pittsburgh, PA',
    logo: '/logos/perforated-ai.png',
    points: [
      'Developed PyTorch-based transformer optimization techniques using Perforated Backpropagation and artificial dendrite architectures, reducing model parameters by 60% while accelerating trading-model inference by 15%+',
      'Designed W&B hyperparameter sweeps and multi-seed experimentation across 15+ parameter combinations to optimize dendrite thresholds, regularization, and module placement against baseline performance',
    ],
  },
  {
    id: 'listenfirst',
    kind: 'work',
    title: 'AI Engineering Intern',
    org: 'ListenFirst',
    period: 'July 2026 – August 2026',
    location: 'New York City, NY',
    logo: '/logos/listenfirst.png',
    points: [
      "Built AI-powered workflows shipped as organization-wide Claude Skills through Python, JavaScript, and RESTful APIs that reduced manual reporting effort by 75% across 60+ projects as the Partnerships unit's sole intern",
      'Developed production automation for monthly billing and scheduling across 40+ client accounts, cutting API call volume by 90%+ through optimized data pipelines and surfacing $15K+ in billing discrepancies missed manually',
    ],
  },
  {
    id: 'unanimous',
    kind: 'work',
    title: 'Research Intern',
    org: 'Unanimous AI',
    period: 'September 2025 – April 2026',
    location: 'San Francisco, CA',
    logo: '/logos/unanimous.png',
    points: [
      'Partnered with Professor Ganesh Mani of CMU and Unanimous AI to advance the application of conversational swarm intelligence in enhancing sports contract prediction market accuracy through an IRB-standard research study',
      'Built and tested predictive models using APIs, the Thinkscape platform, and insights from published research to translate complex data from 40+ users/swarm into ~25% outperformance of benchmark Kalshi/Polymarket lines',
    ],
  },
  {
    id: 'firefly',
    kind: 'work',
    title: 'Development Intern',
    org: 'Firefly Coders',
    period: 'January 2025 – April 2025',
    location: 'Northborough, MA',
    logo: '/logos/firefly.png',
    logoBg: 'dark',
    points: [
      'Developed an interactive learning library hosting multi-format educational materials, producing 100+ hours of content through practice problems and videos to improve accessibility for 80+ elementary and middle school students',
      'Piloted curriculums for competition math classes and coding camps in Python, Scratch, and Sphero by establishing scalable lesson plans and frameworks for future instructors and program branches to ensure long-term sustainability',
    ],
  },
  {
    id: '180dc',
    kind: 'involvement',
    title: 'Student Consultant',
    org: '180 Degrees Consulting',
    period: 'Active Member',
    location: 'Pittsburgh, PA',
    logo: '/logos/180dc.png',
    points: [
      'Selected from a competitive applicant pool to undergo new consultant training involving developing public speaking skills, learning deck design, and more in preparation to consult non-profits in Pittsburgh on real-world projects',
    ],
  },
  {
    id: 'traders',
    kind: 'involvement',
    title: 'Prediction Market Analyst',
    org: 'Traders @ CMU',
    period: 'Active Member',
    location: 'Pittsburgh, PA',
    logo: '/logos/traders.png',
    logoBg: 'dark',
    points: [
      "Built a cryptocurrency arbitrage tool achieving a 65% win rate through fine-tuning an ML model and backtesting with trade simulations to optimize discrepancies between Kalshi's BTC price prediction market and its sourcing",
    ],
  },
  {
    id: 'scottylabs',
    kind: 'involvement',
    title: 'Software Engineer',
    org: 'ScottyLabs | Labrador Committee',
    period: 'September 2025 – January 2026',
    location: 'Pittsburgh, PA',
    logo: '/logos/scottylabs.png',
    points: [
      'Led development for ScottyLinked, a LinkedIn-esque platform to connect CMU students for job and research opportunities on campus through core data models and matching logic that sorted users by 5+ skill proficiency factors',
      'Steered collaboration with Design+Technology departments with 6 others to create a UI/UX design validated by users through surveys and research on 10+ social network platforms, leading to features built with Next, React, & Supabase',
    ],
  },
]

const WORK = ENTRIES.filter((e) => e.kind === 'work')
const INVOLVEMENT = ENTRIES.filter((e) => e.kind === 'involvement')

function EntryIcon({ entry, side }: { entry: Entry; side: 'work' | 'involvement' }) {
  if (entry.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={entry.logo}
        alt=""
        className={`mt-0.5 h-6 w-6 shrink-0 rounded-[5px] object-contain p-[3px] ring-1 ring-white/15 ${
          entry.logoBg === 'dark' ? 'bg-[#0f1120]' : 'bg-white'
        }`}
      />
    )
  }
  const Fallback = side === 'work' ? Briefcase : Users
  return <Fallback className="mt-1 h-5 w-5 shrink-0 text-fuchsia-300" />
}

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
                  <EntryIcon entry={e} side={side} />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-lg font-semibold text-white">{e.title}</span>
                      <span className="text-sm text-fuchsia-300">· {e.org}</span>
                    </span>
                    <span className="mt-1 block font-mono text-xs text-zinc-500">{e.period}</span>
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
                      <div className="px-3 pb-1 pl-9 pt-2">
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

export function ExperienceSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id))

  return (
    <SectionShell id="experience" index="// 02" title="Experience" accent="violet">
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
