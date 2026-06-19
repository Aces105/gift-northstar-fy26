// Maps each drawer screen to the base screen that stays visible beneath it
export const DRAWER_BASE = { 6: 5, 7: 5, 8: 5, 11: 10, 12: 10, 13: 10 }

// Screens where the app footer is shown
export const FOOTER_SCREENS = new Set([5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16])

export const SCREENS = [
  {
    id: 1,
    src: '/images/s1_intro.png',
    alt: 'Intro Card — Best Buy Gifting',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 2 }],
  },
  {
    id: 2,
    src: '/images/s2_chatgpt_default.png',
    alt: 'ChatGPT — start conversation',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 3 }],
  },
  {
    id: 3,
    src: '/images/s3_chatgpt_mom.png',
    alt: 'ChatGPT — typing gift for mom',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 4 }],
  },
  {
    id: 4,
    src: '/images/s4_chatgpt_ebike.png',
    alt: 'ChatGPT — e-bike recommendations',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 5 }],
  },
  {
    id: 5,
    src: '/images/s5_saved_mom.png',
    alt: 'Best Buy Saved Items — Mom list',
    type: 'regular',
    hotspots: [{ id: 'ask-blue', x: 130, y: 760, w: 130, h: 80, to: 6 }],
  },
  {
    id: 6,
    src: '/images/s6_askblue_mom.png',
    alt: 'Ask Blue — still shopping for mom',
    type: 'drawer',
    hotspots: [{ id: 'input', x: 16, y: 695, w: 358, h: 64, to: 7 }],
  },
  {
    id: 7,
    src: '/images/s7_askblue_dad_typing.png',
    alt: 'Ask Blue — typing gift for dad',
    type: 'drawer',
    hotspots: [{ id: 'send', x: 314, y: 426, w: 60, h: 60, to: 8 }],
  },
  {
    id: 8,
    src: '/images/s8_askblue_dad_results.png',
    alt: 'Ask Blue — dad gift results',
    type: 'drawer',
    hotspots: [{ id: 'save', x: 240, y: 768, w: 135, h: 48, to: 9 }],
  },
  {
    id: 9,
    src: '/images/s9_askblue_dad_toast.png',
    alt: 'Ask Blue — item saved confirmation',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 10 }],
  },
  {
    id: 10,
    src: '/images/s10_bb_home.png',
    alt: 'Best Buy Home',
    type: 'regular',
    hotspots: [{ id: 'ask-blue', x: 130, y: 765, w: 130, h: 75, to: 11 }],
  },
  {
    id: 11,
    src: '/images/s11_askblue_hi.png',
    alt: 'Ask Blue — Hi Sarah, back again',
    type: 'drawer',
    hotspots: [{ id: 'input', x: 16, y: 686, w: 358, h: 64, to: 12 }],
  },
  {
    id: 12,
    src: '/images/s12_askblue_sister_typing.png',
    alt: 'Ask Blue — typing gift for sister',
    type: 'drawer',
    hotspots: [{ id: 'send', x: 314, y: 418, w: 60, h: 60, to: 13 }],
  },
  {
    id: 13,
    src: '/images/s13_askblue_sister_results.png',
    alt: 'Ask Blue — sister gift results',
    type: 'drawer',
    hotspots: [{ id: 'save', x: 240, y: 768, w: 135, h: 48, to: 14 }],
  },
  {
    id: 14,
    src: '/images/s14_sms.png',
    alt: 'SMS — price drop alert from Best Buy',
    type: 'regular',
    hotspots: [{ id: 'bubble', x: 42, y: 194, w: 234, h: 192, to: 15 }],
  },
  {
    id: 15,
    src: '/images/s15_saved_all.png',
    alt: 'Best Buy Saved Items — all recipients tagged',
    type: 'regular',
    hotspots: [{ id: 'checkout', x: 15, y: 775, w: 360, h: 60, to: 16 }],
  },
  {
    id: 16,
    src: '/images/s16_cart.png',
    alt: 'Best Buy Cart — ready to checkout',
    type: 'regular',
    hotspots: [],
  },
]
