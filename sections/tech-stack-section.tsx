'use client'

import { SectionShell } from './section-shell'

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
      <div className="space-y-6">
        {GROUPS.map((g) => (
          <div key={g.label}>
            <p className="font-mono text-xs uppercase tracking-widest text-amber-400">{g.label}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-zinc-200"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
