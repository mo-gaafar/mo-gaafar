'use client'

import React, { useRef } from 'react'

export function ReviewScroller({ children }: { children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (direction: number) => {
    if (track.current) track.current.scrollBy({ left: direction * track.current.clientWidth * 0.85 })
  }
  return (
    <>
      <div className="review-navigation">
        <span>Scroll through client stories</span>
        <div>
          <button type="button" aria-label="Previous reviews" aria-controls="review-track" onClick={() => scroll(-1)}>←</button>
          <button type="button" aria-label="Next reviews" aria-controls="review-track" onClick={() => scroll(1)}>→</button>
        </div>
      </div>
      <div className="review-track" id="review-track" ref={track} tabIndex={0} role="region" aria-label="Client reviews, scroll horizontally">
        {children}
      </div>
    </>
  )
}
