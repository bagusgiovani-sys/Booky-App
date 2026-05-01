# Progress

## Done

- [x] Break up `useAdmin.ts` into domain hooks under `hooks/admin/`
- [x] Split `constants/index.ts` into domain files (`endpoints.ts`, `queryKeys.ts`, `routes.ts`)
- [x] Improve `CLAUDE.md` with full architecture details (API shape, types, animation pattern, etc.)
- [x] Eliminate all `any` types across 13 files — replaced with proper domain types
- [x] Add missing fields to `Book` type (`totalPages`, `reviews`)
- [x] Add `user` field to `Loan` type (API alias for `borrower`)
- [x] Fix `cartSlice` to import `CartItem` from `types/cart` instead of redefining it
- [x] Delete empty `BookFilter.tsx` stub
- [x] Remove dead `uiSlice` and `cartSlice` — never dispatched or read anywhere
- [x] Extract `CATEGORY_ORDER` to `constants/categories.ts` — removed 4 duplicate declarations
- [x] Add `getErrorMessage(err, fallback?)` util to `lib/utils.ts`

- [x] **Bug check & polish** — audited all pages; fixed 4 confirmed bugs (see below)
- [x] Typed API layer — `apiGet/Post/Put/Patch/Delete<T>` helpers in `api.ts`; `ApiResponse<T>` + `PageMeta` in `types/api.ts`; all 14 hook files updated
- [x] Merge `AddBook.tsx` + `BookEdit.tsx` → `BookFormPage.tsx`; mode determined by `:id` param; also fixed `Author.photo`, `meta` guard in Dashboard + Category

- [x] **Playwright bug sweep** — tested Category, BooksByAuthor, BookDetail, Cart, Checkout, Profile, Search; found and fixed 4 more bugs (see 2026-05-01 session 3 notes)

## Up Next

- (nothing queued)

## 10/10 Overhaul — All Done ✓

### Group 1: Code Correctness
- [x] **Fix routing structure** — `Success.tsx` → `BorrowSuccess.tsx`; `/borrow-success` moved into `UserRoutes` (auth + layout); `UserRoutes` catch-all now shows `<NotFound />`; orphaned top-level routes removed
- [x] **Fix `PaginatedResponse<T>` type** — removed dead/wrong-shaped type; hooks already used `ApiResponse<{books:T[]} & PageMeta>` correctly

### Group 2: Resilience
- [x] **Add Error Boundaries** — `ErrorBoundary` class component wraps the full app in `main.tsx`; renders friendly fallback with Try again + Refresh buttons

### Group 3: Admin Layer
- [x] **Break out `Dashboard.tsx`** — extracted `BorrowedTab`, `UserTab`, `BookListTab`, `FilterPill`, `ReturnButton`, `LoanCardSkeleton`, `BookRowSkeleton` into `components/admin/`; Dashboard.tsx reduced from 464 → 47 lines

### Group 4: UX Polish
- [x] **Skeleton loading states** — `Skeleton` (animated pulse), `BookCardSkeleton` added to `components/common/`; `BooksByAuthor` and `Cart` now have loading skeletons; `Home` migrated from inline `animate-pulse` to `BookCardSkeleton`
- [x] **Consistent empty states** — `EmptyState` component (`icon + title + description`) replaces bare text across Home, BooksByAuthor, Cart

### Group 5: Performance
- [x] **Route lazy loading** — all pages wrapped in `React.lazy` + `Suspense`; each page is now a separate JS chunk; `PageLoader` spinner as fallback

### Group 6: Code Clarity
- [x] **`constants/index.ts` barrel cleanup** — added barrel comment

---

## Session Notes

### 2026-05-02
- Revamped `fixes.md` — 70 → 170 lines; added exact `src/` file paths for every change, grouped into 5 sections (TypeScript, Architecture, New Components, Bug Fixes, DX); added missing routes folder refactor and all prior sessions' changes that were undocumented

### 2026-05-01 (session 3 — Playwright bug sweep)
- Category page: filter drawer opens correctly, Fiction filter works, books update — no bugs
- BooksByAuthor (author ID 19 / Zayn Mifta): author card + 10 books render correctly — no bugs
- BookDetail: all sections (cover, stats, reviews, related books, action buttons) correct — no bugs
- Cart: Select All + count update + navigate to Checkout — no bugs
- Checkout: user info pre-filled, 3 books listed, return date calculation correct, button disabled without terms — no bugs
- Profile: verified 3 fixes from prev session — durationDays guard ✓, category/author conditional render ✓, ?tab=borrowed deep link ✓
- Search: **Bug** — /search?q= route missing → NotFound page. Fixed: created Search.tsx page + added route + ROUTES.SEARCH constant
- Cart badge on Profile confirmed working (was a one-off in prior session)

### 2026-05-01 (session 2 — 10/10 overhaul)
- Group 1: Fixed routing (BorrowSuccess.tsx rename, moved into UserRoutes, NotFound catch-all), removed dead PaginatedResponse<T> type, constants barrel comment
- Group 2: Added ErrorBoundary wrapping full app with friendly fallback UI
- Group 3: Broke out Dashboard.tsx (464→47 lines) into 7 admin components + Skeleton in common
- Group 4: Added EmptyState + BookCardSkeleton components; added loading skeletons to BooksByAuthor + Cart; migrated Home inline pulse to BookCardSkeleton
- Group 5: Lazy-loaded all page routes with React.lazy + Suspense; added PageLoader; every page is now a separate JS chunk
- Group 6: Constants barrel comment
- All builds clean throughout

### 2026-05-01 (session 1)
- Typed API layer: added `apiGet/Post/Put/Patch/Delete<T>` to `api.ts`; `ApiResponse<T>` + `PageMeta` to `types/api.ts`; updated all 14 hook files
- Merged `AddBook.tsx` + `BookEdit.tsx` into `BookFormPage.tsx`; both admin routes now use single component
- Fixed bonus issues surfaced by tighter types: added `photo` to `Author` type, fixed `meta` undefined guard in Dashboard + Category
- Build passes clean

### 2026-04-30
- Ran full `/init` inspection; improved `CLAUDE.md` with architecture details, created `fixes.md` and `progress.md`
- Eliminated all `any` types across 13 files
- Fixed `Book` and `Loan` types; removed dead `uiSlice`, `cartSlice`; extracted `CATEGORY_ORDER`; added `getErrorMessage` util
- Bug & polish pass: Checkout redirect guard, BooksByAuthor safe charAt, Profile name validation + safe review nav, Home empty state for 0 recommendations
- Renamed branch `master` → `main`
