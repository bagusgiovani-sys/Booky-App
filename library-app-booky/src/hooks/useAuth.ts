import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiPost } from '@/services/api'
import { setCredentials, logout } from '@/store/authSlice'
import { ENDPOINTS, ROUTES } from '@/constants'
import type { User } from '@/types/user'
import type { ApiResponse } from '@/types/api'

export const useLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      apiPost<ApiResponse<{ token: string; user: User }>>(ENDPOINTS.LOGIN, credentials),
    onSuccess: (data) => {
      dispatch(setCredentials({ token: data.data.token, user: data.data.user }))
      if (data.data.user.role === 'ADMIN') {
        navigate(ROUTES.ADMIN_DASHBOARD)
      } else {
        navigate(ROUTES.HOME)
      }
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: {
      name: string
      email: string
      phone?: string
      password: string
    }) => apiPost(ENDPOINTS.REGISTER, payload),
  })
}

export const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return () => {
    dispatch(logout())
    navigate(ROUTES.LOGIN)
  }
}
