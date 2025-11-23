import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: Profile,
})

function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  async function handleLogout() {
    await logout()
    navigate({ to: '/login' })
  }

  return (
    <div className="px-4">
      <h1>Profile</h1>

      {user && (
        <div className="mb-6">
          <p className="text-sm text-gray-600">Signed in as:</p>
          <p className="font-medium">{user.email}</p>
        </div>
      )}

      <Button onClick={handleLogout} variant="destructive">
        Sign Out
      </Button>
    </div>
  )
}
