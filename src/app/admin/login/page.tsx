'use client'

import { FormEvent, Suspense, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AdminLogin() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  )
}

function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const callbackUrl = searchParams.get('callbackUrl') || '/admin'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    })

    setLoading(false)

    if (result?.error) {
      setError('Invalid admin email or password.')
      return
    }

    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      color: 'var(--text)',
      display: 'grid',
      placeItems: 'center',
      padding: '1.5rem',
      fontFamily: 'DM Sans, sans-serif',
    }}>
      <form onSubmit={handleSubmit} style={{
        width: '100%',
        maxWidth: '420px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '2rem',
      }}>
        <Link href="/" style={{ color: 'var(--text3)', fontSize: '0.85rem', textDecoration: 'none' }}>
          Back to site
        </Link>

        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '1.7rem',
          fontWeight: 800,
          margin: '1.2rem 0 0.4rem',
        }}>
          Admin Login
        </h1>
        <p style={{ color: 'var(--text3)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Sign in to manage projects and inquiries.
        </p>

        <label style={labelStyle}>Email</label>
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
          autoComplete="email"
          style={inputStyle}
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
          autoComplete="current-password"
          style={inputStyle}
        />

        {error && (
          <div style={{
            background: 'rgba(255,107,107,0.1)',
            border: '1px solid rgba(255,107,107,0.3)',
            color: '#ff6b6b',
            padding: '0.75rem 0.9rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1rem',
          }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={{
          width: '100%',
          background: 'var(--teal)',
          color: '#0a0a0f',
          border: 'none',
          borderRadius: '8px',
          padding: '0.85rem 1rem',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: 'var(--text2)',
  fontFamily: 'Syne, sans-serif',
  fontSize: '0.8rem',
  fontWeight: 600,
  marginBottom: '0.4rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg3)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '0.75rem 0.9rem',
  borderRadius: '8px',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '0.95rem',
  outline: 'none',
  marginBottom: '1rem',
}
