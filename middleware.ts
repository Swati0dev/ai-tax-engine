import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that do not require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/knowledge-hub',
  '/about',
  '/contact'
];

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const hasSessionToken = req.cookies.has('authjs.session-token') || req.cookies.has('__Secure-authjs.session-token') || req.cookies.has('next-auth.session-token') || req.cookies.has('__Secure-next-auth.session-token');
  const isLoggedIn = !!hasSessionToken;

  // Add security headers to the response
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Note: Strict CSP might break Next.js dev scripts if not careful, 
  // setting a basic one as roadmap item/placeholder for prod.
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:;"
  );

  const isPublicRoute = publicRoutes.some(route => 
    nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
  );

  // If the route is not explicitly public, and the user is not logged in, redirect to login
  if (!isPublicRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  // If user is logged in and trying to access auth pages (login/register), redirect to dashboard
  if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }
  
  return response;
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
