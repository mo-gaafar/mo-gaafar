import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'order'],
    group: 'Content',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'Short summary shown on cards.' },
    },
    { name: 'content', type: 'richText' },
    {
      name: 'link',
      type: 'text',
      admin: { description: 'External link (repo, DOI, live site).' },
    },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    {
      name: 'coverUrl',
      type: 'text',
      admin: { description: 'Fallback external image URL (used if no cover upload).' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'fact',
      type: 'text',
      admin: { description: 'Optional highlight / fun fact.' },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    { name: 'date', type: 'date' },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
