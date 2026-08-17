# mngaafar.com — Portfolio (Next.js + PayloadCMS)

Mohamed N. Gaafar's portfolio, positioned as **AI Engineer & Fractional CTO**.
Rebuilt from the previous Hugo site onto a modern, CMS-backed stack.

- **Framework:** Next.js 15 (App Router, React 19)
- **CMS:** PayloadCMS 3 (self-hosted, in-app admin at `/admin`)
- **Database:** PostgreSQL
- **Styling:** framework-free CSS with design tokens + light/dark themes
- **Deploy target:** Coolify via Docker Compose

## Quick start (local)

```bash
pnpm install
cp .env.example .env         # set PAYLOAD_SECRET + DATABASE_URL
# start a Postgres (any), point DATABASE_URL at it, then:
pnpm dev                     # http://localhost:3000  (admin: /admin)
pnpm seed                    # migrate the initial content into the DB
```

`pnpm seed` creates the admin user (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`,
defaults `admin@mngaafar.com` / `changeme-please`) and loads all content
(experience, skills, education, certifications, services, case studies,
projects, publications, blog posts, and the two globals). It is repeatable —
it clears and re-inserts content collections each run.

## Environment variables

| Var | Purpose |
|-----|---------|
| `DATABASE_URL` | Postgres connection string |
| `PAYLOAD_SECRET` | Long random string for Payload auth/encryption |
| `NEXT_PUBLIC_SERVER_URL` | Public site URL (no trailing slash) — used for CORS, canonical, OG |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | First admin user (seed only) |

## Scripts

| Script | What it does |
|--------|--------------|
| `pnpm dev` | Dev server |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm seed` | Migrate/seed content |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` after schema changes |
| `pnpm generate:importmap` | Regenerate the admin import map |

## Deploying to Coolify

1. Create a **Docker Compose** resource pointing at this repo's
   `docker-compose.yml`.
2. Set env vars in Coolify: `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`
   (your domain), and `POSTGRES_PASSWORD`. Optionally `SEED_ADMIN_*`.
3. Deploy. The `db` service is a bundled Postgres with a persistent volume;
   the app connects to it over the compose network. Schema is auto-synced on
   boot (`push: true`).
4. First run only — seed the content from the app container's terminal:
   ```bash
   pnpm seed
   ```
5. Point your domain at the app service and set it as `NEXT_PUBLIC_SERVER_URL`.

> If you prefer Coolify's managed Postgres over the bundled `db` service,
> delete the `db` service from `docker-compose.yml` and set `DATABASE_URL` to
> the managed instance.

## Project structure

```
src/
├── app/(frontend)/     # Public site (home, projects, blog, publications, resume)
├── app/(payload)/      # Payload admin + API (auto-wired)
├── collections/        # Payload collections
├── globals/            # SiteSettings, Home
├── components/         # Nav, Footer, ThemeToggle, Icon, RichText
├── fields/             # Reusable field helpers (slug)
├── lib/                # Payload client helpers
├── seed/               # Content migration script + source markdown
└── payload.config.ts   # Payload config (Postgres, collections, globals)
docs/                   # Site map + rebuild documentation
Dockerfile, docker-compose.yml   # Coolify deployment
```

## MCP (Model Context Protocol) support

The CMS is exposed to MCP clients via `@payloadcms/plugin-mcp`, so an AI client
(Claude Desktop, Claude Code, Cursor, etc.) can read and edit portfolio content
through tools.

- **Endpoint:** `POST/GET {NEXT_PUBLIC_SERVER_URL}/api/mcp` (Streamable HTTP).
- **Auth:** `Authorization: Bearer <api-key>`.
- **Turn off:** set `DISABLE_MCP=true`.

### Create an API key

1. Open `/admin` → **MCP → API Keys** → *Create*.
2. Tick **Enable API Key** (the key is generated and shown once — copy it).
3. Toggle the exact capabilities that key should have per collection/global
   (find / create / update). Keys are scoped: a client only sees tools for the
   capabilities its key grants, and only ever acts as the key's associated user.

### Connect a client

Streamable-HTTP MCP client config (e.g. Claude Desktop `mcpServers`):

```jsonc
{
  "mcpServers": {
    "mngaafar-portfolio": {
      "type": "http",
      "url": "https://www.mngaafar.com/api/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" }
    }
  }
}
```

Exposed tools follow `find*` / `create*` / `update*` per enabled collection
(e.g. `findProjects`, `updateHome`). Delete is disabled by default;
globals support find/update only. Which collections/globals are available is
configured in `src/payload.config.ts` (the `mcpPlugin({...})` block).

## Content model

Managed in `/admin`:

- **Collections:** Projects, Case Studies, Publications, Blog Posts, Services,
  Testimonials, Media, Experience, Skill Groups, Education, Certifications, Users.
- **Globals:** Site Settings (identity, contact, socials, analytics), Home
  (hero, proof metrics, section visibility).

See [`docs/`](docs/) for the full map of the previous site, the design system,
and the rebuild plan.

## Notes

- The previous Hugo source directories (`content/`, `data/`, `themes/`,
  `static/`, `content-example/`) are **retired**. Their content has been
  migrated into Payload (seed) and their assets copied to `public/`. They can
  be deleted.
- Blog SEO redirects from old URLs are preserved via each post's `redirectFrom`
  field (handled in `src/app/(frontend)/blog/[slug]/page.tsx`).
