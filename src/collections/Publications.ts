import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Publications: CollectionConfig = {
  slug: 'publications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'pubType', 'date', 'featured'],
    group: 'Content',
  },
  access: { read: () => true },
  defaultSort: '-date',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      name: 'pubType',
      type: 'select',
      defaultValue: 'Paper',
      options: ['Paper', 'Article', 'Talk', 'Poster'].map((v) => ({ label: v, value: v })),
    },
    { name: 'date', type: 'date' },
    { name: 'link', type: 'text', admin: { description: 'DOI or external URL.' } },
    { name: 'description', type: 'textarea', required: true },
    { name: 'content', type: 'richText' },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'coverUrl', type: 'text', admin: { description: 'Fallback external image URL.' } },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
  ],
}
