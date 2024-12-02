import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authConfig } from './lib/config/auth';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/resume/:path*',
    '/api/payment/:path*',
    '/auth/callback',
    '/profile/:path*'
  ],
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Protect dashboard and profile routes
    if ((req.nextUrl.pathname.startsWith('/dashboard') || 
         req.nextUrl.pathname.startsWith('/profile')) && 
        !session) {
      const redirectUrl = new URL('/auth', req.url);
      redirectUrl.searchParams.set('next', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Protect API routes
    if (req.nextUrl.pathname.startsWith('/api/') && !session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Validate redirect URLs
    if (req.nextUrl.pathname === '/auth/callback') {
      const redirectTo = req.nextUrl.searchParams.get('next');
      if (redirectTo && !authConfig.urls.allowedRedirects.includes(redirectTo)) {
        return NextResponse.redirect(new URL('/auth', req.url));
      }
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/auth', req.url));
  }
}