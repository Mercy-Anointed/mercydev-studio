'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const categories = ['Website', 'Web App', 'E-commerce', 'Landing Page', 'Brand Design', 'AI Tool', 'Other']

export default function NewProject() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [techInput, setTechInput] = useState('')
  const [form, setForm] = useState({
    title: '',
    description: '',
    techStack: [] as string[],
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
    category: categories[0],
    featured: false,
    published: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const addTech = () => {
    const tech = techInput.trim()
    if (tech && !form.techStack.includes(tech)) {
      setForm(prev => ({ ...prev, techStack: [...prev.techStack, tech] }))
      setTechInput('')
    }
  }

  const removeTech = (tech: string) => {
    setForm(prev => ({ ...prev, techStack: prev.techStack.filter(t => t !== tech) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        router.push('/admin/projects')
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong')
      }
    } catch {
      setError('Failed to save project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Top bar */}
      <div style={{
        background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>
          Mercy<span style={{ color: 'var(--teal)' }}>.</span>Dev <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '0.85rem' }}>/ New Project</span>
        </div>
        <Link href="/admin/projects" style={{ color: 'var(--text3)', fontSize: '0.85rem', textDecoration: 'none' }}>← Back to Projects</Link>
      </div>

      <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>
          Add New Project
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

          {/* Title */}
          <div>
            <label style={labelStyle}>Project Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. ShopNaija E-commerce" style={inputStyle} />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
              placeholder="Describe what you built, who it's for, and what problem it solves..."
              style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          {/* Category */}
          <div>
            <label style={labelStyle}>Category *</label>
            <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Tech Stack */}
          <div>
            <label style={labelStyle}>Tech Stack *</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech() } }}
                placeholder="e.g. Next.js — press Enter to add"
                style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
              />
              <button type="button" onClick={addTech} style={{
                background: 'var(--teal)', color: '#0a0a0f',
                border: 'none', padding: '0 1rem', borderRadius: '8px',
                fontFamily: 'Syne, sans-serif', fontWeight: 700, cursor: 'pointer',
              }}>Add</button>
            </div>
            {form.techStack.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {form.techStack.map(t => (
                  <span key={t} style={{
                    background: 'var(--teal-dim)', border: '1px solid rgba(0,229,195,0.2)',
                    color: 'var(--teal)', fontSize: '0.8rem', padding: '0.2rem 0.7rem',
                    borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}>
                    {t}
                    <button type="button" onClick={() => removeTech(t)} style={{
                      background: 'none', border: 'none', color: 'var(--teal)',
                      cursor: 'pointer', fontSize: '0.9rem', padding: 0, lineHeight: 1,
                    }}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label style={labelStyle}>Image URL *</label>
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} required
              placeholder="https://your-image-url.com/screenshot.png"
              style={inputStyle} />
            <p style={{ color: 'var(--text3)', fontSize: '0.75rem', marginTop: '0.3rem' }}>
              Upload your screenshot to <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal)' }}>cloudinary.com</a> (free) and paste the URL here
            </p>
          </div>

          {/* URLs row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Live URL</label>
              <input name="liveUrl" value={form.liveUrl} onChange={handleChange}
                placeholder="https://yourproject.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>GitHub URL</label>
              <input name="githubUrl" value={form.githubUrl} onChange={handleChange}
                placeholder="https://github.com/you/repo" style={inputStyle} />
            </div>
          </div>

          {/* Toggles */}
          <div style={{ display: 'flex', gap: '2rem' }}>
            {[
              { name: 'featured', label: 'Mark as Featured', checked: form.featured },
              { name: 'published', label: 'Published (visible on site)', checked: form.published },
            ].map(toggle => (
              <label key={toggle.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem', color: 'var(--text2)' }}>
                <input
                  type="checkbox"
                  name={toggle.name}
                  checked={toggle.checked}
                  onChange={handleChange}
                  style={{ accentColor: 'var(--teal)', width: '16px', height: '16px' }}
                />
                {toggle.label}
              </label>
            ))}
          </div>

          {error && (
            <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', padding: '0.8rem 1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem' }}>
            <button type="submit" disabled={loading} style={{
              background: 'var(--teal)', color: '#0a0a0f',
              border: 'none', padding: '0.8rem 2rem', borderRadius: '8px',
              fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
            }}>
              {loading ? 'Saving...' : 'Save Project →'}
            </button>
            <Link href="/admin/projects" style={{
              color: 'var(--text2)', padding: '0.8rem 1.5rem', borderRadius: '8px',
              border: '1px solid var(--border2)', textDecoration: 'none',
              fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.95rem',
              display: 'inline-flex', alignItems: 'center',
            }}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.8rem', fontWeight: 600,
  fontFamily: 'Syne, sans-serif', color: 'var(--text2)', marginBottom: '0.4rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'var(--bg3)',
  border: '1px solid var(--border)', color: 'var(--text)',
  padding: '0.7rem 1rem', borderRadius: '8px',
  fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', outline: 'none',
}