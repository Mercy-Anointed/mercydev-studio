'use client'

import Link from 'next/link'
import TestimonialForm from '../TestimonialForm'

export default function NewTestimonialPage() {
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
          Mercy<span style={{ color: 'var(--teal)' }}>.</span>Dev <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '0.85rem' }}>/ New Testimonial</span>
        </div>
        <Link href="/admin/testimonials" style={{ color: 'var(--text3)', fontSize: '0.85rem', textDecoration: 'none' }}>← Back to Testimonials</Link>
      </div>

      <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>
          Add New Testimonial
        </h1>

        <TestimonialForm mode="create" />
      </div>
    </div>
  )
}
