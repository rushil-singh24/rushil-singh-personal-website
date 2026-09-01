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
  // the generic briefcase / people icon. Dark logos default to a white
  // chip; set logoBg 'none' for logos that are already light/colourful and
  // read fine straight on the dark card.
  logo?: string
  logoBg?: 'light' | 'none'
  // ISO year-month. `end` omitted = ongoing. Drives the timeline scale — the
  // dot for each entry is placed proportionally to how recent it is.
  start: string
  end?: string
  points: string[]
}

// Row order is derived from the dates below (most recent first), so just keep
// each entry's `start` / `end` accurate. Bullet text is verbatim from
// Rushil's resume / messages — do not rephrase.
const ENTRIES: Entry[] = [
  {
    id: 'perforated-ai',
    kind: 'work',
    title: 'Machine Learning Research Collaborator',
    org: 'Perforated AI',
    period: 'May 2026 – Present',
    location: 'Pittsburgh, PA',
    logo: '/logos/perforated-ai.png',
    logoBg: 'none',
    start: '2026-05',
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
    start: '2026-07',
    end: '2026-08',
    points: [
      "Built AI-powered workflows shipped as organization-wide Claude Skills through Python, JavaScript, and RESTful APIs that reduced manual reporting effort by 75% across 60+ projects as the Partnerships unit's sole intern",
      'Developed production automation for monthly billing and scheduling across 40+ client accounts, cutting API call volume by 90%+ through optimized data pipelines and surfacing $15K+ in billing discrepancies missed manually',
    ],
  },
  {
    id: 'twinly',
    kind: 'work',
    title: 'Software Engineer',
    org: 'Twinly',
    period: 'June 2026 – August 2026',
    location: 'Remote',
    logo: '/logos/twinly.png',
    logoBg: 'none',
    start: '2026-06',
    end: '2026-08',
    points: [
      'Designed and shipped cross-platform AI agent capabilities in Swift and Python including voice cloning, reservation booking, and automated gaming accessible through natural prompts, supporting 100+ users and 2,000+ followers',
      'Deployed Electron desktop builds across macOS and Windows, debugging platform-specific issues and maintaining consistently updated releases through Git version control, code reviews, and PR/MR-based feature integration',
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
    start: '2025-09',
    end: '2026-04',
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
    logoBg: 'none',
    start: '2025-01',
    end: '2025-04',
    points: [
      'Developed an interactive learning library hosting multi-format educational materials, producing 100+ hours of content through practice problems and videos to improve accessibility for 80+ elementary and middle school students',
      'Piloted curriculums for competition math classes and coding camps in Python, Scratch, and Sphero by establishing scalable lesson plans and frameworks for future instructors and program branches to ensure long-term sustainability',
    ],
  },
  {
    id: 'wentworth',
    kind: 'work',
    title: 'Research Assistant',
    org: 'Wentworth Institute of Technology',
    period: 'June 2024 – January 2025',
    location: 'Boston, MA',
    logo: '/logos/wentworth.jpeg',
    start: '2024-06',
    end: '2025-01',
    points: [
      'Synthesized 100+ published pages of research from arXiv on generative AI & LLM’s into presentations which were integrated into 2 separate WIT research projects',
      'Collaborated with Professor Salem Othman to design an LLM framework through Python, APIs, and prompt engineering that interprets user intent from emoji strings on social media to alleviate communication barriers',
    ],
  },
  {
    id: '180dc',
    kind: 'involvement',
    title: 'Student Consultant',
    org: '180 Degrees Consulting',
    period: 'February 2026 – Present',
    location: 'Pittsburgh, PA',
    logo: '/logos/180dc.png',
    logoBg: 'none',
    start: '2026-02',
    points: [
      'Selected from a competitive applicant pool to undergo new consultant training involving developing public speaking skills, learning deck design, and more in preparation to consult non-profits in Pittsburgh on real-world projects',
    ],
  },
  {
    id: 'traders',
    kind: 'involvement',
    title: 'Prediction Market Analyst',
    org: 'Traders @ CMU',
    period: 'February 2026 – Present',
    location: 'Pittsburgh, PA',
    logo: '/logos/traders.png',
    logoBg: 'none',
    start: '2026-02',
    points: [
      "Built a cryptocurrency arbitrage tool achieving a 65% win rate through fine-tuning an ML model and backtesting with trade simulations to optimize discrepancies between Kalshi's BTC price prediction market and its sourcing",
    ],
  },
  {
    id: 'phi-delta-theta',
    kind: 'involvement',
    title: 'Brother',
    org: 'Phi Delta Theta Pennsylvania Rho',
    period: 'January 2026 – Present',
    location: 'Pittsburgh, PA',
    logo: '/logos/phi-delta-theta.png',
    logoBg: 'none',
    start: '2026-01',
    points: [
      'Engaging with a brotherhood of 100+ professionals to raise ~$2000/semester for the Live Like Lou Foundation against ALS through fundraisers and acting in a Greek Life musical show to raise money in aid of Cancer Bridges',
    ],
  },
  {
    id: 'cmu-poker',
    kind: 'involvement',
    title: 'Member',
    org: 'CMU Poker Club',
    period: 'September 2025 – Present',
    location: 'Pittsburgh, PA',
    logo: '/logos/cmu-poker.jpeg',
    start: '2025-09',
    points: [
      'NexHacks Poker Tournament 1st Place',
      'Jump Trading Poker Tournament Prize Winner',
    ],
  },
  {
    id: 'emerging-leaders',
    kind: 'involvement',
    title: 'Project Developer',
    org: 'Emerging Leaders',
    period: 'January 2026 – April 2026',
    location: 'Pittsburgh, PA',
    logo: '/logos/emerging-leaders.png',
    start: '2026-01',
    end: '2026-04',
    points: [
      'Nominated to partake in a leadership program to develop innovative action plans for 8 different NPOs in Pittsburgh',
      'Working with CMU Dining Services to build a GrubHub-integrated student delivery service, improving accessibility, efficiency, and convenience to meal access while creating new roles based on 150+ student perception survey responses',
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
    logoBg: 'none',
    start: '2025-09',
    end: '2026-01',
    points: [
      'Led development for ScottyLinked, a LinkedIn-esque platform to connect CMU students for job and research opportunities on campus through core data models and matching logic that sorted users by 5+ skill proficiency factors',
      'Steered collaboration with Design+Technology departments with 6 others to create a UI/UX design validated by users through surveys and research on 10+ social network platforms, leading to features built with Next, React, & Supabase',
    ],
  },
]

const NOW = '2026-09'

// year-month -> absolute month index, for the timeline math
const toMonths = (ym: string) => {
  const [y, m] = ym.split('-').map(Number)
  return y * 12 + m
}

// How recent an entry is: its end date, or NOW while it is ongoing.
const recency = (e: Entry) => toMonths(e.end ?? NOW)

// Both tracks share one vertical time axis, most recent at the top.
const TIMELINE = [...ENTRIES].sort(
  (a, b) => recency(b) - recency(a) || toMonths(b.start) - toMonths(a.start),
)

const REF = Math.max(...TIMELINE.map(recency))
const PX_PER_MONTH = 15
const MIN_GAP = 12
const MAX_GAP = 132

// Space above row `i`, proportional to the time elapsed since the row above it.
function gapAbove(i: number) {
  const cur = recency(TIMELINE[i])
  const prev = i === 0 ? REF : recency(TIMELINE[i - 1])
  const raw = (prev - cur) * PX_PER_MONTH
  return Math.min(MAX_GAP, Math.max(i === 0 ? 0 : MIN_GAP, raw))
}

function EntryIcon({ entry, side }: { entry: Entry; side: 'work' | 'involvement' }) {
  if (entry.logo) {
    const bare = entry.logoBg === 'none'
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={entry.logo}
        alt=""
        className={`mt-0.5 h-6 w-6 shrink-0 object-contain ${
          bare ? '' : 'rounded-[5px] bg-white p-[3px] ring-1 ring-white/15'
        }`}
      />
    )
  }
  const Fallback = side === 'work' ? Briefcase : Users
  return <Fallback className="mt-1 h-5 w-5 shrink-0 text-fuchsia-300" />
}

function TimelineRow({
  entry,
  gap,
  index,
  isOpen,
  onToggle,
}: {
  entry: Entry
  gap: number
  index: number
  isOpen: boolean
  onToggle: (id: string) => void
}) {
  const e = entry
  const isWork = e.kind === 'work'
  const expandable = e.points.length > 0

  return (
    <li className="relative" style={{ marginTop: gap }}>
      <span className="absolute left-4 top-5 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_2px_rgba(217,70,239,0.7)] md:left-1/2" />
      <div className={`pl-10 md:w-1/2 md:pl-0 ${isWork ? 'md:pr-10' : 'md:ml-auto md:pl-10'}`}>
        <Reveal delay={index * 0.02}>
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-fuchsia-300/50 md:hidden">
            {isWork ? 'Work' : 'Involvement'}
          </span>
          <button
            onClick={() => expandable && onToggle(e.id)}
            aria-expanded={expandable ? isOpen : undefined}
            disabled={!expandable}
            className={`flex w-full items-start gap-4 rounded-lg px-3 py-3 text-left transition-colors focus-visible:outline-none ${
              expandable
                ? 'hover:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-fuchsia-400/50'
                : 'cursor-default'
            }`}
          >
            <EntryIcon entry={e} side={e.kind} />
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-lg font-semibold text-white">{e.title}</span>
                <span className="text-sm text-fuchsia-300">· {e.org}</span>
              </span>
              <span className="mt-1 block font-mono text-xs text-zinc-500">{e.period}</span>
            </span>
            {expandable && (
              <ChevronDown
                className={`mt-1 h-4 w-4 shrink-0 text-zinc-500 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            )}
          </button>
          <AnimatePresence initial={false}>
            {expandable && isOpen && (
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
      </div>
    </li>
  )
}

export function ExperienceSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id))

  return (
    <SectionShell id="experience" index="// 02" title="Experience" accent="violet">
      <div className="mb-6 hidden items-center justify-between md:flex">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-fuchsia-300">Work</span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-fuchsia-300">
          Involvement
        </span>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-4 w-px bg-gradient-to-b from-fuchsia-400/10 via-fuchsia-400/40 to-fuchsia-400/10 md:left-1/2 md:-translate-x-1/2" />
        <ol className="relative">
          {TIMELINE.map((e, i) => (
            <TimelineRow
              key={e.id}
              entry={e}
              gap={gapAbove(i)}
              index={i}
              isOpen={openId === e.id}
              onToggle={toggle}
            />
          ))}
        </ol>
      </div>
    </SectionShell>
  )
}
