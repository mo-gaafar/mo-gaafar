import Link from 'next/link'
import { getPayloadClient, mediaUrl } from '../../lib/payload'
import { jsonLd, siteUrl } from '../../lib/seo'
import { ContactOptions } from '../../components/ContactOptions'
import { ClientProof } from '../../components/ClientProof'
import { CatPlayground } from '../../components/CatPlayground'
import { HeroPostcards } from '../../components/HeroPostcards'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayloadClient()
  const [settings, caseStudies, reviews, posts] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload
      .find({
        collection: 'case-studies',
        where: { featured: { equals: true } },
        sort: 'order',
        limit: 3,
        depth: 1,
      })
      .then((r) => r.docs),
    payload.find({ collection: 'testimonials', where: { featured: { equals: true } }, sort: 'order', pagination: false, depth: 0 }).then((r) => r.docs),
    payload.find({
      collection: 'posts',
      where: { and: [{ archived: { not_equals: true } }, { date: { less_than_equal: new Date().toISOString() } }] },
      sort: '-date',
      limit: 3,
      depth: 0,
    }).then((r) => r.docs),
  ])
  const name = `${settings.firstName || 'Mohamed'} ${settings.lastName || 'Gaafar'}`
  const portrait = mediaUrl(settings.profileImage, '/img/mo.jpeg')!
  const description =
    'I build AI agents, knowledge systems and software delivery workflows. From a messy process to a working system your team can use.'
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            url: siteUrl(),
            mainEntity: {
              '@type': 'Person',
              '@id': `${siteUrl()}/#person`,
              name,
              jobTitle: settings.roleTitle,
              description,
              image: new URL(portrait, siteUrl()).href,
              sameAs: settings.socials
                ?.filter((s) => s.url.startsWith('https://'))
                .map((s) => s.url),
            },
          }),
        }}
      />
      <header className="hero hub-hero" id="about">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">AI engineering · Practical automation</p>
            <p className="hero-name">Hi, I’m {name}.</p>
            <h1>
              Good ideas.
              <br />
              Working systems.
            </h1>
            <p className="hero-lede">{description}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contact">
                Let’s talk about your project ↗
              </a>
              <a className="btn btn-secondary" href="#offers">
                Explore how I can help ↓
              </a>
            </div>
            <p className="hub-note">
              Engineer, technical founder, and your partner from idea to delivery.
            </p>
          </div>
          <aside className="hero-visual" aria-label="Portrait and a little about me">
            <div className="hero-portrait">
              <img src={portrait} width={480} height={540} fetchPriority="high" alt={name} />
            </div>
            <div className="portrait-caption">A human behind the automation.</div>
          </aside>
        </div>
        <HeroPostcards />
      </header>
      <ClientProof reviews={reviews} />
      <section className="section" id="offers">
        <div className="section-head">
          <p className="eyebrow">Ways to work together</p>
          <h2>Start with the problem.</h2>
          <p className="lead">
            A connected delivery process. A useful AI agent. Knowledge your team can actually find.
          </p>
        </div>
        <Link className="featured-offer reveal" href="/offers/ai-software-factory">
          <div>
            <span className="offer-label">For agencies · Featured offer</span>
            <h3>
              Your agency’s
              <br />
              AI software factory.
            </h3>
            <p>
              Connect client requests, Linear planning, development and ongoing care—with people in
              control.
            </p>
            <span className="offer-link">Explore the offer ↗</span>
          </div>
          <div className="offer-mini-flow" aria-hidden="true">
            <span>01 / Understand</span>
            <i>↓</i>
            <span>02 / Build & check</span>
            <i>↓</i>
            <span>03 / Deliver & maintain</span>
          </div>
        </Link>
        <div className="other-services">
          <article>
            <h3>AI agents & automation</h3>
            <p>
              Connect tools and reduce repetitive operational work, with review where it matters.
            </p>
            <a className="text-link" href="#contact">
              Discuss your workflow ↗
            </a>
          </article>
          <article>
            <h3>Knowledge systems & RAG</h3>
            <p>
              Turn scattered documents into searchable knowledge and answers grounded in your
              sources.
            </p>
            <a className="text-link" href="#contact">
              Discuss your knowledge system ↗
            </a>
          </article>
        </div>
      </section>
      {caseStudies.length > 0 && (
        <section className="section" id="work">
          <div className="section-head">
            <p className="eyebrow">Selected work</p>
            <h2>From the idea to the real world.</h2>
            <p className="lead">A few examples of my engineering and automation work.</p>
          </div>
          <div className="case-grid">
            {caseStudies.map((c) => (
              <article className="case reveal" key={c.id}>
                <div>
                  {c.role && (
                    <p className="role">
                      {c.role}
                      {c.client ? ` · ${c.client}` : ''}
                    </p>
                  )}
                  <h3>
                    <Link href={`/case-studies/${c.slug}`}>{c.title}</Link>
                  </h3>
                  <p className="muted">{c.summary}</p>
                </div>
                <Link className="text-link" href={`/case-studies/${c.slug}`}>
                  Read the case study ↗
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="section" id="writing" aria-labelledby="writing-heading">
        <div className="section-head">
          <p className="eyebrow">From my notebook</p>
          <h2 id="writing-heading">Ideas, experiments, and lessons learned.</h2>
          <p className="lead">Practical notes on AI, automation, and building useful software.</p>
        </div>
        <div className="writing-layout">
          <div>
            {posts.map((post) => (
              <article className="post-row reveal" key={post.id}>
                <p className="meta"><time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time></p>
                <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                <p className="muted">{post.description}</p>
                <Link className="text-link" href={`/blog/${post.slug}`}>Read the article ↗</Link>
              </article>
            ))}
            <Link className="text-link writing-all" href="/blog">Explore all writing ↗</Link>
          </div>
          <aside className="panel newsletter-panel reveal" aria-labelledby="newsletter-heading">
            <span className="newsletter-mark" aria-hidden="true">✉</span>
            <p className="eyebrow">Newsletter · Coming soon</p>
            <h3 id="newsletter-heading">Good ideas, delivered.</h3>
            <p>I’m putting together a newsletter about what I’m building, what I’m learning, and the ideas worth sharing along the way.</p>
            <p className="muted">Signups will open here when it launches. In the meantime, explore the latest articles.</p>
            <Link className="text-link" href="/blog">Read my writing ↗</Link>
          </aside>
        </div>
      </section>
      <section className="section about-compact" id="background">
        <div>
          <p className="eyebrow">A little more about me</p>
          <h2>
            Curious by nature.
            <br />
            Engineer by practice.
          </h2>
          <p className="lead">
            My work spans AI systems, software engineering and technical leadership. I care about
            what happens after the demo: a system people can understand, operate and improve.
          </p>
          <div className="hero-actions">
            <Link href="/resume" className="text-link">
              My background ↗
            </Link>
            <Link href="/projects" className="text-link">
              Projects ↗
            </Link>
            <Link href="/blog" className="text-link">
              Writing ↗
            </Link>
          </div>
        </div>
        <CatPlayground />
      </section>
      <section className="section" id="contact">
        <div className="section-head">
          <p className="eyebrow">Let’s talk</p>
          <h2>What would you like to make work?</h2>
          <p className="lead">
            Send me a little context about your team and the problem you’re solving.
          </p>
        </div>
        <ContactOptions email={settings.email} />
      </section>
    </>
  )
}
