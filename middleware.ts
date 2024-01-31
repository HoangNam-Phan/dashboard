import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get('token')?.value;

  // will be removed, just for admin ease of use
  if (authToken !== '1') {

    if (!authToken && path === '/dashboard') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (authToken) {
      if (path === '/' || path === '/login' || path === '/signup') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

  }
}
