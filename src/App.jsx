import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import PhoneShell from './components/PhoneShell'
import ScreenStack from './components/ScreenStack'
import DesktopStack from './components/DesktopStack'
import MacFrame from './components/MacFrame'
import ResponsiveDesktop from './components/ResponsiveDesktop'
import { SCREENS, SECTIONS } from './data/screens'

export default function App() {
  const [current, setCurrent] = useState(1)

  // Flat ordered list of screen IDs across all sections (story order)
  const orderedIds = useMemo(
    () => SECTIONS.flatMap(sec => sec.screens),
    []
  )

  const navigate = useCallback((id) => {
    if (SCREENS.find(s => s.id === id)) setCurrent(id)
  }, [])

  // Arrow-key navigation follows story order
  useEffect(() => {
    const handler = (e) => {
      const idx = orderedIds.indexOf(current)
      if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && idx < orderedIds.length - 1) {
        navigate(orderedIds[idx + 1])
      }
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && idx > 0) {
        navigate(orderedIds[idx - 1])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current, navigate, orderedIds])

  // Dot indicators — only show screens in story order
  const dotIds = orderedIds

  const isDesktop = !!(SCREENS.find(s => s.id === current)?.desktop)

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar current={current} onNavigate={navigate} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
        <TopBar current={current} onNavigate={navigate} />

        {/* Canvas */}
        <div style={{
          flex: 1,
          minHeight: 0,
          overflow: isDesktop ? 'auto' : 'auto',
          background: 'var(--bg-canvas)',
          backgroundImage: 'radial-gradient(ellipse at 65% 40%, rgba(0,70,190,0.08) 0%, transparent 55%)',
          display: 'flex',
          flexDirection: isDesktop ? 'column' : 'row',
          alignItems: isDesktop ? 'stretch' : 'center',
          justifyContent: isDesktop ? 'flex-start' : 'center',
          ...(isDesktop ? {} : { paddingRight: 'var(--sidebar-w)' }),
        }}>
          <motion.div
            key={isDesktop ? 'desktop' : 'mobile'}
            style={isDesktop ? { width: '100%' } : {}}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {isDesktop ? (
              <ResponsiveDesktop>
                <MacFrame>
                  <DesktopStack current={current} onNavigate={navigate} />
                </MacFrame>
              </ResponsiveDesktop>
            ) : (
              <PhoneShell>
                <ScreenStack current={current} onNavigate={navigate} />
              </PhoneShell>
            )}
          </motion.div>

          {/* Dot indicators — mobile only */}
          {!isDesktop && (
            <div style={{
              position: 'absolute',
              bottom: 24,
              left: '50%',
              transform: 'translateX(calc(-50% + var(--sidebar-w) / 2))',
              display: 'flex',
              gap: 4,
              alignItems: 'center',
            }}>
              {dotIds.map(id => (
                <motion.button
                  key={id}
                  onClick={() => navigate(id)}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.85 }}
                  animate={{
                    width:      id === current ? 18 : 5,
                    background: id === current ? '#0046BE' : 'rgba(255,255,255,0.18)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    height: 5, borderRadius: 3,
                    border: 'none', cursor: 'pointer', padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
