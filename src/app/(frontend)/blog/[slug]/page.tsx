import Link from 'next/link'
import type { Metadata } from 'next'
import { pageMetadata } from '../../../../lib/seo'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPayloadClient } from '../../../../lib/payload'
import { RichText } from '../../../../components/RichText'
import { Icon } from '../../../../components/Icon'

export const dynamic = 'force-dynamic'

const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : ''

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
  return pageMetadata(p.title, p.description || '', `/blog/${p.slug}`)
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) {
    const target = await findRedirectTarget(slug)
    if (target?.slug && target.slug !== slug) permanentRedirect(`/blog/${target.slug}`)
    notFound()
  }

  return (
    <article className="section reading-page">
      <Link className="reading-back" href={p.archived ? '/blog/archive' : '/blog'}>
        <Icon name="arrowBack" /> {p.archived ? 'Archived writing' : 'All writing'}
      </Link>
      <header className="section-head">
        <p className="eyebrow"><time dateTime={p.date}>{fmtDate(p.date)}</time></p>
        <h1>{p.title}</h1>
        {p.description && <p className="lead">{p.description}</p>}
      </header>
      <RichText data={p.content} />
      {(p.tags?.length ?? 0) > 0 && (
        <div className="chips">
          {p.tags!.map((t, i) => (
            <span className="chip" key={i}>
              {t.tag}
            </span>
          ))}
        </div>
      )}
      <Link className="reading-back" href="/blog"><Icon name="arrowBack" /> All writing</Link>
    </article>
  )
}
