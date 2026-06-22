import { useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SCREENS, DRAWER_BASE } from '../data/screens'
import Hotspot from './Hotspot'
import { DESKTOP_W, DESKTOP_H } from './MacFrame'

const EASE_OUT  = [0.22, 1, 0.36, 1]
const SPRING    = { type: 'spring', stiffness: 300, damping: 32 }
const DRAWER_W  = 600  // side drawer panel width
const HEADER_H  = 200  // browser chrome + BB blue site header (px at 1x)

function ScreenImage({ screen, onNavigate }) {
  if (!screen) return null
  return (
    <div style={{ position: 'relative', width: DESKTOP_W }}>
      <img
        src={screen.src}
        alt={screen.alt}
        width={DESKTOP_W}
        style={{ display: 'block', userSelect: 'none', WebkitUserDrag: 'none' }}
        draggable={false}
      />
      {onNavigate && screen.hotspots?.map(hs => (
        <Hotspot key={hs.id} {...hs} onNavigate={onNavigate} />
      ))}
    </div>
  )
}

export default function DesktopStack({ current, onNavigate }) {
  const screen     = SCREENS.find(s => s.id === current)
  const isDrawer   = screen?.type === 'drawer-side'
  const baseId     = isDrawer ? DRAWER_BASE[current] : current
  const baseScreen = SCREENS.find(s => s.id === baseId)

  const wasDrawerRef   = useRef(false)
  const prevBaseIdRef  = useRef(baseId)
  const closingDrawer  = wasDrawerRef.current && !isDrawer
  // Base screen changed while staying inside a drawer (drawer-to-drawer with different base).
  // Skip the fade so the new base appears already in place behind the panel.
  const baseSwapSilent = isDrawer && wasDrawerRef.current && prevBaseIdRef.current !== baseId
  useEffect(() => {
    wasDrawerRef.current  = isDrawer
    prevBaseIdRef.current = baseId
  })

  const handleNavigate = useCallback((to) => {
    if (SCREENS.find(s => s.id === to)) onNavigate(to)
  }, [onNavigate])

  useEffect(() => {
    if (!isDrawer) return
    const handler = (e) => { if (e.key === 'Escape') handleNavigate(baseId) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isDrawer, baseId, handleNavigate])

  if (!screen) return null

  const hasHeader = !!baseScreen?.headerSrc

  return (
    <div style={{ position: 'relative', width: DESKTOP_W, height: DESKTOP_H, overflow: 'hidden' }}>

      {/* ── Base screen — body scrolls below fixed header ── */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={baseId}
          className="no-scrollbar"
          style={{
            position: 'absolute',
            top: hasHeader ? HEADER_H : 0,
            left: 0, right: 0, bottom: 0,
            overflowY: 'auto', overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
          }}
          initial={{ opacity: (closingDrawer || baseSwapSilent) ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: (closingDrawer || baseSwapSilent) ? 1 : 0 }}
          transition={{ duration: (closingDrawer || baseSwapSilent) ? 0 : 0.28, ease: EASE_OUT }}
        >
          <ScreenImage
            screen={baseScreen}
            onNavigate={isDrawer ? undefined : handleNavigate}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Fixed header strip (browser chrome + blue site nav) ── */}
      <AnimatePresence>
        {hasHeader && (
          <motion.div
            key={`header-${baseId}`}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: HEADER_H, overflow: 'hidden',
              zIndex: 3, pointerEvents: 'none',
            }}
            initial={{ opacity: (closingDrawer || baseSwapSilent) ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: (closingDrawer || baseSwapSilent) ? 1 : 0 }}
            transition={{ duration: (closingDrawer || baseSwapSilent) ? 0 : 0.28, ease: EASE_OUT }}
          >
            <img
              src={baseScreen.headerSrc}
              width={DESKTOP_W}
              style={{ display: 'block', userSelect: 'none' }}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Viewport-level hotspots (e.g. in fixed header area) ── */}
      {!isDrawer && baseScreen?.viewportHotspots?.map(hs => (
        <Hotspot key={hs.id} {...hs} onNavigate={handleNavigate} />
      ))}

      {/* ── Side drawer — slides in from right ── */}
      <AnimatePresence>
        {isDrawer && (
          <>
            {/* Scrim */}
            <motion.div
              key="scrim"
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.45)',
                zIndex: 10,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => handleNavigate(baseId)}
            />

            {/* Panel — fixed key: slides in once on open, stays put for drawer-to-drawer state swaps */}
            <motion.div
              key="drawer-panel"
              style={{
                position: 'absolute',
                top: 0, right: 0, bottom: 0,
                width: DRAWER_W,
                zIndex: 20,
                overflow: 'hidden',
                background: '#fff',
              }}
              initial={{ x: DRAWER_W }}
              animate={{ x: 0 }}
              exit={{ x: DRAWER_W }}
              transition={SPRING}
            >
              {/* Content crossfades between drawer states; initial={false} so first render is instant */}
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={current}
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                >
                  <div style={{ position: 'relative', width: DRAWER_W }}>
                    <img
                      src={screen.src}
                      alt={screen.alt}
                      width={DRAWER_W}
                      style={{ display: 'block', userSelect: 'none', WebkitUserDrag: 'none' }}
                      draggable={false}
                    />
                    {screen.hotspots?.map(hs => (
                      <Hotspot key={hs.id} {...hs} onNavigate={handleNavigate} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
