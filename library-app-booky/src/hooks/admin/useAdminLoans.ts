import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGet, apiPost, apiPatch } from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'
import type { Loan, AdminCreateLoanPayload, UpdateLoanPayload } from '@/types/loan'
import type { ApiResponse, PageMeta } from '@/types/api'

export const useAdminLoans = (params?: {
  status?: 'all' | 'active' | 'returned' | 'overdue'
  q?: string
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_LOANS, params],
    queryFn: () => apiGet<ApiResponse<{ loans: Loan[] } & PageMeta>>(ENDPOINTS.ADMIN_LOANS, { params }),
    staleTime: 0,
    gcTime: 0,
  })
}

export const useAdminOverdueLoans = (params?: {
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_LOANS_OVERDUE, params],
    queryFn: () => apiGet<ApiResponse<{ loans: Loan[] } & PageMeta>>(ENDPOINTS.ADMIN_LOANS_OVERDUE, { params }),
  })
}

export const useAdminCreateLoan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: AdminCreateLoanPayload) => apiPost(ENDPOINTS.ADMIN_LOANS, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_LOANS] })
    },
  })
}

export const useAdminUpdateLoan = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateLoanPayload) => apiPatch(ENDPOINTS.ADMIN_LOAN(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_LOANS] })
    },
  })
}
