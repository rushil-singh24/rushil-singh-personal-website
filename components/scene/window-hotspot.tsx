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
      className="absolute flex items-center justify-center rounded-[3px]"
      style={{
        left: `${hotspot.xPct}%`,
        top: `${hotspot.yPct}%`,
        width: `${hotspot.wPct}%`,
        height: `${hotspot.hPct}%`,
      }}
      initial="rest"
      whileHover="hover"
      variants={{
        rest: { scale: 1, boxShadow: '0 0 0 0 rgba(255,255,255,0)' },
        hover: { scale: 1.04, boxShadow: '0 0 44px 12px rgba(255,255,255,0.32)' },
      }}
      animate={isFlickering ? { opacity: [1, 0.6, 1] } : { opacity: 1 }}
      transition={
        isFlickering
          ? { duration: 0.2, opacity: { duration: 0.9, ease: 'easeInOut' } }
          : { duration: 0.2 }
      }
    >
      <span
        className="pointer-events-none select-none px-2 text-center font-[family-name:var(--font-display)] text-[clamp(0.85rem,2.4vw,2rem)] uppercase leading-[0.9] tracking-[0.02em] text-[#0a0a14]"
        style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3)' }}
      >
        {hotspot.label}
      </span>
    </motion.button>
  )
}
