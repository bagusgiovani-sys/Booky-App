# Fixes & Changes Log

Every fix, refactor, and improvement made to this codebase — with file paths.

## Status Legend
- [x] Done
- [ ] Pending

---

## TypeScript & Type Safety

### Eliminate all `any` types
Replaced every `any` annotation with proper domain types across 13 files.

- [x] `src/pages/user/BookDetail.tsx` — `(review: any)` → `Review`, `(b: any)` → `Book`
- [x] `src/pages/user/Home.tsx` — `(cat: any)` → `Category`, `(book: any)` → `Book`, `(author: any)` → `PopularAuthor`
- [x] `src/pages/user/Cart.tsx` — `(item: any)` → `CartItem`
- [x] `src/pages/user/Category.tsx` — `(cat: any)` → `Category`, `(book: any)` → `Book`
- [x] `src/pages/user/Checkout.tsx` — `(item: any)` → `CartItem`
- [x] `src/pages/user/BooksByAuthor.tsx` — `(book: any)` → `Book`
- [x] `src/pages/user/Profile.tsx` — `(loan: any)` → `Loan`, `(review: any)` → `Review`, `(err: any)` → `AxiosError`
- [x] `src/pages/admin/Dashboard.tsx` — `(loan: any)` → `Loan`, `(user: any)` → `User`, `(book: any)` → `Book`
- [x] `src/pages/admin/BookFormPage.tsx` (was `AddBook.tsx`) — `(cat: any)` → `Category`
- [x] `src/components/layout/UserNavbar.tsx` — removed `cartData as any`, now uses typed `cartData` directly
- [x] `src/hooks/useAuth.ts` — typed `onSuccess` callback data
- [x] `src/hooks/useBooks.ts` — typed `select` callback in `useRecommendedBooks`

### Fix `Book` type — missing fields
- [x] `src/types/book.ts` — added `totalPages: number | null`
- [x] `src/types/book.ts` — added `reviews?: Review[]` (populated only on detail endpoint)

### Fix `Author` type — missing field
- [x] `src/types/author.ts` — added `photo` field (surfaced by tighter API types)

### Fix `Loan` type — missing field
- [x] `src/types/loan.ts` — added `user` field (API alias for `borrower`)

### Add typed API layer
Replaced the untyped Axios calls with generic helpers so every hook gets a typed response.

- [x] `src/services/api.ts` — added `apiGet<T>`, `apiPost<T>`, `apiPut<T>`, `apiPatch<T>`, `apiDelete<T>` helpers
- [x] `src/types/api.ts` — added `ApiResponse<T>` and `PageMeta` interfaces; removed dead `PaginatedResponse<T>` type that had the wrong shape
- [x] All 14 hook files updated to use the new typed helpers:
  - `src/hooks/useAuth.ts`
  - `src/hooks/useBooks.ts`
  - `src/hooks/useAuthors.ts`
  - `src/hooks/useCategories.ts`
  - `src/hooks/useCart.ts`
  - `src/hooks/useLoans.ts`
  - `src/hooks/useMe.ts`
  - `src/hooks/useReviews.ts`
  - `src/hooks/admin/useAdminBooks.ts`
  - `src/hooks/admin/useAdminLoans.ts`
  - `src/hooks/admin/useAdminOverview.ts`
  - `src/hooks/admin/useAdminUsers.ts`

---

## Architecture Refactors

### Routes folder — extracted from App.tsx
Split routing logic out of `App.tsx` into a dedicated `src/routes/` folder.

- [x] `src/routes/index.tsx` — root router entry point; imports and composes both route groups
- [x] `src/routes/UserRoutes.tsx` — all user-facing protected routes wrapped in `UserLayout`; catch-all renders `<NotFound />`
- [x] `src/routes/AdminRoutes.tsx` — all admin routes protected by `role === 'ADMIN'` check, wrapped in `AdminLayout`

### Admin hooks — broken out of `useAdmin.ts`
`useAdmin.ts` was one large file mixing all admin domains. Split into focused files under `src/hooks/admin/`.

- [x] `src/hooks/admin/useAdminBooks.ts` — book CRUD mutations
- [x] `src/hooks/admin/useAdminLoans.ts` — loan list + return mutation
- [x] `src/hooks/admin/useAdminOverview.ts` — dashboard overview stats
- [x] `src/hooks/admin/useAdminUsers.ts` — user list
- [x] `src/hooks/admin/index.ts` — barrel export
- [x] `src/hooks/useAdmin.ts` — now a thin re-export barrel pointing to `hooks/admin/`

### Constants — split `index.ts` into domain files
`constants/index.ts` contained all endpoints, query keys, and routes in one file. Split into separate concerns.

- [x] `src/constants/endpoints.ts` — all API endpoint strings
- [x] `src/constants/queryKeys.ts` — all TanStack Query cache keys
- [x] `src/constants/routes.ts` — all client-side route path strings (includes new `ROUTES.SEARCH`)
- [x] `src/constants/categories.ts` — extracted `CATEGORY_ORDER` constant; removed 4 duplicate declarations scattered across components
- [x] `src/constants/index.ts` — barrel re-export of all the above

### Dashboard.tsx — broken into admin components
`Dashboard.tsx` was 464 lines handling everything inline. Extracted all sub-concerns into `src/components/admin/`.

- [x] `src/components/admin/BorrowedTab.tsx` — loan list tab with return actions
- [x] `src/components/admin/UserTab.tsx` — user list tab
- [x] `src/components/admin/BookListTab.tsx` — book management tab
- [x] `src/components/admin/FilterPill.tsx` — reusable filter chip button
- [x] `src/components/admin/ReturnButton.tsx` — loan return action button
- [x] `src/components/admin/LoanCardSkeleton.tsx` — loading skeleton for loan cards
- [x] `src/components/admin/BookRowSkeleton.tsx` — loading skeleton for book table rows
- [x] `src/pages/admin/Dashboard.tsx` — reduced from 464 → 47 lines

### Merge AddBook + BookEdit → BookFormPage
Two near-identical pages for add vs edit. Merged into one component that detects mode via `:id` param.

- [x] `src/pages/admin/BookFormPage.tsx` — unified add/edit form; `id` param present = edit mode
- [x] `src/routes/AdminRoutes.tsx` — both `/books/add` and `/books/edit/:id` routes point to `BookFormPage`
- [x] Deleted `src/pages/admin/AddBook.tsx` (was `AddBook.tsx`)
- [x] Deleted `src/pages/admin/BookEdit.tsx`

### Redux store cleanup — remove dead slices
Two slices were never dispatched or read anywhere in the app.

- [x] Deleted `src/store/uiSlice.ts` — was never used
- [x] Deleted `src/store/cartSlice.ts` — was never used; cart state lives in TanStack Query via `useCart()`
- [x] `src/store/index.ts` — removed imports and store registration for both slices

---

## New Components Added

### Error Boundary
- [x] `src/components/common/ErrorBoundary.tsx` — class component wrapping the full app; renders friendly fallback with "Try again" + "Refresh" buttons
- [x] `src/main.tsx` — `<ErrorBoundary>` wraps `<App />`

### Skeleton loading states
- [x] `src/components/common/Skeleton.tsx` — base animated pulse skeleton primitive
- [x] `src/components/common/BookCardSkeleton.tsx` — book card-shaped skeleton for grid loading states
- [x] `src/components/admin/LoanCardSkeleton.tsx` — loan card skeleton for admin dashboard
- [x] `src/components/admin/BookRowSkeleton.tsx` — table row skeleton for admin book list
- [x] `src/pages/user/Home.tsx` — migrated from inline `animate-pulse` divs to `<BookCardSkeleton />`
- [x] `src/pages/user/BooksByAuthor.tsx` — added skeleton loading state
- [x] `src/pages/user/Cart.tsx` — added skeleton loading state

### Empty states
- [x] `src/components/common/EmptyState.tsx` — reusable `icon + title + description` empty state component
- [x] `src/pages/user/Home.tsx` — replaced bare text with `<EmptyState />` for 0 recommendations
- [x] `src/pages/user/BooksByAuthor.tsx` — uses `<EmptyState />`
- [x] `src/pages/user/Cart.tsx` — uses `<EmptyState />`

### Route lazy loading + PageLoader
All pages are now dynamically imported so each becomes its own JS chunk.

- [x] `src/components/common/PageLoader.tsx` — full-screen spinner used as Suspense fallback
- [x] `src/routes/index.tsx` — all page imports wrapped in `React.lazy()`; `<Suspense fallback={<PageLoader />}>` wraps route tree

---

## Bug Fixes

### Routing bugs
- [x] `src/routes/UserRoutes.tsx` — `BorrowSuccess` route moved inside `UserRoutes` (was top-level, bypassed auth + layout)
- [x] `src/pages/user/BorrowSuccess.tsx` — renamed from `Success.tsx` to match route intent
- [x] `src/routes/UserRoutes.tsx` — added catch-all `*` route rendering `<NotFound />` (was missing, unknown URLs gave blank page)
- [x] `src/routes/index.tsx` — removed orphaned top-level routes that duplicated UserRoutes entries

### Missing `/search` route
- [x] `src/pages/user/Search.tsx` — created Search page (route `/search?q=` was returning NotFound)
- [x] `src/routes/UserRoutes.tsx` — added `/search` route entry
- [x] `src/constants/routes.ts` — added `ROUTES.SEARCH`

### Profile page bugs
- [x] `src/pages/user/Profile.tsx` — added `durationDays` guard (crashed when loan had no return date)
- [x] `src/pages/user/Profile.tsx` — conditional render for blank `category` / `author` fields (showed empty brackets)
- [x] `src/pages/user/Profile.tsx` — `?tab=borrowed` deep link now activates the Borrowed tab on load

### Checkout redirect guard
- [x] `src/pages/user/Checkout.tsx` — added redirect guard; navigates away if cart is empty on mount

### BooksByAuthor safe charAt
- [x] `src/pages/user/BooksByAuthor.tsx` — guarded `.charAt(0)` call (crashed on empty author name)

### Profile name validation + safe review nav
- [x] `src/pages/user/Profile.tsx` — name input validation before save
- [x] `src/pages/user/Profile.tsx` — safe navigation to review's book detail (guarded undefined bookId)

### Home empty state for 0 recommendations
- [x] `src/pages/user/Home.tsx` — shows `<EmptyState />` when recommended books list is empty

### Dashboard + Category `meta` guard
- [x] `src/pages/admin/Dashboard.tsx` — guarded `meta` field that could be `undefined` on first render
- [x] `src/pages/user/Category.tsx` — same `meta` undefined guard

---

## Developer Experience

### Error helper utility
- [x] `src/lib/utils.ts` — added `getErrorMessage(err, fallback?)` to extract a human-readable message from any `AxiosError` or `unknown` thrown value

### CLAUDE.md documentation
- [x] `CLAUDE.md` — expanded with full architecture details: API response shape, admin hooks location, type file breakdown, animation pattern, QueryClient config, path aliases

### Empty file cleanup
- [x] Deleted `src/components/user/BookFilter.tsx` — was an empty stub with no implementation
