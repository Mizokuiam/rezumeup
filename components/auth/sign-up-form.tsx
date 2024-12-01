"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInWithGoogle, signUpWithEmail } from "@/lib/supabase/auth"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

interface SignUpFormProps {
  onModeChange: () => void
  onSignUp: (email: string) => void
}

interface SignUpData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export function SignUpForm({ onModeChange, onSignUp }: SignUpFormProps) {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpData>()
  const password = watch("password")

  const handleEmailSignUp = async (data: SignUpData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      await signUpWithEmail(data.email, data.password, data.fullName)
      onSignUp(data.email)
      toast.success("Verification email sent")
    } catch (error) {
      toast.error("Failed to sign up")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Create an Account</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your details to create your account
        </p>
      </div>

      <form onSubmit={handleSubmit(handleEmailSignUp)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            {...register("fullName", { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: value => value === password || "Passwords do not match"
            })}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={signInWithGoogle}
        className="w-full"
      >
        Continue with Google
      </Button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <button
          onClick={onModeChange}
          className="text-primary hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  )
}