import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { authConfig } from '@/lib/config/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const next = requestUrl.searchParams.get('next') || authConfig.urls.defaultRedirect

    if (code) {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ 
        cookies: () => cookieStore 
      })
      
      await supabase.auth.exchangeCodeForSession(code)

      // Validate redirect URL
      const redirectUrl = authConfig.urls.allowedRedirects.includes(next) 
        ? next 
        : authConfig.urls.defaultRedirect

      return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
    }

    return NextResponse.redirect(new URL('/auth', requestUrl.origin))
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(
      new URL('/auth?error=callback_failed', new URL(request.url).origin)
    )
  }
}