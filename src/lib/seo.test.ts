import assert from 'node:assert/strict'
import { contactAction, jsonLd, pageMetadata, siteUrl } from './seo'

assert.equal(jsonLd({ name: '</script><script>alert(1)</script>' }).includes('<'), false)
assert.equal(JSON.parse(jsonLd({ name: '<Mohamed>' })).name, '<Mohamed>')
assert.deepEqual(contactAction('', 'hello@example.com'), { url: 'mailto:hello@example.com', label: 'Let’s talk' })
assert.equal(contactAction('https://example.com/book').label, 'Book a call')
assert.equal(contactAction().url, '/#contact')
assert.equal(pageMetadata('Project', 'Details', '/projects/demo').alternates?.canonical, '/projects/demo')
const previous = process.env.NEXT_PUBLIC_SERVER_URL
const previousSite = process.env.SITE_URL
delete process.env.SITE_URL
process.env.NEXT_PUBLIC_SERVER_URL = 'https://example.com/'
assert.equal(siteUrl(), 'https://example.com')
process.env.SITE_URL = 'https://mngaafar.com/'
assert.equal(siteUrl(), 'https://mngaafar.com')
if (previousSite === undefined) delete process.env.SITE_URL
else process.env.SITE_URL = previousSite
if (previous === undefined) delete process.env.NEXT_PUBLIC_SERVER_URL
else process.env.NEXT_PUBLIC_SERVER_URL = previous
console.log('SEO, safe structured data, and contact fallback checks passed.')
