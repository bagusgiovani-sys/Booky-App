import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { store } from '@/store/index'
import { logout } from '@/store/authSlice'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
    'Cache-Control': 'no-cache',
  },
})

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)

export const apiGet = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  api.get<T, T>(url, config)

export const apiPost = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
  api.post<T, T>(url, data, config)

export const apiPut = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
  api.put<T, T>(url, data, config)

export const apiPatch = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
  api.patch<T, T>(url, data, config)

export const apiDelete = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  api.delete<T, T>(url, config)

export default api