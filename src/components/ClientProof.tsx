import { Icon } from './Icon'
import React from 'react'
import { ReviewScroller } from './ReviewScroller'
import { ClientFlag } from './ClientFlag'

export const upworkProfile = 'https://www.upwork.com/freelancers/~0169b1c1f18b963e0e'

import type { Testimonial } from '../payload-types'

export function ClientProof({ reviews }: { reviews: Testimonial[] }) {
  if (!reviews.length) return null
  return (
    <section className="section" id="client-feedback">
      <div className="section-head">
        <p className="eyebrow">Happy clients</p>
        <h2>Good work is a collaboration.</h2>
        <p className="lead">A few words from people I’ve built with.</p>
      </div>
      <ReviewScroller>
        {reviews.map((review) => (
          <figure className="quote reveal" key={review.id}>
            {typeof review.rating === 'number' && (
              <p className="review-rating" aria-label={`Rated ${review.rating} out of 5`}>
                <span className="review-stars" aria-hidden="true">{Array.from({ length: Math.floor(review.rating) }, (_, index) => <Icon key={index} name="star" size={34} />)}</span>
                <span>{review.rating.toFixed(1)} / 5</span>
              </p>
            )}
            <blockquote>“{review.quote}”</blockquote>
            <figcaption>
              <strong className="review-author"><ClientFlag location={review.location} />{review.author}</strong>
              {[review.role, review.company, review.location].filter(Boolean).length > 0 && (
                <span className="review-attribution">{[review.role, review.company, review.location].filter(Boolean).join(' · ')}</span>
              )}
              <a href={upworkProfile} target="_blank" rel="noopener noreferrer">
                {review.project || 'Client project'} <Icon name="arrowOutward" />
              </a>
              <small>{review.reviewDate}</small>
            </figcaption>
          </figure>
        ))}
      </ReviewScroller>
      <p className="proof-source">
        <a href={upworkProfile} target="_blank" rel="noopener noreferrer">
          View original client feedback <Icon name="arrowOutward" />
        </a>
      </p>
    </section>
  )
}
