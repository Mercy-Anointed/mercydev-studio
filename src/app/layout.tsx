import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mercy Dev Studio | Fullstack Developer & Digital Agency',
  description:
    'Professional fullstack developer based in Port Harcourt. I build fast, beautiful web experiences — websites, apps, and brand design that convert.',
  keywords: ['fullstack developer', 'web developer Nigeria', 'Next.js developer', 'Port Harcourt developer'],
  openGraph: {
    title: 'Mercy Dev Studio',
    description: 'I build things people love to use.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
