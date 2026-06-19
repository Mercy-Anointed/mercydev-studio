import { db } from '@/lib/db'

export default async function Portfolio() {
  let projects: Awaited<ReturnType<typeof db.project.findMany>> = []
  let loadError = false

  try {
    projects = await db.project.findMany({
      where: { published: true },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      take: 6,
    })
  } catch (error) {
    loadError = true
    console.error('Failed to load portfolio projects', error)
  }

  return (
    <section id="portfolio" style={{ padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <span className="section-tag">Portfolio</span>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: '1rem',
        }}>
          Things I&apos;ve built.
        </h2>
        <p style={{ color: 'var(--text2)', maxWidth: '560px', fontSize: '1rem', fontWeight: 300 }}>
          A selection of recent projects - real work for real clients.
        </p>

        {loadError ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '2rem',
            marginTop: '3.5rem',
            color: 'var(--text2)',
          }}>
            The portfolio is temporarily unavailable while the project database is unreachable. Please check back soon.
          </div>
        ) : projects.length === 0 ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '2rem',
            marginTop: '3.5rem',
            color: 'var(--text2)',
          }}>
            Projects added in the admin dashboard will appear here once they are published.
          </div>
        ) : (
          <div
            className="portfolio-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginTop: '3.5rem',
            }}
          >
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tech={project.techStack}
                imageUrl={project.imageUrl}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                featured={project.featured}
              />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a href="#contact" className="btn-secondary">Start a Project</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .portfolio-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function ProjectCard({ title, description, tech, imageUrl, liveUrl, githubUrl, featured }: {
  title: string
  description: string
  tech: string[]
  imageUrl: string
  liveUrl: string | null
  githubUrl: string | null
  featured: boolean
}) {
  return (
    <article
      className="project-card-hover"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.3s',
      }}
    >
      <div style={{
        aspectRatio: '16/10',
        background: 'var(--bg3)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

        {featured && (
          <span style={{
            position: 'absolute',
            top: '0.8rem',
            left: '0.8rem',
            background: 'var(--teal)',
            color: '#0a0a0f',
            fontSize: '0.7rem',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            padding: '0.2rem 0.6rem',
            borderRadius: '999px',
          }}>
            Featured
          </span>
        )}
      </div>

      <div style={{ padding: '1.2rem' }}>
        <h3 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.4rem' }}>{title}</h3>
        <p style={{ color: 'var(--text2)', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.5, marginBottom: '0.8rem' }}>
          {description}
        </p>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {tech.map(t => (
            <span key={t} style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              color: 'var(--text3)',
              fontSize: '0.7rem',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {(liveUrl || githubUrl) && (
        <div style={{
          padding: '0.8rem 1.2rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: '1rem',
        }}>
          {liveUrl && (
            <a href={liveUrl} className="project-link-style" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text3)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500 }}>
              Live demo
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} className="project-link-style" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text3)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500 }}>
              GitHub
            </a>
          )}
        </div>
      )}

      <style>{`
        .project-card-hover:hover {
          transform: translateY(-5px);
          border-color: var(--border2) !important;
        }
        .project-link-style:hover { color: var(--teal) !important; }
      `}</style>
    </article>
  )
}
