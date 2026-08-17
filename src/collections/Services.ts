import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'forWho', 'order'],
    group: 'Content',
    description: 'The "How I work" offerings on the home page.',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'summary', type: 'textarea', required: true },
    {
      name: 'forWho',
      type: 'text',
      admin: { description: 'Who this is for, e.g. "Early-stage AI founders".' },
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'cpu',
      options: [
        { label: 'Leadership', value: 'compass' },
        { label: 'Engineering', value: 'cpu' },
        { label: 'Advisory', value: 'lightbulb' },
        { label: 'Automation', value: 'workflow' },
        { label: 'Voice', value: 'mic' },
        { label: 'Search / RAG', value: 'search' },
      ],
    },
    {
      name: 'bullets',
      type: 'array',
      labels: { singular: 'Bullet', plural: 'Bullets' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
