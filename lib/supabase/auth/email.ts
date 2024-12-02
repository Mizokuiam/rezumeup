import { supabase } from '../client'
import { AuthError } from './errors'
import { authConfig } from '@/lib/config/auth'

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw AuthError.fromSupabaseError(error)
  return data
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${authConfig.urls.site}${authConfig.urls.authCallbackUrl}`,
    },
  })

  if (error) throw AuthError.fromSupabaseError(error)
  return data
}

export async function verifyEmail(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup',
  })

  if (error) throw AuthError.fromSupabaseError(error)
  return data
}