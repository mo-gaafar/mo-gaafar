import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload } from 'payload'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { stripFrontMatter } from './lexical'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const contentDir = path.join(dirname, 'content')

/** Remove all docs in a collection so the seed is repeatable. */
async function wipe(payload: Payload, slug: string) {
  await payload.delete({ collection: slug as never, where: {} }).catch(() => {})
}

export async function seed(payload: Payload) {
  payload.logger.info('— Seeding content —')

  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const body = (rel: string) => {
    try {
      const md = stripFrontMatter(fs.readFileSync(path.join(contentDir, rel), 'utf8'))
      return convertMarkdownToLexical({ editorConfig, markdown: md })
    } catch (err) {
      payload.logger.warn(`Could not convert ${rel}: ${(err as Error).message}`)
      return undefined
    }
  }

  // ---- Admin user ----
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@mngaafar.com'
  const password = process.env.SEED_ADMIN_PASSWORD || 'changeme-please'
  const existing = await payload.find({ collection: 'users', limit: 1 })
  if (existing.totalDocs === 0) {
    await payload.create({ collection: 'users', data: { email, password, name: 'Mohamed Gaafar' } })
    payload.logger.info(`Created admin user: ${email}`)
  }

  // ---- Globals ----
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      firstName: 'Mohamed',
      lastName: 'N. Gaafar',
      roleTitle: 'AI Engineer & Fractional CTO',
      siteTitle: 'Mohamed Gaafar — AI Engineer & Fractional CTO',
      description:
        'AI Engineer and Fractional CTO. I design, build, and lead the delivery of production AI systems — RAG platforms, voice agents, and automation — and run the engineering function for founders who need technical leadership without a full-time hire.',
      email: 'mohamed_gaafar@ieee.org',
      phone: '+201155277008',
      location: 'Turin, Italy · Cairo, Egypt',
      bookingUrl: '',
      resumeUrl: '/files/Mohamed%20Gaafar%20CV.pdf',
      upworkUrl: 'https://www.upwork.com/freelancers/~0169b1c1f18b963e0e',
      analyticsId: 'G-5GL6K1NVFM',
      socials: [
        { label: 'GitHub', url: 'https://github.com/mo-gaafar/' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mn-gaafar/' },
        { label: 'X', url: 'https://twitter.com/jaafar_dev/' },
        { label: 'ORCID', url: 'https://orcid.org/0009-0001-5478-7940' },
        { label: 'Email', url: 'mailto:mohamed_gaafar@ieee.org' },
        { label: 'Upwork', url: 'https://www.upwork.com/freelancers/~0169b1c1f18b963e0e' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'home',
    data: {
      kicker: 'Applied AI systems · Engineering leadership',
      headline: 'AI Engineer & Fractional CTO',
      lede:
        'I design, build, and lead the delivery of production AI systems — RAG platforms, voice agents, and workflow automation — and run the engineering function for founders who need a technical leader without a full-time hire.',
      ctas: [
        { label: 'Book a call', url: 'mailto:mohamed_gaafar@ieee.org', style: 'primary' },
        { label: 'See case studies', url: '/#work', style: 'secondary' },
        { label: 'Résumé', url: '/resume', style: 'link' },
      ],
      focusTags: [
        { label: 'Enterprise RAG' },
        { label: 'Voice AI agents' },
        { label: 'n8n workflows' },
        { label: 'Fractional CTO' },
        { label: 'Neurotechnology' },
      ],
      proofMetrics: [
        { value: 'CTO', label: 'Co-Founder, EXODIA AI Technologies' },
        { value: '10+', label: 'engineers led across AI delivery' },
        { value: '50K+', label: 'voice AI calls supported' },
        { value: '70%', label: 'less grant research admin work' },
      ],
      servicesHeading: 'How I work',
      servicesIntro:
        'Three ways I plug into a team — from owning the whole engineering function to shipping a single high-stakes AI build.',
      visibility: {
        showServices: true,
        showCaseStudies: true,
        showTestimonials: true,
        showExperience: true,
        showSkills: true,
        showProjects: true,
        showPublications: true,
        showEducation: true,
        showBlog: true,
      },
    },
  })

  // ---- Services ----
  await wipe(payload, 'services')
  const services = [
    {
      title: 'Fractional CTO',
      summary:
        'Technical leadership for AI-first products: architecture, hiring, delivery, and roadmap — the engineering function without the full-time hire.',
      forWho: 'Founders scaling an AI product',
      icon: 'compass',
      order: 1,
      bullets: [
        { text: 'Own architecture and delivery across the team' },
        { text: 'Hire and lead engineers (10+ led at EXODIA)' },
        { text: 'Turn an AI roadmap into shipped systems' },
      ],
    },
    {
      title: 'Applied AI Engineering',
      summary:
        'Hands-on builds of production LLM systems: enterprise RAG, agents, and voice AI that are reliable and measurable.',
      forWho: 'Teams with a concrete AI build',
      icon: 'cpu',
      order: 2,
      bullets: [
        { text: 'Enterprise RAG over policy-heavy knowledge' },
        { text: 'Claude / LLM agents with tool use and approvals' },
        { text: 'Voice AI on VAPI / Retell at scale' },
      ],
    },
    {
      title: 'AI Advisory & Automation',
      summary:
        'n8n workflow automation and AI-assisted internal tools that remove repetitive office work — plus a second opinion on AI strategy.',
      forWho: 'Operators modernising workflows',
      icon: 'workflow',
      order: 3,
      bullets: [
        { text: 'n8n workflows across CRMs, inboxes, and docs' },
        { text: 'Data enrichment and quality monitoring' },
        { text: 'Pragmatic AI roadmap reviews' },
      ],
    },
  ]
  for (const s of services) await payload.create({ collection: 'services', data: s })

  // ---- Case studies ----
  await wipe(payload, 'case-studies')
  const caseStudies = [
    {
      title: 'Enterprise RAG platform for grant research',
      client: 'EXODIA AI Technologies',
      role: 'Co-Founder & CTO',
      summary:
        'Built an enterprise retrieval-augmented platform for a subsidized-finance consultancy so grant researchers could query dense program policies instead of manually digging through documents.',
      headlineMetric: '70%',
      headlineMetricLabel: 'less grant research office work',
      problem:
        'Researchers spent most of their day manually cross-referencing grant policies and eligibility rules across large document sets.',
      outcome:
        'A production RAG platform that cut repetitive office work by roughly 70% and freed the team for higher-value analysis.',
      stack: [{ item: 'RAG' }, { item: 'Python' }, { item: 'Vector search' }, { item: 'LLMs' }],
      featured: true,
      order: 1,
    },
    {
      title: 'Voice AI platform scaling',
      client: 'Teammate AI',
      role: 'Voice AI Consultant',
      summary:
        'Resolved a production emergency in the team’s voice-agent setup and trained them on VAPI and Retell scaling constraints — latency, fallback handling, and prompt design.',
      headlineMetric: '50K+',
      headlineMetricLabel: 'calls handled since',
      problem:
        'A voice-agent product was failing under real call volume, with no clear view of the scaling constraints.',
      outcome:
        'Stabilised the platform and up-skilled the team; the system has since handled more than 50,000 calls.',
      stack: [{ item: 'VAPI' }, { item: 'Retell' }, { item: 'Voice AI' }],
      featured: true,
      order: 2,
    },
    {
      title: 'Email auditing with sentiment analysis',
      client: 'Sports Nutrition Association',
      role: 'AI Integration Consultant',
      summary:
        'Trained the CEO on n8n automation and built an email auditing system with sentiment analysis to flag unanswered support requests and monitor quality across thousands of threads.',
      headlineMetric: '6,000+',
      headlineMetricLabel: 'support threads monitored',
      problem:
        'Support quality and unanswered requests were invisible across a high volume of email threads.',
      outcome:
        'An automated auditing workflow that surfaces unanswered and negative-sentiment threads for follow-up.',
      stack: [{ item: 'n8n' }, { item: 'Sentiment analysis' }, { item: 'LLMs' }],
      featured: true,
      order: 3,
    },
  ]
  for (const c of caseStudies) await payload.create({ collection: 'case-studies', data: c })

  // ---- Experience ----
  await wipe(payload, 'experience')
  const experience = [
    {
      role: 'Co-Founder & CTO',
      company: 'EXODIA AI Technologies',
      range: 'July 2025 – Present',
      kind: 'leadership',
      current: true,
      order: 1,
      summary:
        'Leading a team of 10+ engineers delivering AI automation and applied AI systems, including an enterprise RAG platform for a subsidized finance consultancy that reduced grant researchers’ office work by 70%. Delivered AI training to a major culinary institute in Italy with 100+ employees.',
    },
    {
      role: 'AI Automation Consultant',
      company: 'RemodelBoom · Remote',
      range: 'Dec 2025 – Present',
      kind: 'consulting',
      current: true,
      order: 2,
      summary:
        'Advising founders on n8n automation and AI-assisted internal tools, including a direct-mail management system for 30K+ monthly mails with address verification and data enrichment.',
    },
    {
      role: 'Voice AI Consultant',
      company: 'Teammate AI · Remote',
      range: 'July 2025 – Nov 2025',
      kind: 'consulting',
      order: 3,
      summary:
        'Resolved a product emergency in the team’s voice agent setup and trained the team on VAPI and Retell scaling constraints. The platform has since handled 50K+ calls.',
    },
    {
      role: 'AI Integration Consultant',
      company: 'Sports Nutrition Association · Remote',
      range: 'June 2025 – Nov 2025',
      kind: 'consulting',
      order: 4,
      summary:
        'Trained the CEO on n8n automation and built an email auditing system with sentiment analysis to flag unanswered support requests and monitor quality across 6,000+ threads.',
    },
    {
      role: 'AI Engineer',
      company: 'Duara Education · Remote, Kenya',
      range: 'June 2025 – Oct 2025',
      kind: 'engineering',
      order: 5,
      summary:
        'Supported AI-accelerated development of a full school management platform for a smart school in Kenya, covering enrollments, grades, finances, and inventory.',
    },
    {
      role: 'Artificial Intelligence Consultant',
      company: 'Educate! · Remote, Kenya',
      range: 'March 2025 – July 2025',
      kind: 'engineering',
      order: 6,
      summary:
        'Built multimodal AI WhatsApp agents for entrepreneurship trainers and volunteers, retrieving guidance from a large database of program policies and operating guidelines.',
    },
    {
      role: 'Founding Software Engineer',
      company: 'Eventec (formerly Illusionare LLC) · Cairo, Egypt',
      range: 'March 2023 – April 2024',
      kind: 'engineering',
      order: 7,
      summary:
        'Built a multitenant event management SaaS platform from the ground up, scaling from solo engineering to a team of 6+ engineers and designers. The platform now supports 100K+ event-goers.',
    },
  ]
  for (const e of experience) await payload.create({ collection: 'experience', data: e })

  // ---- Skill groups ----
  await wipe(payload, 'skill-groups')
  const skillGroups = [
    {
      grouping: 'AI Automation and Agents',
      order: 1,
      skills: ['RAG Systems', 'Voice AI', 'WhatsApp AI Agents', 'n8n Automations', 'VAPI', 'Retell', 'Pydantic AI', 'Zapier', 'Prompt Engineering'].map((name) => ({ name })),
    },
    {
      grouping: 'Software Engineering',
      order: 2,
      skills: ['Python', 'FastAPI', 'Django', 'JavaScript', 'C++', 'C#', 'SQL', 'MongoDB', 'Docker', 'AWS', 'GCP', 'Linux', 'git'].map((name) => ({ name })),
    },
    {
      grouping: 'Machine Learning and Data',
      order: 3,
      skills: ['PyTorch', 'TensorFlow', 'Keras', 'Vision Transformers', 'GPT-2', 'Sentiment Analysis', 'Data Enrichment', 'Google Colab'].map((name) => ({ name })),
    },
    {
      grouping: 'Neurotechnology and Immersive Systems',
      order: 4,
      skills: ['Bionics Engineering', 'Brain-Computer Interfaces', 'EEG', 'MNE', 'LSL', 'TMS Motor Mapping', 'VTK', 'Unity 3D', 'Virtual Reality', 'MATLAB', 'Embedded C'].map((name) => ({ name })),
    },
  ]
  for (const g of skillGroups) await payload.create({ collection: 'skill-groups', data: g })

  // ---- Education ----
  await wipe(payload, 'education')
  const education = [
    {
      school: "Scuola Superiore Sant'Anna & University of Pisa",
      schoolUrl: 'https://www.santannapisa.it/',
      degree: 'Master of Science',
      major: 'Bionics Engineering, Neural Engineering Track',
      notes: 'Ranked 2nd among international applicants in the admission test and interview.',
      range: 'In Progress',
      order: 1,
    },
    {
      school: 'Cairo University, Faculty of Engineering',
      schoolUrl: 'https://eng.cu.edu.eg/',
      degree: 'Bachelor of Science',
      major: 'Systems and Biomedical Engineering',
      notes: 'GPA 3.5/4.0, IELTS 8.5 (C2), ranked in the top 4 of the class.',
      range: '2019 – 2024',
      order: 2,
    },
  ]
  for (const e of education) await payload.create({ collection: 'education', data: e })

  // ---- Certifications ----
  await wipe(payload, 'certifications')
  const certifications = [
    {
      name: 'AWS Solutions Architect',
      description: 'AWS Certified Solutions Architect – Associate',
      badge: 'https://images.credly.com/size/340x340/images/4bc21d8b-4afe-4fbd-9a90-a9de8bf7b240/AWS-SolArchitect-Associate-2020.png',
      proof: 'https://www.credly.com/badges/9c168644-e23c-4605-9d98-91b5db56e6c9',
      order: 1,
    },
    {
      name: 'ACP-JSD',
      description: 'Jira Service Desk Administrator',
      proof: 'https://www.certmetrics.com/atlassian/public/badge.aspx?i=4&t=c&d=2020-05-11&ci=AT00143196',
      order: 2,
    },
    {
      name: 'ACP-JCA',
      description: 'Jira Cloud Administrator',
      proof: 'https://www.certmetrics.com/atlassian/public/badge.aspx?i=26&t=c&d=2020-08-07&ci=AT00143196',
      order: 3,
    },
  ]
  for (const c of certifications) await payload.create({ collection: 'certifications', data: c })

  // ---- Projects ----
  await wipe(payload, 'projects')
  const projects = [
    {
      title: 'TMS Motor Mapping Visualization — GSoC ’24 @ InVesalius',
      slug: 'tms-motor-mapping-visualization-gsoc-24-invesalius',
      description: 'Google Summer of Code 2024 contribution to InVesalius: visualizing transcranial magnetic stimulation motor mapping.',
      link: 'https://github.com/invesalius/invesalius3',
      coverUrl: 'https://gist.github.com/user-attachments/assets/dbbc2819-00c8-49b1-ac07-902155b2d5ba',
      featured: true,
      fact: 'I didn’t know anything about Transcranial Magnetic Stimulation (TMS) before this project.',
      tags: [{ tag: 'gsoc' }, { tag: 'opensource' }],
      order: 1,
      content: body('projects/tms-motor-mapping-visualization-gsoc-24-invesalius.md'),
    },
    {
      title: 'Advancing Neurorehabilitation: BCIs in VR for Stroke Motor Rehabilitation',
      slug: 'advancing-neurorehabilitation-bci-vr-stroke',
      description: 'An informative article on the progress of our graduation project integrating VR and brain-computer interfaces for stroke rehabilitation.',
      link: 'https://doi.org/10.1101/2024.01.08.24300991',
      coverUrl: '/img/bcivrcover.png',
      featured: false,
      tags: [{ tag: 'graduation project' }],
      order: 2,
      content: body('projects/advancing-neurorehabilitation-integrating-brain-computer-interfaces-in-virtual-reality-for-motor-rehabilitation-of-stroke-patients.md'),
    },
    {
      title: 'Empowering the Visually Impaired with Vision Transformers',
      slug: 'empowering-the-visually-impaired-vision-transformers',
      description: 'Real-time auditory descriptions of surroundings to improve navigation and daily tasks for people with blindness.',
      link: 'https://github.com/mo-gaafar/blind-assistance-deep-learning',
      coverUrl: '/img/vision-transformer.png',
      featured: false,
      fact: 'Our team won 1st place among 10+ assistive-technology teams.',
      tags: [{ tag: 'computer vision' }, { tag: 'assistive technology' }],
      order: 3,
      content: body('projects/empowering-the-visually-impaired-a-leap-forward-with-vision-transformers.md'),
    },
    {
      title: 'Building the CUERT Website with Hugo and Netlify CMS',
      slug: 'cuert-website-hugo-netlify-cms',
      description: 'A fast, user-friendly website for the Cairo University Eco-Racing Team, one of the software projects I led.',
      link: 'https://github.com/cuert-web/cuert-website',
      coverUrl: '/img/cueco.png',
      featured: false,
      tags: [{ tag: 'web' }],
      order: 4,
      content: body('projects/my-experience-building-a-fast-and-user-friendly-website-with-hugo-and-netlify-cms.md'),
    },
  ]
  for (const p of projects) await payload.create({ collection: 'projects', data: p })

  // ---- Publications ----
  await wipe(payload, 'publications')
  await payload.create({
    collection: 'publications',
    data: {
      title: 'Immersive Virtual Reality Games in Neuromotor Rehabilitation with Brain-Computer Interfaces: A Scoping Review',
      slug: 'scoping-review-vr-bci-neuromotor-rehabilitation',
      pubType: 'Paper',
      date: '2024-01-06',
      link: 'http://doi.org/10.1101/2024.01.08.24300991',
      description:
        'My first professional paper, written for the first IEEE student paper contest in Alexandria, Egypt, as part of my graduation project.',
      coverUrl: '/img/pub1.png',
      featured: true,
      tags: ['brain computer interface', 'EEG', 'rehabilitation', 'virtual reality', 'scoping review'].map((tag) => ({ tag })),
      content: body('publications/scoping-review.md'),
    },
  })

  // ---- Blog posts ----
  await wipe(payload, 'posts')
  const posts: Array<{
    title: string
    slug: string
    date: string
    description: string
    featured?: boolean
    archived?: boolean
    tags: string[]
    file: string
    redirectFrom?: string[]
  }> = [
    {
      title: 'n8n AI Automation Consultant: Building Reliable Business Workflows',
      slug: 'n8n-ai-automation-consultant-business-workflows',
      date: '2026-07-06',
      description: 'How an n8n AI automation consultant designs reliable workflows that connect CRMs, inboxes, documents, LLMs, and human review steps.',
      featured: true,
      tags: ['n8n AI automation consultant', 'AI automation', 'workflow automation', 'no-code automation', 'enterprise AI'],
      file: 'blog/n8n-ai-automation-consultant-business-workflows.md',
    },
    {
      title: 'Claude AI Agents for Business Operations: Practical Design Patterns',
      slug: 'claude-ai-agents-for-business-operations',
      date: '2026-07-05',
      description: 'Practical patterns for building Claude AI agents that support business operations, from tool use and RAG to approval flows and evaluation.',
      featured: true,
      tags: ['Claude AI agents', 'AI agents', 'business automation', 'LLM applications', 'RAG systems'],
      file: 'blog/claude-ai-agents-for-business-operations.md',
    },
    {
      title: 'Hiring an AI Consultant for Voice Agents, RAG, and n8n Automation',
      slug: 'upwork-ai-consultant-voice-agents-rag-n8n',
      date: '2026-07-04',
      description: 'What to look for when hiring an AI consultant for voice agents, RAG systems, n8n automation, and production-ready LLM workflows.',
      featured: false,
      tags: ['AI consultant', 'voice agents', 'RAG systems', 'n8n automation', 'Upwork AI consultant'],
      file: 'blog/upwork-ai-consultant-voice-agents-rag-n8n.md',
    },
    {
      title: 'What an AI Automation Consultant Actually Builds for Enterprise Teams',
      slug: 'ai-automation-consultant-enterprise-workflows',
      date: '2026-06-12',
      description: 'A practical view of AI automation consulting, from n8n workflows and RAG systems to internal tools that reduce repetitive office work.',
      archived: true,
      tags: ['AI automation consultant', 'enterprise AI', 'n8n', 'RAG systems', 'workflow automation'],
      file: 'blog/archive/ai-automation-consultant-enterprise-workflows.md',
      redirectFrom: ['/blog/ai-automation-consultant-enterprise-workflows/'],
    },
    {
      title: 'RAG System Design for Knowledge Work: Lessons from Grant Research Automation',
      slug: 'rag-system-design-for-knowledge-work',
      date: '2026-06-18',
      description: 'How to design retrieval-augmented generation systems for policy-heavy knowledge work, with lessons from grant research automation.',
      archived: true,
      tags: ['RAG systems', 'retrieval augmented generation', 'enterprise AI', 'knowledge management', 'AI consulting'],
      file: 'blog/archive/rag-system-design-for-knowledge-work.md',
      redirectFrom: ['/blog/rag-system-design-for-knowledge-work/'],
    },
    {
      title: 'Voice AI Agents with VAPI and Retell: What Breaks When Call Volume Grows',
      slug: 'voice-ai-agents-vapi-retell-scaling',
      date: '2026-06-24',
      description: 'A field guide to scaling voice AI agents, including latency, fallback handling, prompt design, and operational constraints in VAPI and Retell deployments.',
      archived: true,
      tags: ['voice AI', 'VAPI', 'Retell', 'AI agents', 'conversational AI'],
      file: 'blog/archive/voice-ai-agents-vapi-retell-scaling.md',
      redirectFrom: ['/blog/voice-ai-agents-vapi-retell-scaling/'],
    },
    {
      title: 'Neurotechnology Software: Connecting BCI, VR, and TMS Visualization',
      slug: 'neurotechnology-software-bci-vr-tms',
      date: '2026-07-01',
      description: 'How software engineering connects brain-computer interfaces, virtual reality rehabilitation, TMS motor mapping, and bionics engineering research.',
      archived: true,
      tags: ['neurotechnology software', 'brain computer interface', 'virtual reality rehabilitation', 'TMS visualization', 'bionics engineering'],
      file: 'blog/archive/neurotechnology-software-bci-vr-tms.md',
      redirectFrom: ['/blog/neurotechnology-software-bci-vr-tms/'],
    },
    {
      title: 'Forcing SSL with Apache Rewrite Rules',
      slug: 'force-ssl',
      date: '2009-01-01',
      description: 'Archived technical note on forcing SSL with Apache rewrite rules.',
      archived: true,
      tags: ['apache', 'redirect', 'rewrite', 'ssl', 'web development'],
      file: 'blog/archive/force-ssl.md',
      redirectFrom: ['/blog/force-ssl/'],
    },
  ]
  for (const p of posts) {
    await payload.create({
      collection: 'posts',
      data: {
        title: p.title,
        slug: p.slug,
        date: p.date,
        description: p.description,
        featured: !!p.featured,
        archived: !!p.archived,
        tags: p.tags.map((tag) => ({ tag })),
        redirectFrom: (p.redirectFrom ?? []).map((path) => ({ path })),
        content: body(p.file),
      },
    })
  }

  payload.logger.info('— Seed complete —')
}
