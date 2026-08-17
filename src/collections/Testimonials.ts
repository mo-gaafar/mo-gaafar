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
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
