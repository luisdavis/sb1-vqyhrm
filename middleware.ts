import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    // '/dashboard/:path*',
    // '/brokers/:path*',
    // '/statistics/:path*',
    // '/strategies/:path*',
    // '/accounts/:path*',
    // '/alerts/:path*',
    // '/settings/:path*',
    // '/notifications/:path*',
  ],
};