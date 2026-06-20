export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '8rem 2rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <div className="hero-grid-bg" />

      {/* Glow effects */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(0,229,195,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(255,179,71,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Inner grid */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '4rem', alignItems: 'center', width: '100%',
        position: 'relative', zIndex: 1,
      }} className="hero-inner-grid">

        {/* Left — text */}
        <div>
          {/* Badge */}
          <div
            className="animate-fade-up delay-100"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--teal-dim)',
              border: '1px solid rgba(0,229,195,0.2)',
              padding: '0.4rem 0.9rem', borderRadius: '100px',
              fontSize: '0.78rem', color: 'var(--teal)', fontWeight: 600,
              fontFamily: 'Space Grotesk, sans-serif',
              marginBottom: '1.5rem',
            }}
          >
            <span
              className="pulse-dot"
              style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--teal)' }}
            />
            Available for new projects
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up delay-200"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 4.4rem)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.05em', marginBottom: '1.5rem' }}
          >
            I build things
            <br />
            <span style={{ color: 'var(--teal)', display: 'block' }}>people love</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, var(--text) 0%, var(--text3) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              to use.
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="animate-fade-up delay-300"
            style={{ color: 'var(--text2)', fontSize: '1rem', maxWidth: '520px', marginBottom: '2.5rem', fontWeight: 400, lineHeight: 1.75 }}
          >
            Fullstack developer &amp; digital craftsperson. I turn your ideas into fast, beautiful web experiences that actually convert.
          </p>

          {/* Buttons */}
          <div
            className="animate-fade-up delay-400"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a href="#portfolio" className="btn-primary">See My Work</a>
            <a href="#contact" className="btn-secondary">Hire Me</a>
            <a href="https://wa.me/2349074399728" className="btn-ghost">WhatsApp</a>
          </div>
        </div>

        {/* Right — code card */}
        <div
          className="animate-fade-up delay-500 hero-code-card"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Window bar */}
          <div style={{
            background: 'var(--bg3)',
            padding: '0.7rem 1rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
            <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--text3)', fontFamily: 'Inter, sans-serif' }}>
              <span style={{ color: 'var(--teal)', fontWeight: 500 }}>mercy-dev</span>/studio.ts
            </span>
          </div>

          {/* Code */}
          <div style={{ padding: '1.5rem', fontFamily: 'Inter, monospace', fontSize: '0.84rem', lineHeight: 1.9 }}>
            {[
              { c: '#546e7a', t: '// who I am', italic: true },
              { t: <><span style={{ color: '#c792ea' }}>const</span> <span style={{ color: '#82aaff' }}>developer</span> = {'{'}</> },
              { t: <>&nbsp;&nbsp;name: <span style={{ color: 'var(--teal)' }}>&quot;Mercy Dev Studio&quot;</span>,</> },
              { t: <>&nbsp;&nbsp;role: <span style={{ color: 'var(--teal)' }}>&quot;Fullstack Developer&quot;</span>,</> },
              { t: <>&nbsp;&nbsp;stack: [<span style={{ color: 'var(--teal)' }}>&quot;Next.js&quot;</span>, <span style={{ color: 'var(--teal)' }}>&quot;TypeScript&quot;</span>,</> },
              { t: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--teal)' }}>&quot;Tailwind&quot;</span>, <span style={{ color: 'var(--teal)' }}>&quot;Node.js&quot;</span>],</> },
              { t: <>&nbsp;&nbsp;passion: <span style={{ color: 'var(--teal)' }}>&quot;clean code + great UX&quot;</span>,</> },
              { t: <>&nbsp;&nbsp;available: <span style={{ color: '#f78c6c' }}>true</span>,</> },
              { t: '};' },
              { t: '\u00a0' },
              { c: '#546e7a', t: '// let\'s build something', italic: true },
              { t: <><span style={{ color: '#82aaff' }}>developer</span>.<span style={{ color: '#82aaff' }}>build</span>(<span style={{ color: 'var(--amber)' }}>yourIdea</span>);<span className="blink-cursor" style={{ display: 'inline-block', width: '2px', height: '1em', background: 'var(--teal)', verticalAlign: 'middle' }} /></> },
            ].map((line, i) => (
              <div key={i} style={{ color: line.c ?? 'var(--text3)', fontStyle: line.italic ? 'italic' : 'normal' }}>
                {line.t as React.ReactNode}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid var(--border)' }}>
            {[['20+', 'Projects'], ['15+', 'Clients'], ['3+', 'Yrs exp']].map(([num, label]) => (
              <div key={label} style={{
                padding: '1rem', textAlign: 'center',
                borderRight: label !== 'Yrs exp' ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.35rem', fontWeight: 800, color: 'var(--teal)' }}>{num}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text3)', marginTop: '0.2rem', letterSpacing: '0.02em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-inner-grid { grid-template-columns: 1fr !important; }
          .hero-code-card { display: none; }
        }
      `}</style>
    </section>
  )
}
