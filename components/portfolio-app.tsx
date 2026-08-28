'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSceneState } from '@/lib/scene-state-context'
import { IntroVideo } from './intro/intro-video'
import { SkyscraperScene } from './scene/skyscraper-scene'
import { ContentPanel } from './scene/content-panel'
import { CursorTrail } from './cursor-trail'

export function PortfolioApp() {
  const { state } = useSceneState()

  return (
    <>
      <CursorTrail />
      <AnimatePresence>
        {state.view === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="fixed inset-0 z-50"
          >
            <IntroVideo />
          </motion.div>
        )}
      </AnimatePresence>

      {state.view !== 'intro' && (
        <motion.div
          key="city"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <SkyscraperScene />
          <ContentPanel />
        </motion.div>
      )}
    </>
  )
}
