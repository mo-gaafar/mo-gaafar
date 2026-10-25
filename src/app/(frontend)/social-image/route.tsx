import { ImageResponse } from 'next/og'
import { getPayloadClient } from '../../../lib/payload'

export const dynamic = 'force-dynamic'
const size = { width: 1200, height: 630 }

export async function GET() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 80, background: '#0d252e', color: '#f5f7f8', borderLeft: '18px solid #4cb6d6' }}>
      <div style={{ display: 'flex', fontSize: 30, color: '#83d4dc' }}>{settings.firstName} {settings.lastName}</div>
      <div style={{ display: 'flex', fontSize: 74, fontWeight: 700, maxWidth: 1000, lineHeight: 1.1 }}>{settings.roleTitle}</div>
      <div style={{ display: 'flex', fontSize: 24 }}>{settings.siteTitle}</div>
    </div>, size,
  )
}
