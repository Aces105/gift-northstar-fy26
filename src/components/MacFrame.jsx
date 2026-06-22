// MacBook Pro 16" — content area 1728×1117, no built-in scale.
// Scaling is handled by ResponsiveDesktop so this component always renders at natural size.

const W  = 1728   // screen content width
const H  = 1117   // screen content height
const BT = 18     // top bezel (camera lives here)
const BS = 8      // side bezels
const BB = 14     // bottom chin

export const DESKTOP_W = W
export const DESKTOP_H = H
export const FRAME_W   = W + BS * 2        // 1744
export const FRAME_H   = H + BT + BB       // 1149

export default function MacFrame({ children }) {
  return (
    <div style={{
      width: FRAME_W,
      height: FRAME_H,
      borderRadius: 10,
      background: 'linear-gradient(180deg, #424242 0%, #303030 50%, #282828 100%)',
      boxShadow: [
        '0 0 0 1px rgba(255,255,255,0.07) inset',
        '0 0 0 1.5px rgba(0,0,0,0.7)',
        '0 40px 100px rgba(0,0,0,0.65)',
        '0 12px 32px rgba(0,0,0,0.45)',
        '0 2px 6px rgba(0,0,0,0.35)',
      ].join(', '),
      position: 'relative',
      flexShrink: 0,
    }}>

      {/* Subtle top-edge highlight (aluminum sheen) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        borderRadius: '10px 10px 0 0',
        background: 'rgba(255,255,255,0.14)',
        pointerEvents: 'none',
      }} />

      {/* Camera dot */}
      <div style={{
        position: 'absolute',
        top: 5, left: '50%',
        transform: 'translateX(-50%)',
        width: 7, height: 7,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #3a3a3a, #111)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 0 4px rgba(0,0,0,0.8) inset',
      }} />

      {/* Screen — clipping mask for content */}
      <div style={{
        position: 'absolute',
        top: BT,
        left: BS,
        width: W,
        height: H,
        background: '#000',
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: '0 0 0 1px rgba(0,0,0,0.9) inset, 0 0 20px rgba(0,0,0,0.5) inset',
      }}>
        {children}
      </div>
    </div>
  )
}
