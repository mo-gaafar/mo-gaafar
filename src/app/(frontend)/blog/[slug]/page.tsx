import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getPayloadClient } from '../../../../lib/payload'
import { RichText } from '../../../../components/RichText'

export const dynamic = 'force-dynamic'

const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''

async function getPost(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
  return docs[0] ?? null
}

/** Look up a post whose redirectFrom includes this old path (SEO preservation). */
async function findRedirectTarget(slug: string) {
  const payload = await getPayloadClient()
  const candidates = [`/blog/${slug}/`, `/blog/${slug}`, slug]
  const { docs } = await payload.find({
    collection: 'posts',
    where: { 'redirectFrom.path': { in: candidates } },
    limit: 1,
    depth: 0,
  })
  return docs[0] ?? null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) return { title: 'Post' }
  return { title: p.title, description: p.description }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) {
    const target = await findRedirectTarget(slug)
    if (target?.slug && target.slug !== slug) redirect(`/blog/${target.slug}`)
    notFound()
  }

  return (
    <article className="section center-narrow">
      <div className="breadcrumbs">
        <Link href="/blog">Writing</Link> / {p.title}
      </div>
      <div className="section-head">
        <h2>{p.title}</h2>
        <p className="meta muted">{fmtDate(p.date)}</p>
      </div>
      {p.content ? <RichText data={p.content} /> : <p className="lead">{p.description}</p>}
      {(p.tags?.length ?? 0) > 0 && (
        <div className="chips" style={{ marginTop: '2rem' }}>
          {p.tags!.map((t, i) => (
            <span className="chip" key={i}>
              {t.tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
