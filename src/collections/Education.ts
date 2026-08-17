import type { CollectionConfig } from 'payload'

export const Education: CollectionConfig = {
  slug: 'education',
  admin: {
    useAsTitle: 'school',
    defaultColumns: ['school', 'degree', 'range', 'order'],
    group: 'Résumé',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'school', type: 'text', required: true },
    { name: 'schoolUrl', type: 'text' },
    { name: 'degree', type: 'text', required: true },
    { name: 'major', type: 'text' },
    { name: 'notes', type: 'textarea' },
    { name: 'range', type: 'text', admin: { description: 'e.g. "2019 – 2024" or "In Progress"' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
