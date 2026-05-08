import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'fallback-secret-key-change-in-production'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin_session')?.value;

  // Check if accessing admin dashboard or admin routes (except login)
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isLoginRoute = pathname === '/admin/login';

  // Verify session if token exists
  let isValidSession = false;
  if (token) {
    try {
      await jwtVerify(token, SECRET_KEY);
      isValidSession = true;
    } catch {
      // Invalid token, clear cookie and continue
      const response = NextResponse.next();
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // Redirect to login if accessing admin routes without valid session
  if (isAdminRoute && !isValidSession) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing login page with valid session
  if (isLoginRoute && isValidSession) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};