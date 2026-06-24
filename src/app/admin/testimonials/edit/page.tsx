'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import TestimonialForm from '../TestimonialForm'

type Testimonial = {
  name: string
  role: string
  rating: number
  content: string
  published: boolean
}

export default function EditTestimonialPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal)', fontFamily: 'Syne, sans-serif' }}>
        Loading testimonial...
      </div>
    }>
      <EditTestimonialForm />
    </Suspense>
  )
}

function EditTestimonialForm() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null)

  useEffect(() => {
    if (!id) return

    fetch(`/api/testimonials/${id}`)
      .then(async res => {
        if (!res.ok) {
          throw new Error('Failed to load testimonial')
        }
        return res.json()
      })
      .then(data => {
        setTestimonial({
          name: data.name || '',
          role: data.role || '',
          rating: data.rating || 5,
          content: data.content || '',
          published: data.published ?? false,
        })
        setFetching(false)
      })
      .catch(() => {
        setError('Failed to load testimonial')
        setFetching(false)
      })
  }, [id])

  if (fetching) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal)', fontFamily: 'Syne, sans-serif' }}>
        Loading testimonial...
      </div>
    )
  }

  if (error || !testimonial) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
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
            Mercy<span style={{ color: 'var(--teal)' }}>.</span>Dev <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '0.85rem' }}>/ Edit Testimonial</span>
          </div>
          <Link href="/admin/testimonials" style={{ color: 'var(--text3)', fontSize: '0.85rem', textDecoration: 'none' }}>← Back to Testimonials</Link>
        </div>
        <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', color: '#ff6b6b' }}>
          {error || 'Testimonial not found'}
        </div>
      </div>
    )
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
          Mercy<span style={{ color: 'var(--teal)' }}>.</span>Dev <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '0.85rem' }}>/ Edit Testimonial</span>
        </div>
        <Link href="/admin/testimonials" style={{ color: 'var(--text3)', fontSize: '0.85rem', textDecoration: 'none' }}>← Back to Testimonials</Link>
      </div>

      <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>
          Edit Testimonial
        </h1>

        <TestimonialForm mode="edit" testimonialId={id || undefined} initialValues={testimonial} />
      </div>
    </div>
  )
}
