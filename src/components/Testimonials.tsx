"use client";
//  Replace with real client testimonials
const testimonials = [
  {
    initials: 'AK',
    name: 'Adaeze K.',
    role: 'CEO, ShopNaija',
    text: 'Mercy built our entire e-commerce store in under 3 weeks. The attention to detail was something else — every screen felt thought-out. Our sales doubled in the first month.',
  },
  {
    initials: 'TO',
    name: 'Tunde O.',
    role: 'Founder, GrowthNow',
    text: 'I needed a landing page fast. Not only was it delivered quickly, it actually converted — we went from 2% to 11% conversion rate. I\'m still shocked.',
  },
  {
    initials: 'BI',
    name: 'Blessing I.',
    role: 'Fitness Coach',
    text: 'The whole vibe was professional but also really warm — like working with someone who genuinely cares. My booking platform works flawlessly.',
  },
  {
    initials: 'CU',
    name: 'Chukwuemeka U.',
    role: 'CTO, LagosTech',
    text: 'We had a complex brief — multiple user roles, real-time features, payments. Mercy handled it all without making us feel confused. Highly recommend.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '6rem 2rem', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <span className="section-tag">Testimonials</span>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          marginBottom: '3.5rem',
        }}>
          Clients say it best.
        </h2>

        <div
          className="testi-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '1.8rem',
              }}
            >
              {/* Stars */}
              <div style={{ color: 'var(--amber)', fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '0.6rem' }}>
                ★★★★★
              </div>

              {/* Quote */}
              <p style={{
                color: 'var(--text2)',
                fontSize: '0.9rem',
                fontWeight: 300,
                lineHeight: 1.7,
                fontStyle: 'italic',
                marginBottom: '1.2rem',
              }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--teal-dim)',
                  border: '1px solid rgba(0,229,195,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--teal)',
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.88rem', fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}