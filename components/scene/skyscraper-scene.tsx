// components/scene/skyscraper-scene.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { sceneConfig } from '@/content/scene.config'
import { useSceneState } from '@/lib/scene-state-context'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { WindowHotspotButton } from './window-hotspot'

export const ZOOM_SCALE = 2.75

export function SkyscraperScene() {
  const { state, clickWindow } = useSceneState()
  const frameRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const isZoomed = state.view === 'zoomed'
  const activeSectionId = state.view === 'zoomed' ? state.sectionId : null

  // Ambient mouse parallax — only while sitting on the un-zoomed scene.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const parallaxX = useSpring(useTransform(pointerX, [-1, 1], [-12, 12]), { stiffness: 60, damping: 20 })
  const parallaxY = useSpring(useTransform(pointerY, [-1, 1], [-12, 12]), { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (reducedMotion || isZoomed) return

    const handlePointerMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window
      pointerX.set((event.clientX / innerWidth) * 2 - 1)
      pointerY.set((event.clientY / innerHeight) * 2 - 1)
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [reducedMotion, isZoomed, pointerX, pointerY])

  // Idle window flicker — at most one window pulses opacity at a time, on
  // a randomized low-frequency timer, only while sitting on the scene.
  const [flickerId, setFlickerId] = useState<string | null>(null)

  useEffect(() => {
    if (reducedMotion || isZoomed) return

    let flickerOffTimeout: ReturnType<typeof setTimeout>

    const intervalId = setInterval(() => {
      const candidate = sceneConfig.windows[Math.floor(Math.random() * sceneConfig.windows.length)]
      setFlickerId(candidate.id)
      flickerOffTimeout = setTimeout(() => setFlickerId(null), 900)
    }, 4000)

    return () => {
      clearInterval(intervalId)
      clearTimeout(flickerOffTimeout)
      setFlickerId(null)
    }
  }, [reducedMotion, isZoomed])

  // Zoom transform: computed in pixels from the clicked hotspot's %
  // position, using transformOrigin '0 0' so the math is a straight
  // translate-then-scale (see plan Task 6 notes for the derivation).
  const zoomX = useMotionValue(0)
  const zoomY = useMotionValue(0)
  const zoomScale = useMotionValue(1)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const duration = reducedMotion ? 0 : 0.7
    const options = { duration, ease: 'easeInOut' as const }

    if (!activeSectionId) {
      animate(zoomX, 0, options)
      animate(zoomY, 0, options)
      animate(zoomScale, 1, options)
      return
    }

    const hotspot = sceneConfig.windows.find((w) => w.sectionId === activeSectionId)
    if (!hotspot) return

    const { width, height } = frame.getBoundingClientRect()
    const px = ((hotspot.xPct + hotspot.wPct / 2) / 100) * width
    const py = ((hotspot.yPct + hotspot.hPct / 2) / 100) * height
    const scale = reducedMotion ? 1 : ZOOM_SCALE

    animate(zoomX, width / 2 - scale * px, options)
    animate(zoomY, height / 2 - scale * py, options)
    animate(zoomScale, scale, options)
  }, [activeSectionId, reducedMotion, zoomX, zoomY, zoomScale])

  const handleCalibrationClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (process.env.NODE_ENV === 'production') return
    const frame = frameRef.current
    if (!frame) return
    const rect = frame.getBoundingClientRect()
    const xPct = ((event.clientX - rect.left) / rect.width) * 100
    const yPct = ((event.clientY - rect.top) / rect.height) * 100
    // eslint-disable-next-line no-console
    console.log(`Calibration: xPct=${xPct.toFixed(2)}, yPct=${yPct.toFixed(2)}`)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div
        ref={frameRef}
        onClick={handleCalibrationClick}
        className="relative overflow-hidden"
        style={{
          aspectRatio: sceneConfig.aspectRatio,
          width: '100%',
          maxHeight: '100%',
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            transformOrigin: '0 0',
            x: zoomX,
            y: zoomY,
            scale: zoomScale,
            translateX: isZoomed || reducedMotion ? 0 : parallaxX,
            translateY: isZoomed || reducedMotion ? 0 : parallaxY,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sceneConfig.posterSrc}
            alt="Interactive skyscraper scene"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {sceneConfig.windows.map((hotspot) => (
            <WindowHotspotButton
              key={hotspot.id}
              hotspot={hotspot}
              onClick={() => clickWindow(hotspot.sectionId)}
              isFlickering={hotspot.id === flickerId}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
