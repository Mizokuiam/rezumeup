"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { SignInForm } from "./sign-in-form"
import { SignUpForm } from "./sign-up-form"
import { VerificationForm } from "./verification-form"

type AuthMode = "signin" | "signup" | "verify"

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin")
  const [email, setEmail] = useState("")

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      {mode === "verify" ? (
        <VerificationForm email={email} onBack={() => setMode("signup")} />
      ) : mode === "signin" ? (
        <SignInForm
          onModeChange={() => setMode("signup")}
        />
      ) : (
        <SignUpForm
          onModeChange={() => setMode("signin")}
          onSignUp={(email) => {
            setEmail(email)
            setMode("verify")
          }}
        />
      )}
    </Card>
  )
}