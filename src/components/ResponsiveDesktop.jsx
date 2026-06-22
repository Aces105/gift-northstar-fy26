import { useRef, useState, useEffect } from 'react'
import { FRAME_W, FRAME_H } from './MacFrame'

export default function ResponsiveDesktop({ children }) {
  const outerRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      // Never scale above 1 (content maxes out at 1728px); scale down to fit smaller viewports
      setScale(Math.min(1, entry.contentRect.width / FRAME_W))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    // Outer: takes full available width, reports size to ResizeObserver
    <div ref={outerRef} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      {/* Sized wrapper: flexbox sees the correct scaled dimensions */}
      <div style={{ width: FRAME_W * scale, height: FRAME_H * scale, position: 'relative', flexShrink: 0 }}>
        {/* Inner: renders at full natural size, scaled visually */}
        <div style={{
          width: FRAME_W,
          height: FRAME_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}
