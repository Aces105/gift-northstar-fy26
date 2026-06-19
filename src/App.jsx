import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import PhoneShell from './components/PhoneShell'
import ScreenStack from './components/ScreenStack'
import { SCREENS } from './data/screens'

const TOTAL = SCREENS.length

export default function App() {
  const [current, setCurrent] = useState(1)

  const navigate = useCallback((n) => {
    if (n >= 1 && n <= TOTAL) setCurrent(n)
  }, [])

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(current + 1)
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   navigate(current - 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current, navigate])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar current={current} onNavigate={navigate} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
        <TopBar current={current} onNavigate={navigate} />

        {/* Canvas */}
        <div style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          background: 'var(--bg-canvas)',
          backgroundImage: 'radial-gradient(ellipse at 65% 40%, rgba(0,70,190,0.1) 0%, transparent 55%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Shift center-point left by half the sidebar so the phone sits at true viewport center
          paddingRight: 'var(--sidebar-w)',
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhoneShell>
              <ScreenStack current={current} onNavigate={navigate} />
            </PhoneShell>
          </motion.div>

          {/* Dot indicators */}
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(calc(-50% + var(--sidebar-w) / 2))',
            display: 'flex',
            gap: 5,
            alignItems: 'center',
          }}>
            {SCREENS.map(s => (
              <motion.button
                key={s.id}
                onClick={() => navigate(s.id)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  width: s.id === current ? 18 : 6,
                  background: s.id === current ? '#0046BE' : 'rgba(255,255,255,0.2)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  height: 6, borderRadius: 3,
                  border: 'none', cursor: 'pointer', padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
