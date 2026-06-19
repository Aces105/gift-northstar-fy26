export default function PhoneShell({ children }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Side hardware buttons */}
      <div style={btn({ right: -3, top: 168, w: 3, h: 36, side: 'right' })} />
      <div style={btn({ left: -3, top: 140, w: 3, h: 28, side: 'left' })} />
      <div style={btn({ left: -3, top: 180, w: 3, h: 60, side: 'left' })} />
      <div style={btn({ left: -3, top: 252, w: 3, h: 60, side: 'left' })} />

      {/* Phone body */}
      <div style={{
        width: 418,
        height: 872,
        borderRadius: 52,
        background: 'linear-gradient(145deg,#3c3d41 0%,#1a1b1e 35%,#2b2c2f 65%,#161718 100%)',
        padding: 14,
        position: 'relative',
        boxSizing: 'border-box',
        boxShadow: [
          '0 0 0 1px rgba(255,255,255,0.10)',
          '0 0 0 2px rgba(0,0,0,0.6)',
          '0 32px 80px rgba(0,0,0,0.7)',
          '0 8px 24px rgba(0,0,0,0.5)',
          'inset 0 1px 0 rgba(255,255,255,0.08)',
        ].join(', '),
      }}>

        {/* Glass screen */}
        <div style={{
          width: 390,
          height: 844,
          borderRadius: 40,
          overflow: 'hidden',
          position: 'relative',
          background: '#000',
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute',
            top: 11,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 34,
            background: '#000',
            borderRadius: 20,
            zIndex: 100,
            boxShadow: '0 0 0 2px rgba(255,255,255,0.04)',
          }} />

          {children}
        </div>
      </div>
    </div>
  )
}

function btn({ left, right, top, w, h, side }) {
  const radius = side === 'left' ? '2px 0 0 2px' : '0 2px 2px 0'
  return {
    position: 'absolute',
    top,
    ...(left !== undefined ? { left } : { right }),
    width: w,
    height: h,
    background: 'linear-gradient(to right, #1a1a1c, #2a2a2c)',
    borderRadius: radius,
    boxShadow: side === 'right'
      ? '1px 0 2px rgba(0,0,0,0.5)'
      : '-1px 0 2px rgba(0,0,0,0.5)',
  }
}
