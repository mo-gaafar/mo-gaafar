# 03 · Design System

Extracted from `static/css/resume-override.css` (the authoritative custom
stylesheet) plus theme `resume.css` / `tweaks.css`. Use this as the source of
truth for tokens when rebuilding, so the new site can preserve or deliberately
evolve the look.

## Color tokens (`:root`)

| Token | Value | Role |
|-------|-------|------|
| `--primary-color` | `#176b87` | Teal — links, accents, primary buttons, stat numbers |
| `--secondary-color` | `#f2b84b` | Gold — currently barely used |
| `--accent-color` | `#b6425f` | Magenta/rose — link hover, gradient wash |
| `--text-color` | `#15232b` | Body text |
| `--ink-color` | `#0d171d` | Headings, dark nav background |
| `--muted-color` | `#5f6f78` | Secondary text |
| `--background-color` | `#f5f7f8` | Page background (with subtle dual-gradient wash) |
| `--surface-color` | `#ffffff` | Cards / panels |
| `--surface-alt-color` | `#edf3f4` | Alt surfaces (proof grid, archive panel) |
| `--border-color` | `rgba(21,35,43,0.12)` | Hairline borders |
| `--shadow-soft` | `0 18px 50px rgba(13,23,29,0.08)` | Elevated panels |
| `--shadow-card` | `0 10px 28px rgba(13,23,29,0.07)` | Cards |

Overall feel: **light, professional, teal-forward** with soft shadows and 8px
radii. Body has a layered gradient wash (teal top-left, rose bottom-right).

> There is **no dark mode**. A modern rebuild should add one.

## Typography

- Families: **Open Sans** (body + headings) and **Saira Extra Condensed**
  (loaded but the override reassigns headings to Open Sans 800).
- Headings: weight 800, no uppercase, tight line-height.
  - `h2`: `clamp(2rem, 4vw, 3.4rem)`, line-height 1.05.
  - `h3`: `clamp(1.25rem, 2vw, 1.65rem)`.
  - Hero `h1`: `clamp(2.8rem, 6.2vw, 4.8rem)`, line-height 0.96.
- Body line-height 1.7.
- Uppercase + letter-spacing used for kickers, subheadings, nav links, skill group labels.

## Layout system

- **Fixed left sidebar nav** at ≥992px: `#sideNav` width `13rem`, body gets
  `padding-left: 13rem`. Dark background `rgba(13,23,29,0.96)`.
- Below 992px: nav collapses to a top bar with blur backdrop; hamburger toggle.
- Content sections: `section.resume-section`, `max-width: 1120px`, centered,
  generous padding (`5rem` / `5.5rem` desktop), hairline top borders between sections.
- Hero (`.landing-hero`): `max-width: 1240px`, min-height ~viewport, two-column
  `hero-grid` (`minmax(0,1.04fr)` copy / `minmax(300px,0.72fr)` panel),
  collapses to one column ≤860px.

### Responsive breakpoints in use

| Breakpoint | Behavior |
|------------|----------|
| ≥992px | Fixed sidebar, body left padding, larger section padding |
| ≤991px | Sidebar → collapsible top bar, blur backdrop |
| ≤860px | Hero grid → single column |
| ≤575px | Reduced padding, stacked full-width buttons, single-column proof grid |

## Component inventory (custom classes)

These are the reusable UI pieces the current site defines. A rebuild should map
each to a component.

- **Nav**: `.nav-brand-lockup` (name + role), `.nav-mini-cta` (Get in touch),
  `.nav-social-list` / `.nav-x-icon` (custom X glyph).
- **Hero**: `.hero-grid`, `.hero-kicker`, `.hero-copy`, `.hero-lede`,
  `.hero-actions`, `.hero-button` (`-primary` / `-secondary`), `.hero-resume-link`,
  `.hero-meta`, `.hero-email`, `.hero-focus-list` (pill tags),
  `.hero-panel`, `.hero-portrait`, `.hero-proof-grid`, `.hero-footer`,
  `.hero-social-block`.
- **Upwork badge**: `.upwork-badge` + `.upwork-badge-mark` (hexagon clip-path,
  pink `#ff5db8`, inline SVG star).
- **Tags/pills**: `.tag` and `.hero-focus-list span` (teal-tinted chips).
- **Buttons**: `.hero-button-primary` (teal→ink on hover), `.hero-button-secondary`
  (translucent white). Reused on the resume page for Open/Download PDF.
- **Skills chips**: `#skills-content .list-inline-item` (white bordered chips,
  wrap in flex), `.skills-heading` (uppercase group labels).
- **Resume/experience cards**: `.resume-item` (white card, border, shadow),
  `.resume-content`, `.resume-date`, `.subheading`.
- **Publications**: `.publication-content`.
- **Blog/archive**: `.archive-link-panel`.
- **Resume viewer**: `.resume-viewer`, `.resume-actions`, `.pdf-frame` (8.5:11 aspect iframe).

## Iconography

Font Awesome 5 (`fas fa-*`) used inline in templates (paper-plane, layer-group,
file-alt, map-marker, envelope, external-link, download). Devicons render skill
badges (`.devicons-*`) resolved via `themes/hugo-resume/data/devicons` lookup
with a `terminal_badge` fallback. Custom inline SVG for the Upwork star.

## Known design constraints / debt

- Bootstrap 4 utility classes are relied on throughout templates (`d-flex`,
  `p-3 p-lg-5`, `mb-5`, grid) — a non-Bootstrap rebuild must replace these.
- Hard-coded hero proof numbers (not data-driven).
- No dark mode, no motion/transition system beyond simple hovers.
- Two heading fonts loaded but effectively one used.
- Single stylesheet (~740 lines) — no componentization; fine for Hugo, but a
  React/Next rebuild should decompose into component styles / tokens.

## Design direction to preserve (from CLAUDE.md)

- Modern consultant/portfolio feel; clean hero with strong CTAs; proof metrics
  in hero; business-focused (not academic-only).
- **Do not** revert to the old oversized classic-resume look.
- Keep the homepage from feeling like an Upwork profile (Upwork stays a
  supporting badge, not the headline).
