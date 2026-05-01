import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGet, apiPost, apiPut } from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'
import type { Book, CreateBookPayload, UpdateBookPayload } from '@/types/book'
import type { ApiResponse, PageMeta } from '@/types/api'

export const useBooks = (params?: {
  q?: string
  categoryId?: number
  authorId?: number
  minRating?: number
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BOOKS, params],
    queryFn: () => apiGet<ApiResponse<{ books: Book[] } & PageMeta>>(ENDPOINTS.BOOKS, { params }),
  })
}

export const useBookDetail = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BOOK_DETAIL, id],
    queryFn: () => apiGet<ApiResponse<Book>>(ENDPOINTS.BOOK_DETAIL(id)),
    enabled: !!id,
  })
}

export const useRecommendedBooks = (params?: {
  by?: 'rating' | 'popular'
  categoryId?: number
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BOOKS_RECOMMEND, params],
    queryFn: () => apiGet<ApiResponse<{ books: Book[] }>>(ENDPOINTS.BOOKS_RECOMMEND, { params }),
    select: (data) => data.data.books,
  })
}

export const useCreateBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateBookPayload) => apiPost(ENDPOINTS.BOOKS, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS] })
    },
  })
}

export const useUpdateBook = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateBookPayload) => apiPut(ENDPOINTS.BOOK_DETAIL(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOK_DETAIL, id] })
    },
  })
}
