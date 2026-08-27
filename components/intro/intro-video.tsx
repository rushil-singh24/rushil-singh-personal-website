'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sceneConfig } from '@/content/scene.config'
import { useSceneState } from '@/lib/scene-state-context'

export function IntroVideo() {
  const { finishIntro } = useSceneState()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [showTapForSound, setShowTapForSound] = useState(true)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)

  // No real video configured yet: skip straight to the main scene instead
  // of rendering a dead intro. See content/scene.config.ts.
  useEffect(() => {
    if (!sceneConfig.videoSrc) {
      finishIntro()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !sceneConfig.videoSrc) return

    // Prefetch the scene background (and, later, section-placeholder
    // assets) while the video plays so the transition has no pop-in.
    const preload = new Image()
    preload.src = sceneConfig.posterSrc

    video.play().catch(() => {
      setAutoplayBlocked(true)
    })
  }, [])

  if (!sceneConfig.videoSrc) {
    return null
  }

  const handleUnmute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    setIsMuted(false)
    setShowTapForSound(false)
  }

  const handleManualPlay = () => {
    const video = videoRef.current
    if (!video) return
    video.play()
    setAutoplayBlocked(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black" onClick={isMuted ? handleUnmute : undefined}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={sceneConfig.videoSrc}
        poster={sceneConfig.posterSrc}
        muted={isMuted}
        autoPlay
        playsInline
        onEnded={finishIntro}
      />

      <AnimatePresence>
        {autoplayBlocked && (
          <motion.button
            key="play-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              event.stopPropagation()
              handleManualPlay()
            }}
            className="absolute inset-0 m-auto h-14 w-40 rounded-full bg-white font-medium text-black"
          >
            Play Intro
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTapForSound && !autoplayBlocked && (
          <motion.div
            key="tap-for-sound"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm text-white"
          >
            Tap for sound
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={(event) => {
          event.stopPropagation()
          finishIntro()
        }}
        className="absolute right-6 top-6 rounded-full bg-black/60 px-4 py-2 text-sm text-white"
      >
        Skip Intro
      </button>
    </div>
  )
}
