import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'

export const useAdminBooks = (params?: {
  status?: 'all' | 'available' | 'borrowed' | 'returned'
  q?: string
  categoryId?: number
  authorId?: number
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_BOOKS, params],
    queryFn: async () => {
      const data = await api.get(ENDPOINTS.ADMIN_BOOKS, { params })
      return data
    },
  })
}

export const useAdminCreateBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const data = await api.post(ENDPOINTS.BOOKS, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_BOOKS] })
    },
  })
}

export const useAdminUpdateBook = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const data = await api.put(ENDPOINTS.BOOK_DETAIL(id), payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_BOOKS] })
    },
  })
}

export const useDeleteBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const data = await api.delete(ENDPOINTS.BOOK_DETAIL(id))
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_BOOKS] })
    },
  })
}
