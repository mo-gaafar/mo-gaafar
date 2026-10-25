import Link from 'next/link'
import { pageMetadata, jsonLd, siteUrl } from '../../../../lib/seo'
import { factoryMessage } from '../../../../components/WhatsAppLink'
import { ContactOptions } from '../../../../components/ContactOptions'
import { getPayloadClient } from '../../../../lib/payload'
import { FactoryWalkthrough } from '../../../../components/FactoryWalkthrough'
import { upworkProfile, clientReviews } from '../../../../components/ClientProof'

const title = 'AI Software Factory for Agencies'
export const dynamic = 'force-dynamic'
const description =
  'A connected software delivery system for agencies: requirements, Linear planning, AI-assisted development, automated testing, security checks and ongoing maintenance.'
export const metadata = pageMetadata(title, description, '/offers/ai-software-factory')

export default async function SoftwareFactoryPage() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: title,
            description,
            url: `${siteUrl()}/offers/ai-software-factory`,
            provider: { '@type': 'Person', '@id': `${siteUrl()}/#person`, name: 'Mohamed Gaafar' },
          }),
        }}
      />
      <header className="hero offer-hero">
        <Link className="breadcrumbs" href="/#offers">
          ← All services
        </Link>
        <p className="hero-kicker">A connected delivery system for agencies</p>
        <h1>
          From client request
          <br />
          to software that
          <br />
          <em>stays cared for.</em>
        </h1>
        <p className="hero-lede">
          I build your agency’s AI-assisted software factory: the tools, workflows and working rules
          that connect planning, development, quality checks and ongoing maintenance.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contact">
            Discuss your agency’s workflow ↗
          </a>
          <a className="text-link" href="#how-it-works">
            See how it works ↓
          </a>
        </div>
        <p className="hub-note">
          Built around your team. Connected through Linear. Human approval where it matters.
        </p>
      </header>
      <section className="section offer-intro">
        <p className="eyebrow">Less chasing. Clearer handoffs.</p>
        <h2>
          A shared process,
          <br />
          from brief to maintenance.
        </h2>
        <p className="lead">
          When requirements live in messages, delivery lives in someone’s head and maintenance
          starts with a scramble, adding another tool isn’t enough. I connect the process so your
          team can see what happens next and who owns it.
        </p>
      </section>
      <FactoryWalkthrough />
      <section className="section" id="deliverables">
        <div className="section-head">
          <p className="eyebrow">What we build</p>
          <h2>A system your team can operate.</h2>
          <p className="lead">
            We agree the scope around your existing tools, projects and approval rules.
          </p>
        </div>
        <div className="deliverable-grid">
          <article className="service reveal">
            <span className="step-number">01</span>
            <h3>Intake & planning</h3>
            <p>
              Requirements collection, acceptance criteria, Linear templates and integrations that
              keep requests connected to delivery.
            </p>
          </article>
          <article className="service reveal">
            <span className="step-number">02</span>
            <h3>Development & quality</h3>
            <p>
              AI-assisted development workflows, automated tests, quality gates and security checks,
              with review before release.
            </p>
          </article>
          <article className="service reveal">
            <span className="step-number">03</span>
            <h3>Ongoing care</h3>
            <p>
              Monitoring, security routines, update workflows and maintenance tickets, plus
              documentation and team handover.
            </p>
          </article>
        </div>
      </section>
      <section className="section example-panel">
        <p className="eyebrow">One concrete example</p>
        <h2>“Can we add a CSV export?”</h2>
        <p className="lead">
          The request becomes a draft specification, including who can export and which fields are
          allowed. Your team approves it in Linear. Development produces a reviewable change; tests
          check the output and permissions. After review and release, monitoring and maintenance
          feed new issues back into the same process.
        </p>
        <p className="muted">
          Illustrative workflow. The integrations and automation boundaries are agreed for each
          engagement.
        </p>
      </section>
      <section className="section responsibility-grid">
        <div>
          <p className="eyebrow">AI assists. People own the decisions.</p>
          <h2>Automation with accountability.</h2>
          <p>
            AI can draft requirements, propose tasks, assist with code and tests, and summarize
            changes. Workflow automation routes tasks and runs checks. Your team approves scope and
            releases; automated checks support engineering judgment.
          </p>
        </div>
        <div className="scope-note">
          <h3>We define this before building</h3>
          <ul>
            <li>Who approves scope, code and production changes.</li>
            <li>Which updates need approval and which may run automatically.</li>
            <li>Who responds to alerts and maintains the system.</li>
            <li>Access, hosting, operating costs and support boundaries.</li>
          </ul>
          <p>Security checks reduce risk; they do not guarantee vulnerability-free software.</p>
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Relevant experience</p>
          <h2>A partner who follows through.</h2>
          <p className="lead">Feedback from a completed voice AI consulting engagement.</p>
        </div>
        <figure className="quote">
          <blockquote>“{clientReviews[0].quote}”</blockquote>
          <figcaption>
            <a href={upworkProfile} target="_blank" rel="noopener noreferrer">
              Upwork client · {clientReviews[0].project} · 5/5 ↗
            </a>
          </figcaption>
        </figure>
        <p className="proof-source">
          <Link href="/#work">Explore related engineering projects ↗</Link>
        </p>
      </section>
      <section className="section" id="contact">
        <div className="section-head">
          <p className="eyebrow">Start with your bottleneck</p>
          <h2>Where does delivery get stuck?</h2>
          <p className="lead">
            Tell me about your agency, your current tools and one workflow you want to improve.
            We’ll identify a practical starting scope.
          </p>
        </div>
        <ContactOptions email={settings.email} message={factoryMessage} />
      </section>
    </>
  )
}
