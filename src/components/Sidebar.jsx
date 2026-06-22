import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SCREENS, SECTIONS, SCENARIOS, DRAWER_BASE } from '../data/screens'

const SCREEN_MAP  = Object.fromEntries(SCREENS.map(s => [s.id, s]))
const EASE        = [0.22, 1, 0.36, 1]

function sectionFor(screenId) {
  return SECTIONS.find(sec => sec.screens.includes(screenId))
}

function scenarioFor(screenId) {
  const sec = sectionFor(screenId)
  return sec?.scenario ?? null
}

function Chevron({ open, size = 12 }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 12 12" fill="none"
      animate={{ rotate: open ? 90 : 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      style={{ flexShrink: 0 }}
    >
      <path d="M4 2.5L7.5 6L4 9.5" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

function DrawerDot({ color }) {
  return (
    <span style={{
      width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
      background: color ?? 'rgba(170,100,255,0.7)',
      marginLeft: 'auto',
    }} />
  )
}

function CollapsePanel({ open, children }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="panel"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          style={{ overflow: 'hidden' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Sidebar({ current, onNavigate }) {
  // When a drawer is open, highlight its base screen rather than the drawer entry
  const primaryId = SCREEN_MAP[current]?.type === 'drawer'
    ? (DRAWER_BASE[current] ?? current)
    : current

  const activeSectionId  = sectionFor(primaryId)?.id
  const activeScenarioId = scenarioFor(primaryId)

  // Scenario open/closed
  const [scenarioOpen, setScenarioOpen] = useState(() => {
    const s = {}
    SCENARIOS.forEach(sc => { s[sc.id] = true })
    return s
  })

  // Section open/closed
  const [sectionOpen, setSectionOpen] = useState(() => {
    const s = {}
    SECTIONS.forEach(sec => { s[sec.id] = sec.screens.includes(1) })
    return s
  })

  // Auto-expand active scenario + section on navigation
  useEffect(() => {
    if (activeScenarioId) {
      setScenarioOpen(prev => prev[activeScenarioId] ? prev : { ...prev, [activeScenarioId]: true })
    }
    if (activeSectionId) {
      setSectionOpen(prev => prev[activeSectionId] ? prev : { ...prev, [activeSectionId]: true })
    }
  }, [activeScenarioId, activeSectionId])

  const toggleScenario = (id) => setScenarioOpen(prev => ({ ...prev, [id]: !prev[id] }))
  const toggleSection  = (id) => setSectionOpen(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      height: '100vh',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>

      {/* ── Logo / wordmark ── */}
      <div style={{
        padding: '18px 20px 14px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 10,
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

      {/* ── Scenario + Section + Screen tree ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px 20px' }}>

        {SCENARIOS.map((scenario) => {
          const isScenarioOpen   = !!scenarioOpen[scenario.id]
          const isScenarioActive = scenario.id === activeScenarioId
          const scenarioSections = SECTIONS.filter(s => s.scenario === scenario.id)

          return (
            <div key={scenario.id} style={{ marginBottom: 4 }}>

              {/* ── Scenario header ── */}
              <motion.button
                onClick={() => toggleScenario(scenario.id)}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '10px 12px 8px',
                  borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: isScenarioActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: 3,
                  }}>
                    Scenario
                  </div>
                  <div style={{
                    fontSize: 19, fontWeight: 700,
                    color: scenario.color ?? '#D4C49A',
                    lineHeight: 1.2,
                  }}>
                    {scenario.label}
                  </div>
                  {scenario.subtitle && (
                    <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 2, fontWeight: 400 }}>
                      {scenario.subtitle}
                    </div>
                  )}
                </div>
                <span style={{ color: 'var(--text-4)', marginTop: 18, flexShrink: 0 }}>
                  <Chevron open={isScenarioOpen} />
                </span>
              </motion.button>

              {/* ── Sections nested under scenario ── */}
              <CollapsePanel open={isScenarioOpen}>
                <div style={{
                  marginLeft: 14,
                  paddingLeft: 10,
                  borderLeft: '1px solid rgba(255,255,255,0.07)',
                  paddingBottom: 4,
                }}>
                  {scenarioSections.map((sec) => {
                    const isSecOpen   = !!sectionOpen[sec.id]
                    const isSecActive = sec.id === activeSectionId
                    const isNested    = !!sec.group

                    return (
                      <div key={sec.id} style={{ marginBottom: 2, paddingLeft: isNested ? 10 : 0 }}>

                        {/* Section header */}
                        <motion.button
                          onClick={() => toggleSection(sec.id)}
                          whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            width: '100%',
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '7px 10px',
                            borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left',
                            background: isSecActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                          }}
                        >
                          {isNested && (
                            <span style={{
                              width: 1, height: 14,
                              background: 'rgba(255,255,255,0.12)',
                              flexShrink: 0, borderRadius: 1,
                            }} />
                          )}

                          <span style={{
                            width: isNested ? 6 : 8, height: isNested ? 6 : 8,
                            borderRadius: '50%',
                            background: sec.color, flexShrink: 0,
                            opacity: isNested ? 0.6 : 1,
                            boxShadow: isSecActive ? `0 0 6px ${sec.color}88` : 'none',
                            transition: 'box-shadow 0.2s',
                          }} />

                          <span style={{
                            flex: 1,
                            fontSize: 17,
                            fontWeight: isSecActive ? 700 : 600,
                            color: isSecActive ? 'var(--text-1)' : isNested ? 'var(--text-3)' : 'var(--text-2)',
                            lineHeight: 1.3,
                          }}>
                            {sec.label}
                          </span>

                          <span style={{
                            fontSize: 10, color: 'var(--text-4)',
                            fontVariantNumeric: 'tabular-nums', marginRight: 4,
                          }}>
                            {sec.screens.length}
                          </span>

                          <span style={{ color: 'var(--text-4)' }}>
                            <Chevron open={isSecOpen} />
                          </span>
                        </motion.button>

                        {/* Screen items */}
                        <CollapsePanel open={isSecOpen}>
                          <div style={{ paddingTop: 2, paddingBottom: 4 }}>
                            {sec.screens.map((id, frameIdx) => {
                              const s        = SCREEN_MAP[id]
                              if (!s) return null
                              const isActive = id === primaryId
                              const label    = s.alt.split('—').pop().trim()

                              return (
                                <motion.button
                                  key={id}
                                  onClick={() => onNavigate(id)}
                                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                                  whileTap={{ scale: 0.98 }}
                                  style={{
                                    width: '100%',
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '6px 10px 6px 22px',
                                    borderRadius: 7, border: 'none', cursor: 'pointer',
                                    textAlign: 'left', position: 'relative',
                                    background: isActive ? `${sec.color}22` : 'transparent',
                                  }}
                                >
                                  {isActive && (
                                    <motion.div
                                      layoutId="sidebar-indicator"
                                      style={{
                                        position: 'absolute', left: 10,
                                        top: '20%', bottom: '20%',
                                        width: 2, borderRadius: 2,
                                        background: sec.color,
                                      }}
                                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                    />
                                  )}

                                  <span style={{
                                    width: 18, height: 18, borderRadius: 5,
                                    background: isActive ? sec.color : 'rgba(255,255,255,0.07)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 13, fontWeight: 700, flexShrink: 0,
                                    color: isActive ? '#fff' : '#E9E9F3',
                                    transition: 'background 0.15s, color 0.15s',
                                  }}>
                                    {frameIdx + 1}
                                  </span>

                                  <span style={{
                                    flex: 1, fontSize: 15,
                                    color: isActive ? 'var(--text-1)' : 'var(--text-3)',
                                    fontWeight: isActive ? 600 : 400,
                                    lineHeight: 1.35,
                                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                  }}>
                                    {label}
                                  </span>

                                  {s.type === 'drawer' && <DrawerDot color={sec.color} />}
                                </motion.button>
                              )
                            })}
                          </div>
                        </CollapsePanel>

                      </div>
                    )
                  })}
                </div>
              </CollapsePanel>

            </div>
          )
        })}
      </div>

      {/* ── Footer ── */}
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
