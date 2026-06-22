import { useState } from 'react'
import { motion } from 'framer-motion'

const PERSONALIZED = '/images/s4b_pdp_ebike_personalized.png'
const DISMISSED    = '/images/s5_pdp_ebike_dismissed.png'

// Figma layout — 393px wide displayed at 390px CSS (~1:1 scale)
const HEADER_H = 159  // status bar + top nav height
const MB_H     = 161  // message-blue banner height

// Hotspot positions inside the message-blue section (section 2 coordinate space)
const NO_THANKS = { x: 140, y: 113, w: 74,  h: 32 }
const YES_BTN   = { x: 230, y: 113, w: 144, h: 32 }

// Heart/save icon group in the PDP content area (section 3 coordinate space).
// Figma frame y=336; PDP content starts at y=320 → PDP-relative y=16.
// Section 3 clips the first HEADER_H px via marginTop=-HEADER_H → section3 y=16.
// Frame 2147203774 (both share + save IconButtons) spans x=305–377, w=72.
const HEART_BTN = { x: 305, y: 16, w: 72, h: 32 }

const EASE = [0.22, 1, 0.36, 1]

export default function Screen5({ onNavigate }) {
  const [dismissed, setDismissed] = useState(false)

  return (
    <div style={{ position: 'relative', width: 390, userSelect: 'none' }}>

      {/* ── Section 1: status bar + nav (top 159px of personalized image) ── */}
      <div style={{ height: HEADER_H, overflow: 'hidden' }}>
        <img src={PERSONALIZED} width={390} style={{ display: 'block' }} draggable={false} />
      </div>

      {/* ── Section 2: message-blue banner (collapses on "No thanks") ── */}
      <motion.div
        animate={{ height: dismissed ? 0 : MB_H }}
        initial={{ height: MB_H }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        <img
          src={PERSONALIZED}
          width={390}
          style={{ display: 'block', marginTop: -HEADER_H }}
          draggable={false}
        />

        {!dismissed && (
          <motion.div
            whileTap={{ opacity: 0.5 }}
            transition={{ duration: 0.1 }}
            onClick={(e) => { e.stopPropagation(); setDismissed(true) }}
            style={{
              position: 'absolute',
              left: NO_THANKS.x, top: NO_THANKS.y,
              width: NO_THANKS.w, height: NO_THANKS.h,
              cursor: 'pointer', zIndex: 10,
            }}
          />
        )}

        {!dismissed && (
          <motion.div
            whileTap={{ opacity: 0.5 }}
            transition={{ duration: 0.1 }}
            onClick={() => onNavigate && onNavigate(7)}
            style={{
              position: 'absolute',
              left: YES_BTN.x, top: YES_BTN.y,
              width: YES_BTN.w, height: YES_BTN.h,
              cursor: 'pointer', zIndex: 10,
            }}
          />
        )}
      </motion.div>

      {/* ── Section 3: PDP body from dismissed image ── */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <img
          src={DISMISSED}
          width={390}
          style={{ display: 'block', marginTop: -HEADER_H }}
          draggable={false}
        />

        {/* Heart/save icons → open save drawer (screen 6) */}
        <div
          onClick={(e) => { e.stopPropagation(); onNavigate && onNavigate(6) }}
          style={{
            position: 'absolute',
            left: HEART_BTN.x, top: HEART_BTN.y,
            width: HEART_BTN.w, height: HEART_BTN.h,
            cursor: 'pointer', zIndex: 10,
          }}
        />

        {/* Tap anywhere else on PDP → forward to BB home state */}
        <div
          onClick={() => onNavigate && onNavigate(7)}
          style={{ position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 5 }}
        />
      </div>
    </div>
  )
}
