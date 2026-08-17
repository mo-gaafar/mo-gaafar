import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['role', 'company', 'range', 'kind', 'order'],
    group: 'Résumé',
    description: 'Work history shown on the home page and résumé.',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'role', type: 'text', required: true },
    { name: 'company', type: 'text', required: true },
    {
      name: 'range',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "July 2025 – Present"' },
    },
    { name: 'summary', type: 'textarea', required: true },
    {
      name: 'kind',
      type: 'select',
      defaultValue: 'engineering',
      options: [
        { label: 'Leadership / CTO', value: 'leadership' },
        { label: 'AI Engineering', value: 'engineering' },
        { label: 'Consulting / Advisory', value: 'consulting' },
      ],
      admin: { description: 'Used to group and prioritise roles.' },
    },
    { name: 'current', type: 'checkbox', defaultValue: false },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
  ],
}
