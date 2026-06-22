# Gifting Experience — Project Context

## The Underlying Objective

This prototype is not just a "gift ideas page." It represents the full gifting
**intent** — every moment a shopper is buying *for* someone else, not themselves.
That distinction should shape every design and code decision:

- Gifting has emotional stakes (avoiding the wrong gift, time pressure, social risk)
  that self-purchases don't carry. Copy, pacing, and reassurance patterns should
  reflect that — not generic e-commerce tone.
- The goal is reducing gifting anxiety and decision fatigue, not just surfacing
  products. Every flow should answer: *does this make gift-giving easier, faster,
  or more confident for this shopper?*
- Shoppers arrive with varying gifting intent strength — from vague ("something
  for my brother") to specific ("the exact item on her registry"). Flows should
  accommodate that range, not assume high-intent shopping behavior.

## Core Flows & Terminology

- **Ask Blue** — agentic AI shopping assistant. Conversational, handles ambiguity,
  narrows from vague to specific gift recommendations.
- **Gift Hub** — centralized gifting destination (NOT "Gift Vault" — that name is
  deprecated). Discovery and browsing entry point.
- **Madlibs lite quiz** — fast, low-effort gift-finder quiz for low-intent shoppers
  who don't want to browse or chat.
- **Giftability confidence badge** — visual signal that a product is a safe/strong
  gift choice.
- **Top Gifted badge** — social proof signal.
- **Get it by [date]** — fulfillment/urgency component, critical for last-minute
  gifting scenarios.
- **Deals Worth Gifting** — filter distinguishing gift-appropriate deals from
  generic discounts.

## Shopper Scenarios (reference personas)

- **Sarah, the Early Planner** — high intent, long lead time, wants organization
  tools (lists, saved ideas) more than urgency cues.
- **Marcus, the Black Friday List Closer** — has a list, deal-driven, needs
  efficient cross-off-the-list flows.
- **James, the Last Minute Rescuer** — low intent until suddenly high urgency,
  needs fast fulfillment confidence (Get it by date) and minimal decision steps.

When building or modifying a flow, identify which scenario(s) it primarily serves
and design accordingly — don't default to one generic "shopper" mental model.

## Design & Interaction Standards

- Build to feel like a real, shipped product — not a clickable mockup.
- Bottom drawers, modals, overlays must match real native interaction patterns
  (use Vaul for drawers, Radix UI for dialogs/popovers) — Figma MCP only exports
  static visual data, not prototype interaction logic, so these must be built
  deliberately, not inferred from the static frame.
- Transitions: 250–350ms, ease-out on entrance, ease-in on exit. No instant snaps.
- Every interactive element needs: default, hover, active, disabled, loading states.
- Every data-driven screen needs: loading, empty, and error states — not just
  the happy path.
- Use realistic content (real product names, prices, recipient names) — never
  lorem ipsum.

## Component Behavior Fundamentals

Figma MCP exports static visual data only — not interaction logic. Do not infer
behavior from a static frame. Apply these defaults for every component type
unless the Figma prototype or prompt specifies otherwise:

**Bottom Sheets / Drawers**
- Slide up from bottom, drag handle at top
- Dismiss via: tap scrim, swipe down, Escape key
- Body scroll locks while open
- Use Vaul

**Modals / Dialogs**
- Fade + slight scale-in (0.95 → 1) on open, centered or anchored per design
- Dismiss via: tap scrim, close icon, Escape key
- Focus trap while open (keyboard tabbing stays inside modal)
- Use Radix UI

**Dropdowns / Select Menus**
- Open downward by default, flip upward if no room below viewport
- Close on: outside click, item selection, Escape
- Keyboard navigable (arrow keys, Enter to select)

**Tabs**
- Active tab indicator animates (slides/underlines) to new position, doesn't snap
- Content swap uses a brief crossfade, not an instant cut

**Accordions / Expandable sections**
- Height animates open/closed (not display:none toggle) — use auto-height
  animation libraries (Framer Motion's `AnimateHeight` pattern) so it expands
  smoothly
- Chevron/icon rotates in sync with expand state

**Toasts / Notifications**
- Slide in from edge (top or bottom depending on design), auto-dismiss after
  3–5s unless action-required, swipe-to-dismiss on mobile

**Cards (product, gift idea, etc.)**
- Hover: subtle lift (shadow increase + 2-4px translateY) on desktop
- Tap: brief scale-down (0.98) on press for tactile feedback on mobile
- Image loading: skeleton placeholder, not blank space or layout shift

## Screen-to-Screen Prototype Connections

Translate Figma's prototype interactions (the blue connector arrows) into real
navigation — don't just build isolated static pages.

For every screen-to-screen connection in the Figma prototype, identify and
implement:
1. **Trigger** — what initiates navigation (tap, swipe, timer, form submit)
2. **Transition type** — push, modal overlay, full replace, slide direction
3. **Direction & persistence** — does prior screen stay in history (back button
   works) or is it replaced
4. **Shared element continuity** — if an element (image, card) appears on both
   screens, animate it transitioning between positions rather than having it
   disappear and reappear (Framer Motion `layoutId` handles this)

Default transition mapping:
- Drill-in (list → detail): slide left, push to history
- Drawer/sheet open: slide up over current screen, current screen stays in place
- Modal/confirmation: fade + scale in, current screen stays in place
- Tab switch: crossfade, no push to history
- Back navigation: reverse of the forward transition, not a generic default

If the Figma file has prototype connections defined, read and replicate the
specific trigger/animation set in Figma's interaction panel rather than
defaulting to a generic transition for every link.

## Tech Stack

- React + Vite
- React Router for multi-screen navigation
- Framer Motion for transitions/animation
- Vaul (bottom drawers), Radix UI (dialogs/overlays)
- Figma MCP for design tokens (spacing, type, color) — match exactly, don't
  approximate

## Source of Truth

- Research standards: Tier 1 or strong Tier 2 sources only (Baymard, NRF,
  Salesforce, Deloitte, Accenture). Flag if a claim doesn't meet this bar.
- Content tone: concise, plain-language, direct. Avoid conceptual or overwrought
  copy.
- Visual tone: warm, editorial (deep greens, gold, cream, terracotta), strong
  typographic hierarchy, gender-neutral — avoid generic e-commerce conventions.

## Standing Permissions

You have standing permission for this project to:
- Edit, create, and delete files within this project folder
- Run npm install, npm run dev, npm run build
- Run git add, git commit, and git push to this repo
- Create new components, pages, and folders as needed

Ask first before: deleting the entire project, modifying anything outside this
project folder, or running system-level commands.

## Before Building Anything

When given a design or content prompt, first identify:
1. Which underlying gifting intent/objective does this serve?
2. Which shopper scenario(s) is this primarily for?
3. Does this reduce gifting anxiety/decision fatigue, or just add a feature?

If the prompt is ambiguous on these points, ask before building — don't assume.
