import assert from 'node:assert/strict'
import { getPayload } from 'payload'
import config from '../payload.config'
import { configureNewsletter } from './configureNewsletter'

assert.equal(new URL(process.env.DATABASE_URL!).hostname, '127.0.0.1', 'Use only the disposable local database')
const payload = await getPayload({ config })
try {
  const before = await payload.findGlobal({ slug: 'site-settings' })
  assert.equal(before.newsletter?.buttondownUsername, 'mngaafar')
  assert.equal(before.newsletter?.enabled, true)
  try {
    await payload.updateGlobal({ slug: 'site-settings', data: { newsletter: { ...before.newsletter, title: 'A CMS edit', enabled: false } } })
    await configureNewsletter(payload)
    const after = await payload.findGlobal({ slug: 'site-settings' })
    assert.equal(after.newsletter?.title, 'A CMS edit')
    assert.equal(after.newsletter?.enabled, false)
    await assert.rejects(payload.updateGlobal({ slug: 'site-settings', data: { newsletter: { ...before.newsletter, buttondownUsername: '../bad' } } }))
  } finally {
    await payload.updateGlobal({ slug: 'site-settings', data: { newsletter: before.newsletter } })
  }
  console.log('Newsletter CMS migration, saved edits, and validation passed.')
} finally {
  await payload.destroy()
}
process.exit(0)
