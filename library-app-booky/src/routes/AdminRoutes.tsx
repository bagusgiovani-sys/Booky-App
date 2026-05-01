import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/index'
import { ROUTES } from '@/constants'
import AdminLayout from '@/components/layout/AdminLayout'
import PageLoader from '@/components/common/PageLoader'

const Dashboard = lazy(() => import('@/pages/admin/Dashboard'))
const BookFormPage = lazy(() => import('@/pages/admin/BookFormPage'))
const BookPreview = lazy(() => import('@/pages/admin/BookPreview'))

export default function AdminRoutes() {
  const { token, user } = useSelector((state: RootState) => state.auth)

  if (!token || user?.role !== 'ADMIN') {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return (
    <AdminLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="books/new" element={<BookFormPage />} />
          <Route path="books/:id/edit" element={<BookFormPage />} />
          <Route path="books/:id/preview" element={<BookPreview />} />
          <Route path="*" element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
        </Routes>
      </Suspense>
    </AdminLayout>
  )
}
