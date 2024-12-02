"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "./hooks/use-auth"

export function AuthButton() {
  const { loading, handleGoogleSignIn } = useAuth()

  return (
    <Button 
      onClick={handleGoogleSignIn} 
      variant="outline" 
      className="w-full"
      disabled={loading}
    >
      {loading ? "Connecting..." : "Continue with Google"}
    </Button>
  )
}