import { db } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminMessages() {
  const conversations = await db.conversation.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1, // get latest message preview
      },
    },
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Top bar */}
      <div style={{
        background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>
          Mercy<span style={{ color: 'var(--teal)' }}>.</span>Dev <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '0.85rem' }}>/ Messages</span>
        </div>
        <Link href="/admin" style={{ color: 'var(--text3)', fontSize: '0.85rem', textDecoration: 'none' }}>← Dashboard</Link>
      </div>

      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          Messages ({conversations.length})
        </h1>

        {conversations.length === 0 ? (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '14px', padding: '3rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>◉</div>
            <p style={{ color: 'var(--text2)' }}>No messages yet. When visitors message you, they&apos;ll appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {conversations.map(conv => {
              const lastMsg = conv.messages[0]
              const isUnread = lastMsg && !lastMsg.seen
              return (
                <Link
                  key={conv.id}
                  href={`/admin/messages/${conv.id}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    background: 'var(--surface)', border: `1px solid ${isUnread ? 'rgba(0,229,195,0.3)' : 'var(--border)'}`,
                    borderRadius: '12px', padding: '1.2rem', textDecoration: 'none', color: 'var(--text)',
                    transition: 'all 0.2s',
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: 'var(--teal-dim)', border: '1px solid rgba(0,229,195,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', fontWeight: 700,
                    color: 'var(--teal)', flexShrink: 0,
                  }}>
                    {conv.visitorName.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>
                        {conv.visitorName}
                      </span>
                      <span style={{ color: 'var(--text3)', fontSize: '0.75rem' }}>
                        {new Date(conv.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ color: 'var(--text3)', fontSize: '0.8rem' }}>{conv.visitorEmail}</div>
                    {lastMsg && (
                      <div style={{
                        color: isUnread ? 'var(--text2)' : 'var(--text3)',
                        fontSize: '0.82rem', marginTop: '0.2rem',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        fontWeight: isUnread ? 500 : 300,
                      }}>
                        {lastMsg.content}
                      </div>
                    )}
                  </div>

                  {/* Unread badge */}
                  {isUnread && (
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: 'var(--teal)', flexShrink: 0,
                    }} />
                  )}

                  {/* Resolved badge */}
                  {conv.resolved && (
                    <span style={{
                      color: 'var(--text3)', fontSize: '0.72rem',
                      border: '1px solid var(--border)', padding: '0.2rem 0.5rem',
                      borderRadius: '100px', flexShrink: 0,
                    }}>Resolved</span>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
