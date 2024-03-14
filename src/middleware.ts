import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

export function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get('Cookie') || '');
  const tokenCookie = cookies.token;
  const user = JSON.parse(tokenCookie || '{}') || {};

  if (!tokenCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/history/:path*', '/request/:path*', '/setting/:path*'],
};
