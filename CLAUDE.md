# CLAUDE.md

Context for AI/code assistants working on this repository.

## Project Overview

Mohamed N. Gaafar's personal portfolio, positioned as **AI Engineer &
Fractional CTO**, with applied-AI/automation consulting and
bionics/neurotechnology as supporting proof.

The site was **rebuilt from Hugo onto Next.js + PayloadCMS** (see `docs/` for the
full history, the old-site map, and the rebuild plan).

- Framework: **Next.js 15** (App Router, React 19)
- CMS: **PayloadCMS 3**, admin at `/admin`, content in **Postgres**
- Styling: framework-free CSS with design tokens + light/dark themes
- Deploy: **Coolify** via `docker-compose.yml`

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000  (admin at /admin)
pnpm seed         # migrate/seed content into the DB (repeatable)
pnpm build        # production build
pnpm generate:types   # after changing collections/globals
```

Requires a Postgres reachable via `DATABASE_URL` and a `PAYLOAD_SECRET`
(see `.env.example`).

## Production, hosting & DNS

One Next.js + Payload app (frontend, `/admin`, and `/api/*` are the same
container) runs on **Coolify** and is reachable under two hostnames:

- **`mngaafar.com` + `www.mngaafar.com`** — the public **frontend**, served
  **through the Cloudflare proxy** (orange-cloud) as CDN in front of the origin.
- **`mo-cms.botica.it.com`** — the **backend** host (admin + REST/GraphQL + MCP).
  Not behind Cloudflare; DNS points straight at the origin. **Keep as-is.**

Topology: `mngaafar.com` (Cloudflare edge) → Coolify origin `157.90.237.90`
(Traefik) → the `app` container (port 3000). Traefik terminates TLS at the
origin with **Let's Encrypt** certs (HTTP-01), and Cloudflare runs **Full
(strict)** SSL on top.

**Coolify:** app `portfolio`, uuid `zk1p7tgp8dckzly0m4xsrl8c`, project
`mngaafar-portfolio`, build pack **dockercompose** (builds the `Dockerfile`).
Domains live in the app's `docker_compose_domains` (comma-separated), currently
all three hosts point at the single `app` service. Changing domains requires a
**redeploy** so Traefik regenerates routers and requests certs.

**Cloudflare** (zone `mngaafar.com`): apex + `www` are `A → 157.90.237.90`,
proxied. Mail/verification records (MX, SPF, DKIM, DMARC, brevo,
google-site-verification) are unrelated to hosting — **leave them untouched**.
To (re)issue an origin cert cleanly, set the record grey-cloud (DNS-only) first
so HTTP-01 validates against the origin, verify, then flip back to proxied.

**Ops secrets** (never commit): `CLOUDFLARE_API_TOKEN` (DNS-scoped — cannot
change zone SSL settings), `COOLIFY_API_TOKEN` + `COOLIFY_BASE_URL` (deploy/edit
the app), and `PAYLOAD_MO_API` (MCP bearer key).

⚠️ **Canonical/SEO caveat:** `NEXT_PUBLIC_SERVER_URL` is
`https://mo-cms.botica.it.com`, and `serverURL`/`cors` derive from it
(`src/payload.config.ts:70-71`). So pages on `mngaafar.com` render fine but
their `<link rel=canonical>`/OG tags point at `mo-cms`. To make `mngaafar.com`
canonical, set `NEXT_PUBLIC_SERVER_URL=https://www.mngaafar.com` **and** widen
`cors` to include both hosts (so admin/MCP on `mo-cms` keep working), then
redeploy.

## Key files

- `src/payload.config.ts` — Payload config (Postgres, collections, globals).
- `src/collections/*` — content collections.
- `src/globals/{SiteSettings,Home}.ts` — site-wide settings and home-page content.
- `src/app/(frontend)/*` — public pages (home, projects, blog, publications, resume).
- `src/app/(payload)/*` — Payload admin/API (auto-wired; avoid hand-editing).
- `src/app/(frontend)/globals.css` — the design system (tokens, components, dark mode).
- `src/components/*` — Nav, Footer, ThemeToggle, Icon, RichText.
- `src/seed/*` — migration script + source markdown for the initial content.
- `Dockerfile`, `docker-compose.yml` — Coolify deployment.

## Content

All copy is CMS-managed. Do **not** hard-code content in components — add fields
to the relevant collection/global and render from them. After schema changes run
`pnpm generate:types`.

Collections: Projects, Case Studies, Publications, Blog Posts, Services,
Testimonials, Media, Experience, Skill Groups, Education, Certifications, Users.
Globals: Site Settings, Home.

## Positioning & brand (keep)

- Headline identity: **AI Engineer & Fractional CTO**. Applied-AI consulting and
  neurotech are supporting proof, not the lead.
- Modern consultant/portfolio feel; strong CTAs; proof metrics in the hero.
- Keep the teal design language (primary `#176b87`); support light **and** dark.
- Upwork is a supporting credibility link only — never the homepage headline.
- Don't reintroduce the old Hugo/classic-resume look.
- Neurotech/BCI is a genuine differentiator — keep it, but lower in the page.

## Proof points (grounded, already in the seed)

CTO & Co-Founder of EXODIA AI (10+ engineers led); enterprise RAG cut grant
research admin ~70%; voice platform handling 50K+ calls; email auditing over
6,000+ threads; multitenant SaaS to 100K+ users; GSoC '24 (InVesalius); published
BCI+VR scoping review; MSc Bionics @ Sant'Anna, BSc Cairo (top 4).

## Writing guidelines (blog)

Practical, direct, consultant-oriented. Ground claims in real experience; prefer
measurable outcomes over AI hype. Topic clusters: AI automation consulting, n8n,
Claude/LLM agents, voice AI (VAPI/Retell), RAG, and neurotechnology software.

## MCP

The CMS is exposed over MCP via `@payloadcms/plugin-mcp` at `/api/mcp`
(Streamable HTTP, `Authorization: Bearer <api-key>`). Configure exposed
collections/globals in the `mcpPlugin({...})` block in `src/payload.config.ts`;
issue keys in `/admin` → MCP → API Keys. Disable with `DISABLE_MCP=true`. See
`docs/08-mcp.md`.

Production endpoint: `https://mo-cms.botica.it.com/api/mcp` (the backend host),
bearer key in the `PAYLOAD_MO_API` env var. Verify with an `initialize` call —
the server identifies as `mngaafar-portfolio`.

## Notes

- Testimonials are intentionally **empty** — add real ones via `/admin`; do not
  fabricate quotes.
- Blog SEO: old URLs are preserved via each post's `redirectFrom` field.
- Retired Hugo dirs (`content/`, `data/`, `themes/`, `static/`, `content-example/`)
  are superseded by the Payload content and `public/` assets, and can be deleted.
- Résumé PDF lives at `public/files/Mohamed Gaafar CV.pdf` → `/files/Mohamed%20Gaafar%20CV.pdf`.
