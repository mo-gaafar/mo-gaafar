# 07 · Implementation (what was built)

The rebuild in [`06-rebuild-plan.md`](06-rebuild-plan.md) was implemented. This
records what actually shipped.

## Stack (as built)

- **Next.js 15.3.9** (App Router, React 19) + **PayloadCMS 3.88** in one app.
- **Postgres** via `@payloadcms/db-postgres` (schema `push: true` — no manual
  migration step on first boot).
- Framework-free CSS design system with **light + dark** themes
  (`src/app/(frontend)/globals.css`), teal brand tokens preserved from the old site.
- Fonts: Sora (display) + Inter (body) via `next/font`.
- **Docker + docker-compose** for Coolify (`Dockerfile`, `docker-compose.yml`).

## Collections & globals

Collections: `projects`, `case-studies`, `publications`, `posts`, `services`,
`testimonials`, `media`, `experience`, `skill-groups`, `education`,
`certifications`, `users`.
Globals: `site-settings`, `home`.

## Pages (routes)

- `/` — hero → services → case studies → testimonials → experience → skills →
  projects → publications → education → blog teaser → contact. Sections are
  toggled by the Home global's `visibility` group.
- `/projects`, `/projects/[slug]`
- `/blog`, `/blog/[slug]`, `/blog/archive`
- `/publications`
- `/resume` (embeds the PDF)
- `/admin` — Payload CMS

## Positioning delivered

- Headline: **AI Engineer & Fractional CTO** (was "AI Automation Consultant and
  Bionics Engineer").
- New **Services** section (Fractional CTO · Applied AI Engineering · AI Advisory).
- New **Case Studies** section — 3 grounded proof stories (EXODIA RAG 70%,
  Teammate AI 50K+ calls, SNA 6,000+ threads).
- Proof metrics are now **data-driven** (Home global), reconciled with the
  experience data and CLAUDE.md.
- Academic thread (publications/education) moved lower; neurotech kept as a
  differentiator in the skills.

## Content migration

`pnpm seed` (`src/seed/`) loads everything from the old `data/*.json` and the
markdown bodies (copied to `src/seed/content/`, converted to Lexical via
Payload's `convertMarkdownToLexical`):

- 7 experience roles, 4 skill groups, 2 education, 3 certifications
- 3 services, 3 case studies
- 4 projects, 1 publication
- 8 blog posts (3 active + 5 archived), with `redirectFrom` preserving old URLs

Verified: production build passes; all routes return 200 against a seeded DB;
rich-text bodies, project detail pages, and the admin login render.

## SEO carry-over

- Old blog URLs preserved via each post's `redirectFrom` (handled in
  `blog/[slug]/page.tsx`).
- Google site-verification file moved to `public/.well-known/`.
- Résumé PDF preserved at `/files/Mohamed%20Gaafar%20CV.pdf`.
- Per-page metadata + OpenGraph from Site Settings; GA4 id retained.

## Deliberately not done (needs Mohamed)

- **Testimonials** left empty (no fabricated quotes) — add real ones in `/admin`.
- **Booking URL** empty → CTAs fall back to `mailto:`; set a Cal.com/Calendly
  link in Site Settings when ready.
- Hosting/domain cutover to Coolify + retiring the old GitHub Pages deploy.

## Retired

Hugo config removed: `config.toml`, `netlify.toml`, `CNAME`, `.gitmodules`,
`.github/workflows/pages.yml`, old `README.md`. The Hugo content directories
(`content/`, `data/`, `themes/`, `static/`, `content-example/`) are superseded
and safe to delete.
