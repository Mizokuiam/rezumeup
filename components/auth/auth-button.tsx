"use client"

import { Button } from "@/components/ui/button"
import { signInWithGoogle } from "@/lib/supabase/auth"
import { toast } from "sonner"

export function AuthButton() {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      toast.error("Failed to sign in with Google")
    }
  }

  return (
    <Button onClick={handleSignIn} variant="outline" className="w-full">
      Continue with Google
    </Button>
  )
}