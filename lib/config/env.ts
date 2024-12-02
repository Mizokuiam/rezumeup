const getEnvVar = (key: string): string => {
  if (typeof window === 'undefined') {
    return process.env[key] || '';
  }
  return process.env[`NEXT_PUBLIC_${key}`] || '';
};

const isServer = typeof window === 'undefined';

export const env = {
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  },
  openai: {
    apiKey: isServer ? process.env.OPENAI_API_KEY : '',
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  },
  google: {
    clientId: getEnvVar('NEXT_PUBLIC_GOOGLE_CLIENT_ID'),
    clientSecret: isServer ? process.env.GOOGLE_CLIENT_SECRET : '',
  },
  payment: {
    merchantCode: getEnvVar('NEXT_PUBLIC_2CHECKOUT_MERCHANT_CODE'),
    secretKey: getEnvVar('NEXT_PUBLIC_2CHECKOUT_SECRET_KEY'),
    publishableKey: getEnvVar('NEXT_PUBLIC_2CHECKOUT_PUBLISHABLE_KEY'),
  }
} as const;