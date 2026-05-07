# Booky

**A full-featured library management app built with the modern React stack.**

🌐 **[Live Demo → booky-app-by-gio.vercel.app](https://booky-app-by-gio.vercel.app/)**

Two roles, one polished experience: members browse and borrow books while admins manage everything — all behind a clean, animated UI with zero compromise on code quality.

---

## What it does

### For Members
- Browse the full catalog, filter by category or author
- Add books to cart, review due dates, and borrow in one flow
- Track active loans, return dates, and history from a personal profile
- Full-text search across the catalog

### For Admins
- Monitor all active loans across every member
- Track overdue books with live status badges (Borrowed / Late / Returned)
- Manage the full book catalog — add, edit, or remove entries via a unified form
- View and manage registered members

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| UI Primitives | shadcn/ui (New York) + Radix UI |
| Client State | Redux Toolkit (auth only) |
| Server State | TanStack React Query |
| Routing | React Router v7 |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Animations | Framer Motion |
| Notifications | Sonner |

---

## Under the Hood

This project is over-engineered in the best way:

- **Fully typed API layer** — `apiGet/Post/Put/Patch/Delete<T>` helpers wrap every call; zero `any` types across 14 hook files
- **Smart state split** — Redux only holds the auth token; everything else (books, loans, cart) lives in TanStack Query with per-domain stale times
- **Route-level code splitting** — every page is a separate JS chunk via `React.lazy` + `Suspense`, with a `PageLoader` fallback
- **Error Boundary** — full-app boundary with friendly recovery UI (Try Again + Refresh)
- **Skeleton loading** — animated `BookCardSkeleton` and `LoanCardSkeleton` replace all raw `animate-pulse` blobs
- **Consistent empty states** — `EmptyState` component with icon + title + description replaces bare text everywhere
- **Admin Dashboard decomposed** — was 464 lines; now 47 lines orchestrating 7 focused components
- **Framer Motion throughout** — shared `fadeUp` variants with per-section delays on pages; `AnimatePresence` + scale/opacity on modals; `whileHover`/`whileTap` on cards

---

## Getting Started

```bash
git clone https://github.com/bagusgiovani-sys/Booky-App.git
cd Booky-App/library-app-booky

npm install
```

Create a `.env` file:

```
VITE_API_BASE_URL=<your backend URL>
```

```bash
npm run dev   # http://localhost:8080
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

---

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@library.local | admin 123 |
| Member | Register your own account on the app | — |

---

## Project Structure

```
src/
├── components/
│   ├── ui/         # shadcn/ui primitives
│   ├── common/     # BookCard, Pagination, SearchBar, EmptyState, Skeletons
│   ├── layout/     # UserLayout, AdminLayout, AuthLayout
│   ├── user/       # Member-facing feature components
│   └── admin/      # Admin dashboard components
├── hooks/          # One hook file per API domain; admin/ subdirectory
├── pages/          # Route-level pages (all lazy-loaded)
├── store/          # Redux store — authSlice only
├── services/       # Axios instance with auto-auth + 401 logout
├── constants/      # endpoints.ts, queryKeys.ts, routes.ts
└── types/          # Domain types + ApiResponse<T> generics
```
