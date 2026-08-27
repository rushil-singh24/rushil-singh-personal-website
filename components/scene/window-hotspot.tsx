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
      className="absolute rounded-sm"
      style={{
        left: `${hotspot.xPct}%`,
        top: `${hotspot.yPct}%`,
        width: `${hotspot.wPct}%`,
        height: `${hotspot.hPct}%`,
      }}
      initial="rest"
      whileHover="hover"
      variants={{
        rest: { scale: 1, boxShadow: '0 0 0px rgba(242, 201, 76, 0)' },
        hover: { scale: 1.08, boxShadow: '0 0 24px 6px rgba(242, 201, 76, 0.65)' },
      }}
      animate={isFlickering ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
      transition={
        isFlickering
          ? { duration: 0.2, opacity: { duration: 0.9, ease: 'easeInOut' } }
          : { duration: 0.2 }
      }
    />
  )
}
