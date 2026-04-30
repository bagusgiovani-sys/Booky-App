# Booky Architecture Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all architectural and folder-structure issues identified in the codebase review.

**Architecture:** Each fix is isolated and independently deployable. Fixes are ordered so later tasks don't break earlier ones. Constants split uses re-exports so no import-site changes needed. Hook split uses a barrel `index.ts` for the same reason.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, TanStack Query 5, Redux Toolkit 2, Tailwind CSS 4

---

## Files Touched

| File | Action |
|------|--------|
| `library-app-booky/.env.example` | Create |
| `fixes.md` | Create + update after each fix |
| `src/constants/endpoints.ts` | Create |
| `src/constants/queryKeys.ts` | Create |
| `src/constants/routes.ts` | Create |
| `src/constants/index.ts` | Replace with re-exports |
| `src/hooks/admin/useAdminBooks.ts` | Create |
| `src/hooks/admin/useAdminLoans.ts` | Create |
| `src/hooks/admin/useAdminUsers.ts` | Create |
| `src/hooks/admin/useAdminOverview.ts` | Create |
| `src/hooks/admin/index.ts` | Create (barrel) |
| `src/hooks/useAdmin.ts` | Replace with re-export shim |
| `src/hooks/useBooks.ts` | Remove duplicate `useDeleteBook` |
| `src/types/book.ts` | Add missing `totalPages` field |
| `src/pages/user/BookDetail.tsx` | Remove dead hook call, fix types |
| `src/pages/user/Home.tsx` | Fix `any` types in maps |
| `src/pages/user/Cart.tsx` | Fix `any` types in map |
| `src/pages/user/Profile.tsx` | Remove inlined components, import from components/user/ |
| `src/pages/admin/Dashboard.tsx` | Remove inlined components, import from components/admin/ |
| `src/components/admin/BorrowedTab.tsx` | Create (extracted from Dashboard) |
| `src/components/admin/UserTab.tsx` | Create (extracted from Dashboard) |
| `src/components/admin/BookListTab.tsx` | Create (extracted from Dashboard) |
| `src/components/user/ProfileTab.tsx` | Fill empty stub (extracted from Profile) |
| `src/components/user/BorrowedTab.tsx` | Fill empty stub (extracted from Profile) |
| `src/components/user/ReviewsTab.tsx` | Fill empty stub (extracted from Profile) |

---

### Task 1: Initial commit + fixes.md

**Files:**
- Create: `fixes.md`
- Create: `library-app-booky/.env.example`

- [ ] **Step 1: Create fixes.md**

- [ ] **Step 2: Create .env.example**

```
VITE_API_BASE_URL=http://localhost:3000
```

- [ ] **Step 3: Initial commit and push**

```bash
git add .
git commit -m "chore: initial commit — existing codebase + CLAUDE.md + fixes tracking"
git push -u origin master
```

---

### Task 2: Split constants/index.ts

**Files:**
- Create: `src/constants/endpoints.ts`
- Create: `src/constants/queryKeys.ts`
- Create: `src/constants/routes.ts`
- Modify: `src/constants/index.ts`

No import-site changes needed — `index.ts` re-exports everything.

- [ ] **Step 1: Create endpoints.ts**
- [ ] **Step 2: Create queryKeys.ts**
- [ ] **Step 3: Create routes.ts**
- [ ] **Step 4: Replace index.ts with re-exports**
- [ ] **Step 5: Update fixes.md, commit + push**

---

### Task 3: Break up useAdmin.ts

**Files:**
- Create: `src/hooks/admin/useAdminBooks.ts`
- Create: `src/hooks/admin/useAdminLoans.ts`
- Create: `src/hooks/admin/useAdminUsers.ts`
- Create: `src/hooks/admin/useAdminOverview.ts`
- Create: `src/hooks/admin/index.ts`
- Modify: `src/hooks/useAdmin.ts` → shim re-exporting from admin/
- Modify: `src/hooks/useBooks.ts` → remove duplicate `useDeleteBook`

- [ ] **Step 1: Create admin/ hook files**
- [ ] **Step 2: Create admin/index.ts barrel**
- [ ] **Step 3: Replace useAdmin.ts with re-export shim**
- [ ] **Step 4: Remove duplicate useDeleteBook from useBooks.ts**
- [ ] **Step 5: Update fixes.md, commit + push**

---

### Task 4: Fix type safety issues

**Files:**
- Modify: `src/types/book.ts`
- Modify: `src/pages/user/BookDetail.tsx`
- Modify: `src/pages/user/Home.tsx`
- Modify: `src/pages/user/Cart.tsx`
- Modify: `src/pages/admin/Dashboard.tsx`
- Modify: `src/pages/user/Profile.tsx`

- [ ] **Step 1: Add totalPages to Book type**
- [ ] **Step 2: Fix BookDetail — remove dead hook, type reviews**
- [ ] **Step 3: Fix Home.tsx map types**
- [ ] **Step 4: Fix Cart.tsx item type**
- [ ] **Step 5: Fix Dashboard.tsx loan/user/book any types**
- [ ] **Step 6: Fix Profile.tsx loan/review any types**
- [ ] **Step 7: Update fixes.md, commit + push**

---

### Task 5: Extract Dashboard sub-components

**Files:**
- Create: `src/components/admin/BorrowedTab.tsx`
- Create: `src/components/admin/UserTab.tsx`
- Create: `src/components/admin/BookListTab.tsx`
- Modify: `src/pages/admin/Dashboard.tsx`

- [ ] **Step 1: Create BorrowedTab.tsx (with ReturnButton, FilterPill, skeletons)**
- [ ] **Step 2: Create UserTab.tsx**
- [ ] **Step 3: Create BookListTab.tsx**
- [ ] **Step 4: Rewrite Dashboard.tsx to import from components**
- [ ] **Step 5: Update fixes.md, commit + push**

---

### Task 6: Extract Profile sub-components

**Files:**
- Modify: `src/components/user/ProfileTab.tsx` (fill empty stub)
- Modify: `src/components/user/BorrowedTab.tsx` (fill empty stub, with ReviewModal)
- Modify: `src/components/user/ReviewsTab.tsx` (fill empty stub)
- Modify: `src/pages/user/Profile.tsx`

- [ ] **Step 1: Fill ProfileTab.tsx**
- [ ] **Step 2: Fill BorrowedTab.tsx (include ReviewModal)**
- [ ] **Step 3: Fill ReviewsTab.tsx**
- [ ] **Step 4: Rewrite Profile.tsx to import from components**
- [ ] **Step 5: Update fixes.md, commit + push**
