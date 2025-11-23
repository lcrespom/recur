import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  Outlet,
  createRootRouteWithContext,
  redirect,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import Header from '@/components/Header'
import type { RouterContext } from '@/main'

// Routes that don't require authentication
const publicRoutes = ['/login', '/signup']

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: ({ context, location }) => {
    // Skip auth check for public routes
    if (publicRoutes.includes(location.pathname)) {
      return
    }

    // Redirect to login if not authenticated
    if (!context.auth.isSignedIn()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: RootComponent,
})

function RootComponent() {
  const location = useLocation()
  const isAuthPage = publicRoutes.includes(location.pathname)
  return (
    <>
      {!isAuthPage && <Header />}
      <Outlet />
      {import.meta.env.TS_TOOLS && ( // Enable devtools only if TS_TOOLS env var is set
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      )}
    </>
  )
}
