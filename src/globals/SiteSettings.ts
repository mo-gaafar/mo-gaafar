import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  access: { read: () => true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'firstName', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'lastName', type: 'text', required: true, admin: { width: '50%' } },
      ],
    },
    {
      name: 'roleTitle',
      type: 'text',
      required: true,
      admin: { description: 'Headline identity, e.g. "AI Engineer & Fractional CTO".' },
    },
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
      admin: { description: 'Browser tab / SEO title.' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'Default meta description.' },
    },
    { name: 'profileImage', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', admin: { width: '50%' } },
        { name: 'phone', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'location', type: 'text' },
    {
      name: 'bookingUrl',
      type: 'text',
      admin: { description: 'Cal.com / Calendly link for the primary CTA.' },
    },
    { name: 'resumeUrl', type: 'text', admin: { description: 'Path or URL to the résumé PDF.' } },
    { name: 'upworkUrl', type: 'text' },
    { name: 'analyticsId', type: 'text', admin: { description: 'GA4 measurement ID.' } },
    {
      name: 'socials',
      type: 'array',
      labels: { singular: 'Social Link', plural: 'Social Links' },
      fields: [
        {
          name: 'label',
          type: 'select',
          required: true,
          options: ['GitHub', 'LinkedIn', 'X', 'ORCID', 'Email', 'Upwork'].map((v) => ({
            label: v,
            value: v,
          })),
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
