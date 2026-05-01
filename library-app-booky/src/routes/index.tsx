import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants'
import AdminRoutes from './AdminRoutes'
import UserRoutes from './UserRoutes'
import PageLoader from '@/components/common/PageLoader'

const UserLogin = lazy(() => import('@/pages/auth/UserLogin'))
const Register = lazy(() => import('@/pages/auth/Register'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<UserLogin />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Suspense>
  )
}
