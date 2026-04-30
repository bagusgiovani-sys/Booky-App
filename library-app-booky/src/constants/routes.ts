export const ROUTES = {
  // Auth
  LOGIN: "/login",
  ADMIN_LOGIN: "/login/admin",
  REGISTER: "/register",

  // User
  HOME: "/",
  BOOK_DETAIL: (id: number) => `/books/${id}`,
  CATEGORY: "/category",
  BOOKS_BY_AUTHOR: (id: number) => `/authors/${id}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  PROFILE: "/profile",
  PROFILE_BORROWED: "/profile?tab=borrowed",
  PROFILE_REVIEWS: "/profile?tab=reviews",

  // Admin
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_BOOK_EDIT: (id: number) => `/admin/books/${id}/edit`,
  ADMIN_BOOK_PREVIEW: (id: number) => `/admin/books/${id}/preview`,

  // Borrow
  BORROW_SUCCESS: "/borrow-success",

  // Other
  NOT_FOUND: "*",
}
