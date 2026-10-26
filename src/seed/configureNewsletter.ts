import type { Payload } from 'payload'
import { sql } from '@payloadcms/db-postgres'

export async function configureNewsletter(payload: Payload) {
  await payload.db.drizzle.transaction(async (db) => {
    await db.execute(sql`SELECT pg_advisory_xact_lock(20261025, 1)`)
    const applied = await db.execute(sql`SELECT id FROM payload_migrations WHERE name = '20261026_newsletter_settings'`)
    if (applied.rows.length) return
    await db.execute(sql`ALTER TABLE site_settings
      ADD COLUMN IF NOT EXISTS newsletter_enabled boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS newsletter_title varchar DEFAULT 'Good ideas, delivered.',
      ADD COLUMN IF NOT EXISTS newsletter_description varchar DEFAULT 'Practical notes on AI, automation, and building useful software. Join me for ideas, experiments, and lessons learned.',
      ADD COLUMN IF NOT EXISTS newsletter_button_label varchar DEFAULT 'Subscribe',
      ADD COLUMN IF NOT EXISTS newsletter_buttondown_username varchar DEFAULT 'mngaafar'`)
    await db.execute(sql`INSERT INTO payload_migrations (name, batch) VALUES ('20261026_newsletter_settings', 3)`)
  })
}
