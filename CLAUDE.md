# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Booky is a library management web app built with React + TypeScript + Vite. The actual app lives in `library-app-booky/`.

## Commands

All commands run from inside `library-app-booky/`:

```bash
npm run dev        # Start dev server (port 8080)
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
- **Redux** (`src/store/`) — only `authSlice` remains: stores token + User object, persisted to localStorage. It is the only slice.
- **TanStack Query** — all server data including cart. QueryClient is configured with `retry: 1` and `staleTime: 5 minutes` globally. Admin loans use `staleTime: 0, gcTime: 0` to always re-fetch.

### Data fetching pattern

Every API domain has a dedicated hook file in `src/hooks/` (e.g., `useBooks.ts`, `useLoans.ts`). Admin hooks live in `src/hooks/admin/` and re-export through `src/hooks/useAdmin.ts`. Hooks use `ENDPOINTS` and `QUERY_KEYS` from `src/constants/` (split into `endpoints.ts`, `queryKeys.ts`, `routes.ts`). The Axios instance in `src/services/api.ts` auto-attaches the Bearer token from Redux and dispatches `logout()` on 401.

### API response shape

Most list endpoints return `{ data: { items/books/categories/..., page, limit, total, totalPages } }`. The hook's `select` callback unwraps this: `(data) => data.data.books`. Single-resource endpoints return `{ data: <resource> }`, accessed via `bookData?.data`. The `PaginatedResponse<T>` generic in `src/types/api.ts` models the list shape.

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

### Type files

All domain types live in `src/types/`. Key interfaces:
- `Book` — includes optional `author`, `category`, `reviews` (populated on detail endpoint only)
- `Loan` — status is `'BORROWED' | 'LATE' | 'RETURNED'`; admin mutations use `AdminCreateLoanPayload`
- `PaginatedResponse<T>` / `ApiError` in `api.ts`
- Mutation payloads are co-located with their domain type file (e.g., `CreateBookPayload` in `book.ts`)

### Animation pattern

Framer Motion is used throughout. Pages use a shared `fadeUp` variants object with `custom` delay per section. Modals use `AnimatePresence` + scale/opacity. Interactive cards use `whileHover` / `whileTap`.

### Path aliases

`@/` maps to `src/`. All internal imports use this alias.

### Styling

Tailwind CSS v4 via `@tailwindcss/vite`. shadcn/ui uses the `new-york` style with CSS variables and `neutral` base color. The `cn()` utility in `src/lib/utils.ts` merges class names (`clsx` + `tailwind-merge`).

## Session Management

When daily usage approaches ~90%+, before ending the session:
1. Update `library-app-booky/progress.md` — move completed items to Done, add anything discovered to Up Next, and append a brief session summary at the bottom.
2. Commit and push the updated `progress.md`.
3. Then end the session.
4. When user says "continue the project" or something similar, then check progress.md to see what's next
