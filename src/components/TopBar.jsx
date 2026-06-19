import { motion } from 'framer-motion'
import { SCREENS } from '../data/screens'

export default function TopBar({ current, onNavigate }) {
  const total = SCREENS.length
  const screen = SCREENS[current - 1]
  const progress = (current / total) * 100

  return (
    <div style={{
      height: 'var(--topbar-h)',
      background: 'var(--bg-topbar)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 2, background: 'rgba(255,255,255,0.06)',
      }}>
        <motion.div
          style={{ height: '100%', background: '#0046BE', originX: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        />
      </div>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
        <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 400 }}>Sarah</span>
        <span style={{ color: 'var(--text-4)', fontSize: 14 }}>/</span>
        <motion.span
          key={current}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: 13, fontWeight: 600, color: 'var(--text-1)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}
        >
          {screen.alt.split('—').pop().trim()}
        </motion.span>
        {screen.type === 'drawer' && (
          <span style={{
            fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 10,
            background: 'rgba(170,100,255,0.15)', color: '#b580ff',
            border: '1px solid rgba(170,100,255,0.25)',
            flexShrink: 0,
          }}>
            Drawer
          </span>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{
          fontSize: 12, fontWeight: 500,
          color: 'var(--text-3)',
          fontVariantNumeric: 'tabular-nums',
          fontFamily: 'monospace',
        }}>
          {current} / {total}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[
            { label: '‹', delta: -1, disabled: current === 1 },
            { label: '›', delta: 1, disabled: current === total },
          ].map(({ label, delta, disabled }) => (
            <NavBtn
              key={label}
              onClick={() => onNavigate(current + delta)}
              disabled={disabled}
            >
              {label}
            </NavBtn>
          ))}
        </div>
      </div>
    </div>
  )
}

function NavBtn({ onClick, disabled, children }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff' }}
      whileTap={disabled ? {} : { scale: 0.92 }}
      transition={{ duration: 0.12 }}
      style={{
        width: 30, height: 30,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 7,
        color: disabled ? 'rgba(255,255,255,0.2)' : 'var(--text-2)',
        fontSize: 18, lineHeight: 1,
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.12s, color 0.12s',
      }}
    >
      {children}
    </motion.button>
  )
}
