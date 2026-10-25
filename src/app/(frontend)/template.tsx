'use client'

import React, { useEffect, useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return
    const elements = Array.from(
      root.current?.querySelectorAll<HTMLElement>(
        '.reveal, .section-head, .other-services article, .about-compact > div, .offer-intro, .example-panel, .responsibility-grid > div, .factory-steps article',
      ) ?? [],
    )
    const animations = new Set<Animation>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return
          target.removeAttribute('data-reveal-pending')
          observer.unobserve(target)
          if (motion.matches) return
          const animation = target.animate(
            [
              { opacity: 0, transform: 'translateY(32px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 750, easing: 'cubic-bezier(.2,.7,.2,1)' },
          )
          animations.add(animation)
          animation.onfinish = () => animations.delete(animation)
        })
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 },
    )
    function reset() {
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
      animations.clear()
      elements.forEach((element) => {
        element.removeAttribute('data-reveal-pending')
        // Already-visible content must not flash or disappear during hydration.
        if (!motion.matches && element.getBoundingClientRect().top >= window.innerHeight) {
          element.setAttribute('data-reveal-pending', '')
          observer.observe(element)
        }
      })
    }
    reset()
    motion.addEventListener('change', reset)
    return () => {
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
      elements.forEach((element) => element.removeAttribute('data-reveal-pending'))
      motion.removeEventListener('change', reset)
    }
  }, [])
  return (
    <div className="page-enter" ref={root}>
      {children}
    </div>
  )
}
