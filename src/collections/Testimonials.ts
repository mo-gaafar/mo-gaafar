import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'company', 'featured', 'order'],
    group: 'Content',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'author', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'project', type: 'text' },
    { name: 'reviewDate', type: 'text', admin: { description: 'Display date from the original review.' } },
    { name: 'rating', type: 'number', min: 1, max: 5 },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
