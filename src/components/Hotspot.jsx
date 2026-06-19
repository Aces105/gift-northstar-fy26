import { motion } from 'framer-motion'

export default function Hotspot({ inset, x, y, w, h, to, onNavigate }) {
  const style = inset
    ? { position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 5 }
    : { position: 'absolute', left: x, top: y, width: w, height: h, cursor: 'pointer', zIndex: 5 }

  return (
    <motion.div
      style={style}
      whileTap={{ scale: 0.97, opacity: 0.7 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
      onClick={() => onNavigate(to)}
    />
  )
}
