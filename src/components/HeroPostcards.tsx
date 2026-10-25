export function HeroPostcards() {
  return (
    <div className="hero-postcards" aria-label="A little about me">
      <figure className="hero-postcard postcard-egypt">
        <svg viewBox="0 0 140 100" aria-hidden="true" fill="none" stroke="#604635" strokeWidth="2.5" strokeLinejoin="round">
          <circle cx="106" cy="22" r="13" fill="#efba58" stroke="none" />
          <path d="M8 84 49 22 91 84Z" fill="#e9bd77" />
          <path d="m49 22 10 62h32Z" fill="#c99655" />
          <path d="m69 84 28-42 33 42Z" fill="#f2d49e" />
          <path d="M5 88q55-8 130 0" />
          <path d="m17 23 4-6m-3 18-7-1" stroke="#c99655" />
        </svg>
        <figcaption>Half Egyptian<span>A little of my roots</span></figcaption>
      </figure>
      <figure className="hero-postcard postcard-pisa">
        <svg viewBox="0 0 140 100" aria-hidden="true" fill="none" stroke="#47645f" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M19 89q45-9 103 0" stroke="#93b8a6" />
          <g transform="rotate(12 70 86)">
            <path d="M45 85V24q25-11 50 0v61Z" fill="#fff5dc" />
            <path d="M52 19V9q18-7 36 0v10M43 25h54M43 40h54M43 55h54M43 70h54M41 85h58" />
            <path d="M52 36v-6m12 6v-6m12 6v-6m12 6v-6M52 51v-6m12 6v-6m12 6v-6m12 6v-6M52 66v-6m12 6v-6m12 6v-6m12 6v-6M62 84v-9q8-8 16 0v9" />
          </g>
          <path d="M17 30h12m-6-6v12" stroke="#d4a544" />
        </svg>
        <figcaption>Home in Pisa<span>Life in Italy</span></figcaption>
      </figure>
      <figure className="hero-postcard postcard-torino">
        <svg viewBox="0 0 140 100" aria-hidden="true" fill="none" stroke="#65546b" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M36 88V68h68v20Z" fill="#ead8e9" />
          <path d="M40 66q25-12 30-36 5 24 30 36Z" fill="#c2a3c5" />
          <path d="M65 31V23h10v8M70 23V5M62 35h16M32 89h76M45 73v10m12-10v10m13-10v10m13-10v10m12-10v10" />
          <path d="m106 28 3-7 3 7 7 3-7 3-3 7-3-7-7-3Z" fill="#edc56a" stroke="none" />
        </svg>
        <figcaption>Work in Torino<span>The company’s home</span></figcaption>
      </figure>
      <figure className="hero-postcard postcard-cat">
        <svg viewBox="0 0 140 100" aria-hidden="true" fill="none" stroke="#70452d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M93 80q32 5 28-17-3-12-11-6" stroke="#df9455" strokeWidth="10" />
          <ellipse cx="73" cy="71" rx="29" ry="21" fill="#efa969" />
          <path d="m44 51-3-30 21 12q10-4 20 0l18-12-2 31q-2 24-27 24T44 51Z" fill="#efa969" />
          <path d="m46 29 3 13 10-6m29 0 7-7-1 14" fill="#edb6a1" stroke="none" />
          <path d="m65 33 3 9m8-9-2 9M53 52q5-6 10 0m17 0q5-6 10 0m-24 9 5 4 5-4m-5 4v5M35 56l15 3m-14 8 14-3m44-5 15-3m-15 8 14 3" />
          <path d="M55 87h15m8 0h15" />
        </svg>
        <figcaption>Cat person<span>Obviously.</span></figcaption>
      </figure>
    </div>
  )
}
