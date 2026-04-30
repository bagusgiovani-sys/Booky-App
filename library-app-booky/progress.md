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

## Up Next

- [ ] Typed API layer — add generic helper to `api.ts` so hooks get typed responses without casting
- [ ] Merge `AddBook.tsx` + `BookEdit.tsx` into a shared `BookForm` component (~90% identical)

---

## Session Notes

### 2026-04-30
- Ran full `/init` inspection; improved `CLAUDE.md` with architecture details, created `fixes.md` and `progress.md`
- Eliminated all `any` types across 13 files
- Fixed `Book` and `Loan` types; removed dead `uiSlice`, `cartSlice`; extracted `CATEGORY_ORDER`; added `getErrorMessage` util
- Bug & polish pass: Checkout redirect guard, BooksByAuthor safe charAt, Profile name validation + safe review nav, Home empty state for 0 recommendations
- Renamed branch `master` → `main`
