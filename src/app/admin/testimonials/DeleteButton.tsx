'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Delete this testimonial?')) return

    setLoading(true)
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to delete testimonial')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      style={{
        color: '#ff6b6b',
        fontSize: '0.78rem',
        textDecoration: 'none',
        padding: '0.4rem 0.8rem',
        border: '1px solid rgba(255,107,107,0.2)',
        borderRadius: '6px',
        background: 'transparent',
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}
