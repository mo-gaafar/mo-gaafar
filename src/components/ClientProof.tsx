import React from 'react'

export const upworkProfile = 'https://www.upwork.com/freelancers/~0169b1c1f18b963e0e'

import type { Testimonial } from '../payload-types'

export function ClientProof({ reviews }: { reviews: Testimonial[] }) {
  if (!reviews.length) return null
  return (
    <section className="section" id="client-feedback">
      <div className="section-head">
        <p className="eyebrow">Client feedback</p>
        <h2>Good work is a collaboration.</h2>
        <p className="lead">Reviews from completed Upwork projects.</p>
      </div>
      <div className="review-grid">
        {reviews.map((review) => (
          <figure className="quote reveal" key={review.id}>
            {typeof review.rating === 'number' && (
              <p className="review-rating" aria-label={`Rated ${review.rating} out of 5`}>
                <span className="review-stars" aria-hidden="true">{'★'.repeat(Math.floor(review.rating))}</span>
                <span>{review.rating.toFixed(1)} / 5</span>
              </p>
            )}
            <blockquote>“{review.quote}”</blockquote>
            <figcaption>
              <strong className="review-author">{review.author}</strong>
              {[review.role, review.company, review.location].filter(Boolean).length > 0 && (
                <span className="review-attribution">{[review.role, review.company, review.location].filter(Boolean).join(' · ')}</span>
              )}
              <a href={upworkProfile} target="_blank" rel="noopener noreferrer">
                {review.project || 'Read on Upwork'} ↗
              </a>
              <small>{review.reviewDate}</small>
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
