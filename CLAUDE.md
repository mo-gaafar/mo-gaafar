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
(Streamable HTTP, `Authorization: Bearer <api-key>`).

**The live deployment is `https://mo-cms.botica.it.com`** — so the MCP endpoint
is `https://mo-cms.botica.it.com/api/mcp`. Do **not** assume the endpoint lives
on `mngaafar.com` (that is the eventual public domain from the old Hugo docs,
not where the CMS is hosted).

In Claude remote/dev sessions the MCP API key is provided as the
**`PAYLOAD_MO_API`** environment variable — check `env` before concluding you
have no CMS access. Example call:

```bash
curl -X POST https://mo-cms.botica.it.com/api/mcp \
  -H "Authorization: Bearer $PAYLOAD_MO_API" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

Configure exposed collections/globals in the `mcpPlugin({...})` block in
`src/payload.config.ts`; issue keys in `/admin` → MCP → API Keys. Disable with
`DISABLE_MCP=true`. See `docs/08-mcp.md`.

## Notes

- Testimonials are intentionally **empty** — add real ones via `/admin`; do not
  fabricate quotes.
- Blog SEO: old URLs are preserved via each post's `redirectFrom` field.
- Retired Hugo dirs (`content/`, `data/`, `themes/`, `static/`, `content-example/`)
  are superseded by the Payload content and `public/` assets, and can be deleted.
- Résumé PDF lives at `public/files/Mohamed Gaafar CV.pdf` → `/files/Mohamed%20Gaafar%20CV.pdf`.
