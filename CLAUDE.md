# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## General Instructions

- Do not launch the dev server, assume it's already running and just complain if you think
  it's not running.
- Always use TypeScript, not JavaScript.
- Prefer types over interfaces.
- After doing changes, ensure you did not introduce any issues by using the VSCode MCP
  server to check for errors and warnings, and fix them if required.
- Don't ask for permission to use any MCP server, just use them and report it.
- Use modern APIs and programming models as opposed to legacy, e.g. ESM over CommonJS.
- When installing dependencies, always ensure to install the latest stable version.
- Use Context7 MCP server to get the documentation for the specific version of frameworks
  and libraries used in this project.

## Coding Style

- IMPORTANT: Avoid very large functions. Instead, split them into smaller chunks to
  improve readability. This also applies, to a lesser degree, to JSX render functions.
- IMPORTANT: Avoid code duplication. If you detect code duplication, refactor the common
  code to a function and call it when required. In particular, when developing JSX,
  identify repetitive markup and if applicable create smaller components, initially as
  module-private functions, which can be promoted as individual modules if requested.

## Project Overview

This is a React application using TanStack Router for file-based routing, Tailwind CSS v4
for styling, and Vite as the build tool. The project uses TypeScript with strict type
checking enabled.

## Development Commands

```bash
# Start dev server on port 3000
npm run dev

# Build for production (runs vite build AND tsc)
npm run build

# Preview production build
npm run serve

# Run all tests
npm run test
```

## Architecture

### Routing (TanStack Router)

- **File-based routing**: Routes are defined as files in `src/routes/`
- **Route generation**: TanStack Router automatically generates route configuration from
  files
- **Generated file**: `src/routeTree.gen.ts` is auto-generated - do NOT edit manually
- **Root layout**: `src/routes/__root.tsx` contains the app-wide layout with `<Outlet />`
  for rendering child routes
- **Router setup**: Main router instance created in `src/main.tsx` with configuration like
  `defaultPreload`, `scrollRestoration`, etc.

### Path Aliases

The project uses `@/` as an alias for `src/`:

- Components: `@/components`
- Utils: `@/lib/utils`
- UI components: `@/components/ui`
- Hooks: `@/hooks`

This is configured in both `vite.config.ts` and `tsconfig.json`.

### Styling

- **Tailwind CSS v4**: Using the Vite plugin (`@tailwindcss/vite`)
- **Shadcn/ui**: Component library configured with "new-york" style
- **Icon library**: Lucide React
- **Utility function**: `cn()` from `src/lib/utils.ts` for conditional class merging (uses
  `clsx` and `tailwind-merge`)

### Component Installation (Shadcn)

Always use the latest version of Shadcn when adding components:

```bash
pnpx shadcn@latest add button
```

Components are installed to `src/components/ui/` per the configuration in
`components.json`.

### Developer Tools

- **TanStack Devtools**: Configured in `src/routes/__root.tsx`
- **Environment variable**: Controlled by `import.meta.env.TS_TOOLS` - only shows when
  this env var is set
- **Position**: Bottom-right with `openHotkey` configuration available
- **Plugins**: Currently includes TanStack Router devtools panel

### Code Style (Prettier)

The project uses Prettier with these settings:

- No semicolons
- Single quotes
- No tabs (spaces)
- Arrow parens: avoid
- Print width: 90
- Tailwind CSS plugin for class sorting

## Testing

- Framework: Vitest
- Testing Library: @testing-library/react
- Environment: jsdom

## Key Files

- `src/main.tsx`: App entry point, router instance creation, type registration
- `src/routes/__root.tsx`: Root layout with header and outlet
- `src/components/Header.tsx`: Slide-out navigation component
- `vite.config.ts`: Vite configuration with TanStack Router plugin, React, Tailwind, and
  devtools plugins

## Demo Files

Files prefixed with `demo` can be safely deleted - they're for demonstration purposes
only.
