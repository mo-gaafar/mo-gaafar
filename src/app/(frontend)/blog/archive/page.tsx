import Link from 'next/link'
import { Icon } from '../../../../components/Icon'
import type { Metadata } from 'next'
import { pageMetadata } from '../../../../lib/seo'
import { getPayloadClient } from '../../../../lib/payload'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = pageMetadata('Archived writing', 'Older engineering articles and technical notes by Mohamed Gaafar.', '/blog/archive')

const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : ''

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
    <section className="section writing-index">
      <Link className="reading-back" href="/blog"><Icon name="arrowBack" /> All writing</Link>
      <div className="section-head">
        <h1>Archived posts</h1>
        <p className="lead">Older technical notes preserved for reference.</p>
      </div>
      {docs.map((p) => (
        <article className="post-row" key={p.id}>
          <p className="meta"><time dateTime={p.date}>{fmtDate(p.date)}</time></p>
          <h2>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
          </h2>
          <p className="muted">{p.description}</p>
        </article>
      ))}
    </section>
  )
}
