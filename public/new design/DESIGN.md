---
name: Shabash Wedding Elegance
colors:
  surface: '#081610'
  surface-dim: '#081610'
  surface-bright: '#2e3c35'
  surface-container-lowest: '#04110b'
  surface-container-low: '#101e18'
  surface-container: '#14221c'
  surface-container-high: '#1f2d26'
  surface-container-highest: '#293831'
  on-surface: '#d6e6dc'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#d6e6dc'
  inverse-on-surface: '#25332d'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#b7cbc0'
  on-secondary: '#23342c'
  secondary-container: '#394b42'
  on-secondary-container: '#a6baaf'
  tertiary: '#ebca7d'
  on-tertiary: '#3e2e00'
  tertiary-container: '#ceaf64'
  on-tertiary-container: '#574200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#d3e7dc'
  secondary-fixed-dim: '#b7cbc0'
  on-secondary-fixed: '#0e1f18'
  on-secondary-fixed-variant: '#394b42'
  tertiary-fixed: '#ffdf95'
  tertiary-fixed-dim: '#e3c376'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#081610'
  on-background: '#d6e6dc'
  surface-variant: '#293831'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 72px
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 48px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 34px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 30px
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 26px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 22px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a high-end, romantic digital sanctuary tailored for Persian wedding planning, bespoke venue booking, and ceremonial coordination. Rooted in Persian celebratory heritage, the visual identity marries ceremonial opulence with modern editorial restraint. 

The mood combines dark romanticism and warm celebration: deep forest emerald tones invoke intimate nocturnal gardens and timeless banquet halls, while lustrous champagne gold accents evoke fine filigree, wedding coins, and bridal jewelry. 

### Aesthetic Pillars
- **Neo-Persian Luxury Glassmorphism:** Translucent jade and deep emerald glass surfaces suspended over ambient golden illumination, paired with crisp hair-thin metallic borders.
- **Ceremonial Warmth:** Balanced contrast using warm ivory and alabaster typography instead of stark digital white, honoring the delicacy of handmade bridal fabrics.
- **RTL-Native Fluidity:** Designed natively for right-to-left layout architecture, ensuring optical alignment, graceful ligatures, and cohesive directional flow across all Persian interactive components.

## Colors

The palette is tuned specifically for a dark, luminescent celebratory atmosphere:

- **Primary (`#D4AF37` - Champagne Gold):** Key focal points, active states, call-to-actions, primary icons, and luxury accents.
- **Secondary (`#13241D` - Deep Forest Glass):** Surface layers, card backgrounds, elevated containers, and input panels.
- **Tertiary (`#E2C275` - Pale Gold Leaf):** Subtle borders, gold badges, shimmering highlights, and step indicators.
- **Neutral (`#0F1D17` - Obsidian Emerald Base):** Deep canvas background that provides infinite depth and zero eye strain.

### Functional Tint & Surface Palette
- **Canvas Base:** `#0F1D17`
- **Surface Level 1 (Frosted Glass):** `rgba(19, 36, 29, 0.65)` with `16px` backdrop blur.
- **Surface Level 2 (Elevated Modal / Dropdown):** `rgba(26, 48, 39, 0.85)` with `24px` backdrop blur.
- **Border Trim (Metallic Gold):** `rgba(212, 175, 55, 0.25)` to `rgba(226, 194, 117, 0.12)`.
- **Text Primary (Warm Alabaster):** `#FDFBF7`
- **Text Secondary (Muted Cream):** `#D1DCD5`
- **Text Tertiary (Subdued Moss):** `#8C9E94`

## Typography

The type system is balanced for bilingual and Persian script contexts (with immediate CSS font stack fallback to `Vazirmatn`, `Shabnam`, and `system-ui`). 

### Optical Rules for Persian Script
- **Generous Leading:** Persian script demands higher line-height ratios (`1.5` to `1.75`) compared to Latin glyphs to ensure ascending and descending dots, accents, and Kashida extensions never collide.
- **Display Weights:** Reserved for primary headlines (`شاباش یادت نره`), setting a celebratory, authoritative, yet romantic tone.
- **Numerical Treatment:** Wedding dates, guest capacities, and booking costs utilize Persian-Indic numerals formatted in medium/semibold weight for rapid scanning.

## Layout & Spacing

The platform follows a responsive 12-column layout on desktop and 4-column layout on mobile, centered within a max-width container of `1280px` to maintain focused ceremonial intimacy.

### Breakpoints & Fluid Adaptation
- **Mobile (< 768px):** Outer margin collapses to `1.25rem` (`20px`). Process steps reflow from horizontal connected pipelines into a vertical timeline or swipeable luxury card deck.
- **Tablet (768px – 1024px):** 8-column layout, `1.5rem` gutter.
- **Desktop (> 1024px):** Generous vertical spacing (`2.5rem` - `4rem` section gaps) ensures that visual imagery (bridal portraits, hall photography) and typography have ample breathing room.

## Elevation & Depth

Visual hierarchy relies on translucent layering, subtle champagne ambient illumination, and hairline metallic borders rather than muddy black drop-shadows.

### Elevation Hierarchy
1. **Canvas Level (0):** Deepest background `#0F1D17` with radial golden ambient lights (`radial-gradient(ellipse at 50% 10%, rgba(212, 175, 55, 0.08), transparent 70%)`).
2. **Surface Tier 1 (Cards, Floating Nav):** `background: rgba(19, 36, 29, 0.65)` layered with `backdrop-filter: blur(16px)`, bordered by a `1px` translucent gold stroke (`rgba(212, 175, 55, 0.2)`). Box shadow: `0 8px 32px 0 rgba(0, 0, 0, 0.35)`.
3. **Surface Tier 2 (Hover States & Active Cards):** `background: rgba(26, 48, 39, 0.8)`, bordered by `rgba(226, 194, 117, 0.45)`, accompanied by a soft golden halo: `box-shadow: 0 12px 40px -10px rgba(212, 175, 55, 0.25)`.
4. **Surface Tier 3 (Modals & VIP Booking Drawers):** High-opacity emerald slate `rgba(15, 29, 23, 0.95)` with dual rim-lighting: inner highlight `inset 0 1px 0 rgba(226, 194, 117, 0.3)` and external ambient shadow `0 24px 64px rgba(0, 0, 0, 0.6)`.

## Shapes

The interface embraces balanced curves (Level 2: `0.5rem` base, scaling to `1rem` on cards and `1.5rem` on prominent hero elements). 

- **Cards & Step Modules:** `16px` (`rounded-lg`) border radius creates an organic, jewel-like container.
- **Interactive Badges & CTAs:** Fully rounded pill shapes (`9999px`) for city selectors, quick filters, and primary buttons.
- **Portraits & Media Frames:** `20px` to `24px` radius with a dual hairline border imitating a gilded physical picture frame.

## Components

### 1. Buttons
- **Primary Action (Gold Shimmer):** Solid gradient fill `linear-gradient(135deg, #E2C275 0%, #D4AF37 50%, #B89225 100%)`, text color `#0A140F` (rich forest black), bold weight, pill-shaped (`9999px`), subtle inset light reflection on top rim.
- **Secondary (Glass Emerald):** `rgba(255, 255, 255, 0.05)` fill, `1px` border `rgba(212, 175, 55, 0.3)`, text `#FDFBF7`. On hover, border brightens to `rgba(212, 175, 55, 0.8)` with a warm gold glow.

### 2. Step Process Flow (Persian Ceremonial Steps)
- Four sequential nodes:
  1. `درخواست` (Inquiry & Date)
  2. `رزرو تالار` (Venue Reservation)
  3. `عکاسی و فیلمبرداری` (Photography & Cinema)
  4. `روز عروسی` (Wedding Day Celebration)
- **Node Geometry:** `48x48px` rounded square containers with frosted emerald background and gold hairline borders.
- **Active Step:** Filled with semi-translucent gold tint, displaying illuminated Persian numbers (`۱`, `۲`, `۳`, `۴`).
- **Connecting Rail:** Fine horizontal dashed or solid gold line (`rgba(212, 175, 55, 0.3)`) connecting nodes right-to-left.

### 3. Chips & Location Badges
- Used in navigation for city selection (e.g., `خراسان شمالی، بجنورد`) and filter tags.
- Frosted glass container (`rgba(19, 36, 29, 0.7)`), `1px` border `rgba(212, 175, 55, 0.25)`, warm ivory text with integrated gold location marker icon.

### 4. Input Fields
- Deep forest background `rgba(10, 20, 15, 0.6)`, placeholder text in `#8C9E94`, active cursor and focus border in glowing champagne gold (`#D4AF37`).
- Text alignment natively aligned to the right with comfortable internal padding (`12px 16px`).

### 5. Venue & Service Cards
- Multi-layered card featuring high-resolution photography with a subtle gradient scrim fade into deep forest emerald at the bottom.
- Bottom panel displays venue capacity, pricing tier, verified Persian seal badge, and a smooth quick-booking CTA.