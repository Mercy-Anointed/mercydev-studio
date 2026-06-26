import { db } from '@/lib/db'
import TestimonialSubmissionForm from './TestimonialSubmissionForm'
import ScrollRevealCards from './ScrollRevealCards'

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('')
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => (
    <span key={index} style={{ color: index < rating ? 'var(--amber)' : 'var(--border2)' }}>
      ★
    </span>
  ))
}

export default async function Testimonials() {
  let testimonials: Awaited<ReturnType<typeof db.testimonial.findMany>> = []
  let loadError = false

  try {
    testimonials = await db.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    })
  } catch (error) {
    loadError = true
    console.error('Failed to load testimonials', error)
  }

  const averageRating = testimonials.length
    ? (testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) / testimonials.length).toFixed(1)
    : '5.0'

  return (
    <section id="testimonials" style={{ padding: '6rem 2rem', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <span className="section-tag">Testimonials</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'end', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '0.6rem',
            }}>
              Clients say it best.
            </h2>
            <p style={{ color: 'var(--text2)', maxWidth: '620px', fontSize: '1rem', fontWeight: 400, lineHeight: 1.75 }}>
              Read real feedback from people I have worked with, then leave your own review and rating below.
            </p>
          </div>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '1rem 1.2rem',
            minWidth: '190px',
          }}>
            <div style={{ color: 'var(--text3)', fontSize: '0.76rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Average rating
            </div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: 'var(--teal)' }}>
              {averageRating}/5
            </div>
            <div style={{ color: 'var(--text2)', fontSize: '0.82rem' }}>
              From {testimonials.length} published testimonials
            </div>
          </div>
        </div>

        {loadError ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '2rem',
            color: 'var(--text2)',
          }}>
            Testimonials are temporarily unavailable while the database is unreachable.
          </div>
        ) : testimonials.length === 0 ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '2rem',
            color: 'var(--text2)',
          }}>
            No testimonials have been published yet. Use the form below to add the first one.
          </div>
        ) : (
          <ScrollRevealCards>
            <div
              className="testi-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
                marginTop: '2.5rem',
              }}
            >
              {testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.id}
                  className="motion-card scroll-card"
                  data-reveal-card
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    padding: '1.8rem',
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <div style={{ color: 'var(--amber)', fontSize: '0.78rem', letterSpacing: '2px', marginBottom: '0.8rem', display: 'flex', gap: '0.08rem' }}>
                    {renderStars(testimonial.rating)}
                  </div>

                  <p style={{
                    color: 'var(--text2)',
                    fontSize: '0.95rem',
                    fontWeight: 400,
                    lineHeight: 1.75,
                    fontStyle: 'italic',
                    marginBottom: '1.3rem',
                  }}>
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'var(--teal-dim)',
                      border: '1px solid rgba(0,229,195,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'var(--teal)',
                      flexShrink: 0,
                    }}>
                      {getInitials(testimonial.name)}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                        {testimonial.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>{testimonial.role}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </ScrollRevealCards>
        )}

        <div style={{ marginTop: '2.5rem' }}>
          <TestimonialSubmissionForm />
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
