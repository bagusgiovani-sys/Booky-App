# Booky App — Architecture Fixes Log

All structural and type-safety fixes applied to the codebase after the initial architecture review.

---

## Fix 1 — Add `.env.example`
**Status:** ✅ Done (initial commit)  
**File:** `library-app-booky/.env.example`  
**Why:** No env template existed; anyone cloning the repo couldn't tell what env vars were needed without reading `api.ts`.

---

## Fix 2 — Split `constants/index.ts` into domain files
**Status:** ✅ Done

**Files:**
- `src/constants/endpoints.ts`
- `src/constants/queryKeys.ts`
- `src/constants/routes.ts`
- `src/constants/index.ts` (now re-exports from all three)

**Why:** A single file was exporting three unrelated groups (`ENDPOINTS`, `QUERY_KEYS`, `ROUTES`). Splitting makes each group independently navigable. Re-exports in `index.ts` keep all existing imports working.

---

## Fix 3 — Break up `useAdmin.ts` god hook
**Status:** ⏳ Pending

**Files:**
- `src/hooks/admin/useAdminBooks.ts`
- `src/hooks/admin/useAdminLoans.ts`
- `src/hooks/admin/useAdminUsers.ts`
- `src/hooks/admin/useAdminOverview.ts`
- `src/hooks/admin/index.ts`
- `src/hooks/useAdmin.ts` (replaced with re-export shim)
- `src/hooks/useBooks.ts` (duplicate `useDeleteBook` removed)

**Why:** `useAdmin.ts` was a 145-line file covering 4 unrelated domains. It also contained a duplicate `useDeleteBook` that was already in `useBooks.ts`, and two hooks that hardcoded API strings (`/api/books`, `/api/books/${id}`) instead of using `ENDPOINTS`.

---

## Fix 4 — Replace `any` types + fix `Book.totalPages` + remove dead code
**Status:** ⏳ Pending

**Files:**
- `src/types/book.ts` — add missing `totalPages?: number`
- `src/pages/user/BookDetail.tsx` — remove dead `useBookReviews` call (empty destructure, data unused); type `reviews` array
- `src/pages/user/Home.tsx` — type category/book/author maps
- `src/pages/user/Cart.tsx` — type cart item map
- `src/pages/admin/Dashboard.tsx` — type loan/user/book maps
- `src/pages/user/Profile.tsx` — type loan/review maps

**Why:** `any` defeats TypeScript. The types were already defined in `src/types/` — they just weren't being used. `useBookReviews` was called with an empty destructure and the result was never used (reviews came from `book?.reviews` instead), causing an unnecessary network request.

---

## Fix 5 — Extract Dashboard sub-components into `components/admin/`
**Status:** ⏳ Pending

**Files:**
- `src/components/admin/BorrowedTab.tsx` (new — extracted from Dashboard)
- `src/components/admin/UserTab.tsx` (new — extracted from Dashboard)
- `src/components/admin/BookListTab.tsx` (new — extracted from Dashboard)
- `src/pages/admin/Dashboard.tsx` (simplified to ~30 lines)

**Why:** `Dashboard.tsx` was 461 lines with 6+ internal components. The `components/admin/` folder existed but had only `DeleteBookModal.tsx` — the rest of the admin components were hiding inside the page file.

---

## Fix 6 — Extract Profile sub-components into `components/user/`
**Status:** ⏳ Pending

**Files:**
- `src/components/user/ProfileTab.tsx` (was empty stub — now filled)
- `src/components/user/BorrowedTab.tsx` (was empty stub — now filled, includes ReviewModal)
- `src/components/user/ReviewsTab.tsx` (was empty stub — now filled)
- `src/pages/user/Profile.tsx` (simplified)

**Why:** Same problem as Dashboard — `Profile.tsx` was ~430 lines with `ProfileTab`, `BorrowedTab`, `ReviewsTab`, and `ReviewModal` all inlined. The corresponding stub files in `components/user/` existed but were empty.

---

## Known Remaining Issues (not fixed in this session)

- **`uiSlice`** (`src/store/uiSlice.ts`) — Redux slice for `searchQuery`, `activeFilter`, `activeTab` that appears to be unused. All pages manage these states locally with `useState`. Needs verification before removal.
- **`CartItem.tsx`, `CheckoutSuccessModal.tsx`, `BookFilter.tsx`, `ReviewCard.tsx`** — empty stub files in `components/user/` not addressed in this session.
