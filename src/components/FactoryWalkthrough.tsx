'use client'

import React, { useEffect, useRef, useState } from 'react'

export const factoryStages = [
  {
    title: 'Understand the request',
    label: 'Request',
    detail:
      'Collect the client’s requirements. AI helps structure the brief and identify missing information; a person agrees scope and acceptance criteria.',
    output: 'An approved brief',
  },
  {
    title: 'Plan in Linear',
    label: 'Plan',
    detail:
      'Turn the agreed scope into tasks with owners, priorities and review points. Keep decisions and delivery status connected to the original request.',
    output: 'A shared delivery plan',
  },
  {
    title: 'Build, test and check',
    label: 'Build & QA',
    detail:
      'Use AI-assisted development alongside automated tests, quality checks and security scans. Findings return to the developer for resolution and review.',
    output: 'A tested, reviewable change',
  },
  {
    title: 'Approve and deliver',
    label: 'Release',
    detail:
      'A responsible reviewer checks the change against the agreed requirements and approves the release. Capture the delivery notes and recovery procedure.',
    output: 'An approved release',
  },
  {
    title: 'Monitor, update, repeat',
    label: 'Maintain',
    detail:
      'Monitor the system, run security routines and prepare updates. Bugs and maintenance work return to Linear; updates pass through testing and the agreed approval gates.',
    output: 'An ongoing maintenance loop',
  },
]

export function FactoryWalkthrough() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActive(Number((visible[0].target as HTMLElement).dataset.stage))
      },
      { rootMargin: '-20% 0px -45% 0px', threshold: 0 },
    )
    root.current?.querySelectorAll('[data-stage]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return (
    <section className="section factory-walkthrough" id="how-it-works" ref={root}>
      <div className="factory-sticky">
        <p className="eyebrow">The delivery loop</p>
        <h2>
          One connected
          <br />
          way of working.
        </h2>
        <nav className="factory-diagram" aria-label="Delivery stages">
          {factoryStages.map((stage, i) => (
            <a
              href={`#factory-stage-${i}`}
              key={stage.title}
              className={active === i ? 'is-active' : ''}
              aria-current={active === i ? 'step' : undefined}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              {stage.label}
              <span aria-hidden="true">{i === 4 ? '↺' : '↓'}</span>
            </a>
          ))}
        </nav>
        <p className="muted">Maintenance feeds back into planning and checks.</p>
      </div>
      <div className="factory-steps">
        {factoryStages.map((stage, i) => (
          <article id={`factory-stage-${i}`} data-stage={i} key={stage.title}>
            <span className="step-number">{String(i + 1).padStart(2, '0')} / 05</span>
            <h3>{stage.title}</h3>
            <p>{stage.detail}</p>
            <p className="stage-output">↳ {stage.output}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
