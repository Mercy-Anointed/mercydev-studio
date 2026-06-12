'use client'

export default function MarkReadButton({ id, currentStatus }: { id: string; currentStatus: string }) {
  if (currentStatus === 'REPLIED') return null

  const next = currentStatus === 'UNREAD' ? 'READ' : 'REPLIED'
  const label = currentStatus === 'UNREAD' ? 'Mark as Read' : 'Mark as Replied'

  return (
    <button
      type="button"
      onClick={async () => {
        await fetch(`/api/contacts/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: next }),
        })
        window.location.reload()
      }}
      style={{
        background: 'transparent',
        color: 'var(--text2)',
        border: '1px solid var(--border2)',
        padding: '0.4rem 1rem',
        borderRadius: '6px',
        fontSize: '0.8rem',
        cursor: 'pointer',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  )
}
