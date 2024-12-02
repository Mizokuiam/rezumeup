"use client"

import { useSearchParams } from 'next/navigation'

export type AuthError = 
  | 'invalid_credentials'
  | 'callback_failed'
  | 'email_not_verified'
  | null

export function useAuthError(): { 
  error: AuthError
  errorMessage: string 
} {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') as AuthError

  const errorMessages: Record<NonNullable<AuthError>, string> = {
    invalid_credentials: 'Invalid email or password. Please try again.',
    callback_failed: 'Authentication failed. Please try again.',
    email_not_verified: 'Please verify your email address to continue.',
  }

  return {
    error,
    errorMessage: error ? errorMessages[error] : '',
  }
}