'use client'

import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { SectionShell } from './section-shell'
import { Reveal } from '@/components/reveal'
import { Code2, Database } from 'lucide-react'
import {
  SiPython,
  SiOpenjdk,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiSwift,
  SiHtml5,
  SiPytorch,
  SiReact,
  SiNodedotjs,
  SiFlask,
  SiPandas,
  SiNumpy,
  SiFramer,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiLinux,
  SiDocker,
  SiGithubactions,
  SiSupabase,
  SiPostgresql,
  SiJupyter,
  SiClaude,
} from 'react-icons/si'

type TechIcon = ComponentType<{ className?: string }>

const GROUPS: { label: string; items: { name: string; Icon: TechIcon }[] }[] = [
  {
    label: 'Languages',
    items: [
      { name: 'Python', Icon: SiPython },
      { name: 'Java', Icon: SiOpenjdk },
      { name: 'C', Icon: SiC },
      { name: 'C++', Icon: SiCplusplus },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'Swift', Icon: SiSwift },
      { name: 'SQL', Icon: Database },
      { name: 'HTML', Icon: SiHtml5 },
      { name: 'CSS', Icon: Code2 },
    ],
  },
  {
    label: 'Frameworks & Libraries',
    items: [
      { name: 'PyTorch', Icon: SiPytorch },
      { name: 'React', Icon: SiReact },
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Flask', Icon: SiFlask },
      { name: 'Pandas', Icon: SiPandas },
      { name: 'NumPy', Icon: SiNumpy },
      { name: 'Matplotlib', Icon: Code2 },
      { name: 'Framer Motion', Icon: SiFramer },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
    ],
  },
  {
    label: 'Developer Tools',
    items: [
      { name: 'Git', Icon: SiGit },
      { name: 'GitHub', Icon: SiGithub },
      { name: 'Linux', Icon: SiLinux },
      { name: 'Docker', Icon: SiDocker },
      { name: 'GitHub Actions', Icon: SiGithubactions },
      { name: 'Supabase', Icon: SiSupabase },
      { name: 'PostgreSQL', Icon: SiPostgresql },
      { name: 'Jupyter', Icon: SiJupyter },
      { name: 'Claude Code', Icon: SiClaude },
    ],
  },
]

export function TechStackSection({ onBack }: { onBack: () => void }) {
  return (
    <SectionShell index="// 03" title="Tech Stack" accent="amber" onBack={onBack}>
      {GROUPS.map((g, gi) => (
        <Reveal key={g.label} delay={gi * 0.05}>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">{g.label}</p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {g.items.map((it) => (
                <motion.li
                  key={it.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className="group flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 transition-colors hover:border-amber-400/40 hover:bg-amber-400/[0.07]"
                >
                  <it.Icon className="h-4 w-4 shrink-0 text-zinc-400 transition-colors group-hover:text-amber-300" />
                  <span className="font-mono text-sm text-zinc-200">{it.name}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </SectionShell>
  )
}
