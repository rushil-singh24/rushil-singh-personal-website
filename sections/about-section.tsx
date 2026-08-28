'use client'

import { SectionShell } from './section-shell'
import { Reveal } from '@/components/reveal'

const COURSEWORK = [
  'Data Structures & Algorithms',
  'Database Design & Development',
  'Natural Language Processing',
  'Designing Human-Centered Software',
  'Discrete Math',
  'Probability Theory',
  'Linear Algebra',
  'Calculus 3',
]

export function AboutSection({ onBack }: { onBack: () => void }) {
  return (
    <SectionShell index="// 01" title="About" accent="cyan" onBack={onBack}>
      <Reveal>
        <p className="text-xl leading-relaxed text-zinc-200 sm:text-2xl">
          I&rsquo;m <span className="text-white">Rushil Singh</span>, a Carnegie Mellon student
          building at the intersection of{' '}
          <span className="text-cyan-300">artificial intelligence</span> and{' '}
          <span className="text-cyan-300">information systems</span>.
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
          I ship cross-platform AI agent features at Twinly, cut model size while speeding up
          inference at Perforated AI, and built organization-wide automation as an AI engineering
          intern at ListenFirst.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">Education</p>
          <p className="mt-3 text-lg font-medium text-white">Carnegie Mellon University</p>
          <p className="text-zinc-400">
            B.S. Information Systems &middot; Minor in Artificial Intelligence
          </p>
          <p className="text-zinc-400">Pittsburgh, PA &middot; Expected December 2028</p>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            Relevant coursework
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {COURSEWORK.map((c) => (
              <li
                key={c}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-zinc-300"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </SectionShell>
  )
}
