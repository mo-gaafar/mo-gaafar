import type { Metadata } from 'next'

export const siteUrl = () => new URL(process.env.SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://mngaafar.com').origin

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: 'website', images: ['/social-image'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/social-image'] },
  }
}

// CMS text must never be able to close the JSON-LD script element.
export const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c')

export function contactAction(bookingUrl?: string | null, email?: string | null) {
  return bookingUrl
    ? { url: bookingUrl, label: 'Book a call' }
    : { url: email ? `mailto:${email}` : '/#contact', label: 'Let’s talk' }
}
