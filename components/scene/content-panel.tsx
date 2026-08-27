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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4"
        >
          <entry.component onBack={goBack} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
