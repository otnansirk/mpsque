import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('_Access_Token')
    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }
  }
}
