import React from 'react'
import type { SiteSetting } from '../payload-types'
import { validButtondownUsername } from '../lib/newsletter'

export function NewsletterSignup({ newsletter }: { newsletter?: SiteSetting['newsletter'] | null }) {
  if (!newsletter?.enabled || !validButtondownUsername(newsletter.buttondownUsername)) return null
  const username = newsletter.buttondownUsername
  return (
    <aside className="panel newsletter-panel reveal" aria-labelledby="newsletter-heading">
      <span className="newsletter-mark" aria-hidden="true">✉</span>
      <p className="eyebrow">Newsletter</p>
      <h3 id="newsletter-heading">{newsletter.title}</h3>
      <p>{newsletter.description}</p>
      <form className="newsletter-form" action={`https://buttondown.com/api/emails/embed-subscribe/${username}`} method="post">
        <label htmlFor="newsletter-email">Your email address</label>
        <input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required aria-describedby="newsletter-note" />
        <input type="hidden" name="embed" value="1" />
        <button className="btn btn-primary" type="submit">{newsletter.buttonLabel}</button>
        <p id="newsletter-note" className="muted">Your email goes to Buttondown to subscribe. Unsubscribe at any time.</p>
        <a className="text-link" href={`https://buttondown.com/${username}`}>Read on Buttondown ↗</a>
      </form>
    </aside>
  )
}
