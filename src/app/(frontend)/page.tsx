import Link from 'next/link'
import { getPayloadClient, mediaUrl } from '../../lib/payload'
import { Icon, type IconName } from '../../components/Icon'

export const dynamic = 'force-dynamic'

const fmtDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : ''

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [home, settings, experience, skillGroups, education, services, testimonials, caseStudies, projects, publications, posts] =
    await Promise.all([
      payload.findGlobal({ slug: 'home' }).catch(() => null),
      payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
      payload.find({ collection: 'experience', sort: 'order', limit: 50, depth: 0 }).then((r) => r.docs).catch(() => []),
      payload.find({ collection: 'skill-groups', sort: 'order', limit: 50, depth: 1 }).then((r) => r.docs).catch(() => []),
      payload.find({ collection: 'education', sort: 'order', limit: 50, depth: 0 }).then((r) => r.docs).catch(() => []),
      payload.find({ collection: 'services', sort: 'order', limit: 20, depth: 0 }).then((r) => r.docs).catch(() => []),
      payload.find({ collection: 'testimonials', where: { featured: { equals: true } }, sort: 'order', limit: 10, depth: 1 }).then((r) => r.docs).catch(() => []),
      payload.find({ collection: 'case-studies', where: { featured: { equals: true } }, sort: 'order', limit: 6, depth: 1 }).then((r) => r.docs).catch(() => []),
      payload.find({ collection: 'projects', where: { featured: { equals: true } }, sort: 'order', limit: 6, depth: 1 }).then((r) => r.docs).catch(() => []),
      payload.find({ collection: 'publications', where: { featured: { equals: true } }, sort: '-date', limit: 6, depth: 1 }).then((r) => r.docs).catch(() => []),
      payload.find({ collection: 'posts', where: { and: [{ featured: { equals: true } }, { archived: { not_equals: true } }] }, sort: '-date', limit: 3, depth: 1 }).then((r) => r.docs).catch(() => []),
    ])

  const vis = home?.visibility ?? {}
  const portrait = mediaUrl(settings?.profileImage, '/img/mo.jpeg')
  const bookingUrl = settings?.bookingUrl || (settings?.email ? `mailto:${settings.email}` : '#contact')

  const ctas = home?.ctas ?? []
  const focusTags = home?.focusTags ?? []
  const proof = home?.proofMetrics ?? []

  return (
    <>
      {/* ---------- Hero ---------- */}
      <header className="hero" id="about">
        <div className="hero-grid">
          <div>
            {home?.kicker && <p className="hero-kicker">{home.kicker}</p>}
            <h1>{home?.headline || 'AI Engineer & Fractional CTO'}</h1>
            <p className="hero-lede">{home?.lede}</p>
            <div className="hero-actions">
              {ctas.length > 0 ? (
                ctas.map((c, i) => (
                  <a
                    key={i}
                    href={c.url}
                    className={
                      c.style === 'secondary'
                        ? 'btn btn-secondary'
                        : c.style === 'link'
                          ? 'btn btn-link'
                          : 'btn btn-primary'
                    }
                    target={c.url?.startsWith('http') ? '_blank' : undefined}
                    rel="noopener"
                  >
                    {c.label}
                  </a>
                ))
              ) : (
                <a href={bookingUrl} className="btn btn-primary">
                  <Icon name="send" size={16} /> Book a call
                </a>
              )}
            </div>
            {focusTags.length > 0 && (
              <p className="hero-focus" aria-label="Focus areas">
                {focusTags.map((t, i) => (
                  <span key={i}>{t.label}</span>
                ))}
              </p>
            )}
          </div>

          {portrait && (
            <aside className="hero-portrait" aria-label="Portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={portrait} alt={`${settings?.firstName ?? ''} ${settings?.lastName ?? ''}`.trim()} />
            </aside>
          )}
        </div>
        {proof.length > 0 && (
          <div className="proof-strip">
            {proof.map((m, i) => (
              <div className="proof" key={i}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* ---------- Services ---------- */}
      {vis.showServices !== false && services.length > 0 && (
        <section className="section" id="services">
          <div className="section-head">
            <p className="eyebrow">What I do</p>
            <h2>{home?.servicesHeading || 'How I work'}</h2>
            {home?.servicesIntro && <p className="lead">{home.servicesIntro}</p>}
          </div>
          <div className="service-grid">
            {services.map((s) => (
              <article className="service" key={s.id}>
                <span className="service-icon">
                  <Icon name={(s.icon as IconName) || 'cpu'} size={20} />
                </span>
                <h3>{s.title}</h3>
                {s.forWho && <p className="for-who">{s.forWho}</p>}
                <p className="muted">{s.summary}</p>
                {s.bullets && s.bullets.length > 0 && (
                  <ul>
                    {s.bullets.map((b, i) => (
                      <li key={i}>{b.text}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Case studies / Work ---------- */}
      {vis.showCaseStudies !== false && caseStudies.length > 0 && (
        <section className="section" id="work">
          <div className="section-head">
            <p className="eyebrow">Selected work</p>
            <h2>Case studies</h2>
            <p className="lead">Problems I was brought in to solve, what I led, and the measurable result.</p>
          </div>
          <div className="timeline">
            {caseStudies.map((c) => (
              <article className="case" key={c.id}>
                <div>
                  {c.role && <p className="role">{c.role}{c.client ? ` · ${c.client}` : ''}</p>}
                  <h3>{c.title}</h3>
                  <p className="muted">{c.summary}</p>
                  {c.stack && c.stack.length > 0 && (
                    <p className="stack-line">{c.stack.map((s) => s.item).join(' · ')}</p>
                  )}
                </div>
                {c.headlineMetric && (
                  <div className="metric">
                    <strong>{c.headlineMetric}</strong>
                    <span>{c.headlineMetricLabel}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Testimonials ---------- */}
      {vis.showTestimonials !== false && testimonials.length > 0 && (
        <section className="section" id="testimonials">
          <div className="section-head">
            <p className="eyebrow">Kind words</p>
            <h2>What people say</h2>
          </div>
          <div className="card-grid">
            {testimonials.map((t) => (
              <figure className="quote" key={t.id}>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption className="who">
                  <div>
                    <strong>{t.author}</strong>
                    <br />
                    <span>
                      {[t.role, t.company].filter(Boolean).join(', ')}
                    </span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Experience ---------- */}
      {vis.showExperience !== false && experience.length > 0 && (
        <section className="section" id="experience">
          <div className="section-head">
            <p className="eyebrow">Track record</p>
            <h2>Experience</h2>
          </div>
          <div className="timeline">
            {experience.map((e) => (
              <article className="timeline-item" key={e.id}>
                <div>
                  <h3>{e.role}</h3>
                  <p className="org">{e.company}</p>
                  <p className="muted">{e.summary}</p>
                </div>
                <div className="when">{e.range}</div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Skills ---------- */}
      {vis.showSkills !== false && skillGroups.length > 0 && (
        <section className="section" id="skills">
          <div className="section-head">
            <p className="eyebrow">Toolkit</p>
            <h2>Skills</h2>
          </div>
          {skillGroups.map((g) => (
            <div className="skill-group" key={g.id}>
              <p className="label">{g.grouping}</p>
              <ul className="skill-list">
                {(g.skills ?? []).map((s, i) => (
                  <li key={i}>{s.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* ---------- Projects ---------- */}
      {vis.showProjects !== false && projects.length > 0 && (
        <section className="section" id="projects">
          <div className="section-head">
            <p className="eyebrow">Build log</p>
            <h2>Projects</h2>
          </div>
          <div className="card-grid">
            {projects.map((p) => {
              const img = mediaUrl(p.cover, p.coverUrl)
              return (
                <article className="card" key={p.id}>
                  {img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt={p.title} style={{ borderRadius: 4, marginBottom: '0.9rem', aspectRatio: '16/10', objectFit: 'cover' }} />
                  )}
                  <h3 style={{ fontSize: '1.15rem' }}>
                    <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="muted" style={{ marginTop: '0.4rem' }}>{p.description}</p>
                </article>
              )
            })}
          </div>
          <p style={{ marginTop: '1.5rem' }}>
            <Link href="/projects" className="btn btn-secondary">
              All projects <Icon name="arrow" size={16} />
            </Link>
          </p>
        </section>
      )}

      {/* ---------- Publications ---------- */}
      {vis.showPublications !== false && publications.length > 0 && (
        <section className="section" id="publications">
          <div className="section-head">
            <p className="eyebrow">Research</p>
            <h2>Publications</h2>
          </div>
          <div className="timeline">
            {publications.map((p) => (
              <article className="timeline-item" key={p.id}>
                <div>
                  <h3>
                    {p.pubType} — {p.link ? <a href={p.link} target="_blank" rel="noopener">{p.title}</a> : p.title}
                  </h3>
                  <p className="muted" style={{ marginTop: '0.4rem' }}>{p.description}</p>
                </div>
                <div className="when">{fmtDate(p.date)}</div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Education ---------- */}
      {vis.showEducation !== false && education.length > 0 && (
        <section className="section" id="education">
          <div className="section-head">
            <p className="eyebrow">Background</p>
            <h2>Education</h2>
          </div>
          <div className="timeline">
            {education.map((e) => (
              <article className="timeline-item" key={e.id}>
                <div>
                  <h3>{e.schoolUrl ? <a href={e.schoolUrl} target="_blank" rel="noopener">{e.school}</a> : e.school}</h3>
                  <p className="org">{e.degree}{e.major ? ` · ${e.major}` : ''}</p>
                  {e.notes && <p className="muted">{e.notes}</p>}
                </div>
                <div className="when">{e.range}</div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Blog teaser ---------- */}
      {vis.showBlog !== false && posts.length > 0 && (
        <section className="section" id="writing">
          <div className="section-head">
            <p className="eyebrow">Writing</p>
            <h2>From the blog</h2>
          </div>
          {posts.map((p) => (
            <div className="post-row" key={p.id}>
              <h3>
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </h3>
              <p className="meta">{fmtDate(p.date)}</p>
              <p className="muted">{p.description}</p>
            </div>
          ))}
          <p style={{ marginTop: '1.5rem' }}>
            <Link href="/blog" className="btn btn-secondary">
              All writing <Icon name="arrow" size={16} />
            </Link>
          </p>
        </section>
      )}

      {/* ---------- Contact ---------- */}
      <section className="section" id="contact">
        <div className="section-head">
          <p className="eyebrow">Let’s talk</p>
          <h2>Have a system worth building?</h2>
          <p className="lead">
            Tell me what you’re trying to build — or un-break. If I can help, I’ll say how. If I can’t, I’ll tell you that too.
          </p>
        </div>
        <div className="hero-actions">
          <a href={bookingUrl} className="btn btn-primary" target={bookingUrl.startsWith('http') ? '_blank' : undefined} rel="noopener">
            <Icon name="send" size={16} /> Book a call
          </a>
          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="btn btn-secondary">
              <Icon name="mail" size={16} /> {settings.email}
            </a>
          )}
        </div>
      </section>
    </>
  )
}
