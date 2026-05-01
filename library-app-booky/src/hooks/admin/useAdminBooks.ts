import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGet, apiPost, apiPut, apiDelete } from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'
import type { Book } from '@/types/book'
import type { ApiResponse, PageMeta } from '@/types/api'

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
    queryFn: () => apiGet<ApiResponse<{ books: Book[] } & PageMeta>>(ENDPOINTS.ADMIN_BOOKS, { params }),
  })
}

export const useAdminCreateBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: FormData) =>
      apiPost(ENDPOINTS.BOOKS, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_BOOKS] })
    },
  })
}

export const useAdminUpdateBook = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: FormData) =>
      apiPut(ENDPOINTS.BOOK_DETAIL(id), payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_BOOKS] })
    },
  })
}

export const useDeleteBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => apiDelete(ENDPOINTS.BOOK_DETAIL(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_BOOKS] })
    },
  })
}
