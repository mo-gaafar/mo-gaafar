import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'featured', 'archived'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  defaultSort: '-date',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'date', type: 'date', required: true },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'Search snippet / card summary.' },
    },
    { name: 'content', type: 'richText' },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { name: 'featured', type: 'checkbox', defaultValue: false, admin: { width: '50%' } },
        { name: 'archived', type: 'checkbox', defaultValue: false, admin: { width: '50%' } },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'redirectFrom',
      type: 'array',
      labels: { singular: 'Redirect', plural: 'Redirects' },
      admin: {
        description: 'Old URL paths that should 301 to this post (SEO preservation).',
      },
      fields: [{ name: 'path', type: 'text', required: true }],
    },
  ],
}
