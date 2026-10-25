import type { Payload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import { initialReviews } from './reviews'

// This existing database uses schema push; apply only this additive migration, never replay a baseline.
export async function importReviews(payload: Payload) {
  await payload.db.drizzle.transaction(async (db) => {
    await db.execute(sql`SELECT pg_advisory_xact_lock(20261025, 1)`)
    const imported = await db.execute(sql`SELECT id FROM payload_migrations WHERE name = '20261025_named_client_reviews'`)
    if (imported.rows.length) return
    await db.execute(sql`ALTER TABLE testimonials
      ADD COLUMN IF NOT EXISTS location varchar,
      ADD COLUMN IF NOT EXISTS project varchar,
      ADD COLUMN IF NOT EXISTS review_date varchar,
      ADD COLUMN IF NOT EXISTS rating numeric`)
    for (const [order, review] of initialReviews.entries()) {
      await db.execute(sql`INSERT INTO testimonials
        (author, role, location, project, review_date, rating, quote, featured, "order")
        VALUES (${review.author}, ${review.role}, ${review.location}, ${review.project}, ${review.reviewDate}, 5, ${review.quote}, true, ${order})`)
    }
    await db.execute(sql`INSERT INTO payload_migrations (name, batch)
      VALUES ('20261025_named_client_reviews', 1)`)
  })
  await payload.db.drizzle.transaction(async (db) => {
    await db.execute(sql`SELECT pg_advisory_xact_lock(20261025, 1)`)
    const corrected = await db.execute(sql`SELECT id FROM payload_migrations WHERE name = '20261025_review_attribution_corrections'`)
    if (corrected.rows.length) return
    await db.execute(sql`UPDATE testimonials SET author = 'Edogrado', updated_at = NOW()
      WHERE author = 'Edo Grado' AND project = 'WhatsApp Selling Agent & Seller Dashboard'`)
    await db.execute(sql`UPDATE testimonials SET location = 'France', updated_at = NOW()
      WHERE author = 'Dan' AND project = 'Vapi to n8n to Google Sheets Lookup'`)
    await db.execute(sql`INSERT INTO payload_migrations (name, batch)
      VALUES ('20261025_review_attribution_corrections', 2)`)
  })
}
