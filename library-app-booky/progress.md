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

## Up Next

- (nothing — all tracked items complete)

---

## Session Notes

### 2026-05-01
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
