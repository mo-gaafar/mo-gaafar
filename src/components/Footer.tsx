import { Icon, type IconName } from './Icon'

type Social = { label: string; url: string }

const socialIcon: Record<string, IconName> = {
  GitHub: 'github',
  LinkedIn: 'linkedin',
  Email: 'mail',
}

export function Footer({
  name,
  socials = [],
}: {
  name: string
  socials?: Social[]
}) {
  const year = 2026
  return (
    <footer className="site-footer">
      <div className="inner">
        <span>
          © {year} {name}. Built with Next.js &amp; Payload.
        </span>
        {socials.length > 0 && (
          <ul className="footer-socials" aria-label="Social links">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="me noopener" aria-label={s.label} title={s.label}>
                  {socialIcon[s.label] ? (
                    <Icon name={socialIcon[s.label]} size={18} />
                  ) : (
                    <span className="nav-glyph">{s.label === 'X' ? 'X' : s.label}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  )
}
