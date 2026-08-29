'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/use-reduced-motion'

// Shared across every hook instance: one AudioContext, one decoded sample.
let ctx: AudioContext | null = null
let buffer: AudioBuffer | null = null
let loadStarted = false
let unlocked = false

function ensureLoaded() {
  if (typeof window === 'undefined') return
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!AC) return
    ctx = new AC()
  }
  if (!loadStarted && ctx) {
    loadStarted = true
    fetch('/sfx/keyclick.wav')
      .then((r) => r.arrayBuffer())
      .then((b) => ctx!.decodeAudioData(b))
      .then((buf) => {
        buffer = buf
      })
      .catch(() => {})
  }
}

function unlock() {
  ensureLoaded()
  if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {})
  unlocked = true
}

/**
 * Returns a function that plays a short keyboard-key click (public/sfx/
 * keyclick.wav via Web Audio). The context is unlocked on the first
 * pointer/key event anywhere on the page. Throttled; no-op under
 * prefers-reduced-motion.
 */
export function useKeyClick() {
  const reduced = useReducedMotion()
  const last = useRef(0)

  useEffect(() => {
    ensureLoaded()
    if (unlocked) return
    const on = () => {
      unlock()
      window.removeEventListener('pointerdown', on)
      window.removeEventListener('keydown', on)
    }
    window.addEventListener('pointerdown', on)
    window.addEventListener('keydown', on)
    return () => {
      window.removeEventListener('pointerdown', on)
      window.removeEventListener('keydown', on)
    }
  }, [])

  return useCallback(() => {
    if (reduced || !ctx || !buffer) return
    const now = performance.now()
    if (now - last.current < 38) return
    last.current = now

    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.playbackRate.value = 0.93 + Math.random() * 0.14
    const gain = ctx.createGain()
    gain.gain.value = 0.6
    src.connect(gain).connect(ctx.destination)
    src.start()
  }, [reduced])
}
