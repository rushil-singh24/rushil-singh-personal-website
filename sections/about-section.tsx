'use client'

import { SectionShell } from './section-shell'

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
      <p className="text-[15px] leading-relaxed text-zinc-300">
        I&rsquo;m a student at Carnegie Mellon studying{' '}
        <span className="text-zinc-100">Artificial Intelligence &amp; Information Systems</span>. I
        build AI-powered products and do ML research &mdash; shipping cross-platform agent features at
        Twinly, cutting model size while speeding up inference at Perforated AI, and automating
        partnership workflows as an AI engineering intern at ListenFirst.
      </p>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">Education</p>
        <p className="mt-2 text-[15px] font-medium text-zinc-100">Carnegie Mellon University</p>
        <p className="text-sm text-zinc-400">
          B.S. Information Systems &middot; Minor in Artificial Intelligence
        </p>
        <p className="text-sm text-zinc-400">Pittsburgh, PA &middot; Expected December 2028</p>
      </div>

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          Relevant coursework
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {COURSEWORK.map((c) => (
            <li
              key={c}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}
