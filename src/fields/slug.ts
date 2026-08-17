import type { Field } from 'payload'

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * A reusable slug field that auto-generates from a source field (default
 * "title") when left blank. Kept editable so migrated content can preserve
 * historical URLs.
 */
export const slugField = (source = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'URL segment. Auto-filled from the title if left empty.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) return slugify(value)
        const src = data?.[source]
        if (typeof src === 'string' && src.length > 0) return slugify(src)
        return value
      },
    ],
  },
})
