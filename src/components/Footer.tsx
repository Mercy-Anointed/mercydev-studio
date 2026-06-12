"use client";
const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Work' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg2)',
      borderTop: '1px solid var(--border)',
      padding: '3rem 2rem',
      textAlign: 'center',
    }}>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        Mercy<span style={{ color: 'var(--teal)' }}>.</span>Dev Studio
      </div>

      <ul style={{ display: 'flex', justifyContent: 'center', gap: '2rem', listStyle: 'none', margin: '1.2rem 0' }}>
        {links.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{ color: 'var(--text3)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <p style={{ color: 'var(--text3)', fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} Mercy Dev Studio · Built with care in Lagos, Nigeria 🇳🇬
      </p>
    </footer>
  )
}