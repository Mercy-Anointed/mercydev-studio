import Link from 'next/link'
import { db } from '@/lib/db'
import DeleteButton from './DeleteButton'

export const dynamic = 'force-dynamic'

export default async function AdminTestimonials() {
  let testimonials: Awaited<ReturnType<typeof db.testimonial.findMany>> = []
  let loadError = false

  try {
    testimonials = await db.testimonial.findMany({
      orderBy: [{ createdAt: 'desc' }],
    })
  } catch (error) {
    loadError = true
    console.error('Failed to load admin testimonials', error)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>
          Mercy<span style={{ color: 'var(--teal)' }}>.</span>Dev <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '0.85rem' }}>/ Testimonials</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/admin" style={{ color: 'var(--text3)', fontSize: '0.85rem', textDecoration: 'none' }}>← Dashboard</Link>
          <Link href="/admin/testimonials/new" style={{
            background: 'var(--teal)',
            color: '#0a0a0f',
            padding: '0.4rem 1rem',
            borderRadius: '6px',
            fontSize: '0.82rem',
            textDecoration: 'none',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
          }}>+ Add Testimonial</Link>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Testimonials {loadError ? '(unavailable)' : `(${testimonials.length})`}
        </h1>
        <p style={{ color: 'var(--text3)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          Add client feedback here, then publish it when you are ready.
        </p>

        {loadError ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '2rem',
            color: 'var(--text2)',
          }}>
            The testimonial table is temporarily unavailable. Check the database connection or run the Prisma schema sync again.
          </div>
        ) : testimonials.length === 0 ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '3rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✦</div>
            <p style={{ color: 'var(--text2)', marginBottom: '1.5rem' }}>No testimonials yet. Add your first one now.</p>
            <Link href="/admin/testimonials/new" style={{
              background: 'var(--teal)',
              color: '#0a0a0f',
              padding: '0.7rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
            }}>+ Add First Testimonial</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {testimonials.map(testimonial => (
              <div
                key={testimonial.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1.2rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>{testimonial.name}</span>
                    <span style={{ color: 'var(--amber)', fontSize: '0.8rem', letterSpacing: '1px' }}>
                      {'★'.repeat(testimonial.rating)}
                    </span>
                    {testimonial.published ? (
                      <span style={{
                        background: 'var(--teal)',
                        color: '#0a0a0f',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        fontFamily: 'Syne, sans-serif',
                        padding: '0.1rem 0.5rem',
                        borderRadius: '100px',
                      }}>Published</span>
                    ) : (
                      <span style={{
                        background: 'var(--amber-dim)',
                        color: 'var(--amber)',
                        border: '1px solid rgba(255,179,71,0.2)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        fontFamily: 'Syne, sans-serif',
                        padding: '0.1rem 0.5rem',
                        borderRadius: '100px',
                      }}>Pending</span>
                    )}
                    <span style={{
                      background: 'var(--bg3)',
                      color: 'var(--text3)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      fontFamily: 'Syne, sans-serif',
                      padding: '0.1rem 0.5rem',
                      borderRadius: '100px',
                    }}>{testimonial.source}</span>
                  </div>
                  <div style={{ color: 'var(--text3)', fontSize: '0.78rem', marginBottom: '0.5rem' }}>{testimonial.role}</div>
                  <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {testimonial.content}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <Link href={`/admin/testimonials/edit?id=${testimonial.id}`} style={{
                    color: 'var(--teal)',
                    fontSize: '0.78rem',
                    textDecoration: 'none',
                    padding: '0.4rem 0.8rem',
                    border: '1px solid rgba(0,229,195,0.2)',
                    borderRadius: '6px',
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600,
                  }}>Edit</Link>
                  <DeleteButton id={testimonial.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
