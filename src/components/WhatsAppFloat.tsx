// ✏️ Replace with your real WhatsApp number
const WHATSAPP_NUMBER = '09074399728'

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      className="wa-float-hover"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 99,
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 30px rgba(37,211,102,0.4)',
        cursor: 'pointer',
        fontSize: '1.5rem',
        transition: 'all 0.2s',
        textDecoration: 'none',
      }}
    >
      💬
      <style>{`
        .wa-float-hover:hover {
          transform: scale(1.1) rotate(-5deg);
        }
      `}</style>
    </a>
  )
}

