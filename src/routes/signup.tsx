import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth, isSignedIn } from '@/lib/auth'
import { FormGroup } from '@/components/FormGroup'
import { Button } from '@/components/ui/button'

type SignupSearch = {
  redirect?: string
}

export const Route = createFileRoute('/signup')({
  validateSearch: (search: Record<string, unknown>): SignupSearch => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  component: Signup,
})

function Signup() {
  const navigate = useNavigate()
  const search = Route.useSearch()
  const { signup } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    const authError = await signup(email, password)

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    // Check if user is signed in (has session)
    // If not, email confirmation is required
    if (!isSignedIn()) {
      setShowConfirmation(true)
      setIsLoading(false)
      return
    }

    // Validate redirect URL to prevent open redirect attacks
    const redirectTo = getValidRedirectUrl(search.redirect)
    navigate({ to: redirectTo })
  }

  if (showConfirmation) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <h1 className="mb-4 text-2xl font-bold">Check your email</h1>
          <p className="mb-4 text-gray-600">
            We've sent a confirmation link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Click the link in the email to activate your account, then{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              sign in
            </Link>
            .
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGroup
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            required
            autoComplete="email"
          />

          <FormGroup
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            required
            autoComplete="new-password"
          />

          <FormGroup
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            required
            autoComplete="new-password"
          />

          {error && <div className="text-sm text-red-600">{error}</div>}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            search={{ redirect: search.redirect }}
            className="text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

// Validate redirect URL to prevent open redirect attacks
function getValidRedirectUrl(redirect: string | undefined): string {
  if (!redirect) {
    return '/'
  }

  // Only allow relative paths starting with /
  if (redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect
  }

  return '/'
}
