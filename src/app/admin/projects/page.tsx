import Link from 'next/link'
import { db } from '@/lib/db'
import DeleteButton from './DeleteButton'

export const dynamic = 'force-dynamic'

export default async function AdminProjects() {
  const projects = await db.project.findMany({
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Top bar */}
      <div style={{
        background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>
          Mercy<span style={{ color: 'var(--teal)' }}>.</span>Dev <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '0.85rem' }}>/ Projects</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/admin" style={{ color: 'var(--text3)', fontSize: '0.85rem', textDecoration: 'none' }}>← Dashboard</Link>
          <Link href="/admin/projects/new" style={{
            background: 'var(--teal)', color: '#0a0a0f',
            padding: '0.4rem 1rem', borderRadius: '6px',
            fontSize: '0.82rem', textDecoration: 'none',
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
          }}>+ Add Project</Link>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          Projects ({projects.length})
        </h1>

        {projects.length === 0 ? (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '14px', padding: '3rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>◈</div>
            <p style={{ color: 'var(--text2)', marginBottom: '1.5rem' }}>No projects yet. Add your first one!</p>
            <Link href="/admin/projects/new" style={{
              background: 'var(--teal)', color: '#0a0a0f',
              padding: '0.7rem 1.5rem', borderRadius: '8px',
              textDecoration: 'none', fontFamily: 'Syne, sans-serif', fontWeight: 700,
            }}>+ Add First Project</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {projects.map(project => (
              <div key={project.id} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '12px', padding: '1.2rem',
                display: 'flex', alignItems: 'center', gap: '1.2rem',
              }}>
                {/* Image preview */}
                <div style={{
                  width: '80px', height: '55px', borderRadius: '8px',
                  background: 'var(--bg3)', flexShrink: 0, overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {project.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: 'var(--teal)', opacity: 0.3, fontSize: '1.2rem' }}>◈</span>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>{project.title}</span>
                    {project.featured && (
                      <span style={{
                        background: 'var(--teal)', color: '#0a0a0f',
                        fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Syne, sans-serif',
                        padding: '0.1rem 0.5rem', borderRadius: '100px',
                      }}>Featured</span>
                    )}
                    {!project.published && (
                      <span style={{
                        background: 'var(--amber-dim)', color: 'var(--amber)',
                        border: '1px solid rgba(255,179,71,0.2)',
                        fontSize: '0.65rem', fontWeight: 700, fontFamily: 'Syne, sans-serif',
                        padding: '0.1rem 0.5rem', borderRadius: '100px',
                      }}>Draft</span>
                    )}
                  </div>
                  <div style={{ color: 'var(--text3)', fontSize: '0.78rem' }}>{project.category} · {project.techStack.join(', ')}</div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                      color: 'var(--text3)', fontSize: '0.78rem', textDecoration: 'none',
                      padding: '0.4rem 0.8rem', border: '1px solid var(--border)', borderRadius: '6px',
                    }}>↗ Live</a>
                  )}
                  <Link href={`/admin/projects/edit?id=${project.id}`} style={{
                    color: 'var(--teal)', fontSize: '0.78rem', textDecoration: 'none',
                    padding: '0.4rem 0.8rem', border: '1px solid rgba(0,229,195,0.2)', borderRadius: '6px',
                    fontFamily: 'Syne, sans-serif', fontWeight: 600,
                  }}>Edit</Link>
                  <DeleteButton id={project.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

