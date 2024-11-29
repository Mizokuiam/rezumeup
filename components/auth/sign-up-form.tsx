"use client"

import { Button } from "@/components/ui/button"
import { signInWithGoogle } from "@/lib/supabase/auth"
import { toast } from "sonner"

export function SignUpForm() {
  const handleSignUp = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      toast.error("Failed to sign up with Google")
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleSignUp} variant="outline" className="w-full">
        Sign up with Google
      </Button>
    </div>
  )
}