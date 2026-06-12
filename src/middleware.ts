import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = req.nextUrl.pathname === '/admin/login'

    // If trying to access admin but not an ADMIN role → redirect to login
    if (isAdminRoute && !isLoginPage && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    // If already logged in and visiting login page → redirect to dashboard
    if (isLoginPage && token?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      // Allow middleware to run even if not authenticated
      authorized: () => true,
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}