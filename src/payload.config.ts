import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Experience } from './collections/Experience'
import { SkillGroups } from './collections/SkillGroups'
import { Education } from './collections/Education'
import { Certifications } from './collections/Certifications'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { Projects } from './collections/Projects'
import { CaseStudies } from './collections/CaseStudies'
import { Publications } from './collections/Publications'
import { Posts } from './collections/Posts'
import { SiteSettings } from './globals/SiteSettings'
import { Home } from './globals/Home'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '· Mohamed Gaafar',
    },
  },
  collections: [
    // Content
    Projects,
    CaseStudies,
    Publications,
    Posts,
    Services,
    Testimonials,
    Media,
    // Résumé data
    Experience,
    SkillGroups,
    Education,
    Certifications,
    // Admin
    Users,
  ],
  globals: [SiteSettings, Home],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    // `push` keeps the schema in sync automatically (dev and this single-owner
    // deployment) so no manual migration step is needed on first Coolify boot.
    push: true,
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || undefined,
  cors: process.env.NEXT_PUBLIC_SERVER_URL ? [process.env.NEXT_PUBLIC_SERVER_URL] : undefined,
  plugins: [
    // Model Context Protocol server — exposes the CMS to MCP clients at
    // POST/GET /api/mcp (Streamable HTTP). Requests authenticate with an API
    // key created in the admin (Users → MCP API Keys). Toggle the whole plugin
    // off with DISABLE_MCP=true.
    mcpPlugin({
      disabled: process.env.DISABLE_MCP === 'true',
      userCollection: 'users',
      collections: {
        projects: {
          description: 'Portfolio projects (builds and open-source work).',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        'case-studies': {
          description: 'Deep proof stories used for the Fractional CTO positioning.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        publications: {
          description: 'Papers, articles, and talks.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        posts: {
          description: 'Blog posts (AI automation, agents, RAG, neurotech).',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        services: {
          description: 'Service offerings shown in the "How I work" section.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        testimonials: {
          description: 'Client testimonials / social proof.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        experience: {
          description: 'Work history / résumé roles.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        'skill-groups': {
          description: 'Grouped skills inventory.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        education: {
          description: 'Education history.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        certifications: {
          description: 'Professional certifications.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        media: {
          description: 'Uploaded images and files.',
          enabled: { find: true },
        },
      },
      globals: {
        'site-settings': {
          description: 'Global site identity, contact details, and social links.',
          enabled: { find: true, update: true },
        },
        home: {
          description: 'Home-page content: hero, proof metrics, and section visibility.',
          enabled: { find: true, update: true },
        },
      },
      mcp: {
        serverOptions: {
          serverInfo: { name: 'mngaafar-portfolio', version: '1.0.0' },
          instructions:
            'Content API for Mohamed Gaafar\'s portfolio. Use these tools to read and edit portfolio content: projects, case studies, publications, blog posts, services, experience, skills, education, certifications, and the site/home globals.',
        },
      },
    }),
  ],
})
