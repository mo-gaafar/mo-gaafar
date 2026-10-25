'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { CatControls } from '../lib/catScene'

export function CatPlayground() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const controls = useRef<CatControls | null>(null)
  const [status, setStatus] = useState('Marmalade is waking up…')
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(true)

  useEffect(() => {
    if (!canvas.current) return
    let cancelled = false
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pauseForMotion = () => {
      if (motion.matches) {
        controls.current?.pause(true)
        setPaused(true)
      }
    }
    motion.addEventListener('change', pauseForMotion)
    setStatus('Waking up the cat…')
    import('../lib/catScene')
      .then(({ createCatScene }) => {
        if (cancelled || !canvas.current) return
        controls.current = createCatScene(canvas.current, () => {
          setReady(false)
          setStatus('The cat is taking a break. Refresh to try again.')
        })
        controls.current.pause(motion.matches)
        setPaused(motion.matches)
        setReady(true)
        setStatus('Marmalade, just hanging out.')
      })
      .catch(() => {
        if (!cancelled) {
          setReady(false)
          setStatus(
            'The 3D view couldn’t start on this device. The rest of the site works normally.',
          )
        }
      })
    return () => {
      cancelled = true
      motion.removeEventListener('change', pauseForMotion)
      controls.current?.dispose()
      controls.current = null
    }
  }, [])

  return (
    <aside className="cat-playground" aria-label="Interactive 3D orange cat">
      <p className="eyebrow">Resident orange cat</p>
      <canvas
        ref={canvas}
        className="cat-canvas"
        role="img"
        aria-label="Marmalade, a three-dimensional orange tabby wandering around. Use the controls below to pet or pause the cat."
      />
      <p className="cat-status" role="status">
        {status}
      </p>
      {ready && (
        <div className="cat-controls">
          <button
            type="button"
            disabled={!ready}
            onClick={() => {
              controls.current?.pet()
              setStatus('Purr. That’s the spot.')
            }}
          >
            Pet the cat
          </button>
          <button
            type="button"
            disabled={!ready}
            onClick={() => {
              controls.current?.pause(!paused)
              setPaused(!paused)
            }}
          >
            {paused ? 'Let it walk' : 'Pause'}
          </button>
          <button type="button" disabled={!ready} onClick={() => controls.current?.turn()}>
            Turn ↻
          </button>
        </div>
      )}
    </aside>
  )
}
