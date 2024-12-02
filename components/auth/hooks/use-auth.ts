"use client"

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { signInWithEmail, signUpWithEmail, signInWithGoogle, AuthError } from '@/lib/supabase/auth'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleError = useCallback((error: unknown) => {
    if (error instanceof AuthError) {
      switch (error.code) {
        case 'invalid_credentials':
          router.push('/auth?error=invalid_credentials')
          break
        case 'email_not_confirmed':
          router.push('/auth?error=email_not_verified')
          break
        default:
          toast.error(error.message)
      }
    } else {
      toast.error('An unexpected error occurred')
    }
  }, [router])

  const handleEmailSignIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await signInWithEmail(email, password)
      router.push('/dashboard')
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignUp = async (email: string, password: string, fullName: string) => {
    setLoading(true)
    try {
      const { user } = await signUpWithEmail(email, password, fullName)
      if (!user?.identities?.length) {
        router.push('/auth?error=email_exists')
        return
      }
      router.push('/auth/verify')
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
      // Redirect handled by Supabase OAuth flow
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    handleEmailSignIn,
    handleEmailSignUp,
    handleGoogleSignIn
  }
}