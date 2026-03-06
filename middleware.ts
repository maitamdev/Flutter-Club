import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/', '/login', '/signup', '/forgot-password', '/request-access', '/admin']
const authPaths = ['/login', '/signup', '/forgot-password', '/request-access', '/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // Allow public paths and API routes
  if (publicPaths.some(p => pathname === p) || pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
}
