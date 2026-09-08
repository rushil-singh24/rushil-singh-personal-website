'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

/**
 * Fades content in with a small stagger on mount. (Scroll-triggered reveal
 * proved flaky in this Next/React/Framer combo, and "content missing until
 * you scroll" is worse than "content animates in on load".)
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  if (reduced) return className ? <div className={className}>{children}</div> : <>{children}</>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.2, 0, 0.15, 1] }}
    >
      {children}
    </motion.div>
  )
}
