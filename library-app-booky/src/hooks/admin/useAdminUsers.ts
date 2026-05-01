import { useQuery } from '@tanstack/react-query'
import { apiGet } from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'
import type { User } from '@/types/user'
import type { ApiResponse, PageMeta } from '@/types/api'

export const useAdminUsers = (params?: {
  q?: string
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_USERS, params],
    queryFn: () => apiGet<ApiResponse<{ users: User[] } & PageMeta>>(ENDPOINTS.ADMIN_USERS, { params }),
  })
}
