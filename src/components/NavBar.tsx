import { Link } from '@tanstack/react-router'
import { User } from 'lucide-react'

type Route = {
  path: string
  label: string
}

type NavBarProps = {
  title: string
  routes: Route[]
  profile: string
}

export function NavBar({ title, routes, profile }: NavBarProps) {
  return (
    <nav className="flex items-center justify-between bg-blue-800 px-6 py-2 text-white shadow-lg">
      {/* Left: Title */}
      <div className="shrink-0">
        <Link to="/" className="text-xl font-semibold transition-colors">
          {title}
        </Link>
      </div>

      {/* Center: Route Links */}
      <div className="flex items-center gap-6">
        {routes.map(route => (
          <Link
            key={route.path}
            to={route.path}
            className="rounded-md px-3 py-2 font-medium transition-colors"
            activeProps={{ className: 'bg-blue-500 hover:bg-blue-500' }}
            inactiveProps={{ className: 'hover:bg-blue-600' }}
          >
            {route.label}
          </Link>
        ))}
      </div>

      {/* Right: Profile Icon */}
      <div className="shrink-0">
        <Link
          to={profile}
          className="inline-block rounded-full p-2 transition-colors"
          activeProps={{ className: 'bg-blue-500 hover:bg-blue-500' }}
          inactiveProps={{ className: 'hover:bg-blue-600' }}
          aria-label="User profile"
        >
          <User size={24} />
        </Link>
      </div>
    </nav>
  )
}
