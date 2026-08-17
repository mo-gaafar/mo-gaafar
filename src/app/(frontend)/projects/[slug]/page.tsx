import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient, mediaUrl } from '../../../../lib/payload'
import { RichText } from '../../../../components/RichText'
import { Icon } from '../../../../components/Icon'

export const dynamic = 'force-dynamic'

async function getProject(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'projects', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
  return docs[0] ?? null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await getProject(slug)
  if (!p) return { title: 'Project' }
  return { title: p.title, description: p.description }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getProject(slug)
  if (!p) notFound()
  const img = mediaUrl(p.cover, p.coverUrl)

  return (
    <article className="section center-narrow">
      <div className="breadcrumbs">
        <Link href="/projects">Projects</Link> / {p.title}
      </div>
      <div className="section-head">
        <h2>{p.title}</h2>
        <p className="lead">{p.description}</p>
      </div>
      {img && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt={p.title} style={{ borderRadius: 12, marginBottom: '1.5rem' }} />
      )}
      {p.content && <RichText data={p.content} />}
      {p.link && (
        <p style={{ marginTop: '1.5rem' }}>
          <a href={p.link} className="btn btn-primary" target="_blank" rel="noopener">
            Visit <Icon name="external" size={16} />
          </a>
        </p>
      )}
    </article>
  )
}
