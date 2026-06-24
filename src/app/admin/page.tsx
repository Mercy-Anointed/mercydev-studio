import Link from 'next/link'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function getStats() {
  const safeCount = async <T,>(query: Promise<T>, fallback: number) => {
    try {
      return await query
    } catch (error) {
      console.warn('Could not load admin stat yet', error)
      return fallback
    }
  }

  const [projects, messages, contacts, testimonials] = await Promise.all([
    safeCount(db.project.count(), 0),
    safeCount(db.message.count({ where: { seen: false } }), 0),
    safeCount(db.contactRequest.count({ where: { status: 'UNREAD' } }), 0),
    safeCount(db.testimonial.count(), 0),
  ])

  return { projects, messages, contacts, testimonials }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Top bar */}
      <div style={{
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>
          Mercy<span style={{ color: 'var(--teal)' }}>.</span>Dev <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '0.85rem' }}>/ Admin</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--text3)', fontSize: '0.85rem', textDecoration: 'none' }}>← View Site</Link>
          <Link href="/api/auth/signout" style={{
            background: 'transparent',
            border: '1px solid var(--border2)',
            color: 'var(--text2)',
            padding: '0.4rem 1rem',
            borderRadius: '6px',
            fontSize: '0.82rem',
            textDecoration: 'none',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
          }}>Sign Out</Link>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 57px)' }}>

        {/* Sidebar */}
        <aside style={{
          width: '220px',
          background: 'var(--bg2)',
          borderRight: '1px solid var(--border)',
          padding: '1.5rem 0',
          flexShrink: 0,
        }}>
          {[
            { href: '/admin', icon: '▦', label: 'Overview' },
            { href: '/admin/projects', icon: '◈', label: 'Projects' },
            { href: '/admin/messages', icon: '◉', label: 'Messages' },
            { href: '/admin/contacts', icon: '◎', label: 'Inquiries' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0.7rem 1.5rem',
                color: 'var(--text2)',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
            >
              <span style={{ color: 'var(--teal)', fontSize: '1rem' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: '2rem' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.3rem' }}>
            Welcome back 👋
          </h1>
          <p style={{ color: 'var(--text3)', fontSize: '0.88rem', marginBottom: '2rem' }}>
            Here&apos;s what&apos;s happening with your studio today.
          </p>

          {/* Stats cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {[
              { label: 'Total Projects', value: stats.projects, icon: '◈', color: 'var(--teal)', sub: 'In your portfolio' },
              { label: 'Unread Messages', value: stats.messages, icon: '◉', color: 'var(--amber)', sub: 'Needs your reply' },
              { label: 'New Inquiries', value: stats.contacts, icon: '◎', color: '#82aaff', sub: 'Contact form submissions' },
              { label: 'Testimonials', value: stats.testimonials, icon: '✦', color: 'var(--teal)', sub: 'Published or pending' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '1.5rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--text3)', fontSize: '0.82rem', fontWeight: 500 }}>{stat.label}</span>
                  <span style={{ color: stat.color, fontSize: '1.2rem' }}>{stat.icon}</span>
                </div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: stat.color }}>
                  {stat.value}
                </div>
                <div style={{ color: 'var(--text3)', fontSize: '0.75rem', marginTop: '0.3rem' }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text2)' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {[
              { href: '/admin/projects/new', label: 'Add New Project', icon: '＋', desc: 'Upload a new project to your portfolio', color: 'var(--teal)' },
              { href: '/admin/messages', label: 'View Messages', icon: '◉', desc: 'Read and reply to visitor messages', color: 'var(--amber)' },
              { href: '/admin/contacts', label: 'View Inquiries', icon: '◎', desc: 'See all contact form submissions', color: '#82aaff' },
              { href: '/admin/projects', label: 'Manage Projects', icon: '◈', desc: 'Edit or delete existing projects', color: 'var(--teal)' },
              { href: '/admin/testimonials', label: 'Manage Testimonials', icon: '✦', desc: 'Edit, publish, or remove reviews', color: 'var(--amber)' },
            ].map(action => (
              <Link key={action.href} href={action.href} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '1.2rem',
                textDecoration: 'none',
                color: 'var(--text)',
                transition: 'all 0.2s',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'var(--teal-dim)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', color: action.color, flexShrink: 0,
                }}>
                  {action.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', fontWeight: 700 }}>{action.label}</div>
                  <div style={{ color: 'var(--text3)', fontSize: '0.78rem' }}>{action.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
