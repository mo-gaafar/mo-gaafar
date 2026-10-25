import Link from 'next/link'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '../../../../lib/payload'
import { pageMetadata } from '../../../../lib/seo'
import { RichText } from '../../../../components/RichText'

export const dynamic = 'force-dynamic'

const getCase = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'case-studies', where: { slug: { equals: slug } }, limit: 1 })
  return docs[0]
})

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = await getCase(slug)
  if (!study) notFound()
  return pageMetadata(study.title, study.summary, `/case-studies/${study.slug}`)
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = await getCase(slug)
  if (!study) notFound()
  return (
    <article className="section center-narrow">
      <div className="breadcrumbs"><Link href="/#work">Selected work</Link> / {study.title}</div>
      <header className="section-head">
        <p className="eyebrow">{[study.role, study.client].filter(Boolean).join(' · ')}</p>
        <h1>{study.title}</h1>
        <p className="lead">{study.summary}</p>
      </header>
      {study.headlineMetric && <div className="panel"><h2>{study.headlineMetric}</h2><p>{study.headlineMetricLabel}</p></div>}
      <div className="prose" style={{ marginTop: '2rem' }}>
        {study.problem && <section><h2>The problem</h2><p>{study.problem}</p></section>}
        {study.approach && <section><h2>The approach</h2><RichText data={study.approach} /></section>}
        {study.outcome && <section><h2>The outcome</h2><p>{study.outcome}</p></section>}
        {!!study.stack?.length && <p className="stack-line">{study.stack.map((s) => s.item).join(' · ')}</p>}
        <Link className="btn btn-primary" href="/#contact">Discuss a similar project</Link>
      </div>
    </article>
  )
}
