import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { SCREENS, SECTIONS } from '../data/screens'

export default function TopBar({ current, onNavigate }) {
  const screen = SCREENS.find(s => s.id === current)

  // Build ordered ID list + find position for progress & prev/next
  const orderedIds = useMemo(() => SECTIONS.flatMap(sec => sec.screens), [])
  const idx        = orderedIds.indexOf(current)
  const progress   = ((idx + 1) / orderedIds.length) * 100

  // Active section label
  const section = SECTIONS.find(sec => sec.screens.includes(current))

  const prevId = idx > 0 ? orderedIds[idx - 1] : null
  const nextId = idx < orderedIds.length - 1 ? orderedIds[idx + 1] : null

  if (!screen) return null

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
          style={{
            height: '100%',
            background: section?.color ?? '#0046BE',
            originX: 0,
          }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        />
      </div>

      {/* Breadcrumb: Section › Frame */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0, overflow: 'hidden' }}>
        <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, flexShrink: 0 }}>
          {section?.label ?? 'Sarah'}
        </span>
        <span style={{ color: 'var(--text-4)', fontSize: 14, flexShrink: 0 }}>/</span>
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
            flexShrink: 0, marginLeft: 2,
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
          flexShrink: 0,
        }}>
          {idx + 1} / {orderedIds.length}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <NavBtn onClick={() => prevId && onNavigate(prevId)} disabled={!prevId}>‹</NavBtn>
          <NavBtn onClick={() => nextId && onNavigate(nextId)} disabled={!nextId}>›</NavBtn>
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
      }}
    >
      {children}
    </motion.button>
  )
}
