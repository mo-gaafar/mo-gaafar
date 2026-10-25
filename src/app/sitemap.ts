import type { MetadataRoute } from 'next'
import { getPayloadClient } from '../lib/payload'
import { siteUrl } from '../lib/seo'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const collections = ['posts', 'projects', 'case-studies'] as const
  const groups = await Promise.all(collections.map(async (collection) => {
    const { docs } = await payload.find({ collection, pagination: false, depth: 0 })
    const prefix = collection === 'posts' ? 'blog' : collection
    return docs.flatMap((doc) => doc.slug ? [{
      url: `${siteUrl()}/${prefix}/${encodeURIComponent(doc.slug)}`,
      lastModified: new Date(doc.updatedAt),
    }] : [])
  }))
  return [
    ...['', '/projects', '/blog', '/blog/archive', '/publications', '/resume'].map((path) => ({ url: `${siteUrl()}${path}` })),
    ...groups.flat(),
  ]
}
