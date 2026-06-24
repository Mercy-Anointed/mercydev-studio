'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type TestimonialFormValues = {
  name: string
  role: string
  rating: number
  content: string
  published: boolean
}

type TestimonialFormProps = {
  mode: 'create' | 'edit'
  testimonialId?: string
  initialValues?: TestimonialFormValues
}

const defaultValues: TestimonialFormValues = {
  name: '',
  role: '',
  rating: 5,
  content: '',
  published: false,
}

export default function TestimonialForm({
  mode,
  testimonialId,
  initialValues = defaultValues,
}: TestimonialFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<TestimonialFormValues>(initialValues)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleRating = (rating: number) => {
    setForm(prev => ({ ...prev, rating }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(
        mode === 'create' ? '/api/testimonials' : `/api/testimonials/${testimonialId}`,
        {
          method: mode === 'create' ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            rating: Number(form.rating),
          }),
        }
      )

      if (res.ok) {
        router.push('/admin/testimonials')
      } else {
        const data = await res.json().catch(() => null)
        setError(data?.error || 'Something went wrong')
      }
    } catch {
      setError('Failed to save testimonial')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div>
        <label style={labelStyle}>Client Name *</label>
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
        <label style={labelStyle}>Role or Company *</label>
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          placeholder="CEO, ShopNaija"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Rating *</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[1, 2, 3, 4, 5].map(value => (
            <button
              key={value}
              type="button"
              onClick={() => handleRating(value)}
              style={{
                border: `1px solid ${form.rating === value ? 'rgba(0,229,195,0.35)' : 'var(--border)'}`,
                background: form.rating === value ? 'var(--teal-dim)' : 'var(--bg3)',
                color: form.rating === value ? 'var(--teal)' : 'var(--text3)',
                padding: '0.65rem 0.9rem',
                borderRadius: '999px',
                cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                transition: 'all 0.2s',
              }}
            >
              {value} ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Testimonial *</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Write what the experience was like and what changed for you..."
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem', color: 'var(--text2)' }}>
        <input
          type="checkbox"
          name="published"
          checked={form.published}
          onChange={handleChange}
          style={{ accentColor: 'var(--teal)', width: '16px', height: '16px' }}
        />
        Publish on site now
      </label>

      {error && (
        <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', padding: '0.8rem 1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem', flexWrap: 'wrap' }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: 'var(--teal)',
            color: '#0a0a0f',
            border: 'none',
            padding: '0.8rem 2rem',
            borderRadius: '8px',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Saving...' : mode === 'create' ? 'Save Testimonial →' : 'Save Changes →'}
        </button>
        <Link
          href="/admin/testimonials"
          style={{
            color: 'var(--text2)',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--border2)',
            textDecoration: 'none',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
            fontSize: '0.95rem',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 600,
  fontFamily: 'Syne, sans-serif',
  color: 'var(--text2)',
  marginBottom: '0.4rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg3)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '0.7rem 1rem',
  borderRadius: '8px',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '0.9rem',
  outline: 'none',
}
