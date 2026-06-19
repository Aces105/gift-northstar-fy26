import { AnimatePresence, motion } from 'framer-motion'
import { SCREENS, DRAWER_BASE } from '../data/screens'
import Hotspot from './Hotspot'

const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_IN  = [0.64, 0, 0.78, 0]

function ScreenImage({ screen, onNavigate }) {
  return (
    <div style={{ position: 'relative', width: 390 }}>
      <img
        src={screen.src}
        alt={screen.alt}
        width={390}
        style={{ display: 'block', userSelect: 'none', WebkitUserDrag: 'none' }}
        draggable={false}
      />
      {onNavigate && screen.hotspots.map(hs => (
        <Hotspot key={hs.id} {...hs} onNavigate={onNavigate} />
      ))}
    </div>
  )
}

export default function ScreenStack({ current, onNavigate }) {
  const screen = SCREENS[current - 1]
  const isDrawer = screen.type === 'drawer'
  const baseId = isDrawer ? DRAWER_BASE[current] : current
  const baseScreen = SCREENS[baseId - 1]

  return (
    <div style={{ position: 'relative', width: 390, height: 844, overflow: 'hidden' }}>

      {/* ── Base screen (regular screens, stays put while drawer is open) ── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={baseId}
          style={{ position: 'absolute', inset: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
        >
          <ScreenImage
            screen={baseScreen}
            onNavigate={isDrawer ? undefined : onNavigate}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Scrim behind drawer ── */}
      <AnimatePresence>
        {isDrawer && (
          <motion.div
            key="scrim"
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.52)',
              zIndex: 10,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
          />
        )}
      </AnimatePresence>

      {/* ── Drawer shell (mounts once per drawer group, images crossfade inside) ── */}
      <AnimatePresence>
        {isDrawer && (
          <motion.div
            key="drawer-shell"
            style={{
              position: 'absolute', left: 0, right: 0, bottom: 0,
              zIndex: 20,
              transformOrigin: 'bottom center',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 36, stiffness: 380, mass: 0.8 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: EASE_OUT }}
              >
                <ScreenImage screen={screen} onNavigate={onNavigate} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
