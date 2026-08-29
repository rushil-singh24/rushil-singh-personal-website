'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/use-reduced-motion'

// Keycap samples from github.com/Naresh-Khatri/3d-portfolio
// (public/assets/keycap-sounds). Shared across every hook instance.
let ctx: AudioContext | null = null
const buffers: { press: AudioBuffer | null; release: AudioBuffer | null } = {
  press: null,
  release: null,
}
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
    const load = (url: string, key: 'press' | 'release') =>
      fetch(url)
        .then((r) => r.arrayBuffer())
        .then((b) => ctx!.decodeAudioData(b))
        .then((buf) => {
          buffers[key] = buf
        })
        .catch(() => {})
    load('/sfx/keypress.mp3', 'press')
    load('/sfx/keyrelease.mp3', 'release')
  }
}

function unlock() {
  ensureLoaded()
  if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {})
  unlocked = true
}

/**
 * Keycap press / release sounds. The AudioContext is unlocked on the first
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

  const play = useCallback(
    (key: 'press' | 'release', minGap: number) => {
      if (reduced || !ctx) return
      const buf = buffers[key]
      if (!buf) return
      const now = performance.now()
      if (now - last.current < minGap) return
      last.current = now
      if (ctx.state === 'suspended') ctx.resume().catch(() => {})
      const src = ctx.createBufferSource()
      src.buffer = buf
      src.playbackRate.value = 0.95 + Math.random() * 0.1
      const gain = ctx.createGain()
      gain.gain.value = key === 'press' ? 0.85 : 0.55
      src.connect(gain).connect(ctx.destination)
      src.start()
    },
    [reduced],
  )

  const press = useCallback(() => play('press', 40), [play])
  const release = useCallback(() => play('release', 0), [play])

  return { press, release }
}
