import { useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SCREENS, DRAWER_BASE } from '../data/screens'
import Hotspot from './Hotspot'
import Screen5 from './Screen5'

const CUSTOM     = { Screen5 }
const EASE_OUT   = [0.22, 1, 0.36, 1]
const SPRING     = { type: 'spring', stiffness: 300, damping: 32 }
const SLIDE_SPRING = { type: 'spring', stiffness: 380, damping: 36, mass: 0.9 }
const NAV_H      = 83  // iOS tab bar (49px) + home indicator (34px)

// Drawer content variants — slide forward (push), slide back, or fade
const innerVariants = {
  initial: (dir) => {
    if (dir === 'push') return { x: '100%',  opacity: 1 }
    if (dir === 'back') return { x: '-100%', opacity: 1 }
    return { x: 0, opacity: 0 }
  },
  animate: { x: 0, opacity: 1 },
  exit: (dir) => {
    if (dir === 'push') return { x: '-100%', opacity: 1 }
    if (dir === 'back') return { x: '100%',  opacity: 1 }
    return { x: 0, opacity: 0 }
  },
}

function ScreenImage({ screen, onNavigate }) {
  const Custom = screen?.component ? CUSTOM[screen.component] : null
  if (Custom) return <Custom onNavigate={onNavigate} hotspots={screen.hotspots} />
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
  const screen     = SCREENS.find(s => s.id === current)
  const isDrawer   = screen?.type === 'drawer'
  const baseId     = isDrawer ? DRAWER_BASE[current] : current
  const baseScreen = SCREENS.find(s => s.id === baseId)

  // Whether the base screen has a bottom nav that should be pinned.
  // True even when a drawer is open so the base layout remains stable
  // (the scrim at zIndex 10 covers the nav overlay when a drawer is open).
  const hasFixedNav = !!baseScreen?.fixedNav

  // Tracks the transition direction for the NEXT render before current changes.
  // Set synchronously inside handleNavigate so AnimatePresence reads the correct
  // custom value for both the exiting and entering elements in the same render.
  const slideDirRef  = useRef(null)
  const wasDrawerRef = useRef(false)
  const scrollDivRef = useRef(null)
  // True only on the render immediately after closing a drawer — base must
  // appear instantly so it's already visible beneath the sliding-down sheet.
  const closingDrawer = wasDrawerRef.current && !isDrawer
  useEffect(() => { wasDrawerRef.current = isDrawer })

  useLayoutEffect(() => {
    if (baseScreen?.scrollTo !== 'bottom') return
    if (scrollDivRef.current) scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight
  }, [baseId, baseScreen?.scrollTo])

  const handleNavigate = useCallback((to) => {
    const target = SCREENS.find(s => s.id === to)
    if (target?.slideIn)        slideDirRef.current = 'push'
    else if (target?.slideBack) slideDirRef.current = 'back'
    else                        slideDirRef.current = null
    onNavigate(to)
  }, [onNavigate])

  useEffect(() => {
    if (!isDrawer) return
    const handler = (e) => { if (e.key === 'Escape') handleNavigate(baseId) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isDrawer, baseId, handleNavigate])

  if (!screen) return null

  const slideDir = slideDirRef.current

  return (
    <div style={{ position: 'relative', width: 390, height: 844, overflow: 'hidden' }}>

      {/* ── Base screen ── crossfades when base changes ── */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={baseId}
          ref={scrollDivRef}
          className="no-scrollbar"
          style={{
            position: 'absolute',
            top: 0,
            // Leave room for the pinned nav overlay when the screen has one.
            bottom: hasFixedNav ? NAV_H : 0,
            left: 0, right: 0,
            overflowY: 'auto', overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
          }}
          initial={{ opacity: closingDrawer ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: closingDrawer ? 1 : 0 }}
          transition={{ duration: closingDrawer ? 0 : 0.28, ease: EASE_OUT }}
        >
          <ScreenImage
            screen={baseScreen}
            onNavigate={isDrawer ? undefined : handleNavigate}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Fixed bottom nav overlay ──
          Shows the bottom NAV_H pixels of the base screen image, always
          anchored to the bottom of the phone frame regardless of scroll.
          Rendered beneath the scrim (zIndex 3 < scrim zIndex 10) so it
          dims correctly when a drawer is open.
          pointerEvents:none — nav is visual; taps fall through to scroll area. ── */}
      <AnimatePresence>
        {hasFixedNav && (
          <motion.div
            key={`nav-${baseId}`}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: NAV_H, overflow: 'hidden',
              zIndex: 3, pointerEvents: 'none',
            }}
            initial={{ opacity: closingDrawer ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: closingDrawer ? 1 : 0 }}
            transition={{ duration: closingDrawer ? 0 : 0.28, ease: EASE_OUT }}
          >
            <img
              src={baseScreen?.navSrc ?? baseScreen?.src}
              width={390}
              style={{ position: 'absolute', bottom: 0, display: 'block', userSelect: 'none' }}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Tap hints ──
          Phone-frame-absolute overlays that show users where to interact.
          Rendered only on the base screen (not inside open drawers).
          pointerEvents:none so they never block underlying hotspots. ── */}
      {!isDrawer && baseScreen?.tapHints?.map(hint => (
        <img
          key={hint.id}
          src="/images/tap_interaction.png"
          width={48}
          height={48}
          draggable={false}
          style={{
            position: 'absolute',
            left: hint.x,
            top: hint.y,
            opacity: 0.5,
            zIndex: 4,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      ))}

      {/* ── Nav hotspots ──
          Click targets rendered at phone-frame absolute coordinates so they
          can cover specific icons in the fixed nav overlay (which is
          pointerEvents:none and sits outside the scrollable content area). ── */}
      {!isDrawer && baseScreen?.navHotspots?.map(nh => (
        <div
          key={nh.id}
          onClick={() => handleNavigate(nh.to)}
          style={{
            position: 'absolute',
            left: nh.x, top: nh.y,
            width: nh.w, height: nh.h,
            cursor: 'pointer',
            zIndex: 5,
          }}
        />
      ))}

      {/* ── Bottom sheet drawer ── */}
      <AnimatePresence>
        {isDrawer && (() => {
          const isFull = !!screen?.drawerFull
          return (
            <>
              {/* Scrim — hidden for full-screen drawers */}
              {!isFull && (
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
                  transition={{ duration: 0.25 }}
                  onClick={() => handleNavigate(baseId)}
                />
              )}

              {/* Sheet — key includes isFull so switching from drawerFull→partial
                  (or vice versa) fully remounts the sheet and replays the slide-up,
                  rather than swapping content inside the same container. */}
              <motion.div
                key={isFull ? 'sheet-full' : (screen?.slideUp ? `sheet-${current}` : 'sheet')}
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: isFull ? 844 : 802,
                  zIndex: 20,
                  borderRadius: isFull ? 0 : '20px 20px 0 0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fff',
                }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={SPRING}
                drag={isFull ? false : "y"}
                dragConstraints={isFull ? undefined : { top: 0 }}
                dragElastic={isFull ? undefined : { top: 0, bottom: 0.2 }}
                onDragEnd={isFull ? undefined : (_, info) => {
                  if (info.offset.y > 80 || info.velocity.y > 400) {
                    handleNavigate(baseId)
                  }
                }}
              >
                {/* Drag handle — hidden for full-screen drawers */}
                {!isFull && (
                  <div
                    aria-hidden
                    style={{
                      width: 36, height: 4, borderRadius: 2,
                      background: 'rgba(0,0,0,0.15)',
                      margin: '10px auto 6px',
                      flexShrink: 0,
                    }}
                  />
                )}

                {/* Content clip — position:relative gives absolute children a bounding box */}
                {(() => {
                  const innerFixedNav = isFull && !!screen?.fixedNav
                  return (
                    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                      <AnimatePresence initial={false} custom={slideDir}>
                        <motion.div
                          key={current}
                          className="no-scrollbar"
                          style={{
                            position: 'absolute',
                            top: 0,
                            bottom: innerFixedNav ? NAV_H : 0,
                            left: 0, right: 0,
                            overflowY: 'auto', overflowX: 'hidden',
                            WebkitOverflowScrolling: 'touch',
                          }}
                          custom={slideDir}
                          variants={innerVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={slideDir === 'push' || slideDir === 'back' ? SLIDE_SPRING : { duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <ScreenImage screen={screen} onNavigate={handleNavigate} />
                        </motion.div>
                      </AnimatePresence>

                      {/* Fixed nav strip inside drawerFull — mirrors base-screen nav logic */}
                      <AnimatePresence>
                        {innerFixedNav && (
                          <motion.div
                            key={`inner-nav-${current}`}
                            style={{
                              position: 'absolute', bottom: 0, left: 0, right: 0,
                              height: NAV_H, overflow: 'hidden',
                              zIndex: 3, pointerEvents: 'none',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                          >
                            <img
                              src={screen.navSrc ?? screen.src}
                              width={390}
                              style={{ position: 'absolute', bottom: 0, display: 'block', userSelect: 'none' }}
                              draggable={false}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })()}
              </motion.div>
            </>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
