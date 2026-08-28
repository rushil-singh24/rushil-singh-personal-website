'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

export function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  const reduced = useReducedMotion()
  if (reduced) return <>{children}</>
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.45, delay, ease: [0.2, 0, 0.15, 1] }}
    >
      {children}
    </motion.div>
  )
}
