import WhatsAppIcon from './WhatsAppIcon'

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
        bottom: '1.75rem',
        right: '1.75rem',
        zIndex: 99,
        width: '58px',
        height: '58px',
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 30px rgba(37,211,102,0.4)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        textDecoration: 'none',
        color: '#0a0a0f',
      }}
    >
      <WhatsAppIcon size={28} />
      <style>{`
        .wa-float-hover:hover {
          transform: scale(1.08) rotate(-4deg);
          box-shadow: 0 12px 36px rgba(37,211,102,0.48);
        }
      `}</style>
    </a>
  )
}
