# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Booky is a library management web app built with React + TypeScript + Vite. The actual app lives in `library-app-booky/`.

## Commands

All commands run from inside `library-app-booky/`:

```bash
npm run dev        # Start dev server
npm run build      # Type-check + Vite build
npm run lint       # ESLint
npm run preview    # Preview production build
```

To add a shadcn/ui component: `npx shadcn@latest add <component>`

## Environment

Requires a `.env` file with:
```
VITE_API_BASE_URL=<backend URL>
```

## Architecture

### State management split

Two layers handle state:
- **Redux** (`src/store/`) — auth session (`authSlice`), cart item count (`cartSlice`), and ephemeral UI state like search query and active tab (`uiSlice`). Auth token and user object are persisted to `localStorage`.
- **TanStack Query** — all server data (books, authors, categories, loans, reviews, admin data). Custom hooks in `src/hooks/` wrap queries and mutations.

### Data fetching pattern

Every API domain has a dedicated hook file in `src/hooks/` (e.g., `useBooks.ts`, `useLoans.ts`). These hooks use constants from `src/constants/index.ts` for both endpoint paths (`ENDPOINTS`) and query cache keys (`QUERY_KEYS`). The Axios instance in `src/services/api.ts` auto-attaches the Bearer token from Redux and dispatches `logout()` on 401 responses.

### Route structure

`src/routes/index.tsx` is the entry point. It splits into:
- `AdminRoutes` — protected by `role === 'ADMIN'` check; wraps pages in `AdminLayout`
- `UserRoutes` — protected by token presence; wraps pages in `UserLayout`
- Auth pages (`/login`, `/register`) are public

### Component organization

```
src/components/
  ui/         # shadcn/ui primitives (don't edit manually)
  common/     # shared app components (BookCard, Pagination, SearchBar, Toast)
  layout/     # layout shells (UserLayout, AdminLayout, AuthLayout)
  user/       # user-facing feature components
  admin/      # admin-specific components
```

### Path aliases

`@/` maps to `src/`. All internal imports use this alias.

### Styling

Tailwind CSS v4 via `@tailwindcss/vite`. shadcn/ui uses the `new-york` style with CSS variables and `neutral` base color. The `cn()` utility in `src/lib/utils.ts` merges class names (`clsx` + `tailwind-merge`).
