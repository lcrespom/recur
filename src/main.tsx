import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
// Import authentication utilities
import { initAuth, isSignedIn } from './lib/auth'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// Define router context type
export type RouterContext = {
  auth: {
    isSignedIn: () => boolean
  }
}

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: {
      isSignedIn,
    },
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Initialize auth and render the app
async function main() {
  await initAuth()
  // Render the app
  const rootElement = document.getElementById('app')
  if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    )
  }
}

main()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
