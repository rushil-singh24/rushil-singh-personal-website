// components/scene/window-hotspot.tsx
'use client'

import { motion } from 'framer-motion'
import type { WindowHotspot } from '@/content/scene.config'

export function WindowHotspotButton({
  hotspot,
  onClick,
  isFlickering,
}: {
  hotspot: WindowHotspot
  onClick: () => void
  isFlickering: boolean
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={`Open ${hotspot.label}`}
      className="absolute flex items-center justify-center rounded-[4px] border border-white/25"
      style={{
        left: `${hotspot.xPct}%`,
        top: `${hotspot.yPct}%`,
        width: `${hotspot.wPct}%`,
        height: `${hotspot.hPct}%`,
      }}
      initial="rest"
      whileHover="hover"
      variants={{
        rest: { scale: 1, boxShadow: '0 0 18px 3px rgba(255,255,255,0.16)' },
        hover: { scale: 1.05, boxShadow: '0 0 44px 12px rgba(255,255,255,0.42)' },
      }}
      animate={isFlickering ? { opacity: [1, 0.55, 1] } : { opacity: 1 }}
      transition={
        isFlickering
          ? { duration: 0.2, opacity: { duration: 0.9, ease: 'easeInOut' } }
          : { duration: 0.2 }
      }
    >
      <span
        className="pointer-events-none select-none px-2 text-center font-mono text-[clamp(0.6rem,1.5vw,1.1rem)] font-bold uppercase leading-tight tracking-wide text-white"
        style={{
          textShadow:
            '2px 1px 0 rgba(34,211,238,0.55), -1.5px -1px 0 rgba(217,70,239,0.45), 0 2px 10px rgba(0,0,0,0.9)',
        }}
      >
        {hotspot.label}
      </span>
    </motion.button>
  )
}
