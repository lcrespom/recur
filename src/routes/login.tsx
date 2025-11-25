import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { FormGroup } from '@/components/FormGroup'
import { Button } from '@/components/ui/button'

type LoginSearch = {
  redirect?: string
}

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  component: Login,
})

function Login() {
  const navigate = useNavigate()
  const search = Route.useSearch()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const authError = await login(email, password)

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    // Validate redirect URL to prevent open redirect attacks
    const redirectTo = getValidRedirectUrl(search.redirect)
    navigate({ to: redirectTo })
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">Sign In</h1>

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
            autoComplete="current-password"
          />

          {error && <div className="text-sm text-red-600">{error}</div>}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link
            to="/signup"
            search={{ redirect: search.redirect }}
            className="text-blue-600 hover:underline"
          >
            Sign Up
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
