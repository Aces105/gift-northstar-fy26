// ─── Drawer base map ──────────────────────────────────────────────────────────
// Maps drawer screen ID → the base screen that stays visible beneath it.
// Figma drawer frames are 390×802 — they slide up over (but not covering) the
// top 42 px of the base screen.
export const DRAWER_BASE = {
  // Sarah Mom
  6:  5,   // drawer-mom-save over PDP (heart icon tap on Screen5)
  11: 10,  // drawer-mom-tag over Saved Items v2
  12: 10,  // drawer-mom-tagged over Saved Items v2
  13: 10,  // move-to-default over Saved Items v2
  14: 10,  // move-to-create over Saved Items v2
  41: 10,  // drawer-sarah-mom-create over Saved Items v2
  45: 10,  // drawer-sarah-mom-save-v2 over Saved Items v2 (back from create)
  46: 10,  // drawer-sarah-mom-xmas over Saved Items v2 (from create-a-list tap)

  43: 7,   // drawer-mom-tag over Saved Items v1 (icon menu on screen 7)
  44: 7,   // drawer-mom-all-save-list over Saved Items v1 (after tag-btn on screen 43)

  // Sarah Dad
  51: 50,  // Dad Blue Prompt — slides up full-screen over intro
  52: 50,  // Ask Blue full conversation — same drawerFull, fades from screen 51
  58: 52,  // price-drop-1 drawer slides up over Ask Blue chat (screen 3)
  59: 52,  // price-drop-2 — same drawer, fades from price-drop-1 on toggle tap

  // Sarah Sister (Re-engagement)
  79: 73,  // save drawer slides up over Home Chef gift hub

  // Pre-Power Week Brother (desktop side drawers)
  110: 106, // drawer-side-auto-buy-default over brother screen 7
  111: 107, // drawer-side-auto-buy-save over brother screen 8
  112: 106, // drawer-side-auto-buy-brother over brother screen 7
  // Pre-Power Week Friend (desktop side drawers)
  120: 132, // drawer-side-pack-friend over friend screen 2

  // Last Minute Brother-in-Law (mobile bottom drawer)
  170: 162, // lm-drawer over Screen 2

  // Last Minute Birthday Present (mobile bottom drawer)
  190: 182, // bp-drawer over Screen 2
  183: 182, // Screen 3 shares same sheet as drawer — content crossfade, no slide
}

// ─── Scenarios ────────────────────────────────────────────────────────────────
// Top-level accordion groups in the sidebar. Each scenario wraps one or more
// sections. Add new entries here when adding future prototype scenarios.
export const SCENARIOS = [
  { id: 'preseason',     label: 'Pre-season Shopping',     subtitle: 'Sep – Oct', color: '#D4C49A' },
  { id: 'reengagement',  label: 'Re-engagement',            subtitle: 'Nov – Dec', color: '#D4C49A' },
  { id: 'powerweek',    label: 'Power Week - Sarah',       subtitle: 'BF – CM',  color: '#D4C49A' },
  { id: 'prepowerweek',  label: 'Pre-Power Week: Late Nov', subtitle: 'Late Nov', color: '#DC8667' },
  { id: 'powerweekbf',   label: 'Power Week',               subtitle: 'BF – CM',  color: '#DC8667' },
  { id: 'lastminute',    label: 'Last Minute: Late Dec',    subtitle: 'Late Dec', color: '#E35454' },
]

// ─── Sections ─────────────────────────────────────────────────────────────────
// Story sections visible in the sidebar as collapsible parent nav.
// Screen IDs are in exact story order; template/intro screen is always first.
export const SECTIONS = [
  {
    id:       'mom',
    label:    'Sarah Mom',
    color:    '#0046BE',
    scenario: 'preseason',
    screens:  [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14],
  },
  {
    id:       'mom-components',
    label:    'Components',
    color:    '#0046BE',
    scenario: 'preseason',
    screens:  [36, 37, 38, 39, 40, 41, 42, 47],
    group:    'mom',
  },
  {
    id:       'dad',
    label:    'Sarah Dad',
    color:    '#006E2F',
    scenario: 'preseason',
    screens:  [50, 51, 52, 53, 54, 55],
  },
  {
    id:       'dad-components',
    label:    'Components',
    color:    '#006E2F',
    scenario: 'preseason',
    screens:  [56, 57, 58, 59, 60],
    group:    'dad',
  },
  // ── Power Week - Sarah ───────────────────────────────────────────────────────
  {
    id:       'checkout',
    label:    'Sarah Checkout',
    color:    '#B8460B',
    scenario: 'powerweek',
    screens:  [31, 32, 33, 34],
  },
  // ── Re-engagement ────────────────────────────────────────────────────────────
  {
    id:       'sister',
    label:    'Sarah Sister',
    color:    '#9B1F88',
    scenario: 'reengagement',
    screens:  [70, 71, 72, 73, 74],
  },
  {
    id:       'sister-components',
    label:    'Components',
    color:    '#9B1F88',
    scenario: 'reengagement',
    screens:  [79],
    group:    'sister',
  },

  // ── Brother ───────────────────────────────────────────────────────────────────
  {
    id:       'brother',
    label:    'Brother',
    color:    '#DC8667',
    scenario: 'prepowerweek',
    screens:  [99, 100, 101, 102, 103, 104, 105, 106, 107],
    desktop:  true,
  },
  {
    id:       'brother-components',
    label:    'Components',
    color:    '#DC8667',
    scenario: 'prepowerweek',
    screens:  [110, 111, 112],
    group:    'brother',
    desktop:  true,
  },

  // ── Friend ────────────────────────────────────────────────────────────────────
  {
    id:       'friend',
    label:    'Friend',
    color:    '#DC8667',
    scenario: 'prepowerweek',
    screens:  [130, 131, 132, 133],
    desktop:  true,
  },
  {
    id:       'friend-components',
    label:    'Components',
    color:    '#DC8667',
    scenario: 'prepowerweek',
    screens:  [120],
    group:    'friend',
    desktop:  true,
  },

  // ── Power Week ────────────────────────────────────────────────────────────────
  {
    id:       'powerweek-marcus',
    label:    'Marcus',
    color:    '#DC8667',
    scenario: 'powerweekbf',
    screens:  [150, 151, 152, 153],
  },

  // ── Last Minute: Late Dec ─────────────────────────────────────────────────────
  {
    id:       'lm-brother',
    label:    'Brother-in-Law',
    color:    '#E35454',
    scenario: 'lastminute',
    screens:  [160, 161, 162, 163, 164, 165, 166, 167, 168],
  },
  {
    id:       'lm-components',
    label:    'Components',
    color:    '#E35454',
    scenario: 'lastminute',
    screens:  [170],
    group:    'lm-brother',
  },
  {
    id:       'lm-birthday',
    label:    'Birthday Present',
    color:    '#E35454',
    scenario: 'lastminute',
    screens:  [180, 181, 182, 190, 183, 184, 185, 186],
  },
]

// ─── Screens ──────────────────────────────────────────────────────────────────
// Full story in section order. Calibrated against the final Figma file
// (Pre season-Sarah page, 4 sections: Sarah Mom / Dad / Sister / Checkout).
//
// type: 'regular' — full-screen navigable frame
// type: 'drawer'  — 390×802 overlay; base screen stays visible beneath it
// component: optional React component name (overrides img render)
// hotspots: [{id, x, y, w, h, to}] or [{id, inset:true, to}] for full-screen tap
export const SCREENS = [

  // ── Sarah Mom ───────────────────────────────────────────────────────────────
  // Figma: Intro Card → ChatGPT flow → PDP (personalized) → save drawer →
  //        BB Home toast → Saved Items → Ask Blue drawer → Saved v2 →
  //        Tag drawers → Move-to-list drawers
  {
    id: 1,
    src: '/images/s1_intro.png',
    alt: 'Sarah Mom — Gifting North Star intro',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 2 }],
  },
  {
    id: 2,
    src: '/images/s2_chatgpt_default.png',
    alt: 'Sarah Mom — ChatGPT start conversation',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 3 }],
  },
  {
    id: 3,
    src: '/images/s3_chatgpt_mom.png',
    alt: 'Sarah Mom — ChatGPT gift ideas for mom',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 4 }],
  },
  {
    id: 4,
    src: '/images/s4_chatgpt_ebike.png',
    alt: 'Sarah Mom — ChatGPT e-bike Best Buy link',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 5 }],
  },
  {
    // Custom interactive component: dismissable personalization banner +
    // heart/save icon hotspot. "No thanks" collapses banner. "Yes" → saved
    // items (screen 8). Heart icon → save drawer (screen 6).
    id: 5,
    src: '/images/s4b_pdp_ebike_personalized.png',
    alt: 'Sarah Mom — PDP e-bike personalized',
    type: 'regular',
    component: 'Screen5',
    hotspots: [],
  },
  {
    // Figma: drawer-sarah-mom-save (390×802) — slides up over the PDP
    id: 6,
    src: '/images/mom_comp_save_1.png',
    alt: 'Sarah Mom — Save to list drawer',
    type: 'drawer',
    hotspots: [{ id: 'tap', inset: true, to: 7 }],
  },
  {
    // Figma: S1-Gift/Save Mom (390×1428, node 4108:29823)
    // iconmenu coords from Figma "Tap Interaction" node (4433:132193) at x=140,y=247
    id: 7,
    src: '/images/mom_saved_v1_fresh_body.png',
    navSrc: '/images/mom_saved_v1_fresh.png',
    alt: 'Sarah Mom — Saved items list',
    type: 'regular',
    fixedNav: true,
    hotspots: [
      { id: 'iconmenu', x: 140, y: 247, w: 40, h: 40, to: 43 },
      { id: 'tap', inset: true, to: 10 },
    ],
  },
  {
    // Figma: S1-Gift/Save Mom v2 (390×1390) — saved items after Ask Blue
    id: 10,
    src: '/images/mom_saved_v2_body.png',
    navSrc: '/images/mom_saved_v2.png',
    alt: 'Sarah Mom — Saved items updated',
    type: 'regular',
    fixedNav: true,
    tapHints: [{ id: 'footer-center', x: 171, y: 762 }],
    navHotspots: [{ id: 'ask-blue', x: 156, y: 761, w: 78, h: 83, to: 51 }],
    hotspots: [{ id: 'tap', inset: true, to: 11 }],
  },
  {
    // Figma: drawer-sarah-mom-tag (390×802) — tag the gift for Mom
    // "Tag your item" field (row at y≈150) swaps drawer content to all-save-list
    id: 11,
    src: '/images/mom_drawer_tag.png',
    alt: 'Sarah Mom — Tag gift for mom drawer',
    type: 'drawer',
    hotspots: [{ id: 'tag-btn', x: 0, y: 150, w: 390, h: 48, to: 13 }],
  },
  {
    // Figma: drawer-sarah-mom-tagged (390×802) — tagged confirmation
    id: 12,
    src: '/images/mom_comp_tagged.png',
    alt: 'Sarah Mom — Gift tagged confirmation',
    type: 'drawer',
    hotspots: [{ id: 'tap', inset: true, to: 13 }],
  },
  {
    // Figma: drawer-sarah-mom-all-save-list (390×802) — all saved lists
    id: 13,
    src: '/images/mom_comp_all_save_list.png',
    alt: 'Sarah Mom — All saved lists drawer',
    type: 'drawer',
    hotspots: [{ id: 'tap', inset: true, to: 14 }],
  },
  {
    // Figma: drawer-sarah-mom-create (390×802) — Create a list
    // slideIn: true → horizontal push transition from all-save-list
    // Save button (y≈725) slides back to drawer-sarah-mom-save-v2 (screen 45)
    id: 14,
    src: '/images/mom_comp_create.png',
    alt: 'Sarah Mom — Create a list drawer',
    type: 'drawer',
    slideIn: true,
    hotspots: [
      { id: 'create-list', x: 0, y: 150, w: 390, h: 46, to: 46 },
      { id: 'save-btn',    x: 70, y: 725, w: 250, h: 52, to: 45 },
    ],
  },

  // ── Sarah Dad ───────────────────────────────────────────────────────────────
  // Figma: Sarah Dad group (4148:86076) — freshly exported June 2026
  // Drawer-prefixed frames live in Components - Dad (IDs 56–60)
  {
    // Figma: Template Section (4207:194165, 390×844)
    id: 50,
    src: '/images/dad_section_intro.png',
    alt: 'Sarah Dad — Section intro',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 51 }],
  },
  {
    // Figma: S1-Gift/Blue (4148:86201, 390×844) — Dad Blue Prompt, slides up full-screen
    // Up arrow (send button) fades to Ask Blue conversation (screen 52) — same page, different state
    id: 51,
    src: '/images/dad_home_bb.png',
    alt: 'Sarah Dad — Dad Blue Prompt',
    type: 'drawer',
    drawerFull: true,
    hotspots: [{ id: 'up-arrow', x: 328, y: 458, w: 50, h: 50, to: 52 }],
  },
  {
    // Figma: S1-Gift/Blue (4148:86211, 390×1684) — Ask Blue full conversation
    // drawerFull: same persistent sheet as screen 51, content fades in
    // Heart icon (Greenworks card) opens price-drop-1 drawer (screen 58)
    id: 52,
    src: '/images/dad_askblue_chat_body.png',
    navSrc: '/images/dad_askblue_chat.png',
    alt: 'Sarah Dad — Ask Blue full conversation',
    type: 'drawer',
    drawerFull: true,
    fixedNav: true,
    hotspots: [{ id: 'save', type: 'hint', x: 163, y: 517, to: 58 }],
  },
  {
    // Figma: S1-Gift/Blue (4427:128859, 390×1684) — Ask Blue chat v2
    id: 53,
    src: '/images/dad_askblue_chat_v2_body.png',
    navSrc: '/images/dad_askblue_chat_v2.png',
    alt: 'Sarah Dad — Ask Blue conversation v2',
    type: 'regular',
    fixedNav: true,
    hotspots: [{ id: 'tap', inset: true, to: 54 }],
  },
  {
    // Figma: S1-Gift/Save Item Dad Default (4151:115673, 390×1976)
    id: 54,
    src: '/images/dad_saved_items_body.png',
    navSrc: '/images/dad_saved_items.png',
    alt: 'Sarah Dad — Saved items',
    type: 'regular',
    fixedNav: true,
    hotspots: [{ id: 'tap', inset: true, to: 55 }],
  },
  {
    // Figma: S1-Gift/Save Item Dad Tag (4256:157709, 390×1976)
    id: 55,
    src: '/images/dad_saved_items_tagged_body.png',
    navSrc: '/images/dad_saved_items_tagged.png',
    alt: 'Sarah Dad — Saved items tagged',
    type: 'regular',
    fixedNav: true,
    hotspots: [],
  },

  // ── Sarah Sister · Re-engagement ────────────────────────────────────────────
  // Figma: Pre season-Sarah VS Code page, Sarah Sister section (4148:101030)
  // Canvas order (left→right): Template → 2-APP → Gift Hub ×3 → save drawer
  // Flow: intro → app browsing → gift hub v1 → save drawer → hub v2 → hub v3
  {
    // Figma: Template Section (4175:62596, 390×844) — section intro
    id: 70,
    src: '/images/sister_intro.png',
    alt: 'Sarah Sister — Section intro',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 71 }],
  },
  {
    // Figma: 2 - APP (4078:36953, 390×3209) — BB Home App scrollable
    id: 71,
    src: '/images/sister_app_body.png',
    navSrc: '/images/sister_app.png',
    alt: 'Sarah Sister — BB Home App',
    type: 'regular',
    fixedNav: true,
    hotspots: [{ id: 'tap', inset: true, to: 72 }],
  },
  {
    // Figma: sister/selfcare (4446:213026, 390×4942)
    id: 72,
    src: '/images/sister_selfcare_body.png',
    navSrc: '/images/sister_selfcare.png',
    alt: 'Sarah Sister — Self Care gift hub',
    type: 'regular',
    fixedNav: true,
    hotspots: [{ id: 'hint', type: 'hint', x: 176, y: 571, to: 73 }],
  },
  {
    // Figma: sister/home chef (4451:278059, 390×4942)
    id: 73,
    src: '/images/sister_home_chef_body.png',
    navSrc: '/images/sister_home_chef.png',
    alt: 'Sarah Sister — Home Chef gift hub',
    type: 'regular',
    fixedNav: true,
    hotspots: [{ id: 'hint', type: 'hint', x: 143, y: 895, to: 79 }],
  },
  {
    // Figma: sister/home chef saved (4451:280939, 390×4942)
    id: 74,
    src: '/images/sister_home_chef_saved_body.png',
    navSrc: '/images/sister_home_chef_saved.png',
    alt: 'Sarah Sister — Home Chef saved',
    type: 'regular',
    fixedNav: true,
    hotspots: [],
  },

  // ── Sarah Checkout ──────────────────────────────────────────────────────────
  // Figma: inro-power-week-sarah → sarah-bby-text-message → S1-Gift/Save Mom Tagged → Cart - Checkout Methods - A
  {
    id: 31,
    src: '/images/checkout_intro_power_week.png',
    alt: 'Sarah Checkout — Section intro (Power Week)',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 32 }],
  },
  {
    // Figma: sarah-bby-text-message (4167:73901) — 390×985
    id: 32,
    src: '/images/checkout_bby_text.png',
    alt: 'Sarah Checkout — BBY text message',
    type: 'regular',
    hotspots: [{ id: 'tap', inset: true, to: 33 }],
  },
  {
    // Figma: S1-Gift/Save Mom Tagged (4167:73914) — 390×2530
    id: 33,
    src: '/images/checkout_saved_tagged_body.png',
    navSrc: '/images/checkout_saved_tagged.png',
    alt: 'Sarah Checkout — Saved items tagged',
    type: 'regular',
    fixedNav: true,
    hotspots: [{ id: 'hint', type: 'hint', x: 329, y: 67, to: 34 }],
  },
  {
    // Figma: Cart - Checkout Methods - A (4167:80191) — 406×2499
    id: 34,
    src: '/images/checkout_cart_methods.png',
    alt: 'Sarah Checkout — Cart checkout methods',
    type: 'regular',
    hotspots: [],
  },

  // ── Sarah Mom · Components ─────────────────────────────────────────────────
  // Figma: Section "Components" under Sarah Mom — all 390×802 drawer frames.
  // Reference/library views for design inspection; the same images are used
  // as the actual drawers in the story flow above.
  {
    id: 36,
    src: '/images/mom_comp_save_1.png',
    alt: 'Components — drawer-sarah-mom-save',
    type: 'regular',
    hotspots: [],
  },
  {
    id: 37,
    src: '/images/mom_drawer_tag.png',
    alt: 'Components — drawer-sarah-mom-tag',
    type: 'regular',
    hotspots: [],
  },
  {
    id: 38,
    src: '/images/mom_comp_tagged.png',
    alt: 'Components — drawer-sarah-mom-tagged',
    type: 'regular',
    hotspots: [],
  },
  {
    id: 39,
    src: '/images/mom_comp_all_save_list.png',
    alt: 'Components — drawer-sarah-mom-all-save-list',
    type: 'regular',
    hotspots: [],
  },
  {
    id: 40,
    src: '/images/mom_comp_xmas.png',
    alt: 'Components — drawer-sarah-mom-xmas',
    type: 'regular',
    hotspots: [],
  },
  {
    id: 41,
    src: '/images/mom_comp_create.png',
    alt: 'Components — drawer-sarah-mom-create',
    type: 'drawer',
    hotspots: [{ id: 'tap', inset: true, to: 14 }],
  },
  {
    id: 42,
    src: '/images/mom_comp_save_3.png',
    alt: 'Components — drawer-sarah-mom-save (v2)',
    type: 'regular',
    hotspots: [],
  },
  {
    // Figma: Tap Interaction (48×48) — Sarah Mom section, node 4433:132168
    id: 47,
    src: '/images/tap_interaction.png',
    alt: 'Components — Tap Interaction',
    type: 'regular',
    hotspots: [],
  },

  // drawer-sarah-mom-tag shown over screen 7 (triggered by icon menu hotspot)
  {
    id: 43,
    src: '/images/mom_drawer_tag.png',
    alt: 'Sarah Mom — Tag gift drawer (from saved v1)',
    type: 'drawer',
    hotspots: [{ id: 'tag-btn', x: 0, y: 150, w: 390, h: 48, to: 44 }],
  },

  // drawer-sarah-mom-all-save-list over screen 7 (after tag-btn on screen 43)
  {
    id: 44,
    src: '/images/mom_comp_all_save_list.png',
    alt: 'Sarah Mom — All saved lists drawer (from saved v1)',
    type: 'drawer',
    hotspots: [{ id: 'tap', inset: true, to: 14 }],
  },

  // drawer-sarah-mom-save-v2 — slides back in from left after Save on create drawer
  // Save button exits drawer → screen 10 (Saved items updated)
  {
    id: 45,
    src: '/images/mom_comp_save_3.png',
    alt: 'Sarah Mom — Save confirmation drawer',
    type: 'drawer',
    slideBack: true,
    hotspots: [{ id: 'save-btn', x: 70, y: 725, w: 250, h: 52, to: 10 }],
  },

  // drawer-sarah-mom-xmas — crossfades in on "Create a list" tap in screen 14
  // Save button (y≈725) slides back to drawer-sarah-mom-save-v2 (screen 45)
  {
    id: 46,
    src: '/images/mom_comp_xmas.png',
    alt: 'Sarah Mom — Christmas list drawer',
    type: 'drawer',
    hotspots: [{ id: 'save-btn', x: 70, y: 725, w: 250, h: 52, to: 45 }],
  },

  // ── Sarah Sister · Components ────────────────────────────────────────────────
  {
    // Figma: drawer-sarah-sister-save (4446:233234, 390×802) — save to list drawer
    // Tap Interaction at (139, 726) — Save button at drawer bottom
    id: 79,
    src: '/images/sister_re_save_drawer.png',
    alt: 'Components Sister — drawer-sarah-sister-save',
    type: 'drawer',
    hotspots: [{ id: 'save-btn', x: 139, y: 726, w: 112, h: 44, to: 74 }],
  },

  // ── Components — Dad ────────────────────────────────────────────────────────
  // All Figma frames from Sarah Dad group whose names begin with "drawer".
  // Reference/library views; no interactive hotspots.
  {
    // Figma: Drawer-S1-Gift/Blue (4148:86191, 390×844)
    id: 56,
    src: '/images/dad_drawer_ask_blue.png',
    alt: 'Components Dad — Drawer-S1-Gift/Blue',
    type: 'regular',
    hotspots: [],
  },
  {
    // Figma: drawer-sarah-mom-save (4445:101664, 390×802)
    id: 57,
    src: '/images/dad_comp_save.png',
    alt: 'Components Dad — drawer-sarah-mom-save',
    type: 'regular',
    hotspots: [],
  },
  {
    // Figma: drawer-sarah-dad-price-drop-1 (4445:101670, 390×802)
    id: 58,
    src: '/images/dad_comp_pricedrop_1.png',
    alt: 'Components Dad — drawer-sarah-dad-price-drop-1',
    type: 'drawer',
    hotspots: [{ id: 'price-drop', inset: true, to: 59 }],
  },
  {
    // Figma: drawer-sarah-dad-price-drop-2 (4445:101798, 390×802)
    id: 59,
    src: '/images/dad_comp_pricedrop_2.png',
    alt: 'Components Dad — drawer-sarah-dad-price-drop-2',
    type: 'drawer',
    hotspots: [{ id: 'save-btn', inset: true, to: 53 }],
  },
  {
    // Figma: drawer-sarah-dad-save-list-link (4445:102219, 390×802)
    id: 60,
    src: '/images/dad_comp_save_list_link.png',
    alt: 'Components Dad — drawer-sarah-dad-save-list-link',
    type: 'regular',
    hotspots: [],
  },

  // ── Pre-Power Week Brother — Desktop (1729×varied) ────────────────────────────
  // Figma section: Pre-Power Week Brother (4183:114426), VS Code page
  // All frames are Marcus/Pre-Powerweek at 1729px wide; rendered inside MacBook Pro 16"
  { id: 99,  desktop: true, src: '/images/brother_title.png', alt: 'Brother — Title card (Pre-Power Week)', type: 'regular', hotspots: [{ id: 'hint', type: 'hint', x: 862, y: 1048, to: 100, showDot: true }] },
  { id: 100, desktop: true, src: '/images/brother_01_body.png', headerSrc: '/images/brother_01.png', alt: 'Brother — Screen 1', type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 101 }], viewportHotspots: [{ id: 'hint-search', type: 'hint', x: 154, y: 89, to: 101 }] },
  { id: 101, desktop: true, src: '/images/brother_02_body.png', headerSrc: '/images/brother_02.png', alt: 'Brother — Screen 2', type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 102 }], viewportHotspots: [{ id: 'hint-search', type: 'hint', x: 480, y: 170, to: 102 }] },
  { id: 102, desktop: true, src: '/images/brother_03_body.png', headerSrc: '/images/brother_03.png', alt: 'Brother — Screen 3', type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 103 }, { id: 'hint', type: 'hint', x: 1578, y: 453, to: 104 }] },
  { id: 103, desktop: true, src: '/images/brother_04_body.png', headerSrc: '/images/brother_04.png', alt: 'Brother — Screen 4', type: 'regular', hotspots: [{ id: 'hint', type: 'hint', x: 172, y: 917, to: 106 }] },
  { id: 104, desktop: true, src: '/images/brother_05_body.png', headerSrc: '/images/brother_05.png', alt: 'Brother — Screen 5', type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 105 }] },
  { id: 105, desktop: true, src: '/images/brother_06_body.png', headerSrc: '/images/brother_06.png', alt: 'Brother — Screen 6', type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 106 }, { id: 'hint', type: 'hint', x: 647, y: 1118, w: 440, h: 75, to: 103 }] },
  { id: 106, desktop: true, src: '/images/brother_07_body.png', headerSrc: '/images/brother_07.png', alt: 'Brother — Screen 7', type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 107 }, { id: 'hint-heart', type: 'hint', x: 1594, y: 813, to: 112 }] },
  { id: 107, desktop: true, src: '/images/brother_08_body.png', headerSrc: '/images/brother_08.png', alt: 'Brother — Screen 8', type: 'regular', hotspots: [] },

  // ── Pre-Power Week Brother — Components (side drawers, 648×1165) ────────────
  { id: 110, desktop: true, src: '/images/brother_drawer_default.png', alt: 'Brother — drawer-side-auto-buy-default', type: 'drawer-side', hotspots: [{ id: 'hint-autobuy', type: 'hint', x: 81, y: 394, to: 111 }] },
  { id: 111, desktop: true, src: '/images/brother_drawer_save.png',    alt: 'Brother — drawer-side-auto-buy-save',    type: 'drawer-side', hotspots: [{ id: 'hint-save', type: 'hint', x: 71, y: 780, w: 458, h: 60, to: 107 }] },
  { id: 112, desktop: true, src: '/images/brother_drawer_brother.png', alt: 'Brother — drawer-side-auto-buy-brother', type: 'drawer-side', hotspots: [{ id: 'hint-autobuy', type: 'hint', x: 534, y: 295, to: 110 }] },

  // ── Pre-Power Week Friend — Desktop components ────────────────────────────────
  { id: 120, desktop: true, src: '/images/friend_drawer_pack.png', alt: 'Friend — drawer-side-pack-friend', type: 'drawer-side', hotspots: [{ id: 'hint-save', type: 'hint', x: 70, y: 1043, w: 460, h: 50, to: 132 }] },

  // ── Power Week — Marcus Auto-Buy Notification (mobile, 390×varied) ───────────
  // Figma section: Power week Marcus Notification (4452:409169)
  { id: 150, src: '/images/pw_title_a.png',  alt: 'Marcus — Title card (Power Week)',  type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 151 }] },
  { id: 151, src: '/images/pw_screen1.png',  alt: 'Marcus — Screen 1 (Power Week)',    type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 152 }, { id: 'hint', type: 'hint', x: 111, y: 1210, to: 152 }] },
  { id: 152, src: '/images/pw_screen2.png',  alt: 'Marcus — Screen 2 (Power Week)',    type: 'regular', scrollTo: 'bottom', hotspots: [{ id: 'tap', inset: true, to: 153 }] },
  { id: 153, src: '/images/pw_title_b.png',  alt: 'Marcus — End card (Power Week)',    type: 'regular', hotspots: [] },

  // ── Pre-Power Week Friend — Desktop screens (1729×varied) ────────────────────
  // Figma section: Pre-Power Week Friend (4204:103478)
  { id: 130, desktop: true, src: '/images/friend_title.png',     alt: 'Friend — Title card', type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 131 }] },
  { id: 131, desktop: true, src: '/images/friend_01_body.png', headerSrc: '/images/friend_01.png', alt: 'Friend — Screen 1', type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 132 }, { id: 'hint', type: 'hint', x: 469, y: 469, to: 133 }] },
  { id: 132, desktop: true, src: '/images/friend_02_body.png', headerSrc: '/images/friend_02.png', alt: 'Friend — Screen 2', type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 133 }] },
  { id: 133, desktop: true, src: '/images/friend_03_body.png', headerSrc: '/images/friend_03.png', alt: 'Friend — Screen 3', type: 'regular', hotspots: [{ id: 'hint-vaude', type: 'hint', x: 1619, y: 1208, to: 120 }] },

  // ── Last Minute: Late Dec — Brother-in-Law (mobile 390×varied) ──────────────
  // Figma section: Last Minute Brother in Law (4232:77784)
  { id: 160, src: '/images/lm_title.png',   alt: 'Brother-in-Law — Title card',  type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 161 }] },
  { id: 161, src: '/images/lm_screen1.png', alt: 'Brother-in-Law — Screen 1',    type: 'regular', hotspots: [{ id: 'hint-bb-app', type: 'hint', x: 215, y: 582, w: 70, h: 70, to: 162 }] },
  { id: 162, src: '/images/lm_screen2.png', alt: 'Brother-in-Law — Screen 2',    type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 163 }] },
  { id: 163, src: '/images/lm_screen3.png', alt: 'Brother-in-Law — Screen 3',    type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 164 }] },
  { id: 164, src: '/images/lm_screen4.png', alt: 'Brother-in-Law — Screen 4',    type: 'regular', hotspots: [{ id: 'hint', type: 'hint', x: 343, y: 459, to: 166 }] },
  { id: 165, src: '/images/lm_screen5.png', alt: 'Brother-in-Law — Screen 5',    type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 166 }] },
  { id: 166, src: '/images/lm_screen6.png', alt: 'Brother-in-Law — Screen 6',    type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 167 }] },
  { id: 167, src: '/images/lm_cart.png',    alt: 'Brother-in-Law — Cart',         type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 168 }] },
  { id: 168, src: '/images/lm_outro.png',   alt: 'Brother-in-Law — End card',     type: 'regular', hotspots: [] },

  // ── Last Minute Components ──────────────────────────────────────────────────
  { id: 170, src: '/images/lm_drawer.png',  alt: 'Brother-in-Law — Drawer',       type: 'drawer',  drawerFull: true, hotspots: [] },

  // ── Last Minute: Birthday Present Nephew (mobile 390×varied) ────────────────
  // Figma section: Birthday Present Nephew (4235:114310)
  { id: 180, src: '/images/bp_title.png',   alt: 'Birthday Present — Title card', type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 181 }] },
  { id: 181, src: '/images/bp_screen1.png', alt: 'Birthday Present — Screen 1',   type: 'regular', hotspots: [{ id: 'hint-bb-app', type: 'hint', x: 208, y: 582, w: 72, h: 72, to: 182 }] },
  { id: 182, src: '/images/bp_screen2.png', alt: 'Birthday Present — Screen 2',   type: 'regular', hotspots: [{ id: 'hint-ask-blue', type: 'hint', x: 100, y: 565, w: 190, h: 48, to: 190 }] },
  { id: 183, src: '/images/bp_screen3.png', alt: 'Birthday Present — Screen 3',   type: 'drawer',  drawerFull: true, hotspots: [{ id: 'tap', inset: true, to: 184 }] },
  { id: 184, src: '/images/bp_screen4.png', alt: 'Birthday Present — Screen 4',   type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 185 }] },
  { id: 185, src: '/images/bp_screen5.png', alt: 'Birthday Present — Screen 5',   type: 'regular', hotspots: [{ id: 'tap', inset: true, to: 186 }] },
  { id: 186, src: '/images/bp_outro.png',   alt: 'Birthday Present — End card',   type: 'regular', hotspots: [] },

  // ── Birthday Present Components ─────────────────────────────────────────────
  { id: 190, src: '/images/bp_drawer.png',  alt: 'Birthday Present — Drawer',     type: 'drawer',  drawerFull: true, hotspots: [{ id: 'hint-bottom', type: 'hint', x: 295, y: 775, w: 80, h: 55, to: 183 }] },
]
