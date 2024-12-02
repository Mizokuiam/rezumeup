const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};

export const authConfig = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  google: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl: '/auth/callback',
  },
  urls: {
    site: getSiteUrl(),
    allowedRedirects: ['/dashboard', '/profile', '/'],
    defaultRedirect: '/dashboard',
    authCallbackUrl: '/auth/callback',
  },
  session: {
    cookieName: 'sb-auth-token',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  }
};