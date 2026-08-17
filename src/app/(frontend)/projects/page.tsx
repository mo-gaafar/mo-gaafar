import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayloadClient, mediaUrl } from '../../../lib/payload'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Projects' }

export default async function ProjectsPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'projects', sort: 'order', limit: 100, depth: 1 })

  return (
    <section className="section">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> / Projects
      </div>
      <div className="section-head">
        <p className="eyebrow">Build log</p>
        <h2>Projects</h2>
        <p className="lead">Things I have designed, built, or led — from applied AI to neurotechnology.</p>
      </div>
      <div className="card-grid">
        {docs.map((p) => {
          const img = mediaUrl(p.cover, p.coverUrl)
          return (
            <article className="card" key={p.id}>
              {img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img} alt={p.title} style={{ borderRadius: 8, marginBottom: '0.9rem', aspectRatio: '16/10', objectFit: 'cover' }} />
              )}
              <h3 style={{ fontSize: '1.15rem' }}>
                <Link href={`/projects/${p.slug}`}>{p.title}</Link>
              </h3>
              <p className="muted" style={{ marginTop: '0.4rem' }}>{p.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
