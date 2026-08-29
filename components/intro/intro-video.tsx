'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sceneConfig } from '@/content/scene.config'
import { useSceneState } from '@/lib/scene-state-context'

export function IntroVideo() {
  const { finishIntro } = useSceneState()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)

  // No video configured: skip straight to the scene.
  useEffect(() => {
    if (!sceneConfig.videoSrc) {
      finishIntro()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !sceneConfig.videoSrc) return

    // Prefetch the scene background so the crossfade has no pop-in.
    const preload = new Image()
    preload.src = sceneConfig.posterSrc

    video.play().catch(() => {
      setAutoplayBlocked(true)
    })
  }, [])

  if (!sceneConfig.videoSrc) {
    return null
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleManualPlay = () => {
    const video = videoRef.current
    if (!video) return
    video.play()
    setAutoplayBlocked(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={sceneConfig.videoPosterSrc ?? sceneConfig.posterSrc}
        muted={isMuted}
        autoPlay
        playsInline
        onEnded={finishIntro}
      >
        {sceneConfig.videoWebmSrc && (
          <source src={sceneConfig.videoWebmSrc} type="video/webm" />
        )}
        {sceneConfig.videoSrc && <source src={sceneConfig.videoSrc} type="video/mp4" />}
      </video>

      <div className="pointer-events-none absolute right-5 top-5 max-w-[60vw] text-right font-mono text-[11px] leading-tight text-white/70">
        Scene from <span className="text-white/90">Spider-Man: Into the Spider-Verse</span>
      </div>

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

      {!autoplayBlocked && (
        <button
          onClick={(event) => {
            event.stopPropagation()
            toggleMute()
          }}
          aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
          className="absolute bottom-8 right-6 flex items-center gap-2 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M11 5 6 9H2v6h4l5 4z" />
            {isMuted ? (
              <>
                <line x1="22" y1="9" x2="16" y2="15" />
                <line x1="16" y1="9" x2="22" y2="15" />
              </>
            ) : (
              <>
                <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path d="M19 5a9 9 0 0 1 0 14" />
              </>
            )}
          </svg>
          {isMuted ? 'Sound off' : 'Sound on'}
        </button>
      )}

      <button
        onClick={(event) => {
          event.stopPropagation()
          finishIntro()
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-white/30 bg-black/50 px-5 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        Skip Intro
      </button>
    </div>
  )
}
