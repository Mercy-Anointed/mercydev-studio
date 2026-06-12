'use client'

export default function DeleteButton({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (!confirm('Delete this project?')) return
        await fetch(`/api/projects/${id}`, { method: 'DELETE' })
        window.location.reload()
      }}
      style={{
        background: 'transparent',
        color: '#ff6b6b',
        fontSize: '0.78rem',
        cursor: 'pointer',
        padding: '0.4rem 0.8rem',
        border: '1px solid rgba(255,107,107,0.2)',
        borderRadius: '6px',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 600,
      }}
    >
      Delete
    </button>
  )
}
