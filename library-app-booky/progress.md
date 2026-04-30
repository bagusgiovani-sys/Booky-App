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

## Up Next

- [ ] **Bug check & polish** — audit pages for runtime bugs, edge cases, UX rough edges
- [ ] Typed API layer — add generic helper to `api.ts` so hooks get typed responses without casting
- [ ] Merge `AddBook.tsx` + `BookEdit.tsx` into a shared `BookForm` component (~90% identical)
