'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const POINTS = 18

export function CursorTrail() {
  const reduced = useReducedMotion()
  const dotsRef = useRef<(HTMLDivElement | null)[]>([])
  const target = useRef({ x: -100, y: -100 })
  const trail = useRef(
    Array.from({ length: POINTS }, () => ({ x: -100, y: -100 })),
  )
  const raf = useRef(0)

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const tick = () => {
      let leadX = target.current.x
      let leadY = target.current.y
      for (let i = 0; i < trail.current.length; i++) {
        const p = trail.current[i]
        p.x += (leadX - p.x) * 0.36
        p.y += (leadY - p.y) * 0.36
        leadX = p.x
        leadY = p.y
        const el = dotsRef.current[i]
        if (el) {
          const t = 1 - i / trail.current.length
          const size = 3 + t * 9
          el.style.width = `${size}px`
          el.style.height = `${size}px`
          el.style.opacity = `${t * t * 0.95}`
          el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`
        }
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block"
    >
      {Array.from({ length: POINTS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el
          }}
          className="absolute left-0 top-0 rounded-full"
          style={{
            background: i === 0 ? '#ff3547' : 'rgba(255, 45, 61, 0.9)',
            boxShadow: i < 4 ? '0 0 12px 3px rgba(255, 45, 61, 0.55)' : 'none',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
