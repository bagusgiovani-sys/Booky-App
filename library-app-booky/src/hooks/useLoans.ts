import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGet, apiPost, apiPatch } from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'
import type { Loan, CreateLoanPayload, CreateLoanFromCartPayload } from '@/types/loan'
import type { ApiResponse, PageMeta } from '@/types/api'

export const useMyLoans = (params?: {
  status?: 'all' | 'active' | 'returned' | 'overdue'
  q?: string
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LOANS_MY, params],
    queryFn: () => apiGet<ApiResponse<{ loans: Loan[] } & PageMeta>>(ENDPOINTS.LOANS_MY, { params }),
  })
}

export const useBorrowBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateLoanPayload) => apiPost(ENDPOINTS.LOANS, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LOANS_MY] })
    },
  })
}

export const useBorrowFromCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateLoanFromCartPayload) => apiPost(ENDPOINTS.LOANS_FROM_CART, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LOANS_MY] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] })
    },
  })
}

export const useReturnBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => apiPatch(ENDPOINTS.LOAN_RETURN(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LOANS_MY] })
    },
  })
}
