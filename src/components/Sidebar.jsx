import { motion } from 'framer-motion'
import { SCREENS } from '../data/screens'

export default function Sidebar({ current, onNavigate }) {
  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      height: '100vh',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: '#0046BE',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ color: '#FFE200', fontWeight: 900, fontSize: 14, lineHeight: 1 }}>B</span>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.2 }}>
            Gifting North Star
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 1 }}>FY27 Prototype</div>
        </div>
      </div>

      {/* Section label */}
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--text-4)',
        }}>
          Sarah's Story
        </div>
      </div>

      {/* Screen list */}
      <div style={{ flex: 1, padding: '0 10px 16px' }}>
        {SCREENS.map(s => {
          const isActive = s.id === current
          return (
            <motion.button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                background: isActive ? 'rgba(0,70,190,0.18)' : 'transparent',
                position: 'relative',
                transition: 'background 0.15s',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  style={{
                    position: 'absolute', left: 0, top: '20%', bottom: '20%',
                    width: 3, borderRadius: 2,
                    background: '#0046BE',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span style={{
                width: 22, height: 22,
                borderRadius: 6,
                background: isActive ? '#0046BE' : 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, flexShrink: 0,
                color: isActive ? '#fff' : 'var(--text-3)',
                transition: 'background 0.15s, color 0.15s',
              }}>
                {s.id}
              </span>
              <span style={{
                fontSize: 12,
                color: isActive ? 'var(--text-1)' : 'var(--text-3)',
                fontWeight: isActive ? 600 : 400,
                lineHeight: 1.3,
                transition: 'color 0.15s',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {s.alt.split('—')[0].trim()}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid var(--border)',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 11, color: 'var(--text-4)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-3)' }}>Best Buy UX</strong><br />
          Pre-season · FY27
        </div>
      </div>
    </aside>
  )
}
