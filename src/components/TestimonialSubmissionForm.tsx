'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ratingLabels = ['Poor', 'Okay', 'Good', 'Great', 'Excellent']

export default function TestimonialSubmissionForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    role: '',
    rating: 5,
    content: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setFeedback('')

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          rating: Number(form.rating),
        }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok) {
        setStatus('sent')
        setFeedback(data?.message || 'Thanks for sharing your feedback. Your testimonial is now live.')
        setForm({ name: '', role: '', rating: 5, content: '' })
        router.refresh()
      } else {
        setStatus('error')
        setFeedback(data?.error || 'Could not submit testimonial right now.')
      }
    } catch {
      setStatus('error')
      setFeedback('Could not submit testimonial right now.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: 'clamp(1.2rem, 2vw, 1.7rem)',
        maxWidth: '860px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: '1rem',
          alignItems: 'start',
          marginBottom: '1.3rem',
        }}
        className="testimonial-form-header"
      >
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem' }}>
            Leave a testimonial
          </h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Share your rating and a short review. Submitted testimonials appear on the site right away and can be edited anytime from the admin dashboard.
          </p>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text3)', lineHeight: 1.6, maxWidth: '16rem' }}>
          Your feedback helps future clients feel confident.
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '1rem',
          marginBottom: '1rem',
        }}
        className="testimonial-form-row"
      >
        <div>
          <label style={labelStyle}>Your Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Adaeze K."
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Role or Company</label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="CEO, ShopNaija"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>Your Rating</label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
            gap: '0.65rem',
          }}
          className="testimonial-rating-row"
        >
          {[1, 2, 3, 4, 5].map(value => (
            <button
              key={value}
              type="button"
              onClick={() => setForm(prev => ({ ...prev, rating: value }))}
              aria-pressed={form.rating === value}
              style={{
                border: `1px solid ${form.rating === value ? 'rgba(0,229,195,0.35)' : 'var(--border)'}`,
                background: form.rating === value ? 'var(--teal-dim)' : 'var(--bg3)',
                color: form.rating === value ? 'var(--teal)' : 'var(--text3)',
                padding: '0.8rem 0.55rem',
                borderRadius: '14px',
                cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                transition: 'all 0.2s',
                minHeight: '4.4rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <span
                style={{
                  width: '1.9rem',
                  height: '1.9rem',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  background: form.rating === value ? 'rgba(0,229,195,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${form.rating === value ? 'rgba(0,229,195,0.28)' : 'var(--border)'}`,
                }}
              >
                {value}
              </span>
              <span style={{ fontSize: '0.72rem', lineHeight: 1.1, textAlign: 'center' }}>
                {ratingLabels[value - 1]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>Your Testimonial</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Tell people what it was like working together..."
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary"
        style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
      >
        {status === 'sending' ? 'Submitting...' : 'Submit Testimonial ->'}
      </button>

      {feedback && (
        <p style={{
          marginTop: '1rem',
          color: status === 'error' ? '#ff6b6b' : 'var(--teal)',
          fontSize: '0.88rem',
          textAlign: 'center',
        }}>
          {feedback}
        </p>
      )}

      <style>{`
        @media (max-width: 900px) {
          .testimonial-form-header {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 720px) {
          .testimonial-form-row { grid-template-columns: 1fr !important; }
          .testimonial-rating-row { gap: 0.5rem !important; }
          .testimonial-rating-row button {
            min-height: 4.1rem !important;
            padding: 0.7rem 0.45rem !important;
          }
        }
      `}</style>
    </form>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 600,
  fontFamily: 'Space Grotesk, sans-serif',
  color: 'var(--text2)',
  marginBottom: '0.4rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  background: 'var(--bg3)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '0.75rem 1rem',
  borderRadius: '10px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.95rem',
  outline: 'none',
}
