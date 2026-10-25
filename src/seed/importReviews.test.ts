import assert from 'node:assert/strict'
import { getPayload } from 'payload'
import config from '../payload.config'
import { importReviews } from './importReviews'

assert.equal(new URL(process.env.DATABASE_URL!).hostname, '127.0.0.1', 'Use only the disposable local review database')
const payload = await getPayload({ config })
try {
  const before = await payload.find({ collection: 'testimonials', pagination: false })
  assert.equal(before.docs.length, 4)
  const review = before.docs.find((review) => review.author === 'Dan')!
  assert.ok(review)
  await payload.update({ collection: 'testimonials', id: review.id, data: { quote: 'CMS edit must survive restart' } })
  try {
    await importReviews(payload)
    const after = await payload.find({ collection: 'testimonials', pagination: false })
    assert.equal(after.docs.length, 4, 'Repeated startup must not duplicate reviews')
    assert.equal(after.docs.find((item) => item.id === review.id)?.quote, 'CMS edit must survive restart')
  } finally {
    await payload.update({ collection: 'testimonials', id: review.id, data: { quote: review.quote } })
  }
  console.log('CMS import passed: four records, no duplicates, CMS edits preserved')
} finally {
  await payload.destroy()
}
process.exit(0)
