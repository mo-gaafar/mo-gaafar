import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
})
