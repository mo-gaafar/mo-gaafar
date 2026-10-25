# Landing page review and next steps

Reviewed 25 October 2026 on `claude/landing-page-design-audit-ubarw4` (base `ffca0d5`).

## Branch finding

The local `main` checkout was outdated. After fetching, remote `main` already
contained the landing branch's implementation; its one additional commit was a
README update. This revamp was made on the requested landing branch, not main.
Changes are local and have not been deployed or written into the production CMS.

## What changed

- Replaced the narrow desktop sidebar with a horizontal navigation and mobile menu.
- Enlarged the portrait with CSS perspective, orbital outlines, and hover depth.
  Reduced-motion users get a static treatment. No WebGL dependency or animation loop.
- Reworked spacing, typography, proof metrics, services, and case-study cards in
  both themes. Fixed dark-theme button contrast and narrow-screen overflow.
- Added crawlable case-study detail pages using existing Payload problem,
  approach, outcome, metric, and stack fields; no database schema migration.
- Added a keyboard skip link, main landmark, page H1s, and menu relationships.
- Corrected email-only booking labels to “Let’s talk.”
- Added canonical URLs, page-specific sharing metadata, a CMS-backed social image,
  robots.txt, a sitemap, and escaped ProfilePage/Person structured data.
- Changed legacy blog redirects to permanent redirects.

## Hosting and CMS: evidence versus configuration

| Layer | Finding |
| --- | --- |
| Public website | https://mngaafar.com responds 200 and identifies as Next.js, Payload. |
| CMS | https://mo-cms.botica.it.com/admin responds 200. Payload 3 is part of the Next.js app, not a separate SaaS CMS. |
| CMS API | Documented endpoint: https://mo-cms.botica.it.com/api/mcp. Requires a scoped API key. |
| Compute | Docker Compose configuration targets Coolify, exposing app port 3000 on its shared network. Exact running commit and server provider require the Coolify dashboard. |
| Database | PostgreSQL via DATABASE_URL; documented as a separate Coolify-managed resource. Live connection and backups were not inspected. |
| Media | S3-compatible storage (intended Cloudflare R2) when S3_BUCKET is set; otherwise local container disk. Production setting remains unverified. |
| Edge/DNS | Cloudflare is the documented target, but neither checked response had cf-ray. This does not establish Cloudflare proxying. Confirm DNS and dashboard settings. |
| Previous host | Legacy Hugo/GitHub Pages files are historical; the current public response is Next.js/Payload. GitHub Pages account settings were not inspected. |

Edit **Settings → Home Page** for hero copy, CTAs, metrics, and section visibility;
**Settings → Site Settings** for identity, metadata, portrait, email, booking URL,
social links, and résumé. Services, Case Studies, Projects, Posts, Experience,
Education, and Certifications have their own collections.

## LinkedIn cross-check

Source: [public LinkedIn profile](https://www.linkedin.com/in/mn-gaafar/).
Public access exposes only part of the profile; detailed employment titles,
dates, and the full About section require sign-in. The existing commercial
metrics remain repository/CMS claims, not independently verified results.

| Item | Public evidence and action |
| --- | --- |
| Identity | Mohamed Gaafar, EXODIA, and Sant’Anna match the website's core identity. Keep AI Engineer & Fractional CTO positioning. |
| Location | LinkedIn says Pisa, Tuscany; seed settings say Turin, Italy · Cairo, Egypt. Confirm the current location before changing Site Settings. |
| Anthropic | Add Building with the Claude API (June 2026), proof https://verify.skilljar.com/c/37zrfa7kvhw7, and Introduction to agent skills (May 2026), proof https://verify.skilljar.com/c/kiygk6vzkkv8, to Certifications. These are course certificates, not employment or professional licenses. |
| Research | LinkedIn lists the BCI/VR scoping review as MedRxiv, January 9, 2024. Label it accurately as a preprint unless a peer-reviewed version is confirmed. |
| 3D evidence | LinkedIn lists real-time TMS motor mapping and a VTK.js medical visualization project. These are stronger inspiration for an interactive showcase than a generic spinning AI orb. |
| Claims needing confirmation | EXODIA title and tenure, 10+ engineers, 50K+ calls, 70% reduction, 100K+ event-goers, current MSc status, AWS certification validity. Public LinkedIn does not expose enough to verify these. |

No production biography, dates, certificates, or statistics were overwritten.

## Prioritized checklist

### Before deployment

- [ ] In Coolify, verify the tracked branch is `claude/landing-page-design-audit-ubarw4`
      and review the intended commit before triggering a deployment.
- [ ] Take a PostgreSQL backup and test restoration. Confirm R2 uploads survive redeployment.
- [ ] Set NEXT_PUBLIC_SERVER_URL to the chosen public origin, e.g. https://mngaafar.com,
      and redirect www consistently. The CMS hostname must not become the preferred public canonical.
- [ ] Review the existing database `push: true` setting and introduce versioned migrations
      before future schema changes. This revamp changes no collection/global schema.
- [ ] **Do not run pnpm seed on the populated production database.** It deletes and
      recreates content collections and overwrites globals. Use the admin to edit existing content.
- [ ] Configure a mail adapter for password resets; current configuration logs emails.

### Content and conversion

- [ ] Reconcile LinkedIn location, current roles, education completion, and résumé PDF.
- [ ] Add the two Anthropic certificates in Certifications; choose a small public selection
      if you want certificates displayed (the current homepage does not render that collection).
- [ ] Add a booking URL under Site Settings and update the Home Page primary CTA URL
      and label together. These are currently separate CMS fields.
- [ ] Fill each case study's problem, approach, and outcome. Include measurement period,
      baseline, your personal contribution, and client-approved evidence for numeric claims.
- [ ] Add two real client testimonials with permission; do not invent endorsements.
- [ ] Link the portfolio from LinkedIn and use consistent name/title spelling across profiles.

### SEO and generative search visibility

- [ ] After deploying, inspect homepage, case-study, project, and blog canonical/OG tags.
- [ ] Submit /sitemap.xml in Google Search Console and Bing Webmaster Tools.
- [ ] Use URL Inspection to confirm indexability; validate the JSON-LD and social preview.
- [ ] Check old URLs and permanent redirects, robots.txt, and accidental preview-domain indexing.
- [ ] Run production Lighthouse/PageSpeed on mobile; measure LCP, INP, and CLS with real traffic.
- [ ] Publish original case studies with concrete methods, tradeoffs, limitations, and evidence.
      Explain what RAG/voice automation delivered, who it helped, and how outcomes were measured.
- [ ] Review analytics consent/configuration for your actual audience before enabling collection.
- [ ] Monitor qualified enquiries and search impressions; no implementation guarantees rankings
      or inclusion in AI answers.

Google states that ordinary SEO fundamentals remain applicable to AI features:
crawlable text, internal links, useful original content, and structured data that
matches visible content. No special AI markup or llms.txt is required.
See [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

## Further 3D ideas

1. A click-to-load TMS brain-surface viewer on the actual InVesalius project page,
   with a static screenshot, keyboard controls, and a clear explanation of the mapping.
2. A small interactive retrieval diagram inside the RAG case study, showing sources,
   retrieval, grounded answers, and human review. Use real architecture with confidential data removed.
3. An optional voice-pipeline visualization with latency stages. Use measured timings
   only when you have permission to publish them.

The homepage's CSS depth effect is the implemented first step. Additional interactive
demonstrations should load only on request so they do not slow the first impression.

## Verification

Local testing uses a disposable PostgreSQL container, never the live CMS database.
TypeScript and assert-based SEO/contact checks passed. Production build passed.
Production HTTP checks passed for eight pages (status, single H1, canonical),
21 unique sitemap URLs, robots rules, the PNG social image, and a missing-case 404.
Desktop light/dark and 390px mobile layouts were visually reviewed; mobile menu and
case-study links were exercised. No production Lighthouse score, authenticated CMS
edit, Search Console inspection, or deployment has been performed.

Local production preview: http://127.0.0.1:3037 (while the preview process is running).
Screenshot: `output/playwright/landing-desktop.jpg` (ignored local artifact).
