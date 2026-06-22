import { motion } from 'framer-motion'

export default function Hotspot({ type, inset, x, y, w, h, to, onNavigate, showDot }) {
  if (type === 'hint') {
    const sz = w ?? 48
    return (
      <motion.div
        onClick={(e) => { e.stopPropagation(); onNavigate(to) }}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: sz,
          height: h ?? sz,
          cursor: 'pointer',
          zIndex: 6,
        }}
      >
        {showDot && (
          <img
            src="/images/tap_interaction.png"
            width={48}
            height={48}
            draggable={false}
            style={{ display: 'block', userSelect: 'none', WebkitUserDrag: 'none' }}
          />
        )}
      </motion.div>
    )
  }

  const style = inset
    ? { position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 5 }
    : { position: 'absolute', left: x, top: y, width: w, height: h, cursor: 'pointer', zIndex: 6 }

  return (
    <motion.div
      style={style}
      whileTap={{ scale: 0.97, opacity: 0.7 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
      onClick={() => onNavigate(to)}
    />
  )
}
