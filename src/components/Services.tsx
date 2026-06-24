// ✏️ Edit this array to update your services
const services = [
  {
    icon: '🌐',
    title: 'Website Development',
    description: 'Fast, responsive, SEO-ready websites that represent your brand and convert visitors into clients.',
    price: 'From ₦150,000',
  },
  {
    icon: '⚡',
    title: 'Fullstack Web Apps',
    description: 'Complex platforms with databases, authentication, real-time features, and clean APIs.',
    price: 'Custom quote',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Beautiful, user-centered interfaces that feel intuitive and build trust with your audience.',
    price: 'Custom quote',
  },
  {
    icon: '✦',
    title: 'Brand Design',
    description: 'Logo, colors, typography, and visual identity — everything you need to look professional.',
    price: 'Custom quote',
  },
  {
    icon: '🎨',
    title: 'Graphic Design',
    description: 'Posters, social media graphics, flyers, banners, and polished visual content for your brand.',
    price: 'Custom quote',
  },
  {
    icon: '📱',
    title: 'Landing Pages',
    description: 'High-converting landing pages designed specifically to capture leads and drive action.',
    price: 'From ₦80,000',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      style={{ padding: '6rem 2rem', background: 'var(--bg2)' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <span className="section-tag">What I do</span>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          marginBottom: '1rem',
        }}>
          Services built<br />for real results.
        </h2>
        <p style={{ color: 'var(--text2)', maxWidth: '560px', fontSize: '1rem', fontWeight: 400, lineHeight: 1.75 }}>
          Whether you need a landing page or a full-blown platform, I&apos;ve got you covered end-to-end.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginTop: '3.5rem',
          }}
          className="services-grid"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function ServiceCard({ index, icon, title, description, price }: {
  index: number
  icon: string
  title: string
  description: string
  price: string
}) {
  return (
    <div
      className="service-card-hover motion-card"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '1.8rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s',
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '10px',
        background: 'var(--teal-dim)',
        border: '1px solid rgba(0,229,195,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.3rem',
        marginBottom: '1.2rem',
      }}>
        {icon}
      </div>

      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{title}</h3>
      <p style={{ color: 'var(--text2)', fontSize: '0.92rem', fontWeight: 400, lineHeight: 1.65 }}>{description}</p>
      <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--teal)', fontWeight: 600 }}>
        → {price}
      </div>

      <style>{`
        .service-card-hover:hover {
          border-color: rgba(0,229,195,0.3) !important;
        }
      `}</style>
    </div>
  )
}
