'use client'

import { SectionShell } from './section-shell'
import { Reveal } from '@/components/reveal'
import {
  GraduationCap,
  BookOpen,
  Bot,
  MessageSquare,
  BrainCircuit,
  Gauge,
  TrendingUp,
  Handshake,
  Layers,
  Sparkles,
  Mountain,
  Film,
  Spade,
  Trophy,
  Music,
  Waves,
  Dumbbell,
  ChefHat,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const INTRO =
  "I'm an Artificial Intelligence and Information Systems student at Carnegie Mellon University from Massachusetts. My interests span web/application development, quantitative finance, and applications of machine learning in various fields. I have experience building AI-powered applications, developing full-stack software, and conducting professional research in AI/ML. My career interests include software engineering, product management, and AI engineering. I am particularly interested in building technical products that connect emerging AI capabilities with practical, real-world applications. In my free time, I enjoy hiking, watching films, playing poker, and more."

const COURSEWORK = [
  'Data Structures & Algorithms',
  'Database Design & Development',
  'Natural Language Processing',
  'Designing Human-Centered Software',
  'Discrete Math',
  'Probability Theory',
  'Linear Algebra',
  'Multivariate Calculus',
]

const INTERESTS: { label: string; icon: LucideIcon }[] = [
  { label: 'Agentic AI', icon: Bot },
  { label: 'Large Language Models (LLMs)', icon: MessageSquare },
  { label: 'Machine Learning', icon: BrainCircuit },
  { label: 'Model optimization', icon: Gauge },
  { label: 'Algorithmic trading', icon: TrendingUp },
  { label: 'Human–AI interaction', icon: Handshake },
  { label: 'Full-stack product development', icon: Layers },
  { label: 'AI-powered applications', icon: Sparkles },
]

const HOBBIES: { label: string; icon: LucideIcon }[] = [
  { label: 'Hiking', icon: Mountain },
  { label: 'Film', icon: Film },
  { label: 'Poker', icon: Spade },
  { label: 'Sports', icon: Trophy },
  { label: 'Music', icon: Music },
  { label: 'Swimming', icon: Waves },
  { label: 'Lifting', icon: Dumbbell },
  { label: 'Cooking', icon: ChefHat },
]

export function AboutSection({ onBack }: { onBack: () => void }) {
  return (
    <SectionShell index="// 01" title="About" accent="cyan" onBack={onBack}>
      <Reveal>
        <p className="text-lg leading-relaxed text-zinc-200 sm:text-xl">{INTRO}</p>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="h-4 w-4 text-cyan-400" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
              Carnegie Mellon University
            </p>
          </div>
          <p className="mt-3 text-lg font-medium text-white">B.S. Information Systems</p>
          <p className="text-zinc-400">Minor in Artificial Intelligence &middot; Expected 2028</p>
          <p className="text-zinc-400">Pittsburgh, PA</p>

          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-zinc-500" />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Relevant coursework
              </p>
            </div>
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
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
              Professional interests
            </p>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {INTERESTS.map((it) => (
              <li
                key={it.label}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <it.icon className="h-4 w-4 shrink-0 text-cyan-300" />
                <span className="text-sm text-zinc-300">{it.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            Off the clock
          </span>
          {HOBBIES.map((h) => (
            <span
              key={h.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"
            >
              <h.icon className="h-3.5 w-3.5 text-zinc-400" />
              {h.label}
            </span>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  )
}
