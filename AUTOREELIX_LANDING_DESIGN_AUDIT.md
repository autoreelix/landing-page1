# AUTOREELIX Landing Design Audit

Date: 2026-07-25
Reference surface: landing page implementation in [app/page.tsx](app/page.tsx), [app/components/FoundingCreatorApplicationForm.tsx](app/components/FoundingCreatorApplicationForm.tsx), [app/globals.css](app/globals.css), and [app/layout.tsx](app/layout.tsx).

This document is the visual reference for redesigning the main AUTOREELIX application so it inherits the same brand feeling without becoming a marketing page.

## 1. Brand Identity

### Overall feeling

The landing page feels like a premium, nocturnal creator technology product. It uses cinematic dark surfaces, soft neon energy, and a single strong intelligence object - SmartOrb - to create a sense of mystery, control, and high-end product design.

### Brand personality

AUTOREELIX comes across as:

- intelligent, not noisy
- premium, not playful-default
- futuristic, but still warm enough for creators
- confident, not overexplained
- creator-first, not enterprise-admin

### What makes it feel premium

The page feels premium because it combines multiple high-end signals at once:

- a deep slate-black background instead of a flat white canvas
- layered translucent cards with soft borders
- a central glowing orb that behaves like a product icon rather than decoration
- restrained motion instead of constant animation
- strong typography hierarchy with generous spacing
- accent gradients used selectively, not everywhere

### How it communicates Creator Intelligence System

The design communicates Creator Intelligence System through three cues:

1. SmartOrb is visually treated as a thinking object.
2. The copy repeatedly frames AUTOREELIX as learning the creator over time.
3. Demo and value blocks emphasize analysis, memory, guidance, and growth.

This is important: the page does not merely say "AI." It implies a persistent creative partner that studies patterns, understands style, and improves with use.

### Emotional response created by the design

The design creates a mix of:

- curiosity
- trust
- exclusivity
- creative ambition
- light tension that encourages clicking the orb and applying

The intended emotional sequence is:

1. "What is this?"
2. "That orb feels alive."
3. "This is for creators like me."
4. "I want my own SmartOrb."

## 2. Color System

### Background colors

Exact values used in the page shell and global styles:

- Primary background: `#020617`
- Body text background default in globals: `#020617`
- Deep dark surfaces: `rgba(15, 23, 42, 0.8)`
- Additional deep surface variant: `rgba(2, 6, 23, 0.8)`
- Footer background: `rgba(0, 0, 0, 0.5)`

### Gradient colors

Primary CTA and action gradient:

- `from-fuchsia-500` -> `#D946EF`
- `via-violet-500` -> `#8B5CF6`
- `to-cyan-400` -> `#22D3EE`

Hero highlight gradient:

- `from-fuchsia-400` -> `#E879F9`
- `via-violet-300` -> `#C4B5FD`
- `to-cyan-300` -> `#67E8F9`

Orb and panel gradients rely on layered radial and diagonal blends rather than one single token.

### Accent colors

Core accent family used throughout:

- Fuchsia: `#D946EF`, `#C026D3`, `#E879F9`, `#F0ABFC`
- Violet: `#8B5CF6`, `#A78BFA`, `#C4B5FD`
- Cyan: `#22D3EE`, `#06B6D4`, `#67E8F9`
- Emerald: `#34D399`, `#6EE7B7`
- Red: `#EF4444`

### Glow colors

Observed glow usage:

- Fuchsia glow for orb energy and primary CTA emphasis
- Cyan glow for intelligence and active interaction states
- Soft navy shadows for depth

### Text colors

Typical text palette:

- Primary text: `slate-50`
- Secondary text: `slate-300`
- Muted text: `slate-400` and `slate-500`
- Success text: `emerald-300` and `emerald-400`
- Error text: `red-300`

### Card colors

Cards use dark layered surfaces instead of bright panels:

- `bg-slate-950/80`
- `bg-slate-950/75`
- `bg-slate-950/70`
- `bg-black/45`
- `bg-black/35`

### Border colors

Common border values:

- `border-slate-800`
- `border-slate-800/80`
- `border-slate-700/80`
- `border-slate-700/90`
- Accent states: `border-cyan-400/40`, `border-cyan-400/70`, `border-fuchsia-500/20`, `border-fuchsia-400/70`

### Color system summary

The landing page uses a "dark cosmos" system:

- black and slate for structure
- fuchsia for desire and energy
- violet for depth and mystery
- cyan for intelligence and interaction
- emerald for live-state confirmation

## 3. Typography

### Font family

The app layout wires:

- Geist
- Geist Mono

The visible body font on the landing page is Geist-based, with monospace available for select technical use cases.

### Font sizes

Key sizes observed in the page:

- Hero heading: `text-5xl`, `text-6xl`, `text-7xl`
- Section headings: `text-3xl`, `text-4xl`
- Card headings: `text-2xl` or smaller
- Body copy: `text-base`, `text-lg`, `text-sm`
- Micro labels: `text-[0.65rem]`, `text-xs`

### Font weights

The page uses:

- `font-semibold` for headers and CTA text
- `font-medium` for labels and small UI states
- normal weight for body paragraphs

### Heading hierarchy

The hierarchy is simple and deliberate:

1. Hero statement about SmartOrb
2. Section headings about creator problems and value
3. Card titles and micro labels

The hierarchy is driven more by size, contrast, and spacing than by font family changes.

### Body text styling

Body text is:

- light on dark surfaces
- low-to-medium contrast in secondary areas
- set with comfortable line heights (`leading-6` and `leading-7`)
- used sparingly so the page stays editorial instead of dense

### Button text styling

Primary buttons use:

- uppercase text
- semibold weight
- tracking around `0.22em`
- compact size for a product-like feel

### Letter spacing

The brand uses wide tracking for:

- labels
- pills
- CTA chips
- micro status text

This gives the page a systemized, premium, almost hardware-like personality.

## 4. Shape Language

### Border radius values

Observed radius scale:

- `rounded-full` for orb shells, pills, and pill buttons
- `rounded-[2rem]` for major containers
- `rounded-3xl` in the broader design system reference
- `rounded-2xl` for cards, pills, and inner modules
- `rounded-[1.5rem]` for value cards and content blocks
- `rounded-lg` for small badges or icon containers

### Rounded corner style

The page avoids sharp corners almost entirely. The visual language is soft, luxurious, and tactile. The orb is the most circular element, while cards and blocks are still very rounded but slightly more architectural.

### Card shapes

Cards are:

- rounded
- layered
- border-defined
- shadowed
- slightly translucent

This makes them feel like illuminated panels rather than dashboard tiles.

### Buttons

Buttons are mostly pill-shaped or chip-shaped. Primary actions are high-contrast pills; secondary actions are dark outlined pills; demo selectors are card-like buttons.

### Containers

Containers are broad and centered, with no cramped columns. The structure feels like a carefully composed product poster rather than a dense SaaS admin layout.

### Pills

Pills are a core motif.

- Status pills use uppercase micro labels
- Persona mode pills provide interaction
- CTA pills carry the main action

### Floating elements

Floating design elements include:

- blurred background orbs
- orb halo layers
- subtle pulse indicators
- projected glow around SmartOrb

### Difference from a typical SaaS dashboard

This differs from a dashboard in three major ways:

1. It prioritizes mood and curiosity over data density.
2. It uses artful shells and glows instead of rigid utility panels.
3. It gives SmartOrb symbolic importance rather than treating it as one widget among many.

## 5. Spacing and Layout

### Page width

The page uses a wide centered container pattern:

- `max-w-7xl`
- large horizontal gutters on desktop
- consistent padding on mobile and desktop

This gives it a premium, spacious footprint.

### Section spacing

Sections are separated by meaningful vertical rhythm:

- hero block
- creator problem block
- demo block
- value and before/after block
- application block
- footer

The gaps are generous enough to keep each section legible as its own chapter.

### Padding

The page uses substantial internal padding in cards and modules so it does not feel cramped. This is especially important for the orb shell and application form.

### Alignment

The page mixes:

- left-aligned narrative text
- centered hero object focus
- grid-based content modules

This helps the layout feel editorial rather than mechanical.

### Grid systems

The page uses a few repeated grid patterns:

- hero split on large screens
- two-column demo and value sections
- 2- and 3-column card grids for supporting content

### Breathing room

Breathing room is one of the strongest visual attributes of the design. Cards are not stacked tightly. There is space around the orb, around the sections, and inside the major containers.

## 6. Effects and Animations

### Glows

Glow is a defining visual layer:

- background orb glows
- SmartOrb halo glow
- CTA glow shadows
- cyan and fuchsia accent glows on hover

### Shadows

Observed shadow values include:

- `0 0 40px rgba(15,23,42,1)`
- `0 0 60px rgba(15,23,42,1)`
- `0 0 80px rgba(217,70,239,0.28)`
- `0 0 30px rgba(236,72,153,0.5)`
- `0 0 35px rgba(34,211,238,0.18)`
- `0 0 50px rgba(15,23,42,1)`

### Blur effects

- background orbs use blur-3xl
- SmartOrb projection uses blur layers
- glass cards and overlays use backdrop blur selectively

### Glass effects

The design uses dark translucent cards with borders and soft blur. This is restrained glassmorphism rather than glossy glass everywhere.

### Gradients

Gradients are used for:

- CTA emphasis
- hero text highlight
- orb radiance
- panel atmosphere

### Motion animations

Current motion is subtle:

- `animate-pulse` on live dots and orb energy
- hover scale on key interactive elements
- smooth scrolling in the page shell

### Hover effects

Hover states are handled by:

- border brightening
- slight scale increase
- stronger glow

The hover response feels premium because it is never over-animated.

### Transitions

Transitions are smooth and restrained. The landing page avoids rapid motion or noisy motion stacks.

## 7. SmartOrb Design

### Size

SmartOrb is large enough to dominate the right side of the hero and remain visually memorable.

### Position

It sits in the hero as the centerpiece object, then reappears in the demo response area so the user keeps re-encountering it.

### Colors

SmartOrb uses:

- fuchsia internal radiance
- cyan outer light
- slate-black depth
- soft white highlights on the top edge

### Glow

The orb has multiple glow layers, making it feel energetic and alive rather than flat.

### Animation

The orb uses pulse behavior and hover scaling. The motion is enough to suggest intelligence without becoming a gimmick.

### How it attracts attention

SmartOrb attracts attention by combining:

- scale
- central placement
- glow
- contrast against the dark page
- copy that tells the visitor to click it

### How it represents intelligence

It does not look like a generic assistant icon. It feels like a luminous intelligence core - something that thinks, listens, and emits guidance.

### How the app should recreate this feeling

The main app should keep SmartOrb as a persistent center-of-gravity object. It should be treated as the companion and intelligence engine of the workspace, not as a secondary decorative element.

For the app, preserve:

- the orb silhouette
- the layered glow
- the sense of depth
- the sense that the orb is the source of insight

## 8. Component Inventory

Reusable components and patterns visible in the landing page:

- Navbar / top brand bar
- Primary CTA button
- Secondary pill buttons
- SmartOrb hero object
- Persona mode selector chips
- Prompt selector cards
- Response panel
- Value cards
- Before/after cards
- Founding creator program block
- Application form shell
- Footer brand strip
- Glow background layer
- Section containers

## 9. App Translation Guide

The main AUTOREELIX application should inherit the landing page system, but with a more functional and less promotional composition.

### What the app should copy

#### Colors

- keep the dark slate / black base
- keep fuchsia-violet-cyan accent logic
- keep emerald for active/success states

#### Spacing

- preserve generous spacing
- avoid dense dashboard grids
- use breathing room around key creator moments

#### Shapes

- preserve rounded shells
- keep pill buttons and soft cards
- continue the orb-centric circular language

#### Hierarchy

- SmartOrb should stay visually central
- creator guidance should feel primary
- secondary utility should recede

#### Effects

- keep glow, blur, and dark glass layers
- use motion sparingly and purposefully

### What the app should remove

- dashboard feeling
- excessive cards competing for attention
- cluttered tables of equal visual weight
- utilitarian admin chrome
- feature grid saturation

### Translation principle

The app should feel like a premium creator operating system, not a collection of widgets. SmartOrb should feel like the creative director sitting beside the creator, not a sidebar assistant.

## 10. Final Design Tokens

### Colors

- Base background: `#020617`
- Deep surface: `rgba(15, 23, 42, 0.8)`
- Text primary: `#F8FAFC` / slate-50
- Text secondary: `#CBD5E1` / slate-300
- Text muted: `#94A3B8` / slate-400-500
- CTA gradient: `#D946EF` -> `#8B5CF6` -> `#22D3EE`
- Hero gradient: `#E879F9` -> `#C4B5FD` -> `#67E8F9`
- Success: `#34D399`
- Error: `#EF4444`

### Radius

- Major shells: `rounded-[2rem]`, `rounded-3xl`
- Cards: `rounded-2xl`, `rounded-[1.5rem]`
- Pills: `rounded-full`
- Small containers: `rounded-lg`

### Shadows

- Ambient dark shadow: `0 0 40px rgba(15,23,42,1)`
- Strong orb glow: `0 0 80px rgba(217,70,239,0.28)`
- Cyan highlight glow: `0 0 35px rgba(34,211,238,0.18)`
- CTA glow: `0 0 30px rgba(236,72,153,0.5)`

### Typography

- Font family: Geist / Geist Mono
- Hero: `text-5xl` to `text-7xl`
- Section headings: `text-3xl` to `text-4xl`
- Body: `text-base`, `text-lg`, `text-sm`
- Micro labels: `text-[0.65rem]`, `text-xs`
- Weights: `font-semibold` for emphasis, `font-medium` for labels
- Letter spacing: wide tracking for micro labels and pills

### Spacing

- Container: `max-w-7xl`
- Section rhythm: generous vertical separation
- Card padding: medium to large
- Mobile gutters: comfortable and consistent

### Animation rules

- Use pulse sparingly for live or intelligent cues
- Use hover scale only on interactive surfaces
- Favor slow, premium transitions over fast motion
- Let the orb feel alive, but not busy

## Closing Guidance

If the main application matches this system, it should feel like AUTOREELIX rather than a generic AI tool:

- dark, cinematic, and premium
- creator-centric and emotionally legible
- SmartOrb-led, not feature-grid-led
- calm enough for workflow, vivid enough for aspiration

This landing page is a strong visual reference. The app redesign should adopt its atmosphere and hierarchy, then reduce the marketing density and increase the product utility.