# CLAUDE.md

Important context for future AI/code assistants working on this repository.

## Project Overview

This is Mohamed Gaafar's personal portfolio website built with Hugo.

- Root: `/Users/mohamed/Documents/Code/mo-gaafar`
- Hugo theme: `themes/hugo-resume`
- Main config: `config.toml`
- Content: `content/`
- Static assets: `static/`
- Generated build output: `public/`

The site positions Mohamed as an AI automation consultant, Upwork freelancer, CTO/co-founder, and bionics/neurotechnology engineer. Current SEO focus is around:

- AI automation consultant
- n8n AI automation consultant
- Claude AI agents
- Voice AI agents
- RAG systems
- Upwork AI consultant
- Neurotechnology software

## Development Commands

Use Hugo directly:

```bash
hugo
hugo server --bind 127.0.0.1 --port 1313 --disableFastRender
```

Preview URLs:

- Home: `http://localhost:1313/`
- Resume: `http://localhost:1313/resume/`
- Blog: `http://localhost:1313/blog/`
- Archive: `http://localhost:1313/blog/archive/`

## Git / Generated Files

`public/` is generated Hugo output and should stay ignored. Root `.gitignore` includes:

```gitignore
public/
.DS_Store
```

Do not edit `public/` directly. Edit source files under `content/`, `static/`, `data/`, `config.toml`, or `themes/hugo-resume/layouts/`, then run `hugo`.

`.DS_Store` may appear as tracked/modified from older history. Do not remove or reset it unless explicitly asked.

## Current Site Structure

Key files:

- `config.toml`: site params, social handles, Upwork links, profile image, feature toggles.
- `themes/hugo-resume/layouts/partials/about.html`: landing page hero.
- `static/css/resume-override.css`: main custom design override stylesheet.
- `themes/hugo-resume/layouts/_default/resume.html`: `/resume` layout.
- `content/resume.md`: resume page front matter.
- `themes/hugo-resume/layouts/blog/section.html`: custom blog listing layout.
- `content/blog/`: active blog posts.
- `content/blog/archive/`: archived old posts.

## Recent Design Direction

The landing page was redesigned away from the default resume theme. Keep the current direction:

- Modern consultant/portfolio feel.
- Clean hero with strong CTAs.
- Proof metrics in the hero.
- Portfolio/resume content should feel business-focused, not academic-only.
- Avoid returning to the old oversized classic resume look.

Current hero proof metrics come from Mohamed's Upwork screenshot:

- `100%` Job Success on Upwork
- `597` Upwork hours delivered
- `Top Rated Plus` Upwork freelancer
- `14` completed Upwork jobs

Upwork URLs are in `config.toml`:

```toml
upworkLink = "https://www.upwork.com/freelancers/~0169b1c1f18b963e0e"
```

## Resume PDF

The Canva resume embed has been replaced by a local PDF.

Uploaded PDF:

```text
static/files/Mohamed Gaafar CV.pdf
```

Published URL:

```text
/files/Mohamed%20Gaafar%20CV.pdf
```

`content/resume.md` uses:

```yaml
link: "/files/Mohamed Gaafar CV.pdf"
```

The resume layout embeds this PDF and provides `Open PDF` and `Download` buttons. Do not reintroduce the Canva embed unless Mohamed explicitly asks.

## Blog / SEO Setup

Old blog posts have been archived under:

```text
content/blog/archive/
```

Old URLs have Hugo aliases so they redirect to the archive paths. Preserve aliases when moving/renaming archived posts.

Active SEO-focused blog posts currently live directly under `content/blog/`:

- `content/blog/n8n-ai-automation-consultant-business-workflows.md`
- `content/blog/claude-ai-agents-for-business-operations.md`
- `content/blog/upwork-ai-consultant-voice-agents-rag-n8n.md`

The main blog page should show only active posts plus an archive link. This is handled by:

```text
themes/hugo-resume/layouts/blog/section.html
```

Archived posts should have:

```yaml
archived: true
featured: false
aliases:
  - /blog/original-slug/
```

## Writing Guidelines

Tone:

- Practical, direct, consultant-oriented.
- Ground claims in Mohamed's actual experience.
- Prefer measurable outcomes and concrete systems over vague AI hype.

Good topic clusters:

- AI automation consulting for business workflows.
- n8n integrations and no-code/low-code automation.
- Claude AI agents and LLM tool use.
- Voice AI agents using VAPI/Retell.
- RAG system design for enterprise knowledge work.
- Upwork-facing AI consulting credibility.
- Neurotechnology software, BCI, VR rehabilitation, and TMS visualization.

SEO front matter should include:

```yaml
title: "Keyword-Rich Human Title"
date: 2026-07-06T09:00:00+02:00
draft: false
featured: true
description: "Concise search snippet with the main keyword and value."
tags:
  - main keyword
  - related keyword
advtags:
  - main keyword
  - related keyword
```

## Verification Checklist

After edits, run:

```bash
hugo
```

Check rendered pages when relevant:

```bash
rg -n "expected text" public/path/index.html
```

If running the preview server, stop it when done unless the user asks to keep it open.

## Important Editing Notes

- Prefer focused edits. Avoid broad theme rewrites unless requested.
- Keep custom styling in `static/css/resume-override.css`.
- Do not edit generated `public/` files.
- Do not remove existing content unless explicitly asked; archive/redirect instead.
- Be careful with filenames containing spaces, especially the resume PDF.
- Hugo version observed locally: `hugo v0.117.0+extended`.
