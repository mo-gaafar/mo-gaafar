import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayloadClient } from '../../../lib/payload'
import { Icon } from '../../../components/Icon'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Résumé' }

export default async function ResumePage() {
  const payload = await getPayloadClient()
  const s = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
  const pdf = s?.resumeUrl || '/files/Mohamed%20Gaafar%20CV.pdf'

  return (
    <section className="section">
      <div className="breadcrumbs">
        <Link href="/">Home</Link> / Résumé
      </div>
      <div className="section-head">
        <h2>Résumé</h2>
      </div>
      <div className="hero-actions">
        <a href={pdf} className="btn btn-primary" target="_blank" rel="noopener">
          <Icon name="external" size={16} /> Open PDF
        </a>
        <a href={pdf} className="btn btn-secondary" download>
          <Icon name="download" size={16} /> Download
        </a>
      </div>
      <div className="pdf-frame">
        <iframe src={pdf} title="Mohamed Gaafar résumé PDF" />
      </div>
    </section>
  )
}
