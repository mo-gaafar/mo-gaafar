import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  admin: { group: 'Settings' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'kicker', type: 'text', admin: { description: 'Small label above the headline.' } },
            {
              name: 'headline',
              type: 'text',
              required: true,
              admin: { description: 'Main hero headline.' },
            },
            { name: 'lede', type: 'textarea', required: true },
            {
              name: 'ctas',
              type: 'array',
              maxRows: 3,
              labels: { singular: 'CTA', plural: 'CTAs' },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
                {
                  name: 'style',
                  type: 'select',
                  defaultValue: 'primary',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'Text link', value: 'link' },
                  ],
                },
              ],
            },
            {
              name: 'focusTags',
              type: 'array',
              labels: { singular: 'Focus tag', plural: 'Focus tags' },
              fields: [{ name: 'label', type: 'text', required: true }],
            },
            {
              name: 'proofMetrics',
              type: 'array',
              maxRows: 6,
              labels: { singular: 'Metric', plural: 'Metrics' },
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Sections',
          fields: [
            {
              name: 'servicesHeading',
              type: 'text',
              defaultValue: 'How I work',
            },
            { name: 'servicesIntro', type: 'textarea' },
            {
              name: 'visibility',
              type: 'group',
              label: 'Section visibility',
              fields: [
                { name: 'showServices', type: 'checkbox', defaultValue: true },
                { name: 'showCaseStudies', type: 'checkbox', defaultValue: true },
                { name: 'showTestimonials', type: 'checkbox', defaultValue: true },
                { name: 'showExperience', type: 'checkbox', defaultValue: true },
                { name: 'showSkills', type: 'checkbox', defaultValue: true },
                { name: 'showProjects', type: 'checkbox', defaultValue: true },
                { name: 'showPublications', type: 'checkbox', defaultValue: true },
                { name: 'showEducation', type: 'checkbox', defaultValue: true },
                { name: 'showBlog', type: 'checkbox', defaultValue: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
