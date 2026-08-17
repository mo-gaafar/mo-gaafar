import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayloadClient } from '../../../lib/payload'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Writing' }

const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''

export default async function BlogPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { archived: { not_equals: true } },
    sort: '-date',
    limit: 100,
    depth: 0,
  })

  return (
    <section className="section">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> / Writing
      </div>
      <div className="section-head">
        <p className="eyebrow">Writing</p>
        <h2>AI automation, agents &amp; engineering</h2>
        <p className="lead">
          Practical notes on AI automation, Claude agents, n8n workflows, voice agents, RAG systems, and shipping
          production LLM applications.
        </p>
      </div>

      {docs.map((p) => (
        <div className="post-row" key={p.id}>
          <h3>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
          </h3>
          <p className="meta">{fmtDate(p.date)}</p>
          <p className="muted">{p.description}</p>
        </div>
      ))}

      <div className="panel">
        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>
          <Link href="/blog/archive">Archived posts</Link>
        </h3>
        <p className="muted">Older technical notes preserved for reference.</p>
      </div>
    </section>
  )
}
