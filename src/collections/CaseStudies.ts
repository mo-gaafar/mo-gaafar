import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'featured', 'order'],
    group: 'Content',
    description: 'Deep proof stories for the Fractional CTO positioning.',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'client', type: 'text', admin: { description: 'Client / company (or "Confidential").' } },
    { name: 'role', type: 'text', admin: { description: 'e.g. "CTO & lead engineer".' } },
    { name: 'summary', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'headlineMetric',
          type: 'text',
          admin: { width: '50%', description: 'e.g. "70%".' },
        },
        {
          name: 'headlineMetricLabel',
          type: 'text',
          admin: { width: '50%', description: 'e.g. "less grant research admin".' },
        },
      ],
    },
    { name: 'problem', type: 'textarea' },
    { name: 'approach', type: 'richText' },
    { name: 'outcome', type: 'textarea' },
    {
      name: 'stack',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
