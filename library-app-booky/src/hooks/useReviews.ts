import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGet, apiPost, apiDelete } from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'
import type { Review, CreateReviewPayload } from '@/types/review'
import type { ApiResponse, PageMeta } from '@/types/api'

export const useBookReviews = (bookId: number, params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REVIEWS_BOOK, bookId, params],
    queryFn: () => apiGet<ApiResponse<{ reviews: Review[] } & PageMeta>>(ENDPOINTS.REVIEWS_BOOK(bookId), { params }),
    enabled: !!bookId,
  })
}

export const useCreateReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => apiPost(ENDPOINTS.REVIEWS, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEWS_BOOK, variables.bookId] })
    },
  })
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => apiDelete(ENDPOINTS.REVIEW(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEWS_BOOK] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ME_REVIEWS] })
    },
  })
}
