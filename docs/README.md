# Portfolio Documentation

Context map and rebuild reference for **mngaafar.com** — Mohamed N. Gaafar's
personal portfolio site.

This folder was created to fully map the existing site before rebuilding and
modernizing it around a positioning of **AI Engineer + Fractional CTO** (while
preserving the existing Applied AI / automation consulting and bionics /
neurotechnology credibility).

## Documents

| File | What it covers |
|------|----------------|
| [`01-architecture.md`](01-architecture.md) | Hugo stack, folder layout, theme, build & deployment pipeline, external dependencies |
| [`02-content-and-data.md`](02-content-and-data.md) | Every page and data file, section-by-section, with front matter and feature toggles |
| [`03-design-system.md`](03-design-system.md) | Colors, typography, layout system, component inventory, CSS override structure |
| [`04-page-map.md`](04-page-map.md) | Route-by-route map of what renders where, and which template drives it |
| [`05-positioning-and-brand.md`](05-positioning-and-brand.md) | Current brand/messaging, target positioning, proof points, gaps |
| [`06-rebuild-plan.md`](06-rebuild-plan.md) | Proposed modernization plan, phased, mapped to files to change |

## Fast facts

- **Framework:** Hugo (extended), pinned to `0.117.0` in Netlify; `latest` in GitHub Actions.
- **Theme:** `hugo-resume` (vendored under `themes/`, StartBootstrap "Resume" port), heavily overridden.
- **Domain:** `mngaafar.com` (CNAME), `baseURL = https://www.mngaafar.com/`.
- **Deployment:** Dual — a GitHub Pages Action (`main` branch) and a `netlify.toml`. See [`01-architecture.md`](01-architecture.md#deployment).
- **Primary style file:** `static/css/resume-override.css` (all custom design lives here).
- **Landing page structure:** single-page scroll (hero → projects → publications → experience → skills → education → blog) driven by `themes/hugo-resume/layouts/index.html`.
- **CMS:** Netlify CMS config present under `static/admin/` (legacy).

## Current positioning (as-shipped)

Site title: *"Mohamed Gaafar | AI Automation Consultant and Bionics Engineer"*.
The hero leads with **AI automation consultant · Bionics engineer**. The
CLAUDE.md project brief additionally frames Mohamed as CTO/co-founder and
applied-AI systems builder, with Upwork as a supporting credibility channel
only.

## Rebuild goal (this initiative)

Reframe the site toward **AI Engineer + Fractional CTO** as the headline
identity, keeping automation consulting, applied AI delivery, and
bionics/neurotech as supporting proof. See [`05-positioning-and-brand.md`](05-positioning-and-brand.md)
and [`06-rebuild-plan.md`](06-rebuild-plan.md).

**Framework:** Mohamed has approved a full framework change and adding
**PayloadCMS**. The rebuild plan therefore targets a **Next.js + PayloadCMS**
migration (not incremental Hugo edits). This changes the hosting model — Payload
needs a Node server + database, so static-only GitHub Pages is no longer
sufficient. Details in [`06-rebuild-plan.md`](06-rebuild-plan.md).

> Note: this doc set is descriptive (a map of the current site) plus a
> proposed plan. It does not itself change the rendered site.
