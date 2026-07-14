import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = [
  '/',
  '/api/auth/gate',
  '/api/health',
];

const BLOCKED_PATTERNS = [
  '/_next/static',
  '/public',
  '.json',
  '.js.map',
  '.css.map',
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Block common reconnaissance requests
  if (BLOCKED_PATTERNS.some((pattern) => pathname.includes(pattern))) {
    return NextResponse.next();
  }

  // Forensic report routes — require dgt.forensic cookie
  if (pathname === '/cedar-bound/report' || pathname === '/based_joey/report') {
    const hasForensicAuth = request.cookies.get('dgt.forensic')?.value === 'authorized';
    if (!hasForensicAuth) {
      const gate = pathname.startsWith('/cedar-bound') ? '/cedar-bound' : '/based_joey';
      return NextResponse.redirect(new URL(gate, request.url));
    }
    return NextResponse.next();
  }

  // Forensic gate pages — always public
  if (pathname === '/cedar-bound' || pathname === '/based_joey') {
    return NextResponse.next();
  }

  // Other public routes
  if (pathname === '/' || pathname.startsWith('/api/auth') || pathname.startsWith('/forensics')) {
    return NextResponse.next();
  }

  const hasAuth = request.cookies.get('dgt.auth')?.value === 'authorized';

  if (!hasAuth) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth/gate (public auth endpoint)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
