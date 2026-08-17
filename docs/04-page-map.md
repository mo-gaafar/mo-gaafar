# 04 · Page / Route Map

Every URL the site serves, the template that renders it, and the data it pulls.

## Routes

| Route | Template | Source / data | Notes |
|-------|----------|---------------|-------|
| `/` (home) | `layouts/index.html` → many partials | hero + `data/*.json` + featured projects/publications/blog | Single-page scroll; sections gated by `show*` toggles |
| `/#about` | `partials/about.html` | `config.toml` params, `data/certifications.json` (if enabled) | Hero |
| `/#projects` | `partials/sectionSummary.html` + `projectsSummary.html` | `content/projects/creations/` (featured only) | |
| `/#publications` | `sectionSummary` + `publicationsSummary.html` | `content/publications/` (featured) | |
| `/#experience` | `partials/portfolio/experience.html` | `data/experience.json` | |
| `/#skills` | `partials/portfolio/skills.html` | `data/skills.json` + theme `data/devicons` | |
| `/#education` | `partials/portfolio/education.html` | `data/education.json` | |
| `/#blog` (home teaser) | `sectionSummary` + `blogSummary.html` | active featured blog posts | |
| `/projects/` | `_default/section.html` | `content/projects/_index.md` | ⚠️ body still names "Eddie" |
| `/projects/creations/` | `_default/section.html` | creations list | |
| `/projects/creations/<slug>/` | `layouts/projects/single.html` | individual project md | |
| `/projects/contributions/…` | section/single | contributions | Section hidden on home (`showOpenSource=false`) but pages still build |
| `/publications/` | `_default/section.html` | publications list | |
| `/publications/<slug>/` | `layouts/publications/single.html` | e.g. scoping-review | |
| `/blog/` | `layouts/blog/section.html` | active posts + archive link panel | |
| `/blog/<slug>/` | `layouts/blog/single.html` | individual post | |
| `/blog/archive/` | `layouts/blog/section.html` | archived posts | |
| `/blog/archive/<slug>/` | `layouts/blog/single.html` | archived post | Old URLs alias here |
| `/resume/` | `layouts/_default/resume.html` | `content/resume.md` + PDF | Embeds `/files/Mohamed%20Gaafar%20CV.pdf` |
| `/search/` | `layouts/_default/search.html` | `content/search.md` + `index.json` | Client-side search |
| `/contact/` | `layouts/_default/contact.html` | — | Only if `showContact` (currently off) |
| `/index.json` | `layouts/_default/index.json` | all pages | Search index (home output format) |
| `/sitemap.xml`, `/robots.txt` | theme `sitemap.xml` / `robots.txt` | — | SEO |
| `/404.html` | `layouts/404.html` | — | |
| `/admin/` | `static/admin/index.html` | Netlify CMS | Legacy CMS UI |

## Navigation (sidebar) links — `partials/nav.html`

Rendered order (each gated by its toggle): About · Projects · *(Open Source — off)*
· Publications · Experience · Skills · Education · Blog · Resume · *(Contact — off)*.
Plus a "Get in touch" mini-CTA and social icons (GitHub, LinkedIn, X, ORCID).

## Template dependency graph (home)

```
baseof.html
├── nav.html
└── index.html (main)
    ├── about.html
    │   └── data/certifications.json  (if showCertifications)
    ├── sectionSummary.html → projectsSummary.html   (creations, featured)
    ├── sectionSummary.html → publicationsSummary.html
    ├── portfolio/experience.html → data/experience.json
    ├── portfolio/skills.html → data/skills.json (+ data/devicons, techtags)
    ├── portfolio/education.html → data/education.json
    └── sectionSummary.html → blogSummary.html  (active featured posts)
```

Shared partials: `breadcrumbs.html`, `techtags.html`, `advtags.html`,
`advSummary.html`, `contact-qr.html`, `shortcodes/imgresize.html`.

## SEO surfaces

- Per-page `<title>`, `<meta description>`, canonical, Open Graph
  (`baseof.html`).
- Dual taxonomy: `/tags/*` and `/advtags/*` term pages
  (`taxonomy.html` / `terms.html`).
- `sitemap.xml` (daily changefreq, priority tuned per section via front matter),
  `robots.txt`, GA4.
- Blog archive aliases preserve old post URLs.
