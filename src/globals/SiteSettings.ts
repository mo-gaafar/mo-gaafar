import type { GlobalConfig } from 'payload'
import { validButtondownUsername } from '../lib/newsletter'

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
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter signup',
      admin: { description: 'Homepage signup. Subscribers and emails are managed in Buttondown.' },
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'title', type: 'text', required: true, defaultValue: 'Good ideas, delivered.' },
        { name: 'description', type: 'textarea', required: true, defaultValue: 'Practical notes on AI, automation, and building useful software. Join me for ideas, experiments, and lessons learned.' },
        { name: 'buttonLabel', type: 'text', required: true, defaultValue: 'Subscribe' },
        {
          name: 'buttondownUsername', type: 'text', required: true, defaultValue: 'mngaafar',
          admin: { description: 'Only the username from buttondown.com/USERNAME, without a URL or API key.' },
          validate: (value: unknown) => validButtondownUsername(value) || 'Use a Buttondown username containing only letters, numbers, underscores, or hyphens (up to 64 characters).',
        },
      ],
    },
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
