# 09 · Cloudflare in front, Node behind

Chosen hosting model: keep the Next.js + Payload app on a **Node host (Coolify)**
and put **Cloudflare in front** as CDN / proxy / TLS, with **media stored in R2**.
This gives Cloudflare's edge caching and DDoS/TLS without running Payload on the
Workers runtime (which fights `sharp`, the Postgres pool, and disk uploads).

```
Visitor ─▶ Cloudflare (DNS proxy, CDN cache, TLS)
             │
             ▼
        Coolify (Docker) ──▶ app (Next.js + Payload) ──▶ Postgres
                                        │
                                        └──▶ Cloudflare R2 (media uploads)
```

## 1. Media on R2 (implemented in code)

`@payloadcms/storage-s3` is wired into `src/payload.config.ts`, activated when
`S3_BUCKET` is set (otherwise falls back to local disk for dev).

> Why this matters: Coolify containers have **ephemeral disks**. Without object
> storage, every uploaded image is lost on the next deploy. R2 fixes that.

Setup:

1. Cloudflare dashboard → **R2** → create a bucket, e.g. `mngaafar-media`.
2. **R2 → Manage API Tokens** → create a token with Object Read & Write for the
   bucket. Note the Access Key ID and Secret.
3. Set env (Coolify → the app service), matching `.env.example`:
   ```
   S3_BUCKET=mngaafar-media
   S3_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
   S3_REGION=auto
   S3_ACCESS_KEY_ID=...
   S3_SECRET_ACCESS_KEY=...
   ```
4. Redeploy. New uploads go to R2; Payload serves them via `/api/media/...`.

Existing seeded images live under `public/img/*` and are unaffected (they're
static assets, not CMS uploads).

### Optional: serve media straight from an R2 public domain

For maximum edge caching you can attach a **custom domain** to the R2 bucket
(R2 → bucket → Settings → Custom Domains, e.g. `media.mngaafar.com`) and make it
public. The current config serves media through the app route (which Cloudflare
still caches per the rules below); switching to a public R2 domain is a later
optimization and would need a `generateFileURL` tweak in the S3 plugin config.

## 2. Put Cloudflare in front (dashboard)

1. Add the domain to Cloudflare and point the nameservers (or use a
   partial/CNAME setup).
2. DNS: an **A/CNAME record for the app**, **proxied (orange cloud)** at the
   Coolify server / its public hostname.
3. **SSL/TLS mode: Full (strict)** — Coolify already issues a valid cert via
   Let's Encrypt, so end-to-end TLS verifies.
4. Set `NEXT_PUBLIC_SERVER_URL=https://www.mngaafar.com` (your real domain) in
   Coolify so canonical URLs, CORS, and OG tags are correct.

## 3. Caching rules (dashboard)

Next.js already sends immutable cache headers for `/_next/static/*` and hashed
assets; Cloudflare honors those automatically. Add **Cache Rules** for the rest:

| Path | Suggested rule |
|------|----------------|
| `/_next/static/*`, `/img/*`, `/files/*` | Cache eligible, Edge TTL long (immutable/hashed) |
| `/api/media/*` | Cache eligible, Edge TTL ~1 day (uploaded files are effectively immutable per filename) |
| `/admin*` | **Bypass cache** (authenticated CMS) |
| `/api/*` (except `/api/media`) | **Bypass cache** (dynamic: MCP, GraphQL, REST) |

Also turn **on**: Brotli, HTTP/3, "Always Use HTTPS". Leave **Auto Minify** off
(Next already optimizes) and **Rocket Loader off** (can break React hydration).

## 4. Things to keep bypassed

- `/admin` and Payload auth — never cache.
- `/api/mcp`, `/api/graphql`, REST endpoints — dynamic, never cache.
- The site pages are `force-dynamic` (server-rendered from the DB); Cloudflare
  will pass them through. If you later want them edge-cached, add short micro-cache
  rules or move specific pages to ISR — out of scope here.

## 5. Verify after cutover

- `https://<domain>/` loads; `cf-cache-status` header present on static assets.
- Upload an image in `/admin` → it appears and survives a redeploy (proves R2).
- `/admin` and `/api/mcp` are not cached (no stale auth).
- `NEXT_PUBLIC_SERVER_URL` matches the public domain (correct canonical/OG).

## Not doing (and why)

- **Payload on Workers:** needs Hyperdrive/Neon HTTP for Postgres, R2 for media,
  and dropping `sharp`; bleeding-edge for a Payload app. See `docs/06-rebuild-plan.md`
  discussion. The Node-host + Cloudflare-front model gives most of the edge
  benefit with none of that risk.
