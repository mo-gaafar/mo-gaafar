import type { CollectionConfig } from 'payload'

export const SkillGroups: CollectionConfig = {
  slug: 'skill-groups',
  labels: { singular: 'Skill Group', plural: 'Skill Groups' },
  admin: {
    useAsTitle: 'grouping',
    defaultColumns: ['grouping', 'order'],
    group: 'Résumé',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'grouping', type: 'text', required: true },
    {
      name: 'skills',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Skill', plural: 'Skills' },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
