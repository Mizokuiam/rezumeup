"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { verifyEmail } from "@/lib/supabase/auth"
import { toast } from "sonner"

interface VerificationFormProps {
  email: string
  onBack: () => void
}

export function VerificationForm({ email, onBack }: VerificationFormProps) {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await verifyEmail(email, code)
      toast.success("Email verified successfully")
    } catch (error) {
      toast.error("Invalid verification code")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Verify Your Email</h2>
        <p className="text-sm text-muted-foreground mt-1">
          We've sent a verification code to {email}
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="text-center text-lg tracking-widest"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify Email"}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="w-full"
        >
          Back to Sign Up
        </Button>
      </form>
    </div>
  )
}