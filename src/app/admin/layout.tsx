import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Admin — Mercy Dev Studio',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
