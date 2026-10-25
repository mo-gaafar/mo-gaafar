import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { RobotCat } from './RobotCat'

// tsx runs the JSX without Next's automatic React import.
Object.assign(globalThis, { React })
const closed = renderToStaticMarkup(<RobotCat />)
assert.match(closed, /class="cat-popup"[^>]*hidden=""/)
assert.match(closed, /aria-expanded="false"/)
assert.match(closed, /aria-label="Close CAT guide"/)
assert.match(closed, /href="\/projects"/)
assert.match(closed, /href="https:\/\/wa.me\/393514277009"/)
assert.doesNotMatch(closed, /Book a meeting/)
assert.doesNotMatch(renderToStaticMarkup(<RobotCat bookingUrl="" />), /Book a meeting/)
assert.match(renderToStaticMarkup(<RobotCat bookingUrl="https://example.com/book" />), /href="https:\/\/example.com\/book"/)
console.log('CAT starts closed, has a close control, working destinations, and conditional booking.')
