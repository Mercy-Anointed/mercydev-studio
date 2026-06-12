'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Message {
  id: string
  content: string
  isFromAdmin: boolean
  seen: boolean
  createdAt: string
  senderId: string
}

interface Conversation {
  id: string
  visitorName: string
  visitorEmail: string
  resolved: boolean
  messages: Message[]
}

export default function ConversationPage() {
  const params = useParams<{ id: string }>()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const fetchConversation = useCallback(async () => {
    try {
      const res = await fetch(`/api/conversations/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setConversation(data)
      }
    } catch (error) {
      console.error('Failed to fetch conversation:', error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    const timeout = setTimeout(() => void fetchConversation(), 0)
    const interval = setInterval(() => void fetchConversation(), 5000)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [fetchConversation])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages])

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reply.trim()) return
    setSending(true)
    try {
      const res = await fetch(`/api/conversations/${params.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: reply, isAdmin: true }),
      })
      if (res.ok) {
        setReply('')
        await fetchConversation()
      }
    } catch (error) {
      console.error('Failed to send reply:', error)
    } finally {
      setSending(false)
    }
  }

  const markResolved = async () => {
    await fetch(`/api/conversations/${params.id}`, { method: 'PATCH' })
    await fetchConversation()
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal)', fontFamily: 'Syne, sans-serif' }}>
      Loading conversation...
    </div>
  )

  if (!conversation) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', fontFamily: 'Syne, sans-serif' }}>
      Conversation not found.
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <div style={{
        background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/messages" style={{ color: 'var(--text3)', fontSize: '0.85rem', textDecoration: 'none' }}>← Messages</Link>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
              {conversation.visitorName}
            </div>
            <div style={{ color: 'var(--text3)', fontSize: '0.78rem' }}>{conversation.visitorEmail}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          {conversation.resolved ? (
            <span style={{ color: 'var(--text3)', fontSize: '0.82rem', border: '1px solid var(--border)', padding: '0.3rem 0.8rem', borderRadius: '100px' }}>
              ✓ Resolved
            </span>
          ) : (
            <button onClick={markResolved} style={{
              background: 'transparent', color: 'var(--text2)',
              border: '1px solid var(--border2)', padding: '0.4rem 1rem',
              borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer',
              fontFamily: 'Syne, sans-serif', fontWeight: 600,
            }}>
              Mark Resolved
            </button>
          )}
          <a href={`mailto:${conversation.visitorEmail}`} style={{
            background: 'var(--teal)', color: '#0a0a0f',
            padding: '0.4rem 1rem', borderRadius: '6px',
            fontSize: '0.8rem', textDecoration: 'none',
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
          }}>
            Email →
          </a>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '700px', width: '100%', margin: '0 auto' }}>
        {conversation.messages.map((msg, i) => {
        const isAdmin = msg.isFromAdmin
          return (
            <div key={msg.id} style={{ display: 'flex', justifyContent: isAdmin ? 'flex-end' : 'flex-start', gap: '0.8rem', alignItems: 'flex-end' }}>
              {/* Visitor avatar */}
              {!isAdmin && (
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                  background: 'var(--teal-dim)', border: '1px solid rgba(0,229,195,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal)',
                }}>
                  {conversation.visitorName.charAt(0).toUpperCase()}
                </div>
              )}

              <div style={{ maxWidth: '70%' }}>
                {/* Name label for first message */}
                {i === 0 && !isAdmin && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginBottom: '0.3rem', fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>
                    {conversation.visitorName}
                  </div>
                )}
                <div style={{
                  background: isAdmin ? 'var(--teal)' : 'var(--surface)',
                  color: isAdmin ? '#0a0a0f' : 'var(--text)',
                  border: isAdmin ? 'none' : '1px solid var(--border)',
                  borderRadius: isAdmin ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                  padding: '0.8rem 1rem',
                  fontSize: '0.88rem', lineHeight: 1.6,
                }}>
                  {msg.content}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text3)', marginTop: '0.3rem', textAlign: isAdmin ? 'right' : 'left' }}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {' · '}
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Admin avatar */}
              {isAdmin && (
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                  background: 'var(--teal)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '0.9rem',
                }}>
                  👩‍💻
                </div>
              )}
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply box */}
      {!conversation.resolved && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '1rem 2rem', background: 'var(--bg2)', flexShrink: 0 }}>
          <form onSubmit={sendReply} style={{ display: 'flex', gap: '0.8rem', maxWidth: '700px', margin: '0 auto' }}>
            <textarea
              value={reply}
              onChange={e => setReply(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendReply(e) } }}
              placeholder="Type your reply... (Enter to send, Shift+Enter for new line)"
              rows={2}
              style={{
                flex: 1, background: 'var(--bg3)',
                border: '1px solid var(--border)', color: 'var(--text)',
                padding: '0.7rem 1rem', borderRadius: '8px',
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem',
                outline: 'none', resize: 'none',
              }}
            />
            <button type="submit" disabled={sending || !reply.trim()} style={{
              background: 'var(--teal)', color: '#0a0a0f', border: 'none',
              padding: '0 1.5rem', borderRadius: '8px',
              fontFamily: 'Syne, sans-serif', fontWeight: 700,
              cursor: sending ? 'not-allowed' : 'pointer',
              opacity: sending || !reply.trim() ? 0.6 : 1,
              flexShrink: 0,
            }}>
              {sending ? '...' : 'Send →'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
