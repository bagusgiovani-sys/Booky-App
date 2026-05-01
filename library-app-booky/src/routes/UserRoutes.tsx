import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/index'
import { ROUTES } from '@/constants'
import UserLayout from '@/components/layout/UserLayout'
import PageLoader from '@/components/common/PageLoader'

const Home = lazy(() => import('@/pages/user/Home'))
const BookDetail = lazy(() => import('@/pages/user/BookDetail'))
const Category = lazy(() => import('@/pages/user/Category'))
const BooksByAuthor = lazy(() => import('@/pages/user/BooksByAuthor'))
const Cart = lazy(() => import('@/pages/user/Cart'))
const Checkout = lazy(() => import('@/pages/user/Checkout'))
const Profile = lazy(() => import('@/pages/user/Profile'))
const BorrowSuccess = lazy(() => import('@/pages/user/BorrowSuccess'))
const SearchPage = lazy(() => import('@/pages/user/Search'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function UserRoutes() {
  const { token } = useSelector((state: RootState) => state.auth)

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return (
    <UserLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="books/:id" element={<BookDetail />} />
          <Route path="category" element={<Category />} />
          <Route path="authors/:id" element={<BooksByAuthor />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="borrow-success" element={<BorrowSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </UserLayout>
  )
}
