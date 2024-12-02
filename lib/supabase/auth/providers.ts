import { supabase } from '../client'
import { AuthError } from './errors'
import { authConfig } from '@/lib/config/auth'

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${authConfig.urls.site}${authConfig.urls.authCallbackUrl}`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      scopes: 'email profile',
    }
  })
  
  if (error) throw AuthError.fromSupabaseError(error)
  return data
}