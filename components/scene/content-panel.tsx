'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSceneState } from '@/lib/scene-state-context'
import { sectionRegistry } from '@/sections/registry'

export function ContentPanel() {
  const { state, goBack } = useSceneState()
  const isZoomed = state.view === 'zoomed'
  const entry = isZoomed ? sectionRegistry[state.sectionId] : undefined

  return (
    <AnimatePresence>
      {isZoomed && entry && (
        <motion.div
          key={state.sectionId}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.32, delay: 0.06, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-40"
        >
          <entry.component onBack={goBack} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
