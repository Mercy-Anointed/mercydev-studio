"use client";
const skills = [
  { label: 'Next.js', amber: false },
  { label: 'TypeScript', amber: false },
  { label: 'React', amber: false },
  { label: 'Node.js', amber: false },
  { label: 'PostgreSQL', amber: false },
  { label: 'Prisma', amber: false },
  { label: 'Figma', amber: true },
  { label: 'UI Design', amber: true },
  { label: 'Branding', amber: true },
  { label: 'TailwindCSS', amber: false },
  { label: 'REST APIs', amber: false },
  { label: 'Framer', amber: true },
]

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: '6rem 2rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <span className="section-tag">About me</span>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            marginTop: '4rem',
          }}
          className="about-grid"
        >
          {/* Left — image placeholder */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '100%',
              aspectRatio: '4/5',
              background: 'var(--surface)',
              borderRadius: '14px',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Replace this div with an <Image /> component when you have a photo */}
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '4.6rem',
                fontWeight: 800,
                color: 'var(--teal)',
                opacity: 0.15,
              }}>
                MDS
              </div>

              {/* Label badge */}
              <div style={{
                position: 'absolute',
                bottom: '1.2rem',
                left: '1.2rem',
                background: 'rgba(10,10,15,0.9)',
                border: '1px solid var(--border2)',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
              }}>
                Lagos, Nigeria &nbsp;|&nbsp; <span style={{ color: 'var(--teal)' }}>Open to remote</span>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}>
              Passionate builder,<br />warm human.
            </h2>

            <p style={{ color: 'var(--text2)', fontWeight: 400, lineHeight: 1.75, marginBottom: '1rem' }}>
              I&apos;m a fullstack developer based in Lagos with a love for building things that feel just right. Not just functional — but genuinely enjoyable to use.
            </p>

            <p style={{ color: 'var(--text2)', fontWeight: 400, lineHeight: 1.75, marginBottom: '1.5rem' }}>
              From small business websites to complex web apps, I bring both technical precision and creative energy to every project. When I&apos;m not coding, I&apos;m probably thinking about better ways to do it.
            </p>

            {/* Skills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map(skill => (
                <span key={skill.label} className={skill.amber ? 'skill-pill-amber' : 'skill-pill'}>
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
