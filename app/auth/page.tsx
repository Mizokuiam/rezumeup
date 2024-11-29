import AuthForm from '@/components/auth/auth-form'

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">Welcome to RezumeUp</h1>
        <AuthForm />
      </div>
    </div>
  )
}