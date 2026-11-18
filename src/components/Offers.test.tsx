import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ClientProof } from './ClientProof'
import { initialReviews } from '../seed/reviews'
import { FactoryWalkthrough } from './FactoryWalkthrough'
import { CatPlayground } from './CatPlayground'
import { makeCat } from '../lib/catScene'
import { Box3, Mesh } from 'three'
import { ContactOptions } from './ContactOptions'
import { WhatsAppLink, defaultMessage, factoryMessage } from './WhatsAppLink'
import PageTransition from '../app/(frontend)/template'

for (const message of [defaultMessage, factoryMessage, 'A&B? "quotes" + café']) {
  const link = renderToStaticMarkup(<WhatsAppLink message={message} />)
  const href = link.match(/href="([^"]+)"/)![1]
  const url = new URL(href)
  assert.equal(url.origin, 'https://wa.me')
  assert.equal(url.pathname, '/393514277009')
  assert.equal(url.searchParams.get('text'), message)
  assert.match(link, /<svg/)
}
const contact = renderToStaticMarkup(<ContactOptions email="hello@example.com" />)
assert.equal((contact.match(/https:\/\/wa.me\//g) ?? []).length, 1)
assert.match(contact, /mailto:hello@example.com/)
assert.match(contact, /<details class="contact-number"><summary>Show phone number<\/summary>/)
assert.doesNotMatch(contact, /<details[^>]*\bopen\b/)
assert.doesNotMatch(renderToStaticMarkup(<ContactOptions />), /mailto:/)
const noScriptPage = renderToStaticMarkup(
  <PageTransition>
    <h2 className="reveal">Visible without JavaScript</h2>
  </PageTransition>,
)
assert.doesNotMatch(noScriptPage, /data-reveal=|hidden/)

const walkthrough = renderToStaticMarkup(<FactoryWalkthrough />)
for (const match of walkthrough.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(
    walkthrough.includes(`id="${match[1]}"`),
    'Each lifecycle link must reach a rendered stage',
  )
}
assert.match(walkthrough, /automated tests, quality checks and security scans/)
assert.match(walkthrough, /updates pass through testing and the agreed approval gates/)
const reviewFixtures = initialReviews.map((review, id) => ({ ...review, id, rating: 5, createdAt: '', updatedAt: '' }))
const proof = renderToStaticMarkup(<ClientProof reviews={reviewFixtures} />)
assert.match(proof, /Happy clients/)
assert.match(proof, /Good work is a collaboration/)
assert.doesNotMatch(proof, /Upwork|Top Rated Plus|Job Success|total jobs/)
for (const author of ['Edogrado', 'Evan', 'Dan', 'Samsung']) assert.ok(proof.includes(author))
assert.match(proof, /France/)
assert.equal((proof.match(/class="review-stars"/g) ?? []).length, 4)
assert.equal((proof.match(/data-testid="StarRoundedIcon"/g) ?? []).length, 20)
assert.equal((proof.match(/data-country="US"/g) ?? []).length, 2)
assert.equal((proof.match(/data-country="KE"/g) ?? []).length, 1)
assert.equal((proof.match(/data-country="FR"/g) ?? []).length, 1)
assert.match(proof, /aria-label="Next reviews"/)
assert.match(proof, /id="review-track" tabindex="0"/)
assert.equal(renderToStaticMarkup(<ClientProof reviews={[]} />), '')
assert.doesNotMatch(renderToStaticMarkup(<ClientProof reviews={[{ ...reviewFixtures[0], rating: null }]} />), /review-stars/)
const residentCat = renderToStaticMarkup(<CatPlayground />)
assert.match(residentCat, /<canvas/)
assert.doesNotMatch(residentCat, /Meet the 3D cat/)

const { cat, legs, eyes } = makeCat()
assert.equal(legs.length, 4)
assert.ok(legs.every(leg => leg.children.length === 2), 'Each paw moves with its leg')
assert.equal(eyes.length, 2)
assert.ok(eyes.every(eye => eye.children.length === 3), 'A blink moves the iris, pupil and catchlight together')
const bounds = new Box3().setFromObject(cat)
assert.ok(
  !bounds.isEmpty() && bounds.min.y >= -0.01 && bounds.max.y < 3,
  'Cat geometry must stay on the floor and inside the camera framing',
)
cat.traverse((object) => {
  if (!(object instanceof Mesh)) return
  const vertices = object.geometry.getAttribute('position')
  for (const coordinate of vertices.array) assert.ok(Number.isFinite(coordinate))
  object.geometry.dispose()
  for (const material of Array.isArray(object.material) ? object.material : [object.material])
    material.dispose()
})
console.log(
  'Offer navigation, honest proof labels, automatically mounted cat and finite 3D geometry passed.',
)
