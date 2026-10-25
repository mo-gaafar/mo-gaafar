import React from 'react'

export const upworkProfile = 'https://www.upwork.com/freelancers/~0169b1c1f18b963e0e'

// Exact excerpts from the supplied profile; do not substitute Uma summaries.
export const clientReviews = [
  {
    quote:
      'Mohamed is communicative, collaborative, and a great developer. He makes sure the job gets done and will help the solution be even better than your original ideas / docs state.',
    project: 'Consultant & Engineer for VAPI AI Caller',
    date: 'September 2026',
  },
  {
    quote: 'Amazing contractor...fast, responsive and goes above and beyond. 100% recommend!',
    project: 'n8n Automation Specialist for AI Google Calendar Integration',
    date: 'March 2025',
  },
  {
    quote:
      "HIGHLY RECOMMEND! Mohamed did an excellent job helping us build the MVP for our AI clinic management system. He was highly responsive, easy to communicate with, and understood our requirements quickly. The work was delivered professionally, and his technical input helped shape the product in a practical way. I'd be happy to work with him again on future projects.",
    project: 'WhatsApp Selling Agent & Seller Dashboard',
    date: 'July 7, 2026',
  },
]

export function ClientProof() {
  return (
    <section className="section" id="client-feedback">
      <div className="section-head">
        <p className="eyebrow">Client feedback</p>
        <h2>Good work is a collaboration.</h2>
        <p className="lead">Reviews from completed Upwork projects.</p>
      </div>
      <div className="review-grid">
        {clientReviews.map((review) => (
          <figure className="quote reveal" key={review.project}>
            <p className="review-rating" aria-label="Rated 5 out of 5">
              <span className="review-stars" aria-hidden="true">★★★★★</span> <span>5.0 / 5</span>
            </p>
            <blockquote>“{review.quote}”</blockquote>
            <figcaption>
              <a href={upworkProfile} target="_blank" rel="noopener noreferrer">
                Upwork client · {review.project} ↗
              </a>
              <small>{review.date}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="proof-source">
        Top Rated Plus · 100% Job Success · 14 total jobs{' '}
        <span>— Upwork profile, October 2026. </span>
        <a href={upworkProfile} target="_blank" rel="noopener noreferrer">
          View current profile ↗
        </a>
      </p>
    </section>
  )
}
