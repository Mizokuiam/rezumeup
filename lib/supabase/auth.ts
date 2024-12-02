import { supabase } from './client'

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      scopes: 'email profile',
    }
  })
  
  if (error) {
    console.error('Google sign in error:', error)
    throw new AuthError(
      error.message,
      error.code || 'unknown',
      error.status || 500
    )
  }
  return data
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new AuthError(error.message, error.code || 'unknown', error.status || 500)
  }
  return data
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    throw new AuthError(error.message, error.code || 'unknown', error.status || 500)
  }
  return data
}

export async function verifyEmail(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup',
  })

  if (error) {
    throw new AuthError(error.message, error.code || 'unknown', error.status || 500)
  }
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new AuthError(error.message, error.code || 'unknown', error.status || 500)
  }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    throw new AuthError(error.message, error.code || 'unknown', error.status || 500)
  }
  return user
}