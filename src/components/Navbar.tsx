'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.1rem 2rem',
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Link href="/" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)', letterSpacing: '-0.04em', textDecoration: 'none' }}>
        Mercy<span style={{ color: 'var(--teal)' }}>.</span>Dev
      </Link>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }} className="nav-links-desktop">
        {[['#about', 'About'], ['#services', 'Services'], ['#portfolio', 'Work'], ['#testimonials', 'Reviews'], ['#contact', 'Contact']].map(([href, label]) => (
          <li key={href}>
            <a
              href={href}
              style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
        Connect →
      </a>

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
