'use client'

import { useState } from 'react'
import WhatsAppIcon from './WhatsAppIcon'

const WHATSAPP_NUMBER = '2349074399728'
const EMAIL = 'osagiedemercy6@gmail.com'

const services = [
  'Website Development',
  'Fullstack Web App',
  'UI/UX Design',
  'Brand Design',
  'Graphic Design',
  'Landing Page',
  'Not sure yet',
]

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6.5h16v11H4v-11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m5.5 7.8 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3.8v2.4M17 3.8v2.4M4.8 8.6h14.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="4.5" y="6.2" width="15" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: services[0], message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setFeedback('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => null)

      if (res.ok) {
        setStatus('sent')
        setFeedback('Message sent! I will get back to you soon.')
        setForm({ name: '', email: '', service: services[0], message: '' })
      } else {
        const details = data?.details
          ? Object.values(data.details).flat().filter(Boolean).join(' ')
          : ''
        setFeedback(details || data?.error || 'Something went wrong. Try WhatsApp instead.')
        setStatus('error')
      }
    } catch {
      setFeedback('Something went wrong. Try WhatsApp instead.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" style={{ padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <span className="section-tag">Get in touch</span>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            lineHeight: 1.08,
            marginBottom: '4rem',
          }}
        >
          Let&apos;s build
          <br />
          something together.
        </h2>

        <div
          className="contact-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}
        >
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.9rem', letterSpacing: '-0.03em' }}>
              Ready when you are.
            </h3>
            <p style={{ color: 'var(--text2)', fontSize: '1rem', fontWeight: 400, marginBottom: '2rem', lineHeight: 1.75 }}>
              Got a project in mind? Fill the form or reach out directly. I respond to every message personally.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  icon: 'mail',
                  label: 'Email Me',
                  sub: EMAIL,
                  href: `mailto:${EMAIL}`,
                  amber: false,
                },
                {
                  icon: 'whatsapp',
                  label: 'WhatsApp Me',
                  sub: 'Usually replies within 1 hour',
                  href: `https://wa.me/${WHATSAPP_NUMBER}`,
                  amber: true,
                },
                {
                  icon: 'calendar',
                  label: 'Book a Call',
                  sub: '30 min strategy session',
                  href: 'https://calendly.com/osagiedemercy6',
                  amber: false,
                },
              ].map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="contact-method-hover"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.2rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: 'var(--text)',
                    transition: 'all 0.2s',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: method.amber ? 'rgba(255,179,71,0.08)' : 'var(--teal-dim)',
                      border: `1px solid ${method.amber ? 'rgba(255,179,71,0.15)' : 'rgba(0,229,195,0.15)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: method.amber ? 'var(--amber)' : 'var(--teal)',
                      flexShrink: 0,
                    }}
                  >
                    {method.icon === 'whatsapp' ? (
                      <WhatsAppIcon size={18} />
                    ) : method.icon === 'mail' ? (
                      <MailIcon />
                    ) : (
                      <CalendarIcon />
                    )}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.92rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                      {method.label}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text3)', lineHeight: 1.5 }}>{method.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              padding: '2rem',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }} className="form-row">
              <div>
                <label style={labelStyle}>Your Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Service Needed</label>
              <select name="service" value={form.service} onChange={handleChange} style={inputStyle}>
                {services.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Tell me about your project</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="What are you building? Any deadline or budget in mind?"
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message ->'}
            </button>

            {status === 'sent' && (
              <p style={{ color: 'var(--teal)', fontSize: '0.88rem', marginTop: '1rem', textAlign: 'center' }}>
                {feedback}
              </p>
            )}
            {status === 'error' && (
              <p style={{ color: '#ff6b6b', fontSize: '0.88rem', marginTop: '1rem', textAlign: 'center' }}>
                {feedback}
              </p>
            )}
          </form>
        </div>
      </div>

      <style>{`
        .contact-method-hover:hover {
          border-color: rgba(0,229,195,0.3) !important;
          transform: translateX(4px);
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
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
  background: 'var(--bg3)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '0.75rem 1rem',
  borderRadius: '10px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.95rem',
  outline: 'none',
}
