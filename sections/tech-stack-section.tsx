'use client'

import { SectionShell } from './section-shell'
import { Reveal } from '@/components/reveal'

const GROUPS: { label: string; items: string[] }[] = [
  {
    label: 'Languages',
    items: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'Swift', 'SQL', 'HTML', 'CSS'],
  },
  {
    label: 'Frameworks & Libraries',
    items: [
      'PyTorch',
      'React',
      'Node.js',
      'Flask',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Framer Motion',
      'Tailwind CSS',
    ],
  },
  {
    label: 'Developer Tools',
    items: [
      'Git',
      'GitHub',
      'Linux',
      'Docker',
      'GitHub Actions',
      'Supabase',
      'PostgreSQL',
      'Jupyter',
      'Claude Code',
    ],
  },
]

export function TechStackSection({ onBack }: { onBack: () => void }) {
  return (
    <SectionShell index="// 03" title="Tech Stack" accent="amber" onBack={onBack}>
      {GROUPS.map((g, idx) => (
        <Reveal key={g.label} delay={idx * 0.05}>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">{g.label}</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 font-mono text-sm text-zinc-200"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </SectionShell>
  )
}
