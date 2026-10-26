import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { NewsletterSignup } from './NewsletterSignup'
import { validButtondownUsername } from '../lib/newsletter'

const newsletter = { enabled: true, title: 'Notes & ideas', description: 'Useful software.', buttonLabel: 'Join me', buttondownUsername: 'mngaafar' }
const html = renderToStaticMarkup(<NewsletterSignup newsletter={newsletter} />)
assert.match(html, /action="https:\/\/buttondown.com\/api\/emails\/embed-subscribe\/mngaafar" method="post"/)
assert.match(html, /<input(?=[^>]*name="email")(?=[^>]*type="email")(?=[^>]*required)[^>]*>/)
assert.match(html, /<label for="newsletter-email">/)
assert.match(html, /Notes &amp; ideas/)
assert.match(html, /Join me/)
assert.match(html, /href="https:\/\/buttondown.com\/mngaafar"/)
assert.doesNotMatch(html, /Coming soon/)
assert.equal(renderToStaticMarkup(<NewsletterSignup newsletter={{ ...newsletter, enabled: false }} />), '')
assert.equal(renderToStaticMarkup(<NewsletterSignup newsletter={undefined} />), '')
for (const username of ['', '../evil', 'https://evil.example', 'a?b', 'a'.repeat(65), null]) {
  assert.equal(validButtondownUsername(username), false)
  assert.equal(renderToStaticMarkup(<NewsletterSignup newsletter={{ ...newsletter, buttondownUsername: typeof username === 'string' ? username : '' }} />), '')
}
assert.equal(validButtondownUsername('my_notes-2026'), true)
console.log('Newsletter form: safe destination, CMS copy, disable switch, and native email validation passed.')
