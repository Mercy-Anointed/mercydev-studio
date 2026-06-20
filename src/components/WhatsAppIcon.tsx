type WhatsAppIconProps = {
  className?: string
  size?: number
}

export default function WhatsAppIcon({ className, size = 24 }: WhatsAppIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5 11.8c0 4.7-3.9 8.5-8.7 8.5-1.5 0-2.9-.4-4.1-1.1L3.5 20l.8-4c-.8-1.2-1.3-2.6-1.3-4.1 0-4.7 3.9-8.5 8.7-8.5 4.8 0 8.8 3.8 8.8 8.4Z"
        fill="currentColor"
      />
      <path
        d="M15.8 14.7c-.2.6-1.1 1.1-1.6 1.2-.4.1-.9.1-1.5-.1-.4-.1-.9-.3-1.6-.6-2.7-1.2-4.4-3.9-4.6-4.1-.2-.2-1.1-1.4-1.1-2.6 0-1.2.6-1.8.9-2 .2-.2.5-.2.7-.2h.5c.2 0 .4-.1.6.4.2.5.7 1.7.8 1.8.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.1.1-.2.3-.1.5.1.2.6 1 1.3 1.6.8.7 1.4.9 1.6 1 .2.1.4.1.6-.1.2-.2.8-.9 1-.1.2.8.2 1 .2 1.1Z"
        fill="#0a0a0f"
      />
    </svg>
  )
}
