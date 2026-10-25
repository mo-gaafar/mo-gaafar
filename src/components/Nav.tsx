'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon, type IconName } from './Icon'
import { ThemeToggle } from './ThemeToggle'
import { contactAction } from '../lib/seo'

type Social = { label: string; url: string }

const socialIcon: Record<string, IconName> = {
  GitHub: 'github',
  LinkedIn: 'linkedin',
  Email: 'mail',
}

const links = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/blog', label: 'Writing' },
  { href: '/resume', label: 'Résumé' },
]

export function Nav({
  name,
  role,
  bookingUrl,
  email,
  socials = [],
}: {
  name: string
  role: string
  bookingUrl?: string | null
  email?: string | null
  socials?: Social[]
}) {
  const [open, setOpen] = useState(false)
  const cta = contactAction(bookingUrl, email)

  return (
    <nav className="sidenav" aria-label="Main navigation" data-open={open} onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false) }}>
      <div className="sidenav-top">
        <Link href="/#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-name">{name}</span>
          <span className="brand-role">{role}</span>
        </Link>
        <div className="sidenav-controls">
          <ThemeToggle />
          <button
            type="button"
            className="menu-btn"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="navigation-links"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      <div className="sidenav-body" id="navigation-links">
        <ul className="sidenav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="sidenav-foot">
          <a className="nav-cta" href={cta.url} target={bookingUrl ? '_blank' : undefined} rel="noopener">
            <Icon name="send" size={15} />
            {cta.label}
          </a>
          {socials.length > 0 && (
            <ul className="nav-socials" aria-label="Social links">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="me noopener" aria-label={s.label} title={s.label}>
                    {socialIcon[s.label] ? (
                      <Icon name={socialIcon[s.label]} size={16} />
                    ) : (
                      <span className="nav-glyph">{s.label === 'X' ? 'X' : s.label[0]}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}
