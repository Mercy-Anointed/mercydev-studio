import { db } from '@/lib/db'
import Link from 'next/link'
import MarkReadButton from './MarkReadButton'

export const dynamic = 'force-dynamic'

export default async function AdminContacts() {
  const contacts = await db.contactRequest.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const statusColor: Record<string, string> = {
    UNREAD: 'var(--teal)',
    READ: 'var(--amber)',
    REPLIED: 'var(--text3)',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Top bar */}
      <div style={{
        background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>
          Mercy<span style={{ color: 'var(--teal)' }}>.</span>Dev <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '0.85rem' }}>/ Inquiries</span>
        </div>
        <Link href="/admin" style={{ color: 'var(--text3)', fontSize: '0.85rem', textDecoration: 'none' }}>← Dashboard</Link>
      </div>

      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          Contact Inquiries ({contacts.length})
        </h1>

        {contacts.length === 0 ? (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '14px', padding: '3rem', textAlign: 'center',
          }}>
            <p style={{ color: 'var(--text2)' }}>No inquiries yet. When people fill the contact form, they&apos;ll appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {contacts.map(contact => (
              <div key={contact.id} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '12px', padding: '1.5rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: '0.2rem' }}>
                      {contact.name}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <a href={`mailto:${contact.email}`} style={{ color: 'var(--teal)', fontSize: '0.82rem', textDecoration: 'none' }}>
                        {contact.email}
                      </a>
                      <span style={{ color: 'var(--text3)', fontSize: '0.82rem' }}>
                        Service: <strong style={{ color: 'var(--text2)' }}>{contact.service}</strong>
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 700, fontFamily: 'Syne, sans-serif',
                      color: statusColor[contact.status],
                      border: `1px solid ${statusColor[contact.status]}`,
                      padding: '0.2rem 0.6rem', borderRadius: '100px', opacity: 0.8,
                    }}>
                      {contact.status}
                    </span>
                    <span style={{ color: 'var(--text3)', fontSize: '0.75rem' }}>
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <p style={{
                  color: 'var(--text2)', fontSize: '0.88rem',
                  lineHeight: 1.7, fontWeight: 300,
                  background: 'var(--bg3)', padding: '1rem',
                  borderRadius: '8px', borderLeft: '3px solid var(--teal)',
                }}>
                  {contact.message}
                </p>

                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
                  <a href={`mailto:${contact.email}?subject=Re: Your inquiry about ${contact.service}`}
                    style={{
                      background: 'var(--teal)', color: '#0a0a0f',
                      padding: '0.4rem 1rem', borderRadius: '6px',
                      fontSize: '0.8rem', textDecoration: 'none',
                      fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    }}>
                    Reply via Email →
                  </a>
                  <MarkReadButton id={contact.id} currentStatus={contact.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

