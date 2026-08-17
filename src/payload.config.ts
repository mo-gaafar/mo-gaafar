import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { s3Storage } from '@payloadcms/storage-s3'
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

// Origins allowed to call the CMS API from a browser. Always includes the CMS's
// own URL; additional headless frontends (e.g. the mngaafar.com site consuming
// this CMS) are added via CORS_ORIGINS (comma-separated). Used for both CORS
// (cross-origin reads) and CSRF (cookie-authenticated requests).
const allowedOrigins = [
  process.env.NEXT_PUBLIC_SERVER_URL,
  ...(process.env.CORS_ORIGINS || '').split(',').map((origin) => origin.trim()),
].filter((origin): origin is string => Boolean(origin))

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
  cors: allowedOrigins.length ? allowedOrigins : undefined,
  csrf: allowedOrigins.length ? allowedOrigins : undefined,
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
    // Store Media uploads in Cloudflare R2 (S3-compatible) when configured.
    // Coolify containers have ephemeral disks, so on a real deployment uploads
    // MUST go to object storage or they vanish on redeploy. Falls back to local
    // disk when S3_BUCKET is unset (e.g. local dev).
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: { media: true },
            bucket: process.env.S3_BUCKET,
            config: {
              endpoint: process.env.S3_ENDPOINT, // e.g. https://<accountid>.r2.cloudflarestorage.com
              region: process.env.S3_REGION || 'auto',
              forcePathStyle: true,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
            },
          }),
        ]
      : []),
  ],
})
