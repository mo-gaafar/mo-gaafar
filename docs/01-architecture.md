# 01 · Architecture

Current technical architecture of the site as it exists in this repository.

## Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Static site generator | **Hugo (extended)** | `0.117.0` pinned in `netlify.toml`; `latest` in GitHub Action. `hugo v0.117.0+extended` observed locally per CLAUDE.md. |
| Theme | **`hugo-resume`** | StartBootstrap "Resume" port by Eddie Webb. Vendored (copied) under `themes/hugo-resume/`, not a live submodule. |
| CSS framework | **Bootstrap 4.5.3** | Loaded from CDN (see [Dependencies](#external-dependencies)). |
| Custom styling | `static/css/resume-override.css` | ~740 lines; the real design layer. Plus theme `resume.css` + `tweaks.css`. |
| Icons | Font Awesome 5.15.1, devicons 1.8.0, simple-line-icons 2.5.5 | All CDN. |
| Fonts | Google Fonts: **Open Sans** + **Saira Extra Condensed** | Preloaded in `baseof.html`. |
| JS | jQuery 3.6.4 (slim), Bootstrap bundle, smoothscroll polyfills, `resume.js`, `search.js` | |
| Analytics | Google Analytics (GA4) | `trackerID = G-5GL6K1NVFM` in `config.toml`. |
| CMS (legacy) | Netlify CMS | Config under `static/admin/`. |

## Repository layout

```
mo-gaafar/
├── config.toml              # Site config, params, feature toggles, social handles, taxonomies
├── CNAME                    # mngaafar.com
├── netlify.toml             # Netlify build (Hugo 0.117.0, --gc --minify)
├── .github/workflows/pages.yml  # GitHub Pages deploy on push to main
├── .gitmodules              # ⚠️ references hugo-profile (UNUSED / stale — see Notes)
├── archetypes/              # Content scaffolding templates (adv-ride, blog-post)
├── content/                 # All site content (see 02-content-and-data.md)
│   ├── resume.md
│   ├── search.md
│   ├── projects/{creations,contributions}/
│   ├── publications/
│   └── blog/{,archive/}
├── content-example/         # Theme's example content (not part of live site)
├── data/                    # experience/skills/education/certifications JSON
├── static/
│   ├── css/resume-override.css   # Main custom stylesheet
│   ├── files/Mohamed Gaafar CV.pdf
│   ├── img/                 # Portraits, project thumbnails
│   └── admin/               # Netlify CMS (config.yml, cms.js, templates)
├── themes/hugo-resume/      # Vendored theme (layouts, static css/js, i18n, data)
└── public/                  # Generated output (git-ignored)
```

## Rendering model

The site is a **single-page scrolling portfolio** plus a few standalone routes.

- `themes/hugo-resume/layouts/index.html` composes the home page by pulling in
  partials in a fixed order, each gated by a `show*` param toggle:
  1. `partials/about.html` — hero
  2. Projects → creations section (`sectionSummary`, featured only)
  3. Open source → contributions (toggled **off**)
  4. Publications section
  5. `partials/portfolio/experience.html` (from `data/experience.json`)
  6. `partials/portfolio/skills.html` (from `data/skills.json`)
  7. `partials/portfolio/education.html` (from `data/education.json`)
  8. Blog section summary (featured active posts + archive link)
- `layouts/_default/baseof.html` is the HTML shell (head, fonts, CDN links,
  fixed left sidebar `nav.html`, analytics, scripts).
- Navigation (`partials/nav.html`) is a fixed vertical sidebar on ≥992px,
  collapsing to a top bar on mobile. Links are in-page anchors (`/#about`,
  `/#projects`, …) plus real routes (`/blog`, `/resume`).

See [`04-page-map.md`](04-page-map.md) for route → template mapping.

## Data-driven sections

Resume-style sections read from JSON in `data/` rather than markdown:

- `data/experience.json` — role/company/range/summary objects.
- `data/skills.json` — grouped skill lists (4 groupings).
- `data/education.json` — school/degree/major/notes/range.
- `data/certifications.json` — name/description/badge/proof (rendered in hero footer when `showCertifications` is on — currently **not** set, so hidden).

Full contents in [`02-content-and-data.md`](02-content-and-data.md).

## External dependencies (CDN)

All third-party CSS/JS is remote (no bundling / local vendoring):

- **Bootstrap 4.5.3** CSS + JS bundle — served from `cdn.jsdelivr.xyz` ⚠️
  (note the `.xyz` TLD, not the canonical `cdn.jsdelivr.net`; worth verifying
  this host during any rebuild — it is a potential reliability/security risk).
- Google Fonts (Open Sans, Saira Extra Condensed).
- Font Awesome 5.15.1 (`use.fontawesome.com`).
- devicons 1.8.0 + simple-line-icons 2.5.5 (`cdnjs.cloudflare.com`).
- jQuery 3.6.4 slim (`code.jquery.com`).
- smoothscroll polyfills (`unpkg.com`).

Fonts and icon CSS use a preload + `onload` swap pattern with `<noscript>`
fallbacks for performance.

## Deployment

Two deployment paths coexist:

1. **GitHub Pages** — `.github/workflows/pages.yml`
   - Trigger: push to `main` (and PRs build but don't deploy).
   - Steps: checkout (submodules: true, full history for `.GitInfo`) →
     `peaceiris/actions-hugo` (extended, `latest`) → `hugo --minify` →
     `peaceiris/actions-gh-pages` publishing `./public` with
     `cname: mngaafar.com`.
2. **Netlify** — `netlify.toml`
   - `command = "hugo --gc --minify"`, `publish = "public"`.
   - Env: `HUGO_VERSION = 0.117.0`, `HUGO_ENV = production`, `HUGO_ENABLEGITINFO = true`.

> Which one is authoritative for the live domain should be confirmed with
> Mohamed before a rebuild changes hosting. The CNAME + Pages workflow suggest
> GitHub Pages is (or was) the live path.

## Config highlights (`config.toml`)

- `baseURL = "https://www.mngaafar.com/"`, `theme = "hugo-resume"`.
- `enableGitInfo = true`, `enableRobotsTXT = true`, sitemap daily/priority 1.
- `[outputs] home = ["HTML", "JSON"]` — the JSON output feeds client-side search (`search.js` + `layouts/_default/index.json`).
- Taxonomies: `tag = "tags"`, `advtag = "advtags"` (SEO tag system).
- Feature toggles (params): `showProjects`, `showPublications`, `showExperience`,
  `showSkills`, `showEducation`, `showBlog`, `showResume`, `showSocializations`,
  `showQr` all **on**; `showOpenSource = false`. `showContact` / `showCertifications`
  not set (off).
- Social handles: GitHub, LinkedIn, X (`jaafar_dev`), ORCID.
- `upworkProfile` set (used for the hero Upwork "Top Rated Plus" badge).

## Notes / cleanup candidates found during mapping

- **Stale submodule reference:** `.gitmodules` points at `hugo-profile`, but the
  active theme is `hugo-resume` (vendored, not a submodule). `git submodule status`
  returns nothing. This is dead config.
- **CDN host oddity:** `cdn.jsdelivr.xyz` (see Dependencies) — verify/replace.
- **Leftover theme boilerplate:** `content/projects/_index.md` still references
  "Eddie" (theme author) in body copy.
- **`content-example/`** is the theme's demo content and not part of the live site.
- **Two deploy pipelines** may cause drift; a rebuild should consolidate to one.
