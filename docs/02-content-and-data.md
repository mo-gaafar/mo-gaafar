# 02 · Content & Data Inventory

Everything the site publishes, mapped to source files. This is the migration
checklist — anything not captured here risks being lost in a rebuild.

## Site identity (`config.toml` params)

| Field | Value |
|-------|-------|
| Name | Mohamed **N. Gaafar** (`firstName` / `lastName`) |
| Title | *Mohamed Gaafar \| AI Automation Consultant and Bionics Engineer* |
| Description (meta/hero lede) | "I build RAG systems, voice AI agents, n8n workflows, and neurotechnology software that turn messy operations into reliable, measurable automation." |
| Email | `mohamed_gaafar@ieee.org` |
| Phone | +201155277008 |
| Location | Turin, Italy · Cairo, Egypt |
| Profile image | `img/mo.jpeg` |
| Upwork | `https://www.upwork.com/freelancers/~0169b1c1f18b963e0e` |
| GitHub | `github.com/mo-gaafar` |
| LinkedIn | `linkedin.com/in/mn-gaafar` |
| X | `twitter.com/jaafar_dev` |
| ORCID | `0009-0001-5478-7940` |

## Hero (landing) — `partials/about.html`

- Kicker: **"AI automation consultant · Bionics engineer"**
- H1: Mohamed N. Gaafar
- Lede: the site description above.
- CTAs: **Contact** (mailto) · **Work** (`/#projects`) · **Resume** (`/resume`).
- Meta: location + obfuscated email.
- Focus tags: `Enterprise RAG`, `Voice AI agents`, `n8n workflows`, `Neurotechnology`.
- Panel: portrait, **Upwork "Top Rated Plus"** badge, and a **proof grid**:
  - `50K+` voice AI calls supported
  - `10+` engineers led
  - `3` products shipped
  - `70%` grant admin time cut
- Optional hero footer renders certifications when `showCertifications` is on (currently off).

> ⚠️ The hero proof metrics are **hard-coded in the template**, not data-driven.
> CLAUDE.md documents a slightly different intended metric set (CTO/Co-Founder,
> "50K+ voice AI calls", "70% less grant research admin"). Reconcile during rebuild.

## Experience — `data/experience.json`

Seven roles (most recent first):

1. **Co-Founder & CTO — EXODIA AI Technologies** (Jul 2025 – Present). Leads 10+ engineers; enterprise RAG platform cut grant researchers' office work 70%; AI training for a 100+ employee Italian culinary institute.
2. **AI Automation Consultant — RemodelBoom** (Dec 2025 – Present, remote). n8n automation + internal tools; direct-mail system for 30K+ monthly mails with address verification + data enrichment.
3. **Voice AI Consultant — Teammate AI** (Jul 2025 – Nov 2025, remote). Fixed a voice-agent product emergency; trained team on VAPI/Retell scaling; platform now 50K+ calls.
4. **AI Integration Consultant — Sports Nutrition Association** (Jun 2025 – Nov 2025, remote). n8n training + email auditing system with sentiment analysis over 6,000+ threads.
5. **AI Engineer — Duara Education (Kenya)** (Jun 2025 – Oct 2025, remote). AI-accelerated school management platform (enrollments, grades, finances, inventory).
6. **AI Consultant — Educate! (Kenya)** (Mar 2025 – Jul 2025, remote). Multimodal WhatsApp AI agents over a large policy/guidelines database.
7. **Founding Software Engineer — Eventec (formerly Illusionare LLC)** (Mar 2023 – Apr 2024, Cairo). Built multitenant event-management SaaS solo → team of 6+, now 100K+ event-goers.

## Skills — `data/skills.json`

Four groupings:

- **AI Automation and Agents:** RAG Systems, Voice AI, WhatsApp AI Agents, n8n Automations, VAPI, Retell, Pydantic AI, Zapier, Prompt Engineering.
- **Software Engineering:** Python, FastAPI, Django, JavaScript, C++, C#, SQL, MongoDB, Docker, AWS, GCP, Linux, git.
- **Machine Learning and Data:** PyTorch, TensorFlow, Keras, Vision Transformers, GPT-2, Sentiment Analysis, Data Enrichment, Google Colab.
- **Neurotechnology and Immersive Systems:** Bionics Engineering, Brain-Computer Interfaces, EEG, MNE, LSL, TMS Motor Mapping, VTK, Unity 3D, Virtual Reality, MATLAB, Embedded C.

## Education — `data/education.json`

- **MSc Bionics Engineering (Neural Engineering track)** — Scuola Superiore Sant'Anna & University of Pisa. *In Progress.* Ranked 2nd among international applicants.
- **BSc Systems and Biomedical Engineering** — Cairo University Faculty of Engineering (2019–2024). GPA 3.5/4.0, IELTS 8.5 (C2), top 4 of class.

## Certifications — `data/certifications.json` (currently hidden)

- AWS Certified Solutions Architect – Associate (Credly proof).
- ACP-JSD — Jira Service Desk Administrator.
- ACP-JCA — Jira Cloud Administrator.

## Projects — `content/projects/creations/`

Section landing: `content/projects/creations/_index.md`. Home page shows
**featured only** (`featured: true`).

| File | Title | Featured | Link | Image |
|------|-------|:-------:|------|-------|
| `tms-motor-mapping-visualization-gsoc-24-invesalius.md` | TMS Motor Mapping Visualization — GSoC '24 @ InVesalius | ✅ | github.com/invesalius/invesalius3 | gist asset |
| `advancing-neurorehabilitation-…-stroke-patients.md` | Advancing Neurorehabilitation: BCIs in VR for Stroke Motor Rehab | ❌ | doi.org/10.1101/2024.01.08.24300991 | `img/bcivrcover.png` |
| `empowering-the-visually-impaired-…-vision-transformers.md` | Empowering the Visually Impaired: Vision Transformers | ❌ | github.com/mo-gaafar/blind-assistance-deep-learning | `img/vision-transformer.png` |
| `my-experience-building-…-hugo-and-netlify-cms.md` | Building a Fast Website with Hugo & Netlify CMS (CUERT) | ❌ | github.com/cuert-web/cuert-website | `img/cueco.png` |

Contributions (`content/projects/contributions/`: `deploy-triggers.md`,
`schema-org.md`, `shields-docker.md`) exist but the whole open-source section is
**toggled off** (`showOpenSource = false`).

## Publications — `content/publications/`

- **Scoping Review — Immersive VR Games in Neuromotor Rehabilitation with BCIs**
  (`scoping-review.md`), `pubtype: Paper`, featured, DOI `10.1101/2024.01.08.24300991`,
  image `img/pub1.png`. IEEE student paper contest (Alexandria, Egypt); part of graduation project. Rich `tags` set (BCI, EEG, rehabilitation, VR, exergames, …).

## Blog — `content/blog/`

Landing `_index.md`: *"AI Automation Consulting, Agents, and Workflow Engineering."*
Home + `/blog` show active (non-archived) posts; `layouts/blog/section.html`
renders active posts then an archive link panel.

**Active, SEO-focused posts:**

| File | Title | Featured |
|------|-------|:-------:|
| `n8n-ai-automation-consultant-business-workflows.md` | n8n AI Automation Consultant: Building Reliable Business Workflows | ✅ |
| `claude-ai-agents-for-business-operations.md` | Claude AI Agents for Business Operations: Practical Design Patterns | ✅ |
| `upwork-ai-consultant-voice-agents-rag-n8n.md` | Hiring an AI Consultant for Voice Agents, RAG, and n8n Automation | ❌ |

Each carries `tags` + `advtags` (dual taxonomy) for SEO.

**Archived posts** (`content/blog/archive/`, `archived: true`, aliased redirects):
`ai-automation-consultant-enterprise-workflows.md`,
`neurotechnology-software-bci-vr-tms.md`,
`rag-system-design-for-knowledge-work.md`,
`voice-ai-agents-vapi-retell-scaling.md`, `force-ssl.md`.

> Archived posts keep `aliases` to their old `/blog/<slug>/` URLs. **Preserve
> these redirects on migration** or SEO/link equity is lost.

## Resume — `content/resume.md`

Front matter `layout: resume`, `link: "/files/Mohamed Gaafar CV.pdf"`. The
`resume.html` layout embeds the PDF in an `<iframe>` with **Open PDF** and
**Download** buttons. (A legacy Canva embed path exists behind `.Params.canva`
but is unused.)

- PDF asset: `static/files/Mohamed Gaafar CV.pdf` → served at
  `/files/Mohamed%20Gaafar%20CV.pdf`. **Filename contains spaces** — handle
  carefully in any rebuild.

## Search — `content/search.md` + `layouts/_default/search.html`

Client-side search over the home JSON output (`index.json`) via `static`/theme
`js/search.js`.

## Static assets — `static/img/`

Portraits (`mo.jpeg`, `profile3.jpg`, `mngaafar-avatar*.png`, `img_3093-scaled.jpeg`)
and project imagery (`bcivrcover.png`, `vision-transformer.png`, `cueco.png`,
`vrgame3.png`, `block_diagram.png`, `slice-2-0.2x.png`, plus theme demo thumbnails).
Inventory these against actual usage during rebuild — several are theme-example
leftovers (`cakephp-acls`, `docker-pipelines`, `organicdevops`, `schema-org`, etc.).

## Redirects & aliases to preserve

- Archived blog post aliases (old `/blog/<slug>/` paths).
- Resume PDF URL `/files/Mohamed%20Gaafar%20CV.pdf`.
- Canonical domain `https://www.mngaafar.com/`.
