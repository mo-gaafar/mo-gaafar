# Landing page review and next steps

Reviewed 25 October 2026 on `claude/landing-page-design-audit-ubarw4` (base `ffca0d5`).

## Branch finding

The local `main` checkout was outdated. After fetching, remote `main` already
contained the landing branch's implementation; its one additional commit was a
README update. This revamp was made on the requested landing branch, not main.
Changes are pushed to the landing branch. Production CMS content was not overwritten.

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
| Compute | Confirmed Coolify Docker Compose app mngaafar-portfolio, exposing app port 3000. Tracking was changed from main to the landing branch on October 25. Server provider not inspected. |
| Database | PostgreSQL via DATABASE_URL; documented as a separate Coolify-managed resource. Live connection and backups were not inspected. |
| Media | R2 is not configured and no persistent storage mounts exist. The live media collection contains zero records. Configure storage before uploading files. |
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

- [x] In Coolify, verify the tracked branch is `claude/landing-page-design-audit-ubarw4`
      and review the intended commit before triggering a deployment.
- [ ] Take a PostgreSQL backup and test restoration. Confirm R2 uploads survive redeployment.
- [x] Set SITE_URL to https://mngaafar.com for public canonicals. Keep
      NEXT_PUBLIC_SERVER_URL at the CMS origin for existing API/CMS connections.
- [ ] Redirect www and the CMS hostname's public pages consistently to the canonical host.
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

- [x] After deploying, inspect homepage, case-study, project, and blog canonical/OG tags.
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
case-study links were exercised.

Deployed successfully through Coolify on October 25, 2026 at 10:28 UTC:
commit `5892881cb662c37486c7b819099898546ea79f09`, deployment
`1pfydmvfkl8jb5sk76vszffk`, landing branch. All 21 live sitemap pages returned 200,
had one H1, the correct public canonical, and the expected OG image. Home JSON-LD,
robots.txt, sitemap.xml, PNG sharing image, www host, and CMS admin response passed.
Live desktop (1440px) and mobile (390px) screenshots were visually reviewed.
No production Lighthouse score, authenticated CMS edit, database restore test,
or Search Console inspection was performed. The existing favicon request returns 404.

Local production preview: http://127.0.0.1:3037 (while the preview process is running).
Screenshot: `output/playwright/landing-desktop.jpg` (ignored local artifact).

## Independent AI/CMS audit and contact update

The audit agent found a strong technical foundation: rendered HTML, ordinary links,
canonical metadata, sitemap, and ProfilePage/Person JSON-LD. Payload directly feeds
the page and has an MCP server with scoped capabilities. Unauthenticated MCP returned
401 and users returned 403. Actual authenticated MCP editing and AI citations were not tested.

- [ ] Fill the empty approach fields in all three case studies; add methods, baselines,
      dates, limitations, and evidence behind the commercial metrics.
- [ ] Add drafts/version recovery before allowing unattended AI edits. Current MCP
      create/update operations can immediately change public content; deletion is disabled.
- [ ] Log CMS errors and avoid silently returning an incomplete successful homepage
      when essential content cannot load.
- [ ] Add visible blog authorship and accurate BlogPosting metadata.
- [ ] Configure persistent media storage before uploading files.

WhatsApp now uses the explicitly requested `https://wa.me/393514277009` in the
shared WhatsAppLink component. The older CMS phone field is not used by these links.
The configured seed admin credentials could not authenticate (missing email), so no
CMS settings were changed. Update the CMS phone field when admin access is available.
Meeting buttons read Site Settings → bookingUrl and stay hidden until it is configured.

Cal.diy configuration is in `deploy/cal-diy.compose.yml`, on the same Coolify server
with its own persistent PostgreSQL volume. Its official v6.2.0 release workflow
publishes the Docker image under the legacy calcom/cal.com name; the digest is pinned.
Live host: https://cal.botica.it.com (valid HTTPS verified October 25).
Coolify service: `tpxiiacwkf23yn6shoizuy5n`, app `gncqyfxpggoc2839ino9og6o`.
The first administrator was created for mohamed_gaafar@ieee.org, username
`mohamed-gaafar`. Its generated password is only in the ignored local `.env`
under CAL_DIY_ADMIN_PASSWORD. The encryption secret was configured explicitly
because Coolify left SERVICE_PASSWORD_32_ENCRYPTION empty; preserve it across updates.
Optional proxy compression was disabled for this service while diagnosing startup.
Google OAuth and calendar consent are required
before enabling live booking. SMTP delivery and database backups also need configuration.
Cal.diy's maintainers recommend the community edition for personal, non-production use:
https://www.cal.diy/ . Google setup: https://www.cal.diy/apps/google .

### Google Calendar setup remaining

1. In Google Cloud Console, create/select a project and enable Google Calendar API.
2. Configure OAuth branding and audience. Use mohamed_gaafar@ieee.org as a test
   user for External testing; use Internal only if the Workspace organization permits it.
3. Request `https://www.googleapis.com/auth/calendar.events` and
   `https://www.googleapis.com/auth/calendar.readonly`.
4. Create a Web application OAuth client with both redirect URIs:
   - https://cal.botica.it.com/api/integrations/googlecalendar/callback
   - https://cal.botica.it.com/api/auth/callback/google
5. Download the client JSON and save it as GOOGLE_API_CREDENTIALS in the ignored
   local .env or directly in this Cal.diy service's Coolify environment. Never commit it.
6. Apply it to the booking service, restart, and connect Google Calendar while signed
   into the IEEE account. Choose conflict calendars and the booking destination calendar.
7. Configure real availability, meeting duration, buffers, meeting location, and SMTP.
8. Verify an end-to-end booking before setting Payload Site Settings → bookingUrl
   to the verified event URL. The website's meeting buttons are already wired to that field.

WhatsApp deployment `iefs6g0ltgqdhwgsq92ajou4` finished successfully with commit
`410d277` on the landing branch. Six wa.me links were checked; live 390px mobile and
1440px desktop screenshots were reviewed. The 21-page SEO regression check passed again.
