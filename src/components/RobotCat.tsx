import React from 'react'
import Link from 'next/link'
import { WhatsAppLink } from './WhatsAppLink'

export function RobotCat({ bookingUrl }: { bookingUrl?: string | null }) {
  return (
    <details className="cat-guide">
      <summary>
        <span className="robot-cat" aria-hidden="true">
          <span className="cat-tail" />
          <span className="cat-body"><span className="cat-core" /></span>
          <span className="cat-paw cat-paw-left" />
          <span className="cat-paw cat-paw-right" />
          <span className="cat-head">
            <span className="cat-ear cat-ear-left" />
            <span className="cat-ear cat-ear-right" />
            <span className="cat-face">
              <span className="cat-eye cat-eye-left" />
              <span className="cat-eye cat-eye-right" />
              <span className="cat-nose" />
              <span className="cat-whiskers cat-whiskers-left" />
              <span className="cat-whiskers cat-whiskers-right" />
            </span>
          </span>
        </span>
        <span className="cat-invitation"><strong>Meet CAT <span aria-hidden="true">↗</span></strong><span>Your little site guide</span></span>
      </summary>
      <nav className="cat-actions" aria-label="CAT site guide">
        <Link href="/projects">Explore my work <span aria-hidden="true">↗</span></Link>
        <WhatsAppLink className="cat-action">Chat on WhatsApp <span aria-hidden="true">↗</span></WhatsAppLink>
        {bookingUrl && <a href={bookingUrl} target="_blank" rel="noopener noreferrer">Book a meeting <span aria-hidden="true">↗</span></a>}
      </nav>
    </details>
  )
}
