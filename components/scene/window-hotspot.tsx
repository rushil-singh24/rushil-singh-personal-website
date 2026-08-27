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
      aria-label={hotspot.label}
      className="absolute rounded-[3px] border border-white/20 ring-1 ring-cyan-300/20"
      style={{
        left: `${hotspot.xPct}%`,
        top: `${hotspot.yPct}%`,
        width: `${hotspot.wPct}%`,
        height: `${hotspot.hPct}%`,
      }}
      initial="rest"
      whileHover="hover"
      variants={{
        rest: {
          scale: 1,
          boxShadow:
            '0 0 14px 2px rgba(56, 224, 245, 0.28), inset 0 0 12px rgba(255,255,255,0.12)',
        },
        hover: {
          scale: 1.08,
          boxShadow:
            '0 0 30px 8px rgba(56, 224, 245, 0.7), inset 0 0 18px rgba(255,255,255,0.25)',
        },
      }}
      animate={isFlickering ? { opacity: [1, 0.45, 1] } : { opacity: 1 }}
      transition={
        isFlickering
          ? { duration: 0.2, opacity: { duration: 0.9, ease: 'easeInOut' } }
          : { duration: 0.2 }
      }
    />
  )
}
