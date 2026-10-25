import React from 'react'
import { Icon } from './Icon'
import { WhatsAppLink } from './WhatsAppLink'

export function ContactOptions({ email, message }: { email?: string | null; message?: string }) {
  return (
    <div className="contact-options">
      <div className="contact-actions">
        <WhatsAppLink message={message} />
        {email && (
          <a className="btn btn-secondary" href={`mailto:${email}`}>
            <Icon name="mail" size={20} />
            Send an email
          </a>
        )}
      </div>
      <p className="contact-hint">
        A short message is enough to start. You can edit the suggested text before sending.
      </p>
      <details className="contact-number">
        <summary>Show phone number</summary>
        <p>
          <a href="tel:+393514277009">+39 351 427 7009</a>
        </p>
      </details>
      {email && (
        <p className="contact-alternative">
          No WhatsApp, or not signed in? <a href={`mailto:${email}`}>Email me instead.</a>
        </p>
      )}
    </div>
  )
}
