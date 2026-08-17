import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayloadClient } from '../../../../lib/payload'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Archived posts' }

const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''

export default async function ArchivePage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { archived: { equals: true } },
    sort: '-date',
    limit: 100,
    depth: 0,
  })

  return (
    <section className="section">
      <div className="breadcrumbs">
        <Link href="/blog">Writing</Link> / Archive
      </div>
      <div className="section-head">
        <h2>Archived posts</h2>
        <p className="lead">Older technical notes preserved for reference.</p>
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
    </section>
  )
}
