'use client'

import { useCallback, useRef } from 'react'
import { useReducedMotion } from '@/lib/use-reduced-motion'

/**
 * Returns a function that plays a short synthesized mechanical-key "tick"
 * (Web Audio — no asset). Throttled so sweeping the mouse across a grid
 * doesn't machine-gun. No-op under prefers-reduced-motion.
 */
export function useKeyClick() {
  const ctxRef = useRef<AudioContext | null>(null)
  const lastRef = useRef(0)
  const reduced = useReducedMotion()

  return useCallback(() => {
    if (reduced || typeof window === 'undefined') return
    const now = performance.now()
    if (now - lastRef.current < 45) return
    lastRef.current = now

    try {
      if (!ctxRef.current) {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext
        ctxRef.current = new AC()
      }
      const ctx = ctxRef.current
      if (ctx.state === 'suspended') void ctx.resume()

      const t = ctx.currentTime
      const dur = 0.03
      const buf = ctx.createBuffer(
        1,
        Math.ceil(ctx.sampleRate * dur),
        ctx.sampleRate,
      )
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
      }
      const src = ctx.createBufferSource()
      src.buffer = buf
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = 2600
      bp.Q.value = 0.9
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.08, t)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      src.connect(bp).connect(gain).connect(ctx.destination)
      src.start(t)
      src.stop(t + dur)
    } catch {
      /* audio unavailable — ignore */
    }
  }, [reduced])
}
