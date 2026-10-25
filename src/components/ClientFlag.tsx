import React from 'react'

export function ClientFlag({ location }: { location?: string | null }) {
  const country = location?.split(',').at(-1)?.trim()
  if (country === 'France') {
    return (
      <svg className="client-flag" data-country="FR" viewBox="0 0 60 40" aria-hidden="true">
        <path d="M0 0h20v40H0Z" fill="#002395" />
        <path d="M20 0h20v40H20Z" fill="#fff" />
        <path d="M40 0h20v40H40Z" fill="#ed2939" />
      </svg>
    )
  }
  if (country === 'United States') {
    return (
      <svg className="client-flag" data-country="US" viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="40" fill="#fff" />
        {Array.from({ length: 7 }, (_, i) => <rect key={i} y={i * 80 / 13} width="60" height={40 / 13} fill="#b22234" />)}
        <rect width="25" height={280 / 13} fill="#3c3b6e" />
        {Array.from({ length: 9 }, (_, row) => Array.from({ length: row % 2 ? 5 : 6 }, (_, column) => (
          <path key={`${row}-${column}`} d="M0-1 .3-.3 1-.3 .45.15 .65.9 0 .45-.65.9-.45.15-1-.3-.3-.3Z" fill="#fff" transform={`translate(${2 + column * 4.2 + (row % 2 ? 2.1 : 0)} ${2 + row * 2.2})`} />
        )))}
      </svg>
    )
  }
  if (country === 'Kenya') {
    return (
      <svg className="client-flag" data-country="KE" viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="40" fill="#fff" />
        <path d="M0 0h60v12H0Z" fill="#141414" />
        <path d="M0 14h60v12H0Z" fill="#bb1924" />
        <path d="M0 28h60v12H0Z" fill="#167443" />
        <path d="m22 5 16 30m0-30L22 35" stroke="#fff" strokeWidth="1.5" />
        <ellipse cx="30" cy="20" rx="7" ry="14" fill="#bb1924" stroke="#fff" />
        <path d="M25 9q-5 11 0 22m10-22q5 11 0 22" stroke="#141414" strokeWidth="3" fill="none" />
        <path d="M30 7v26" stroke="#fff" />
      </svg>
    )
  }
  return null
}
