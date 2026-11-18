'use client'

import React, { useEffect, useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const page = root.current
    if (!page || !('IntersectionObserver' in window)) return
    const elements = Array.from(
      page.querySelectorAll<HTMLElement>(
        '.reveal, .section-head, .other-services article, .about-compact > div, .about-compact .cat-playground, .hub-hero ~ #contact .contact-options, .offer-intro, .example-panel, .responsibility-grid > div, .factory-steps article',
      ),
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting || target.getAttribute('data-reveal') !== 'pending') return
          observer.unobserve(target)
          target.setAttribute('data-reveal', 'entered')
        })
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 },
    )
    function reset() {
      observer.disconnect()
      elements.forEach((element) => {
        element.removeAttribute('data-reveal')
        // Already-visible content must not flash or disappear during hydration.
        if (!motion.matches && element.getBoundingClientRect().top >= window.innerHeight) {
          element.setAttribute('data-reveal', 'pending')
          observer.observe(element)
        }
      })
    }
    function revealFocused(event: FocusEvent) {
      const target = event.target instanceof Element && event.target.closest('[data-reveal]')
      if (!target) return
      observer.unobserve(target)
      target.removeAttribute('data-reveal')
    }
    reset()
    page.addEventListener('focusin', revealFocused)
    motion.addEventListener('change', reset)
    return () => {
      observer.disconnect()
      page.removeEventListener('focusin', revealFocused)
      elements.forEach((element) => element.removeAttribute('data-reveal'))
      motion.removeEventListener('change', reset)
    }
  }, [])
  return (
    <div className="page-enter" ref={root}>
      {children}
    </div>
  )
}
