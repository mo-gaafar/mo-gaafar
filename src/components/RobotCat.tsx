'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { WhatsAppLink } from './WhatsAppLink'

export function RobotCat({ bookingUrl }: { bookingUrl?: string | null }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const launcher = useRef<HTMLButtonElement>(null)
  const popup = useRef<HTMLElement>(null)

  const close = () => {
    setOpen(false)
    launcher.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    popup.current?.querySelector('a')?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        launcher.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className="cat-guide">
      <section className="cat-popup" ref={popup} id={id} hidden={!open} aria-label="CAT site guide">
        <div className="cat-popup-heading">
          <div><strong>A little help?</strong><p>Find your way around.</p></div>
          <button type="button" onClick={close} aria-label="Close CAT guide">×</button>
        </div>
        <nav className="cat-actions" aria-label="CAT shortcuts">
          <Link href="/projects">Explore my work <span aria-hidden="true">↗</span></Link>
          <WhatsAppLink className="cat-action">Chat on WhatsApp <span aria-hidden="true">↗</span></WhatsAppLink>
          {bookingUrl && <a href={bookingUrl} target="_blank" rel="noopener noreferrer">Book a meeting <span aria-hidden="true">↗</span></a>}
        </nav>
      </section>
      <button className="cat-launcher" type="button" ref={launcher} aria-label="Meet CAT, your site guide" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/orange-cat-guide.webp" width={384} height={391} alt="" decoding="async" />
        <span className="cat-launcher-label">Meet CAT <span aria-hidden="true">↗</span></span>
      </button>
    </div>
  )
}
