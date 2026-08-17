import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayloadClient } from '../../../lib/payload'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Publications' }

const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : ''

export default async function PublicationsPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'publications', sort: '-date', limit: 100, depth: 0 })

  return (
    <section className="section">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> / Publications
      </div>
      <div className="section-head">
        <p className="eyebrow">Research</p>
        <h2>Publications</h2>
        <p className="lead">Papers, articles, and talks — mostly in neurotechnology and applied AI.</p>
      </div>
      <div className="timeline">
        {docs.map((p) => (
          <article className="timeline-item" key={p.id}>
            <div>
              <h3>
                {p.pubType} — {p.link ? <a href={p.link} target="_blank" rel="noopener">{p.title}</a> : p.title}
              </h3>
              <p className="muted" style={{ marginTop: '0.4rem' }}>{p.description}</p>
            </div>
            <div className="when">{fmtDate(p.date)}</div>
          </article>
        ))}
      </div>
    </section>
  )
}
