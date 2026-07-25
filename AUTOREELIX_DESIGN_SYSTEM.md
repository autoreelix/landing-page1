# AUTOREELIX Design System

This document captures the current AUTOREELIX landing page visual system as implemented in the project.

Scope:
- Landing page UI in app/page.tsx
- Signup form UI in app/components/SignupForm.tsx
- Global styles in app/globals.css
- Layout font wiring in app/layout.tsx

## 1) Color System

### 1.1 Core neutrals
- Black: #000000
- White: #FFFFFF
- Slate 50: #F8FAFC
- Slate 100: #F1F5F9
- Slate 200: #E2E8F0
- Slate 300: #CBD5E1
- Slate 400: #94A3B8
- Slate 500: #64748B
- Slate 600: #475569
- Slate 700: #334155
- Slate 800: #1E293B
- Slate 900: #0F172A
- Slate 950: #020617

### 1.2 Accent colors
- Fuchsia 100: #FAE8FF
- Fuchsia 200: #F5D0FE
- Fuchsia 300: #F0ABFC
- Fuchsia 400: #E879F9
- Fuchsia 500: #D946EF
- Fuchsia 600: #C026D3
- Violet 300: #C4B5FD
- Violet 400: #A78BFA
- Violet 500: #8B5CF6
- Cyan 300: #67E8F9
- Cyan 400: #22D3EE
- Cyan 500: #06B6D4
- Emerald 300: #6EE7B7
- Emerald 400: #34D399
- Red 500: #EF4444
- Green 500 (success in form): #22C55E

### 1.3 Opacity variants used
- Slate 900 at 80%: rgba(15, 23, 42, 0.8)
- Slate 900 at 70%: rgba(15, 23, 42, 0.7)
- Slate 900 at 60%: rgba(15, 23, 42, 0.6)
- Slate 950 at 80%: rgba(2, 6, 23, 0.8)
- Slate 700 at 70%: rgba(51, 65, 85, 0.7)
- Slate 700 at 60%: rgba(51, 65, 85, 0.6)
- Slate 800 at 80%: rgba(30, 41, 59, 0.8)
- Black at 70%: rgba(0, 0, 0, 0.7)
- Black at 60%: rgba(0, 0, 0, 0.6)
- Fuchsia 500 at 20%: rgba(217, 70, 239, 0.2)
- Fuchsia 500 at 30%: rgba(217, 70, 239, 0.3)
- Fuchsia 500 at 40%: rgba(217, 70, 239, 0.4)
- Fuchsia 500 at 60%: rgba(217, 70, 239, 0.6)
- Fuchsia 500 at 70%: rgba(217, 70, 239, 0.7)
- Fuchsia 600 at 20%: rgba(192, 38, 211, 0.2)
- Cyan 500 at 15%: rgba(6, 182, 212, 0.15)
- Violet 500 at 20%: rgba(139, 92, 246, 0.2)

## 2) Gradient System

### 2.1 Primary CTA gradient
Used on all primary Get Early Access buttons and progress fills.
- Linear (left to right)
- from: fuchsia-500 (#D946EF)
- via: violet-500 (#8B5CF6)
- to: cyan-400 (#22D3EE)

### 2.2 Hero highlight text gradient
Used on key phrase in H1.
- Linear (left to right)
- from: fuchsia-400 (#E879F9)
- via: violet-300 (#C4B5FD)
- to: cyan-300 (#67E8F9)
- Applied with text transparent + background clip text

### 2.3 Page background gradient
- Vertical gradient
- from: black (#000000)
- via: slate-950 (#020617)
- to: black (#000000)

### 2.4 Demo panel gradients
- Inner panel: linear diagonal from slate-900 to slate-950 to slate-900
- Overlay radial blend:
  - radial at 10% 0%: rgba(236,72,153,0.18) to transparent at 55%
  - radial at 90% 100%: rgba(56,189,248,0.18) to transparent at 55%
- Pulse strip inside chart block:
  - linear 120deg
  - rgba(52,211,153,0.2) -> rgba(236,72,153,0.4) -> rgba(56,189,248,0.3)

## 3) Background Styles

- Full-page dark gradient canvas with glowing blurred accent orbs
- Glass-like cards using dark translucent fills and border lines
- Backdrop blur used selectively:
  - Header badge uses backdrop blur
  - Modal overlay uses backdrop blur small
- Modal backdrop:
  - Fixed full-screen black overlay at 70% opacity

## 4) Typography Rules

### 4.1 Font family
- Layout wires Geist and Geist Mono CSS variables on html
- Global body currently sets font-family to Arial, Helvetica, sans-serif
- Effective visible look on page is sans-serif with geometric, modern spacing

### 4.2 Text behavior
- Uppercase labels with high letter spacing are a core AUTOREELIX pattern
- Headings use tight tracking
- Numeric stats use tabular numbers
- Text hierarchy relies on color contrast and size more than font-family switches

### 4.3 Font sizes used
- 0.65rem (micro labels)
- 0.7rem (small labels/captions)
- 0.75rem (fine body text)
- 0.8rem (card text)
- text-xs = 0.75rem
- text-sm = 0.875rem
- text-base = 1rem
- text-lg = 1.125rem
- text-xl = 1.25rem
- text-2xl = 1.5rem
- Hero: text-4xl (2.25rem), text-5xl (3rem), text-6xl (3.75rem)

### 4.4 Font weights used
- 500 medium
- 600 semibold (dominant for headings and CTA)
- 400 regular for body

### 4.5 Tracking values used
- tracking-tight
- tracking-[0.18em]
- tracking-[0.2em]
- tracking-[0.25em]

## 5) Spacing Scale

Observed spacing tokens in active use:
- 0.5 = 0.125rem
- 1 = 0.25rem
- 1.5 = 0.375rem
- 2 = 0.5rem
- 2.5 = 0.625rem
- 3 = 0.75rem
- 4 = 1rem
- 5 = 1.25rem
- 6 = 1.5rem
- 7 = 1.75rem
- 8 = 2rem
- 10 = 2.5rem
- 14 = 3.5rem

Section padding patterns:
- Horizontal container padding: px-4 mobile, px-6 desktop
- Vertical section rhythm: pb-14, pb-16, pb-20, pb-24

## 6) Border Radius System

- rounded-md: 0.375rem
- rounded-lg: 0.5rem
- rounded-xl: 0.75rem
- rounded-2xl: 1rem
- rounded-3xl: 1.5rem
- rounded-full: 9999px

## 7) Border and Ring System

- Typical borders: 1px with slate-800 or slate-700 variants
- Accent border states on hover:
  - cyan-400 at 70% or 80%
  - fuchsia-400 at 70% or 80%
- Ring usage for logo blocks:
  - ring-1 ring-slate-700/60

## 8) Button Styles

### 8.1 Primary CTA button
Shape:
- rounded-full or rounded-xl (context dependent)

Color:
- gradient from fuchsia-500 via violet-500 to cyan-400
- text black

Type styling:
- uppercase
- semibold
- tracking around 0.2em
- often text-xs or 0.7rem

Effects:
- glow shadow in magenta family
- hover brightness increase (hover:brightness-110)
- active scale down (active:scale-95)
- transition enabled

### 8.2 Secondary pill buttons (nav)
- Dark translucent background (slate-900/60)
- Slate border
- Uppercase micro typography
- Hover border and glow color shift by function color

### 8.3 Modal close button
- Small dark chip button
- Slate text, lighter hover text

### 8.4 Signup form submit button
- Solid black background
- White text
- rounded-lg
- semibold

## 9) Card Styles

### 9.1 Base card recipe
- rounded-2xl or rounded-3xl
- border with slate-800 tone
- dark background usually slate-950 with transparency
- soft cool shadow around card
- subtle hover border/glow on interactive cards

### 9.2 Highlighted comparison card
- border-fuchsia-500/60
- bg-slate-900/80

### 9.3 Demo module card
- Nested layers:
  - Outer shell (rounded-3xl)
  - Inner gradient panel (rounded-2xl)
  - Micro cards with rounded-xl

### 9.4 Metric mini card pattern
- Small rounded badge/chips
- tabular numeric value
- muted caption text

## 10) Shadows and Glow Tokens

Exact shadow values in use:
- 0 0 20px rgba(236,72,153,0.6)
- 0 0 25px rgba(15,23,42,1)
- 0 0 30px rgba(15,23,42,1)
- 0 0 30px rgba(34,211,238,0.5)
- 0 0 30px rgba(236,72,153,0.5)
- 0 0 35px rgba(34,211,238,0.6)
- 0 0 40px rgba(15,23,42,1)
- 0 0 40px rgba(236,72,153,0.5)
- 0 0 40px rgba(236,72,153,0.7)
- 0 0 50px rgba(15,23,42,1)
- 0 0 60px rgba(15,23,42,1)
- 0 0 60px rgba(236,72,153,0.35)

Usage principle:
- Cool navy shadows for depth structure
- Fuchsia/cyan glows for emphasis and interactivity

## 11) Animation and Motion Patterns

### 11.1 Ambient motion
- Parallax glow orbs tied to scrollY:
  - translate multipliers: 0.6, 0.3, -0.2
- Floating SmartOrb dot using sine wave vertical transform:
  - translateY(sin(scrollY/80) * 3)

### 11.2 Pulse indicators
- animate-pulse on live dots and signal bars

### 11.3 Transition conventions
- transition on most interactive elements
- duration-300 for transform transitions
- duration-700 for progress width animation

### 11.4 Active interaction
- active:scale-95 on clickable cards and buttons

### 11.5 Data simulation cadence
- signups update every 9000ms
- retention update every 6000ms
- viewers update every 3500ms

## 12) Layout Patterns

### 12.1 Container
- Centered container with max-w-6xl
- Consistent horizontal padding: 1rem mobile, 1.5rem desktop

### 12.2 Section structure
- Alternating block sections with consistent bottom spacing
- Mobile-first stacking, then multi-column at md/lg breakpoints

### 12.3 Common grid/flex patterns
- Hero split: flex-col on mobile, two columns on md+
- Value cards: 1 column mobile, 3 columns sm+
- Comparison cards: 1 column mobile, 3 columns md+
- Trust/founder: 1 column mobile, 2 columns lg+

### 12.4 Footer
- Vertical stacking on mobile
- Horizontal distribution at md+

### 12.5 Modal
- Full-screen overlay center align
- max-w-md modal card
- click outside to close

## 13) Reusable UI Pattern Library

Recommended reusable components based on current implementation:
- PrimaryGradientButton
- SecondaryPillButton
- GlowCard
- ComparisonCard
- ValueCard
- LiveStatStrip
- DemoPanel
- MicroStatusBadge
- ModalShell
- OrbSignalIndicator

## 14) Brand Implementation Rules

To match AUTOREELIX brand in another project:
- Keep dark-first foundation with slate and black base
- Use fuchsia-violet-cyan gradient only for key actions and key phrases
- Maintain uppercase micro-label pattern with wide tracking
- Preserve glowing depth language (soft navy shadows + neon accents)
- Keep motion subtle and purposeful (pulse, micro-scale, light parallax)
- Avoid flat surfaces; favor layered translucent cards with borders
- Keep primary CTA copy concise and consistent: Get Early Access

## 15) Quick Token Export

Suggested core token set:
- Brand accent gradient: #D946EF -> #8B5CF6 -> #22D3EE
- Surface base: #020617
- Surface elevated: rgba(15,23,42,0.8)
- Border default: #1E293B
- Border muted: rgba(51,65,85,0.7)
- Text primary: #F8FAFC
- Text secondary: #CBD5E1
- Text muted: #94A3B8
- Success: #34D399
- Warning/alert pulse: #EF4444

End of AUTOREELIX design system reference.
