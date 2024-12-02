import { env } from './env';

export const authConfig = {
  supabase: {
    url: env.supabase.url,
    anonKey: env.supabase.anonKey,
  },
  google: {
    clientId: env.google.clientId,
    clientSecret: env.google.clientSecret,
  },
  urls: {
    site: env.site.url,
    allowedRedirects: ['/dashboard', '/profile', '/'],
    defaultRedirect: '/dashboard',
    authCallbackUrl: '/auth/callback',
  },
  session: {
    cookieName: 'sb-auth-token',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  }
};