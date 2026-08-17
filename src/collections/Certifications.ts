import type { CollectionConfig } from 'payload'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
    group: 'Résumé',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'text' },
    {
      name: 'badge',
      type: 'text',
      admin: { description: 'Badge image URL (e.g. Credly).' },
    },
    {
      name: 'proof',
      type: 'text',
      admin: { description: 'Verification / proof URL.' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
