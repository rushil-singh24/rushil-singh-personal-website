'use client'

import { useEffect, useRef } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { sceneConfig } from '@/content/scene.config'
import { useSceneState } from '@/lib/scene-state-context'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { SectionPortal } from './section-portal'

export const ZOOM_SCALE = 4.5

export function VoidScene() {
  const { state, clickWindow, replayIntro } = useSceneState()
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const isZoomed = state.view === 'zoomed'
  const activeId = state.view === 'zoomed' ? state.sectionId : null

  // Fly-into-panel zoom: 2D translate + scale of the whole stage.
  const zx = useMotionValue(0)
  const zy = useMotionValue(0)
  const zs = useMotionValue(1)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const duration = reducedMotion ? 0 : 0.55
    const opts = { duration, ease: 'easeInOut' as const }

    if (!activeId) {
      animate(zx, 0, opts)
      animate(zy, 0, opts)
      animate(zs, 1, opts)
      return
    }

    const p = sceneConfig.panels.find((x) => x.sectionId === activeId)
    if (!p) return

    const { width, height } = root.getBoundingClientRect()
    const px = (p.xPct / 100) * width
    const py = (p.yPct / 100) * height
    const s = reducedMotion ? 1 : ZOOM_SCALE

    animate(zx, width / 2 - s * px, opts)
    animate(zy, height / 2 - s * py, opts)
    animate(zs, s, opts)
  }, [activeId, reducedMotion, zx, zy, zs])

  // Slow autonomous 3D drift (no pointer follow — deliberately calm).
  const driftRX = useMotionValue(0)
  const driftRY = useMotionValue(0)

  useEffect(() => {
    if (reducedMotion) return
    let raf = 0
    const start = performance.now()
    const loop = (t: number) => {
      const e = (t - start) / 1000
      driftRX.set(Math.sin(e / 11) * 2.4)
      driftRY.set(Math.cos(e / 14) * 3.2)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion, driftRX, driftRY])

  return (
    <div ref={rootRef} className="fixed inset-0 bg-[#05060d]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 42%, rgba(66,44,128,0.38), rgba(5,6,13,0) 62%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)',
          backgroundSize: '9px 9px',
        }}
      />

      <div className="absolute inset-0 overflow-hidden" style={{ perspective: '1100px' }}>
        <motion.div
          className="relative h-full w-full"
          style={{ transformOrigin: '0 0', x: zx, y: zy, scale: zs, transformStyle: 'preserve-3d' }}
        >
          <motion.div
            className="relative h-full w-full"
            style={{ transformStyle: 'preserve-3d', rotateX: driftRX, rotateY: driftRY }}
          >
            {sceneConfig.panels.map((p, i) => (
              <SectionPortal
                key={p.id}
                panel={p}
                index={i}
                dimmed={isZoomed && activeId !== p.sectionId}
                onClick={() => clickWindow(p.sectionId)}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {!isZoomed && (
        <button
          onClick={replayIntro}
          className="fixed bottom-6 left-6 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-white/80 backdrop-blur transition-colors hover:bg-black/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <span aria-hidden>&#9654;</span> Replay intro
        </button>
      )}
    </div>
  )
}
