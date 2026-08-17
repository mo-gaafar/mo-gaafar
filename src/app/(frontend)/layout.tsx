import React from 'react'
import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import Script from 'next/script'

import './globals.css'
import { Nav } from '../../components/Nav'
import { Footer } from '../../components/Footer'
import { getPayloadClient } from '../../lib/payload'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' })

// Avoid a flash of the wrong theme before hydration.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const s = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
  const title = s?.siteTitle || 'Mohamed Gaafar'
  const description = s?.description || 'AI Engineer & Fractional CTO'
  const url = process.env.NEXT_PUBLIC_SERVER_URL || undefined
  return {
    metadataBase: url ? new URL(url) : undefined,
    title: { default: title, template: `%s · ${s?.firstName ?? 'Mohamed'} ${s?.lastName ?? 'Gaafar'}` },
    description,
    openGraph: { title, description, type: 'website', url },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const s = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

  const name = `${s?.firstName ?? 'Mohamed'} ${s?.lastName ?? 'Gaafar'}`
  const role = s?.roleTitle ?? 'AI Engineer & Fractional CTO'
  const socials = (s?.socials ?? []).map((x) => ({ label: x.label, url: x.url }))
  const analyticsId = s?.analyticsId

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="app-shell" id="top">
          <Nav
            name={name}
            role={role}
            bookingUrl={s?.bookingUrl}
            email={s?.email}
            socials={socials}
          />
          <div className="main">{children}</div>
        </div>
        <div className="main">
          <Footer name={name} socials={socials} />
        </div>
        {analyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${analyticsId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
