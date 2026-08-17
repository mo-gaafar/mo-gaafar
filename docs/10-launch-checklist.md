# 10 · Launch Checklist

Everything needed to take the rebuilt site live on **Coolify + Cloudflare + R2**.
Work top to bottom. Items marked 🧩 are dashboard/manual (only you can do them);
the rest are already in the repo or are one-off commands.

---

## 0. Prerequisites

- [ ] 🧩 A Coolify instance/server you can deploy to.
- [ ] 🧩 A Cloudflare account with the `mngaafar.com` domain added.
- [ ] DB plan: a **Coolify-managed PostgreSQL** resource (recommended; app
      connects via `DATABASE_URL`). `docker-compose.yml` is app-only;
      `docker-compose.local.yml` bundles Postgres for local runs only.

## 1. Database (Coolify-managed Postgres) 🧩

- [ ] Coolify → create a **PostgreSQL** database resource.
- [ ] Copy its **internal** connection string → this is `DATABASE_URL`.
- [ ] If the DB enforces TLS, append `?sslmode=require` to `DATABASE_URL`.

## 2. Secrets & environment

- [ ] Generate a strong `PAYLOAD_SECRET` — `openssl rand -base64 32`.
- [ ] Decide `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` for the first admin login.
- [ ] Note `NEXT_PUBLIC_SERVER_URL` = `https://www.mngaafar.com` (your real domain).

## 3. Cloudflare R2 (media storage) 🧩

> Required — container disks are ephemeral; uploads must live in R2.

- [ ] Create an R2 bucket (e.g. `mngaafar-media`).
- [ ] R2 → Manage API Tokens → create a token with Object Read & Write.
- [ ] Record: `S3_BUCKET`, `S3_ENDPOINT` (`https://<account_id>.r2.cloudflarestorage.com`),
      `S3_REGION=auto`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`.

## 4. Deploy on Coolify 🧩

- [ ] Create a **Docker Compose** resource pointing at this repo (`docker-compose.yml`
      — app only), branch `claude/portfolio-rebuild-modernize-szz2gi`
      (or after merge, `main`).
- [ ] Set env vars in Coolify: `DATABASE_URL` (from step 1), `PAYLOAD_SECRET`,
      `NEXT_PUBLIC_SERVER_URL`, all `S3_*` from step 3, and optionally `SEED_ADMIN_*`.
- [ ] Deploy. Confirm the container starts (schema auto-syncs on boot).
- [ ] Confirm the app answers on its Coolify URL (before Cloudflare is in front).

## 5. First-run content seed (once)

- [ ] In the app container's terminal: `pnpm seed`.
- [ ] Verify counts look right (7 experience, 4 skill groups, 4 projects,
      1 publication, 8 posts, 3 services, 3 case studies).
- [ ] Log in to `/admin` with the seed admin credentials.
- [ ] **Change the admin password** (and delete/rotate the seed default).

## 6. Cloudflare in front 🧩

- [ ] DNS: proxied (orange-cloud) record for the app at the Coolify host.
- [ ] SSL/TLS mode: **Full (strict)**.
- [ ] Turn on: Always Use HTTPS, Brotli, HTTP/3.
- [ ] Turn **off**: Rocket Loader (breaks React hydration); leave Auto-Minify off.
- [ ] Cache Rules (see `docs/09-cloudflare.md`):
  - [ ] Cache `/_next/static/*`, `/img/*`, `/files/*`, `/api/media/*`.
  - [ ] **Bypass** `/admin*` and `/api/*` (except `/api/media`).
- [ ] Confirm `NEXT_PUBLIC_SERVER_URL` matches the live domain, then redeploy.

## 7. Content polish (in `/admin`) 🧩

- [ ] **Booking CTA:** set `bookingUrl` in Site Settings (Cal.com/Calendly) —
      CTAs fall back to email until then.
- [ ] **Testimonials:** add real ones (intentionally empty; none were fabricated).
- [ ] **Profile image:** upload a portrait (Media) and set it in Site Settings,
      or keep the seeded `/img/mo.jpeg`.
- [ ] Review hero headline, lede, and proof metrics (Home global).
- [ ] Review Services and Case Studies copy.
- [ ] Skim migrated blog posts / projects for formatting (Lexical conversion).
- [ ] Upload a test image in `/admin` → confirm it appears **and survives a
      redeploy** (proves R2 works).

## 8. SEO & correctness

- [ ] Résumé opens at `/resume` and the PDF loads
      (`/files/Mohamed%20Gaafar%20CV.pdf`).
- [ ] Old blog URLs still resolve (redirects via each post's `redirectFrom`).
- [ ] Google site-verification file reachable at
      `/.well-known/google-verify.etc`.
- [ ] GA4 firing (id `G-5GL6K1NVFM` in Site Settings) — or update/remove it.
- [ ] Open Graph / title look right when sharing the URL.

## 9. MCP (optional)

- [ ] Decide if MCP stays on (default) or set `DISABLE_MCP=true`.
- [ ] If on: create an API key in `/admin` → MCP → API Keys (tick *Enable API Key*).
- [ ] Test from a client: `Authorization: Bearer <key>` to `/api/mcp`
      (see `docs/08-mcp.md`).
- [ ] Confirm `/api/mcp` is **cache-bypassed** at Cloudflare.

## 10. Go-live verification

- [ ] `https://www.mngaafar.com/` loads over HTTPS; `cf-cache-status` present on
      static assets.
- [ ] `/admin` and `/api/*` are **not** cached (no stale auth).
- [ ] Dark/light theme toggle works and persists.
- [ ] Mobile nav + layout check on a phone width.
- [ ] Lighthouse pass (perf/SEO/a11y) — note anything to follow up.

## 11. Cutover & cleanup

- [ ] Merge the branch to `main` (or point Coolify at `main`).
- [ ] Confirm the old GitHub Pages deploy is retired (the workflow was removed;
      unpublish Pages in the repo settings if still enabled).
- [ ] Optionally delete the retired Hugo dirs (`content/`, `data/`, `themes/`,
      `static/`, `content-example/`) — superseded by Payload + `public/`.
- [ ] Enable **scheduled backups on the Coolify PostgreSQL resource**.

## Optional / later

- [ ] Public R2 custom domain for media (`media.mngaafar.com`) for edge-served
      images (needs a `generateFileURL` tweak — ask and I'll wire it).
- [ ] Email adapter for Payload (password resets currently log to console).
- [ ] ISR/micro-cache for public pages if you want them edge-cached.
