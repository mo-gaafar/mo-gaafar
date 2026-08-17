# 06 · Rebuild Plan

Proposed plan to rebuild and modernize the portfolio around an **AI Engineer +
Fractional CTO** positioning. Mohamed has approved **switching frameworks** and
adding **PayloadCMS**, so this plan targets a full stack migration rather than
incremental Hugo edits.

> Status: proposal for review. Nothing here is built yet. Decisions marked
> **[DECIDE]** need Mohamed's sign-off before implementation.

## 1. Target stack

Recommended: **Next.js (App Router) + PayloadCMS 3** in a single repo.

Payload 3 installs *into* a Next.js app and shares its runtime, so one codebase
serves both the website and the admin CMS — a clean fit for this use case.

| Concern | Recommendation | Why |
|---------|----------------|-----|
| Framework | **Next.js 15 (App Router, React 19)** | First-class Payload integration; SSG/ISR for SEO; modern DX |
| CMS | **PayloadCMS 3** (self-hosted, in-app) | User-requested; TypeScript-native; owns content, media, and structured data (experience/skills/projects) |
| Database | **[DECIDE]** Postgres (Neon/Supabase) or MongoDB | Payload supports both. Postgres recommended for relational content + free-tier hosts |
| Styling | **Tailwind CSS + CSS variables** for the existing token palette | Replaces Bootstrap 4; keeps the teal design language (see `03-design-system.md`) |
| Components | Headless (Radix) or shadcn/ui | Accessible primitives; dark-mode ready |
| Media | Payload media collection + Next `<Image>` | Replaces `static/img` |
| Hosting | **[DECIDE]** Vercel (natural for Next+Payload) vs. self-host | Note: static-only GitHub Pages **cannot** run Payload's server/admin — hosting must change |
| Analytics | Keep GA4 (`G-5GL6K1NVFM`) or move to Plausible/Vercel Analytics | |

### Hosting implication (important)

The current site is static (GitHub Pages / Netlify). PayloadCMS needs a Node
server + database, so **the deployment model must change** (e.g. Vercel + a
managed Postgres). The public site can still be statically generated/ISR'd for
speed; only the CMS/admin needs the server. Confirm hosting + domain cutover
plan for `mngaafar.com` before launch.

## 2. Content model in Payload (collections & globals)

Map today's Hugo content/data (see `02-content-and-data.md`) to Payload:

**Globals** (singletons):
- `SiteSettings` — name, title, description, email, phone, location, profile image, social handles, Upwork URL, analytics ID, feature toggles.
- `Home` — hero (kicker, headline, lede, CTAs, focus tags), **proof metrics
  (now data-driven, reconciled)**, services intro.

**Collections:**
- `Experience` — role, company, range, summary, order, `type` (CTO / consulting / engineering) for filtering.
- `Skills` — grouping + items (or a `SkillGroup` collection).
- `Education` — school, degree, major, notes, range.
- `Certifications` — name, description, badge, proof.
- `Projects` — title, slug, summary, body (rich text), link, featured, cover image, tags. (Merges Hugo "creations".)
- `CaseStudies` — **new**: problem, role/what I led, stack, measurable outcome, logo/image. (Powers the fractional-CTO story.)
- `Publications` — title, pubtype, date, DOI/link, description, image, tags.
- `Posts` (blog) — title, slug, date, body, featured, `archived`, tags, `advtags`, **and an `aliases`/redirects field** to preserve old URLs.
- `Testimonials` — **new**: quote, author, role, company, avatar.
- `Media` — uploads (replaces `static/img`, resume PDF).

## 3. Page / IA changes (positioning-driven)

New homepage narrative (top → bottom):

1. **Hero** — "AI Engineer & Fractional CTO" headline, sharpened lede, primary
   CTA = **book a call** (Cal.com/Calendly) + secondary = case studies. Keep the
   proof grid (data-driven).
2. **Services / "How I work"** — *new*: Fractional CTO · Applied AI Engineering ·
   AI Advisory. Each with a one-line outcome and who it's for.
3. **Selected case studies** — *new*: 2–3 deep stories (EXODIA RAG 70%, voice AI
   50K calls, a leadership/scale story).
4. **Proof / logos / testimonials** — *new/expanded*.
5. **Experience** — condensed, CTO-first ordering.
6. **Skills** — grouped, keep neurotech group as differentiator.
7. **Publications & Education** — moved lower (support, not lead).
8. **Writing (blog)** — featured posts + archive.
9. **Contact** — booking + email + socials.

Keep dedicated routes: `/projects`, `/blog` (+ `/blog/archive`), `/resume`,
`/publications`, per-item pages. Preserve `/resume` PDF and its URL.

## 4. Must-preserve on migration (do-not-break list)

- All content in `02-content-and-data.md` (experience, skills, education, certs, projects, publications, blog).
- **Blog archive aliases / old URLs** → implement as Next redirects.
- Resume PDF at `/files/Mohamed%20Gaafar%20CV.pdf` (or a redirect to the new path).
- Canonical domain `https://www.mngaafar.com/` + `www`/non-`www` behavior.
- SEO: per-page title/description/OG, sitemap, robots, GA4, tag pages.
- Social handles + Upwork badge (as supporting proof).

## 5. Design system carry-over

Reuse tokens from `03-design-system.md` as CSS variables / Tailwind theme:
teal `#176b87` primary, ink `#0d171d`, rose `#b6425f` accent, surfaces, shadows,
8px radii, Open Sans. **Add:** dark mode, a motion system, and componentized UI.
Keep the "modern consultant, not Upwork profile, not classic resume" guardrails.

## 6. Suggested phasing

1. **Phase 0 — Approve** stack, DB, hosting, and the new IA/messaging (this doc + `05`).
2. **Phase 1 — Scaffold** Next + Payload; define collections/globals; wire DB; set up Tailwind + tokens; dark mode.
3. **Phase 2 — Migrate content** from `content/` + `data/*.json` into Payload (seed script); import media; port blog posts (+ redirects).
4. **Phase 3 — Build pages** per new IA; port design system; add Services + Case Studies + Testimonials; booking CTA.
5. **Phase 4 — SEO + parity check** against `04-page-map.md`; sitemap/robots/redirects; Lighthouse; a11y; dark mode QA.
6. **Phase 5 — Deploy** to chosen host; domain cutover; verify redirects & analytics; decommission old pipeline (retire stale `.gitmodules`, dual deploy).

## 7. Open decisions **[DECIDE]**

- Database: Postgres vs. MongoDB.
- Hosting: Vercel vs. self-hosted (affects Payload runtime + cost).
- Booking tool for the CTA (Cal.com / Calendly / mailto fallback).
- Whether to keep the neurotech/BCI thread as a first-class section or a "beyond
  AI" sub-page.
- Repo strategy: rebuild in-place on this branch (Hugo files removed at cutover)
  vs. a `/next` subtree during transition.
- Analytics: stay on GA4 or switch.

## 8. Risks

- **Hosting change is mandatory** for Payload (no static-only host). Budget for a
  small always-on server/serverless + DB.
- Content migration fidelity (front matter → structured fields; rich-text conversion).
- SEO regression if redirects/aliases aren't ported 1:1.
- Scope creep: new sections (case studies, testimonials) need Mohamed's input/content.
